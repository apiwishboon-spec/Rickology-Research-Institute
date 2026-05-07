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
const appState = {
    view: 'landing'
};

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
const rickVideo = document.getElementById('rick-video');

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

document.getElementById('privacy-link').onclick = (e) => {
    e.preventDefault();
    modalText.innerHTML = legalContent.privacy;
    modal.classList.remove('hidden');
};

document.getElementById('terms-link').onclick = (e) => {
    e.preventDefault();
    modalText.innerHTML = legalContent.terms;
    modal.classList.remove('hidden');
};

closeModal.onclick = () => modal.classList.add('hidden');
window.onclick = (e) => { if (e.target == modal) modal.classList.add('hidden'); };

// Navigation
function showView(viewName) {
    Object.keys(views).forEach(v => {
        views[v].classList.toggle('hidden', v !== viewName);
    });
}

// Event Listeners
document.getElementById('start-btn').addEventListener('click', () => {
    showView('assessment');
    renderQuestion();
});

document.getElementById('view-results-btn').addEventListener('click', enterTrap);

function renderQuestion() {
    const q = questions[currentQuestionIndex];
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
        statusText.innerText = statusMessages[messageIndex];
        messageIndex++;
        if (messageIndex >= statusMessages.length) {
            clearInterval(interval);
            setTimeout(() => showView('results-preview'), 1000);
        }
    }, 1200);
}

// The Trap
let player;
function onYouTubeIframeAPIReady() {
    // This is called by the YouTube API script
}

function enterTrap() {
    showView('trap');
    
    // Initialize YouTube player
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'dQw4w9WgXcQ', // Rick Astley - Never Gonna Give You Up
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'disablekb': 1,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'iv_load_policy': 3,
            'fs': 0 // Disable the built-in fullscreen button
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    forceFullscreen();
}

function onPlayerStateChange(event) {
    // If the video ends, we could loop it, but we'll let them go for now
    if (event.data === YT.PlayerState.ENDED) {
        exitTrap();
    }
}

function forceFullscreen() {
    const docEl = document.documentElement;
    const requestFs = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullscreen || docEl.msRequestFullscreen;
    
    if (requestFs) {
        requestFs.call(docEl).catch(err => {
            console.error("Fullscreen request failed:", err);
        });
    }

    // No escape logic: Re-enter fullscreen if exited
    const enforceFs = () => {
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
            // Only try to re-enter if player is still playing
            if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
                requestFs.call(docEl).catch(() => {});
            }
        }
    };

    document.addEventListener('fullscreenchange', enforceFs);
    document.addEventListener('webkitfullscreenchange', enforceFs);
    document.addEventListener('mozfullscreenchange', enforceFs);
    document.addEventListener('MSFullscreenChange', enforceFs);
}

function exitTrap() {
    if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen().catch(() => {});
    }
    alert("Assessment Complete: Your detailed profile indicates a 99% match for 'Rickroll Resilience'.");
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
