interface IRemoveNoteInnerHTML{
    removeNoteHTML(note);
}

class GetNotesFromKeys{
    pianoKeys = document.querySelector('.piano').children

    pianoKeysInnerEl = [];

    getNotesFromKeys(){
        for(let i = 0; i < this.pianoKeys.length; i++){
            let pianoKeysInnerEl = this.pianoKeys[i].children;
            for(let j = 0; j < pianoKeysInnerEl.length; j++){
                for(let z = 0; z < pianoKeysInnerEl[j].children.length; z++){
                    this.pianoKeysInnerEl.push(pianoKeysInnerEl[j].children[z]);
                }
            }
        }
        return this.pianoKeysInnerEl;
    }


}


class ActiveButtons{
    buttons = document.querySelector('.notes-to-guess__notes').children;

    activeBtns(){
        for(let i = 0; i < this.buttons.length; i++){
            this.buttons[i].removeAttribute('disabled');
        }
    }

}

class DeactivateButtons{
    buttons = document.querySelector('.notes-to-guess__notes').children;

    deactivateBtns(){
        for(let i = 0; i < this.buttons.length; i++){
            this.buttons[i].setAttribute('disabled', true);
        }
    }

}

class Score{
    
    getCorrectHTML = document.querySelector('.score__correct');
    getIncorrectHTML = document.querySelector('.score__incorrect');

    positive : any = 0;
    negative : any = 0;

    setPositive(){
        this.positive++;
        this.getCorrectHTML.innerHTML = this.positive;
    }

    setNegative(){
        this.negative++;
        this.getIncorrectHTML.innerHTML = this.negative;
    }

}

class GetRandomNote extends GetNotesFromKeys{
    getRandomNote(){
        let arr = super.getNotesFromKeys();
        return arr[Math.floor(Math.random() * arr.length)].style.opacity = 1;
    }
}

class ConnectButtonNotesWithKeyboardNotes extends GetNotesFromKeys implements IRemoveNoteInnerHTML{
    buttonsNotes = document.querySelector('.notes-to-guess__notes').children;
    randomNote = new GetRandomNote();
    activateButtons = new ActiveButtons();
    deactivateButtons = new DeactivateButtons();
    score = new Score();

     removeNoteHTML(note){
        note.innerHTML = '';
    }

    setRightNoteAndColorIfNoteIsWrong(note){
        note.style.backgroundColor = 'red';
        note.style.color = 'white';
        note.innerHTML = note.getAttribute('data-attr');
        setTimeout(() => {
            this.removeNoteHTML(note);
            note.removeAttribute('style');
            this.randomNote.getRandomNote();
            this.activateButtons.activeBtns();
        }, 3000);
    }

    addClickToButtons(){
        for(let i = 0; i < this.buttonsNotes.length; i++){
            ((i) => {
                this.buttonsNotes[i].addEventListener('click', () => {
                     let getNotes = super.getNotesFromKeys();
                     for(let j = 0; j < getNotes.length; j++){
                         if(getNotes[j].style.opacity === '1' && getNotes[j].getAttribute('data-attr') === this.buttonsNotes[i].innerHTML){
                               getNotes[j].innerHTML = getNotes[j].getAttribute('data-attr');
                               this.runGetRandomNote(getNotes[j], true);
                               this.deactivateButtons.deactivateBtns();
                               this.score.setPositive();
                               break;
                           }

                         if(getNotes[j].style.opacity === '1' && getNotes[j].getAttribute('data-attr') != this.buttonsNotes[i].innerHTML){
                               this.deactivateButtons.deactivateBtns();
                               this.setRightNoteAndColorIfNoteIsWrong(getNotes[j]);
                               this.score.setNegative();
                               break;
                           }  
                     }
                });
            })(i)
        }
    }

    runGetRandomNote(note, noteFound){
        if(noteFound) {
            setTimeout(() => {
                note.style.opacity = 0;
                this.removeNoteHTML(note);
                this.randomNote.getRandomNote();
                this.activateButtons.activeBtns();
            }, 2000);
        }
    }



}


let getNotesFromKeys = new GetNotesFromKeys();

getNotesFromKeys.getNotesFromKeys();

let connectButtonNotesWithKeyboardNotes = new ConnectButtonNotesWithKeyboardNotes();

connectButtonNotesWithKeyboardNotes.addClickToButtons(); 

let getRandomNote = new GetRandomNote();
getRandomNote.getRandomNote();