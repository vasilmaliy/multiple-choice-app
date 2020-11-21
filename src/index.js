import './styles/styles.css';
// import Post from '@models/Questions';
import QWESTIONS from './server/questions';
import TestQuestions from './models/TestQuestions';

window.addEventListener('DOMContentLoaded', () => {
    
    
    const testQuestions = new TestQuestions('.questions-test-container', QWESTIONS, '.next');

    testQuestions.render();
});