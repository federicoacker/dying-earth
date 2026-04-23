/**
 * Dying Earth - La Scelta Finale
 * Main Application Script
 */

(function() {
    'use strict';

    // ==================
    // State Management
    // ==================
    const state = {
        currentStep: 1,
        selectedCandidates: new Set(),
        timerInterval: null,
        timeRemaining: 5 * 60, // 5 minutes in seconds
        isSelectionLocked: false
    };

    // ==================
    // DOM Elements
    // ==================
    const elements = {
        // Steps
        step1: document.getElementById('step-1'),
        step2: document.getElementById('step-2'),
        step3: document.getElementById('step-3'),
        
        // Audio
        alarmAudio: document.getElementById('alarm-audio'),
        takeoffAudio: document.getElementById('takeoff-audio'),
        alarmOverlay: document.getElementById('alarm-overlay'),
        
        // Step 1
        startBtn: document.getElementById('start-btn'),
        
        // Step 2
        candidatesList: document.getElementById('candidates-list'),
        countdown: document.getElementById('countdown'),
        selectionCount: document.getElementById('selection-count'),
        confirmBtn: document.getElementById('confirm-btn'),
        confirmModal: document.getElementById('confirm-modal'),
        modalCancel: document.getElementById('modal-cancel'),
        modalConfirm: document.getElementById('modal-confirm'),
        
        // Step 3
        resultsList: document.getElementById('results-list'),
        restartBtn: document.getElementById('restart-btn')
    };

    // ==================
    // Utility Functions
    // ==================
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function showStep(stepNumber) {
        // Hide all steps
        elements.step1.classList.add('d-none');
        elements.step2.classList.add('d-none');
        elements.step3.classList.add('d-none');
        
        // Show target step
        switch(stepNumber) {
            case 1:
                elements.step1.classList.remove('d-none');
                startAlarmEffect();
                break;
            case 2:
                elements.step2.classList.remove('d-none');
                stopAlarmEffect();
                break;
            case 3:
                elements.step3.classList.remove('d-none');
                stopAlarmEffect();
                break;
        }
        
        state.currentStep = stepNumber;
        window.scrollTo(0, 0);
    }

    // ==================
    // Alarm Effects
    // ==================
    function startAlarmEffect() {
        elements.alarmOverlay.classList.add('active');
        elements.alarmAudio.volume = 0.3;
        elements.alarmAudio.play().catch(function(e) {
            // Autoplay might be blocked, that's okay
            console.log('Audio autoplay blocked by browser');
        });
    }

    function stopAlarmEffect() {
        elements.alarmOverlay.classList.remove('active');
        elements.alarmAudio.pause();
        elements.alarmAudio.currentTime = 0;
    }

    // ==================
    // Candidates Rendering
    // ==================
    function renderCandidates() {
        elements.candidatesList.innerHTML = '';
        
        candidates.forEach(function(candidate) {
            const card = document.createElement('div');
            card.className = 'candidate-card';
            card.dataset.id = candidate.id;
            
            card.innerHTML = `
                <div class="candidate-checkbox">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <span class="candidate-label">${candidate.label}</span>
                <span class="candidate-number">#${candidate.id}</span>
            `;
            
            card.addEventListener('click', function() {
                toggleCandidate(candidate.id, card);
            });
            
            elements.candidatesList.appendChild(card);
        });
    }

    function toggleCandidate(id, cardElement) {
        if (state.isSelectionLocked) return;
        
        if (state.selectedCandidates.has(id)) {
            // Deselect
            state.selectedCandidates.delete(id);
            cardElement.classList.remove('selected');
        } else {
            // Check if max reached
            if (state.selectedCandidates.size >= 7) {
                return;
            }
            // Select
            state.selectedCandidates.add(id);
            cardElement.classList.add('selected');
        }
        
        updateSelectionUI();
    }

    function updateSelectionUI() {
        const count = state.selectedCandidates.size;
        elements.selectionCount.textContent = count;
        
        // Update counter styling
        const counter = elements.selectionCount.parentElement;
        if (count >= 7) {
            counter.classList.add('max');
        } else {
            counter.classList.remove('max');
        }
        
        // Enable/disable confirm button
        if (count > 0 && count <= 7) {
            elements.confirmBtn.disabled = false;
        } else {
            elements.confirmBtn.disabled = true;
        }
        
        // Disable unselected cards if max reached
        const allCards = document.querySelectorAll('.candidate-card');
        allCards.forEach(function(card) {
            if (count >= 7 && !card.classList.contains('selected')) {
                card.classList.add('disabled');
            } else {
                card.classList.remove('disabled');
            }
        });
    }

    // ==================
    // Timer
    // ==================
    function startTimer() {
        state.timeRemaining = 5 * 60;
        updateTimerDisplay();
        
        state.timerInterval = setInterval(function() {
            state.timeRemaining--;
            updateTimerDisplay();
            
            if (state.timeRemaining <= 0) {
                timeExpired();
            }
        }, 1000);
    }

    function stopTimer() {
        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }
    }

    function updateTimerDisplay() {
        elements.countdown.textContent = formatTime(state.timeRemaining);
        
        // Update timer styling based on time remaining
        elements.countdown.classList.remove('warning', 'critical');
        
        if (state.timeRemaining <= 30) {
            elements.countdown.classList.add('critical');
        } else if (state.timeRemaining <= 60) {
            elements.countdown.classList.add('warning');
        }
    }

    function timeExpired() {
        stopTimer();
        lockSelection();
        goToResults();
    }

    // ==================
    // Selection Lock & Results
    // ==================
    function lockSelection() {
        state.isSelectionLocked = true;
        elements.candidatesList.classList.add('step-disabled');
        elements.confirmBtn.disabled = true;
    }

    function goToResults() {
        stopTimer();
        renderResults();
        showStep(3);
    }

    function renderResults() {
        elements.resultsList.innerHTML = '';
        
        candidates.forEach(function(candidate) {
            const isSelected = state.selectedCandidates.has(candidate.id);
            
            const card = document.createElement('div');
            card.className = 'result-card' + (isSelected ? ' selected' : '');
            
            card.innerHTML = `
                <div class="result-card-header">
                    <div class="result-status"></div>
                    <h4 class="result-label">${candidate.label}</h4>
                </div>
                <p class="result-reveal">${candidate.reveal}</p>
            `;
            
            elements.resultsList.appendChild(card);
        });
    }

    // ==================
    // Modal Handling
    // ==================
    function showConfirmModal() {
        elements.confirmModal.classList.remove('d-none');
    }

    function hideConfirmModal() {
        elements.confirmModal.classList.add('d-none');
    }

    function confirmSelection() {
        hideConfirmModal();
        lockSelection();
        
        // Play takeoff audio
        elements.takeoffAudio.volume = 0.5;
        elements.takeoffAudio.play().catch(function(e) {
            console.log('Takeoff audio blocked');
        });
        
        // Small delay before showing results
        setTimeout(function() {
            goToResults();
        }, 1500);
    }

    // ==================
    // Reset
    // ==================
    function resetTest() {
        // Stop any audio
        elements.takeoffAudio.pause();
        elements.takeoffAudio.currentTime = 0;
        
        // Reset state
        state.selectedCandidates.clear();
        state.isSelectionLocked = false;
        state.timeRemaining = 5 * 60;
        stopTimer();
        
        // Reset UI
        elements.candidatesList.classList.remove('step-disabled');
        elements.selectionCount.textContent = '0';
        elements.selectionCount.parentElement.classList.remove('max');
        elements.confirmBtn.disabled = true;
        
        // Re-render candidates
        renderCandidates();
        
        // Go to step 1
        showStep(1);
    }

    // ==================
    // Event Listeners
    // ==================
    function initEventListeners() {
        // Step 1: Start button
        elements.startBtn.addEventListener('click', function() {
            showStep(2);
            renderCandidates();
            startTimer();
        });
        
        // Step 2: Confirm button
        elements.confirmBtn.addEventListener('click', function() {
            if (!elements.confirmBtn.disabled) {
                showConfirmModal();
            }
        });
        
        // Modal buttons
        elements.modalCancel.addEventListener('click', hideConfirmModal);
        elements.modalConfirm.addEventListener('click', confirmSelection);
        
        // Close modal on overlay click
        elements.confirmModal.addEventListener('click', function(e) {
            if (e.target === elements.confirmModal) {
                hideConfirmModal();
            }
        });
        
        // Step 3: Restart button
        elements.restartBtn.addEventListener('click', resetTest);
        
        // Keyboard support for modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !elements.confirmModal.classList.contains('d-none')) {
                hideConfirmModal();
            }
        });
    }

    // ==================
    // Initialization
    // ==================
    function init() {
        initEventListeners();
        showStep(1);
    }

    // Start the application when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
