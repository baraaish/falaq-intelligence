const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Function to add a regular text message
function addMessage(text, sender = 'user') {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', `${sender}-message`);
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.textContent = text;
    
    msgDiv.appendChild(contentDiv);
    chatMessages.appendChild(msgDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to simulate Generative UI Workflows (Tool calling visualizer)
async function simulateGenerativeUIWorkflow(userText) {
    // 1. Create Workflow Card
    const workflowDiv = document.createElement('div');
    workflowDiv.classList.add('workflow-card', 'message'); // behaves like a message for animation
    
    // Header for Workflow
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('workflow-header');
    headerDiv.innerHTML = `<div class="loader-spinner"></div> <span id="workflow-status">الذكاء الاصطناعي يفكر...</span>`;
    
    // Steps Container
    const stepsContainer = document.createElement('div');
    
    workflowDiv.appendChild(headerDiv);
    workflowDiv.appendChild(stepsContainer);
    chatMessages.appendChild(workflowDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Helper to create step
    const addStep = (text) => {
        const step = document.createElement('div');
        step.classList.add('step');
        step.innerHTML = `
            <div class="step-icon">⌛</div>
            <div class="step-text">${text}</div>
        `;
        stepsContainer.appendChild(step);
        return step;
    };

    // Helper to sleep
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    // Simulate Workflow Steps
    const step1 = addStep('تحليل طلب المستخدم وتحديد النوايا...');
    step1.classList.add('active');
    await sleep(1500); // Simulate API latency
    step1.classList.remove('active');
    step1.classList.add('completed');
    step1.querySelector('.step-icon').innerHTML = '✓';

    const step2 = addStep('البحث في قاعدة البيانات الحية...');
    step2.classList.add('active');
    await sleep(2000);
    step2.classList.remove('active');
    step2.classList.add('completed');
    step2.querySelector('.step-icon').innerHTML = '✓';

    const step3 = addStep('صياغة الرد وتوليد واجهة النتائج...');
    step3.classList.add('active');
    await sleep(1500);
    step3.classList.remove('active');
    step3.classList.add('completed');
    step3.querySelector('.step-icon').innerHTML = '✓';

    // Finish workflow
    document.getElementById('workflow-status').innerText = 'تمت المهمة بنجاح';
    workflowDiv.querySelector('.loader-spinner').style.display = 'none';

    // Send final Bot Response
    await sleep(500);
    addMessage(`بناءً على طلبك ("${userText}")، قمت بتحليل البيانات وعثرت على أفضل النتائج المناسبة لك. هل ترغب في تفاصيل إضافية؟`, 'bot');
}

// Handle sending message
async function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    // 1. Show user message
    addMessage(text, 'user');
    userInput.value = '';

    // 2. Trigger Generative UI workflow visualization
    await simulateGenerativeUIWorkflow(text);
}

// Event Listeners
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});
