export default class Choices {
    constructor(choicesContainerSelector) {

        this.choicesContainer = document.querySelector(choicesContainerSelector);
    }

    render() {
        let htmlChoices = '';

            htmlChoices += `
                <tbody>
                    <tr class="choices-table__row">
                        <th class="choices-table__th"><span class="choice" >a</span></th>
                        <th class="choices-table__th"><span class="choice" >b</span></th>
                        <th class="choices-table__th"><span class="choice" >c</span></th>
                        <th class="choices-table__th"><span class="choice" >d</span></th>             
                    </tr>
                    <tr class="choices-table__row">
                        <td class="checkbox-holder">
                            <input class="checkbox" type="checkbox" id="test1" />
                            <label class="checkbox-lable" for="test1" aria-describedby="label"></label> 
                        </td>
                        <!-- <td class="radio-holder">
                            <lable class="radio-lable">
                                <input type="radio" value="b" name="radio" id="b" class="radio">
                                <span class="radio-marked"></span>
                            </lable>
                        </td> -->
                        <td class="checkbox-holder">
                            <input class="checkbox" type="checkbox" id="test2" />
                            <label class="checkbox-lable" for="test2" aria-describedby="label"></label>
                        </td>
                        <td class="checkbox-holder">
                            <input class="checkbox" type="checkbox" id="test3" />
                            <label class="checkbox-lable" for="test3" aria-describedby="label"></label>
                        </td>
                        <td class="checkbox-holder">
                            <input class="checkbox" type="checkbox" id="test4" />
                            <label class="checkbox-lable" for="test4" aria-describedby="label"></label>
                        </td>
                    </tr>
                </tbody>
            `;
     

        const html = `
            <h4 class="select-answers-title">Позначити відповідь:</h4>
            <table class="choices-table">
                ${htmlChoices}
            </table>
        `;
        console.log(this.choicesContainer)

        this.choicesContainer.innerHTML = html;
    }
}