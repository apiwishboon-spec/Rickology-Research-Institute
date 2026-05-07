const questions = [
    {
        text: "Situational Response",
        desc: "In a high-pressure environment, do you prioritize emotional stability or immediate problem-solving?",
        options: ["Emotional Stability", "Immediate Action", "Balanced Approach", "External Consultation"]
    },
    {
        text: "Social Integration",
        desc: "When entering a new social circle, how do you typically establish your presence?",
        options: ["Observation", "Active Engagement", "Diplomatic Neutrality", "Task-Oriented Leadership"]
    },
    {
        text: "Conflict Resolution",
        desc: "How do you handle interpersonal friction when the other party is visibly distressed?",
        options: ["Empathetic Listening", "Logical De-escalation", "Strategic Withdrawal", "Mediation"]
    },
    {
        text: "Future Orientation",
        desc: "Do you find yourself more focused on historical data or speculative potential?",
        options: ["Data-Driven Past", "Speculative Future", "Pragmatic Present", "Cyclical Patterns"]
    },
    {
        text: "Cognitive Load",
        desc: "When multitasking, which sensory input do you find most distracting?",
        options: ["Auditory Stimuli", "Visual Clutter", "Internal Monologue", "Kinesthetic Feedback"]
    }
];

const statusMessages = [
    "Calibrating neural metrics...",
    "Cross-referencing global psychometrics...",
    "Analyzing situational variance...",
    "Generating resilience profile...",
    "Finalizing report parameters..."
];

let currentQuestionIndex = 0;

// DOM Elements
const views = {
    landing: document.getElementById('landing'),
    assessment: document.getElementById('assessment'),
    processing: document.getElementById('processing'),
    resultsPreview: document.getElementById('results-preview'),
    trap: document.getElementById('trap')
};

const progressBar = document.getElementById('progress-bar');
const questionText = document.getElementById('question-text');
const questionDesc = document.getElementById('question-desc');
const optionsContainer = document.getElementById('options-container');
const statusText = document.getElementById('status-text');

// Legal Modals Logic
const modal = document.getElementById('legal-modal');
const modalText = document.getElementById('modal-text');
const closeModal = document.querySelector('.close-modal');

const legalContent = {
    privacy: `
        <h3>Privacy Policy</h3>
        <p>Last Updated: May 2026</p>
        <p>At the Rickology Research Institute, we take your data seriously. Our "Never Gonna Give You Up" data protection pledge ensures that your assessment results are handled with the utmost care.</p>
        <p>1. <strong>Data Collection:</strong> We collect behavioral responses to situational stimuli. This data is used to calculate your Structural Resilience index.</p>
        <p>2. <strong>Data Sharing:</strong> We will never sell your data. We will never let you down, run around, or desert you.</p>
        <p>3. <strong>Cookies:</strong> We use essential cookies to maintain your assessment session. By continuing, you agree to our use of these "Rick-Rollies".</p>
    `,
    terms: `
        <h3>Terms of Service</h3>
        <p>1. <strong>Agreement:</strong> By beginning the EIA-5 assessment, you agree to provide honest responses and accept the final psychometric determination.</p>
        <p>2. <strong>Usage:</strong> Users are prohibited from attempting to bypass assessment phases or manipulate neural metric calibration.</p>
        <p>3. <strong>Liability:</strong> Rickology Research Institute is not responsible for any emotional surges or sudden urges to dance caused by the detailed report results.</p>
        <p>4. <strong>Governing Law:</strong> These terms are governed by the laws of the Internet, specifically the Rick Astley Statutes of 1987.</p>
    `
};

if (document.getElementById('privacy-link')) {
    document.getElementById('privacy-link').onclick = (e) => {
        e.preventDefault();
        modalText.innerHTML = legalContent.privacy;
        modal.classList.remove('hidden');
    };
}

if (document.getElementById('terms-link')) {
    document.getElementById('terms-link').onclick = (e) => {
        e.preventDefault();
        modalText.innerHTML = legalContent.terms;
        modal.classList.remove('hidden');
    };
}

if (closeModal) {
    closeModal.onclick = () => modal.classList.add('hidden');
}

window.onclick = (e) => { if (e.target == modal) modal.classList.add('hidden'); };

// Navigation
function showView(viewName) {
    Object.keys(views).forEach(v => {
        if (views[v]) {
            views[v].classList.toggle('hidden', v !== viewName);
        }
    });
}

// Initial state
showView('landing');

// Event Listeners
if (document.getElementById('start-btn')) {
    document.getElementById('start-btn').addEventListener('click', () => {
        showView('assessment');
        renderQuestion();
    });
}

if (document.getElementById('view-results-btn')) {
    document.getElementById('view-results-btn').addEventListener('click', enterTrap);
}

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    if (!q) return;

    questionText.innerText = `Question ${currentQuestionIndex + 1} of 5: ${q.text}`;
    questionDesc.innerText = q.desc;
    
    progressBar.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;
    
    optionsContainer.innerHTML = '';
    q.options.forEach(opt => {
        const div = document.createElement('div');
        div.className = 'option-card';
        div.innerText = opt;
        div.onclick = handleOptionClick;
        optionsContainer.appendChild(div);
    });
}

function handleOptionClick() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        progressBar.style.width = '100%';
        setTimeout(startProcessing, 500);
    }
}

function startProcessing() {
    showView('processing');
    let messageIndex = 0;
    
    const interval = setInterval(() => {
        if (messageIndex < statusMessages.length) {
            statusText.innerText = statusMessages[messageIndex];
            messageIndex++;
        } else {
            clearInterval(interval);
            setTimeout(() => showView('resultsPreview'), 1000);
        }
    }, 1200);
}

// The Trap
let player;
let fsInterval;

function onYouTubeIframeAPIReady() {
    // This is called by the YouTube API script
}

function enterTrap() {
    showView('trap');
    
    // Initialize the player using the div ID
    player = new YT.Player('rick-player', {
        height: '100%',
        width: '100%',
        videoId: 'dQw4w9WgXcQ',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'disablekb': 1,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'iv_load_policy': 3,
            'fs': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    forceFullscreen();
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    // YT.PlayerState.ENDED is 0
    if (event.data === 0) {
        exitTrap();
    }
}

function forceFullscreen() {
    const docEl = document.documentElement;
    const requestFs = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullscreen || docEl.msRequestFullscreen;
    
    if (requestFs) {
        requestFs.call(docEl).catch(() => {});
    }

    // Aggressive "Spam" Fullscreen Logic
    const enforceFs = () => {
        const isFs = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        
        if (!isFs && !views.trap.classList.contains('hidden')) {
            // Check if player ended (state 0)
            let isEnded = false;
            try {
                if (player && player.getPlayerState() === 0) isEnded = true;
            } catch(e) {}

            if (!isEnded && requestFs) {
                requestFs.call(docEl).catch(() => {});
            }
        }
    };

    document.addEventListener('fullscreenchange', enforceFs);
    document.addEventListener('webkitfullscreenchange', enforceFs);
    document.addEventListener('mozfullscreenchange', enforceFs);
    document.addEventListener('MSFullscreenChange', enforceFs);

    // Also "Spam" check every 500ms
    if (fsInterval) clearInterval(fsInterval);
    fsInterval = setInterval(enforceFs, 500);
}

function exitTrap() {
    if (fsInterval) clearInterval(fsInterval);

    if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen().catch(() => {});
    }
    
    showView('resultsPreview');
    
    const resultsHeader = document.querySelector('#results-preview h2');
    const resultsSummary = document.querySelector('#results-preview .summary-box');
    const resultsBtn = document.getElementById('view-results-btn');

    if (resultsHeader) resultsHeader.innerText = "Psychometric Profile Finalized";
    if (resultsSummary) resultsSummary.innerHTML = "<h3>Structural Resilience: 99.9%</h3><p>Your assessment indicates an unbreakable commitment to stability. Thank you for participating in the Rickology Research Program.</p>";
    if (resultsBtn) resultsBtn.style.display = 'none';

    alert("Assessment Complete: Your results have been successfully calibrated.");
}

// Disable keys that might help escape
window.addEventListener('keydown', (e) => {
    // If in the trap view, block almost everything
    if (!views.trap.classList.contains('hidden')) {
        if (['Escape', 'F11', 'Meta', 'Alt', 'Control', 'Tab'].includes(e.key)) {
            e.preventDefault();
            return false;
        }
    }
}, true);
