import '@/styles/styles.css';
import QWESTIONS from '@/server/questions';
import TestQuestions from '@/models/TestQuestions';

window.addEventListener('DOMContentLoaded', () => {
    
    const testQuestions = new TestQuestions({
          testQuestionContainerSelector: '.questions-test-container', 
          questions: QWESTIONS,
          nextBtn: '.next-btn',
    });

    testQuestions.init();
});