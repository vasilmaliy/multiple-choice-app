import '@/styles/styles.css';
import QWESTIONS from '@/server/questions';
import Screen from '@/models/Screen';

window.addEventListener('DOMContentLoaded', () => {
    
    const screen = new Screen({
        screenContainerSelector: '.questions-test-container', 
        questions: QWESTIONS,
        choicesContainerSelector: '.footer__left-container',
        nextBtn: '.next-btn',
    });
    screen.init();
});