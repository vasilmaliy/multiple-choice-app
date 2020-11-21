export default class TestQuestions {

    constructor( testQuestionContainerSelector, questions , nextQuestionsBtn = '') {
        this.testQuestionContainer = document.querySelector(testQuestionContainerSelector);
        this.questions = questions;
        this.nextQuestionsBtn = nextQuestionsBtn;
        this.questionsIndex = 0;
    }

    render() {
        
        const currentQuestion = this.questions[this.questionsIndex];
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