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
        this.currentQuestion = this.questions[this.state.index-1];

        this.choices = new Choices(choicesContainerSelector);
    }

    markAnswer(event) {
        const li = event.target.closest('li');
        
        if ( !li ) return;
         
        for ( let elem of li.parentNode.children ) {
            elem.classList.remove('answer-lable--marked');
        }

        li.classList.add('answer-lable--marked');
        this.state.answer = li.dataset.answer;
    }

    checkAnswer() {
        
        if ( this.currentQuestion.correctAnswer === this.state.answer ) {
            this.state.score += 1;
        }
    }

    goNextQuestion() {
        this.checkAnswer();

        this.state.index += 1;
        this.render();

        if ( this.isNextQuestion() ) {
             this.state.answer = null;
        } else {
            this.state.complete = true;
            this.hideNextBtn();
        }
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
        this.currentQuestion = this.questions[this.state.index-1];
        const answers = [];
        
        for ( let letter in this.currentQuestion.answers ) {
            
            answers.push(
                `<li class="answer-lable" data-answer="${letter}">
                    <span class="answer-leter">${letter}</span>
                    <h4 class="answer">${this.currentQuestion.answers[letter]}</h4>
                </li>`
            );
        }

        const html = `
            <h4 class="header__question" id="question">${this.currentQuestion.question}</h4>
            <ul class="header__answers">
                ${answers.join('')}
            </ul>
        `;


        this.screenContainer.innerHTML = html;
    }
}