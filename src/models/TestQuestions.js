import {onListener} from '@/core/dom';
export default class TestQuestions {

    constructor({
            testQuestionContainerSelector = null, 
            questions = null,
            nextBtn = null,
        } = {}) {
        this.testQuestionContainer = document.querySelector(testQuestionContainerSelector);
        this.questions = questions;
        this.questionsIndex = 1;
        this.nextBtn = document.querySelector(nextBtn);
    }

    isNextQuestion() {
        return this.questions.length > this.questionsIndex;
    }

    hideNextBtn() {
        this.nextBtn.style.display = 'none';
    }
    
    onNextQuestion() {
        this.questionsIndex += 1;
  
        if (this.isNextQuestion()) {
            this.render();
        } else {
            this.hideNextBtn();
        }
    }

    init() {
        onListener(this.nextBtn, 'click', this.onNextQuestion.bind(this));
        this.render();
    }

    render() {
        const currentQuestion = this.questions[this.questionsIndex-1];
        const answers = [];
        
        for (let letter in currentQuestion.answers) {
            
            answers.push(
                `<li class="answer-lable">
                    <span class="answer-leter">${letter}</span>
                    <h4 class="answer">${currentQuestion.answers[letter]}</h4>
                </li>`
            );
        }

        const html = `
            <h4 class="header__question" id="question">${currentQuestion.question}</h4>
            <ul class="header__answers">
                ${answers.join('')}
            </ul>
        `;
        this.testQuestionContainer.innerHTML = html;
    }
}