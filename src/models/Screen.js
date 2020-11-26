import {onListener} from '@/core/dom';
import Choices from '@/models/Choices';

export default class Screen {

    constructor({
            screenContainerSelector = null, 
            questions = null,
            nextBtn = null,
            choicesContainerSelector = null
        } = {}) {
        this.state = {
            index: 1,
            complete: false,
            answer: null,
            isLoading: true, 
            score: 0
        };
        this.screenContainer = document.querySelector(screenContainerSelector);
        this.questions = questions;
        this.nextBtn = document.querySelector(nextBtn);
        this.choices = new Choices({
            choicesContainerSelector: choicesContainerSelector,
            questions: this.questions,
            screen: this,
        });
    }

    setAnswerToQuestion(answer) {
        this.state.answer = answer
    }

    getQuestionIndex() {
        return this.state.index;
    }

    getCurrentQuestion() {
        return this.questions[this.getQuestionIndex()-1];
    }

    isCurrentAnswerSelected( answer ) {
        return answer === this.state.answer;
    }

    markAnswer( event ) {
        const label = event.target.closest('label');
        
        if ( !label ) return;
         
        for ( let answer of label.parentNode.children ) {
            answer.classList.remove('answer-lable--marked');
        }

        // remove answer if it already selected
        if ( this.isCurrentAnswerSelected(label.dataset.answer) ) {
            this.state.answer = null
            
        } 

        label.classList.add('answer-lable--marked');
        this.state.answer = label.dataset.answer;
    }

    checkAnswer() {
        
        if ( this.getCurrentQuestion().correctAnswer === this.state.answer ) {
            this.state.score += 1;
        }
    }

    goNextQuestion() {
        this.checkAnswer();

        this.state.index += 1;

        if ( this.isNextQuestion() ) {
             this.state.answer = null;
        } else {
            this.state.complete = true;
            this.hideNextBtn();
        }
        this.render();
    }

    isNextQuestion() {
        return this.questions.length > this.state.index;
    }

    hideNextBtn() {
        this.nextBtn.style.display = 'none';
    }

    init() {
        onListener(this.nextBtn, 'click', this.goNextQuestion.bind(this));
        onListener(this.screenContainer, 'click', this.markAnswer.bind(this));
        
        this.render();
        this.choices.render();
    }

    render() {
        this.choices.render();

        const answers = [];

        for ( let letter in this.getCurrentQuestion().answers ) {
            
            answers.push(
                `<label for="${letter}" class="answer-lable" data-answer="${letter}">
                    <span class="answer-leter">${letter}</span>
                    <h4 class="answer">${this.getCurrentQuestion().answers[letter]}</h4>
                </label>`
            );
        }

        const html = `
            <h4 class="header__question" id="question">${this.getCurrentQuestion().question}</h4>
            <div class="header__answers">
                ${answers.join('')}
            </div>
        `;

        this.screenContainer.innerHTML = html;
    }
}