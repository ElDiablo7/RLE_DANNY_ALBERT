/**
 * GRACE-X AI Sales Assistant
 * Powered by GRACE-X AI™ Digital Services
 */

const GraceAssistant = (() => {
    // 1. Configuration & Data
    const config = {
        name: "GRACE-X",
        tagline: "AI Sales Architect",
        avatar: `<svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" /></svg>`,
        initialMessage: "Hi! I'm GRACE-X, your personal AI sales assistant. How can I help you transform your Surrey home today?",
        quickActions: [
            { id: 'quote', text: 'Get Free Quote', icon: `<svg viewBox="0 0 24 24"><path d="M20,2H4C2.89,2 2,2.89 2,4V16C2,17.11 2.89,18 4,18H8V21L12,18H20C21.11,18 22,17.11 22,16V4C22,2.89 21.11,2 20,2M20,16H11.17L10,16.83V16H4V4H20V16Z" /></svg>` },
            { id: 'about', text: 'About RLE Lofts', icon: `<svg viewBox="0 0 24 24"><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V15H11M11,13H13V11H11" /></svg>` },
            { id: 'services', text: 'Conversion Types', icon: `<svg viewBox="0 0 24 24"><path d="M3,6H21V18H3V6M12,12H15V9H12V12M15,15V13H12V15H15M8,12H11V9H8V12M11,15V13H8V15H11M19,10V7H16V10H19M19,13H16V16H19V13M5,10V7H2V10H5M5,13H2V16H5V13Z" /></svg>` },
            { id: 'value', text: 'Property Value', icon: `<svg viewBox="0 0 24 24"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.41,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.59,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>` },
            { id: 'areas', text: 'Service Areas', icon: `<svg viewBox="0 0 24 24"><path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5Z" /></svg>` },
            { id: 'contact', text: 'Contact Direct', icon: `<svg viewBox="0 0 24 24"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" /></svg>` }
        ]
    };

    let state = {
        isOpen: false,
        step: 'idle', // idle, quote_name, quote_postcode, quote_type, quote_phone, complete
        userData: {},
        isSpeaking: false
    };

    // 2. Elements Identification
    let elements = {};

    // 3. Methods
    const init = () => {
        injectHTML();
        bindEvents();
        setTimeout(() => {
            showInitialMessage();
        }, 1000);
    };

    const injectHTML = () => {
        const assistantHTML = `
            <button class="grace-launcher" id="graceLauncher" aria-label="Open AI Assistant">
                ${config.avatar}
            </button>
            <div class="grace-container" id="graceContainer">
                <div class="grace-header">
                    <div class="grace-header-info">
                        <div class="grace-avatar">${config.avatar}</div>
                        <div class="grace-status">
                            <span class="grace-status-title">${config.name} AI</span>
                            <span class="grace-status-tag">Online & Ready</span>
                        </div>
                    </div>
                    <button class="grace-close" id="graceClose">&times;</button>
                </div>
                <div class="grace-body" id="graceBody"></div>
                <div class="grace-footer" id="graceFooter" style="display:none;">
                    <form class="grace-input-group" id="graceForm">
                        <input type="text" class="grace-input" id="graceInput" placeholder="Type here..." required autocomplete="off">
                        <button type="submit" class="grace-send">
                            <svg viewBox="0 0 24 24"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" /></svg>
                        </button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', assistantHTML);

        elements = {
            launcher: document.getElementById('graceLauncher'),
            container: document.getElementById('graceContainer'),
            close: document.getElementById('graceClose'),
            body: document.getElementById('graceBody'),
            footer: document.getElementById('graceFooter'),
            input: document.getElementById('graceInput'),
            form: document.getElementById('graceForm')
        };
    };

    const bindEvents = () => {
        elements.launcher.addEventListener('click', toggleChat);
        elements.close.addEventListener('click', toggleChat);
        elements.form.addEventListener('submit', handleFormSubmit);
        
        // Listen for quick actions
        elements.body.addEventListener('click', (e) => {
            const btn = e.target.closest('.grace-action-btn');
            if (btn) {
                handleAction(btn.dataset.id);
            }
        });
    };

    const toggleChat = () => {
        state.isOpen = !state.isOpen;
        elements.container.classList.toggle('active', state.isOpen);
        if (state.isOpen) elements.input.focus();
    };

    const addMessage = (text, type = 'ai') => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `grace-message grace-message-${type}`;
        elements.body.appendChild(msgDiv);
        
        if (type === 'ai') {
            typeWriter(text, msgDiv);
            speak(text);
        } else {
            msgDiv.textContent = text;
            scrollToBottom();
        }
    };

    const speak = (text) => {
        if (!window.speechSynthesis) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Settings requested by user
        utterance.rate = 1.10;
        utterance.pitch = 1.15;
        utterance.volume = 1.0;

        const setVoice = () => {
            const voices = window.speechSynthesis.getVoices();
            const ukFemaleVoice = voices.find(v => 
                (v.name.includes('Google') || v.name.includes('Microsoft')) && 
                v.name.includes('UK') && 
                (v.name.includes('Female') || v.name.includes('Hazel') || v.name.includes('Serena'))
            ) || voices.find(v => v.lang === 'en-GB' || v.lang === 'en_GB');

            if (ukFemaleVoice) {
                utterance.voice = ukFemaleVoice;
            }
            window.speechSynthesis.speak(utterance);
        };

        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = setVoice;
        } else {
            setVoice();
        }
    };

    const typeWriter = (text, element) => {
        let i = 0;
        const speed = 15;
        element.innerHTML = '';
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                scrollToBottom();
            } else {
                clearInterval(timer);
                if (state.step === 'idle') showQuickActions();
            }
        }, speed);
    };

    const scrollToBottom = () => {
        elements.body.scrollTop = elements.body.scrollHeight;
    };

    const showInitialMessage = () => {
        addMessage(config.initialMessage);
    };

    const showQuickActions = () => {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'grace-actions';
        config.quickActions.forEach(action => {
            actionsDiv.innerHTML += `
                <button class="grace-action-btn" data-id="${action.id}">
                    ${action.icon}
                    <span>${action.text}</span>
                </button>
            `;
        });
        elements.body.appendChild(actionsDiv);
        scrollToBottom();
    };

    const handleAction = (id) => {
        const action = config.quickActions.find(a => a.id === id);
        addMessage(action.text, 'user');

        switch(id) {
            case 'quote':
                startQuoteFlow();
                break;
            case 'about':
                addMessage("RLE Lofts & Extensions Surrey has over 20 years of experience. We are 5* rated, fully insured with £2M liability, and provide a 12-month warranty on all builds. Our builds typically take 3-5 weeks!");
                break;
            case 'services':
                addMessage("We specialize in Dormer (extra height), Velux (simple & bright), Mansard (maximum volume) conversions, and Bespoke House Extensions. Which one sounds like your goal?");
                break;
            case 'value':
                addMessage("A professional loft conversion can typically increase your Surrey property value by up to 20%. It's one of the highest-ROI home improvements available.");
                break;
            case 'areas':
                addMessage("We cover Sutton, Croydon, Kingston, Epsom, and the surrounding Surrey areas. We know local planning rules inside out!");
                break;
            case 'contact':
                addMessage("You can reach Zachary and the team directly at 07877 806276. Would you like to schedule a free survey instead?");
                break;
        }
    };

    // Lead Capture Flow
    const startQuoteFlow = () => {
        state.step = 'quote_name';
        addMessage("Excellent choice. Let's get that quote started! What is your full name?");
        elements.footer.style.display = 'block';
        elements.input.placeholder = "Full Name";
        elements.input.focus();
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const value = elements.input.value.trim();
        if (!value) return;

        addMessage(value, 'user');
        elements.input.value = '';

        switch(state.step) {
            case 'quote_name':
                state.userData.name = value;
                state.step = 'quote_postcode';
                addMessage(`Nice to meet you, ${value.split(' ')[0]}! What is the postcode of the property in Surrey?`);
                elements.input.placeholder = "Postcode (e.g. CR0 1AA)";
                break;
            case 'quote_postcode':
                state.userData.postcode = value;
                state.step = 'quote_type';
                addMessage("Got it. What type of conversion or extension are you considering? (Dormer, Velux, Mansard, Extension, or Not Sure)");
                elements.input.placeholder = "Service Type";
                break;
            case 'quote_type':
                state.userData.type = value;
                state.step = 'quote_phone';
                addMessage("Perfect. Last question: what's the best phone number for a member of our team to reach you on for a quick discussion?");
                elements.input.placeholder = "Phone Number";
                break;
            case 'quote_phone':
                state.userData.phone = value;
                state.step = 'complete';
                finishFlow();
                break;
        }
    };

    const finishFlow = () => {
        elements.footer.style.display = 'none';
        addMessage("All done! I've sent your details to Zachary Crockett. A member of the RLE Lofts team will call you back shortly. Thank you!");
        console.log("GRACE-X LEAD CAPTURED:", state.userData);
        // Reset to idle after a delay
        setTimeout(() => {
            state.step = 'idle';
            addMessage("Is there anything else I can help you with?");
        }, 3000);
    };

    return { init };
})();

// Initialize on load
document.addEventListener('DOMContentLoaded', GraceAssistant.init);
