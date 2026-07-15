function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);
}

async function sendEmail(message) {
  if (!process.env.RESEND_API_KEY) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "Falaq Bot <bot@mail.falaqai.com>",
      ...message
    })
  });
  if (!response.ok) throw new Error(`Resend returned ${response.status}: ${(await response.text()).slice(0, 300)}`);
  return true;
}

async function safelySend(label, message) {
  try {
    return await sendEmail(message);
  } catch (error) {
    console.warn(`${label} email failed:`, error.message);
    return false;
  }
}

async function sendProposalEmails({ contact, language, categoryLabel, reference, proposal, pdf, fileName }) {
  const ar = language !== "en";
  const replyTo = process.env.EMAIL_REPLY_TO || "hello@falaqai.com";
  const clientEmail = contact.email
    ? safelySend("Client proposal", {
        to: [contact.email],
        reply_to: replyTo,
        subject: ar ? `عرض فلق المقترح - ${categoryLabel}` : `Your Falaq proposal - ${categoryLabel}`,
        html: `<div dir="${ar ? "rtl" : "ltr"}" style="font-family:Arial,sans-serif;line-height:1.7;color:#17172b"><h2>${escapeHtml(proposal.title)}</h2><p>${ar ? "شكرًا لمشاركة احتياجك مع فلق. أرفقنا التصور المقترح المبني على محادثتك." : "Thank you for sharing your requirement with Falaq. Your conversation-based proposal is attached."}</p><p>${ar ? "الرقم المرجعي" : "Reference"}: <strong>${escapeHtml(reference)}</strong></p><p>${ar ? "يمكنك الرد على هذا البريد لمناقشة الخطوة التالية." : "Reply to this email to discuss the next step."}</p></div>`,
        attachments: [{ filename: fileName, content: pdf.toString("base64") }]
      })
    : Promise.resolve(false);

  const notificationAddress = process.env.LEAD_NOTIFICATION_EMAIL || "hello@falaqai.com";
  const notificationEmail = notificationAddress
    ? safelySend("Lead notification", {
        to: [notificationAddress],
        reply_to: contact.email || replyTo,
        subject: `New Falaq lead: ${contact.name} - ${categoryLabel}`,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#17172b"><h2>New proposal generated</h2><p><strong>Reference:</strong> ${escapeHtml(reference)}</p><p><strong>Name:</strong> ${escapeHtml(contact.name)}<br><strong>Company:</strong> ${escapeHtml(contact.company || "-")}<br><strong>Email:</strong> ${escapeHtml(contact.email || "-")}<br><strong>WhatsApp:</strong> ${escapeHtml(contact.phone || "-")}<br><strong>Service:</strong> ${escapeHtml(categoryLabel)}</p><p><strong>Request:</strong><br>${escapeHtml(proposal.opening)}</p></div>`
      })
    : Promise.resolve(false);

  const [clientSent, notificationSent] = await Promise.all([clientEmail, notificationEmail]);
  return { clientSent, notificationSent };
}

module.exports = { sendProposalEmails };
