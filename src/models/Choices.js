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
        onListener(this.choicesContainer, 'click', this.handlerMakeChoice.bind(this));
    }

    handlerMakeChoice(event) {
        const selectedCheckbox = event.target.nodeName === 'INPUT' ? event.target : null;

        if ( !selectedCheckbox ) return;
        console.log('fack')

        const isChecked = selectedCheckbox.checked;
        const allCheckboxs = this.choicesContainer.querySelectorAll('.checkbox');
        
        for ( let checkbox of allCheckboxs ) {
            checkbox.checked = false;
        }
        // if checkbox and answer already selected - cancel otherwise select
        selectedCheckbox.checked = isChecked ? true : false;
        // document.querySelector(`[data-answer=${selectedCheckbox.value}]`).click();
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