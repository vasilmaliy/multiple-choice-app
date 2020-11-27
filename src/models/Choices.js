import {onListener} from '@/core/dom';
export default class Choices {

    constructor({
            choicesContainerSelector = null,
            questions = null,
            screen = null,
        } = {}) {
        this.choicesContainer = document.querySelector(choicesContainerSelector);
        this.questions = questions;
        this.getCurrentQuestion = screen.getCurrentQuestion.bind(screen);
        this.setAnswer = screen.setAnswer.bind(screen);
        this.getAnswer = screen.getAnswer.bind(screen);
        onListener(this.choicesContainer, 'click', this.handlerMakeChoice.bind(this));
    }

    isCurrentAnswerSelected( answer ) {
        return answer === this.getAnswer();
    }

    handlerMakeChoice(event) {
        const selectedCheckbox = event.target.nodeName === 'INPUT' ? event.target : null;

        if ( !selectedCheckbox ) return;

        const allCheckboxs = this.choicesContainer.querySelectorAll('.checkbox');
        
        for ( let checkbox of allCheckboxs ) {
            checkbox.checked = false;
        }
        // if checkbox already selected - cancel otherwise select
        if ( this.isCurrentAnswerSelected( selectedCheckbox.value ) ) {
            this.setAnswer( null );
            selectedCheckbox.checked = false;
        } else {
            this.setAnswer( selectedCheckbox.value);
            selectedCheckbox.checked = true;
        }
    }

    render() {
        let choiseTableHeaders = [];
        let choiseTableCells = [];

        for ( let letter in this.getCurrentQuestion().answers ) {
            
            choiseTableHeaders.push(
                `<th class="choices-table__th"><span class="choice" >${letter}</span></th>`
            );
            choiseTableCells.push(
                `<td class="checkbox-holder">
                       <input class="checkbox" type="checkbox" id="${letter}" value="${letter}"/>
                       <label class="checkbox-lable" for="${letter}" aria-describedby="label"></label> 
                </td>`
            );
        }

        const html = `
            <h4 class="select-answers-title">Позначити відповідь:</h4>
            <table class="choices-table">
                <tbody>
                    <tr class="choices-table__row">
                        ${choiseTableHeaders.join('')}
                    </tr>
                    <tr class="choices-table__row">
                        ${choiseTableCells.join('')}
                    </tr>
                </tbody>    
            </table>
        `;

        this.choicesContainer.innerHTML = html;
    }
}