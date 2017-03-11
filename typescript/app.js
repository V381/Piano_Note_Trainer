var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GetNotesFromKeys = (function () {
    function GetNotesFromKeys() {
        this.pianoKeys = document.querySelector('.piano').children;
        this.pianoKeysInnerEl = [];
    }
    GetNotesFromKeys.prototype.getNotesFromKeys = function () {
        for (var i = 0; i < this.pianoKeys.length; i++) {
            var pianoKeysInnerEl = this.pianoKeys[i].children;
            for (var j = 0; j < pianoKeysInnerEl.length; j++) {
                for (var z = 0; z < pianoKeysInnerEl[j].children.length; z++) {
                    this.pianoKeysInnerEl.push(pianoKeysInnerEl[j].children[z]);
                }
            }
        }
        return this.pianoKeysInnerEl;
    };
    return GetNotesFromKeys;
}());
var ActiveButtons = (function () {
    function ActiveButtons() {
        this.buttons = document.querySelector('.notes-to-guess__notes').children;
    }
    ActiveButtons.prototype.activeBtns = function () {
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].removeAttribute('disabled');
        }
    };
    return ActiveButtons;
}());
var DeactivateButtons = (function () {
    function DeactivateButtons() {
        this.buttons = document.querySelector('.notes-to-guess__notes').children;
    }
    DeactivateButtons.prototype.deactivateBtns = function () {
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].setAttribute('disabled', true);
        }
    };
    return DeactivateButtons;
}());
var Score = (function () {
    function Score() {
        this.getCorrectHTML = document.querySelector('.score__correct');
        this.getIncorrectHTML = document.querySelector('.score__incorrect');
        this.positive = 0;
        this.negative = 0;
    }
    Score.prototype.setPositive = function () {
        this.positive++;
        this.getCorrectHTML.innerHTML = this.positive;
    };
    Score.prototype.setNegative = function () {
        this.negative++;
        this.getIncorrectHTML.innerHTML = this.negative;
    };
    return Score;
}());
var GetRandomNote = (function (_super) {
    __extends(GetRandomNote, _super);
    function GetRandomNote() {
        _super.apply(this, arguments);
    }
    GetRandomNote.prototype.getRandomNote = function () {
        var arr = _super.prototype.getNotesFromKeys.call(this);
        return arr[Math.floor(Math.random() * arr.length)].style.opacity = 1;
    };
    return GetRandomNote;
}(GetNotesFromKeys));
var ConnectButtonNotesWithKeyboardNotes = (function (_super) {
    __extends(ConnectButtonNotesWithKeyboardNotes, _super);
    function ConnectButtonNotesWithKeyboardNotes() {
        _super.apply(this, arguments);
        this.buttonsNotes = document.querySelector('.notes-to-guess__notes').children;
        this.randomNote = new GetRandomNote();
        this.activateButtons = new ActiveButtons();
        this.deactivateButtons = new DeactivateButtons();
        this.score = new Score();
    }
    ConnectButtonNotesWithKeyboardNotes.prototype.removeNoteHTML = function (note) {
        note.innerHTML = '';
    };
    ConnectButtonNotesWithKeyboardNotes.prototype.setRightNoteAndColorIfNoteIsWrong = function (note) {
        var _this = this;
        note.style.backgroundColor = 'red';
        note.style.color = 'white';
        note.innerHTML = note.getAttribute('data-attr');
        setTimeout(function () {
            _this.removeNoteHTML(note);
            note.removeAttribute('style');
            _this.randomNote.getRandomNote();
            _this.activateButtons.activeBtns();
        }, 3000);
    };
    ConnectButtonNotesWithKeyboardNotes.prototype.addClickToButtons = function () {
        var _this = this;
        for (var i = 0; i < this.buttonsNotes.length; i++) {
            (function (i) {
                _this.buttonsNotes[i].addEventListener('click', function () {
                    var getNotes = _super.prototype.getNotesFromKeys.call(_this);
                    for (var j = 0; j < getNotes.length; j++) {
                        if (getNotes[j].style.opacity === '1' && getNotes[j].getAttribute('data-attr') === _this.buttonsNotes[i].innerHTML) {
                            getNotes[j].innerHTML = getNotes[j].getAttribute('data-attr');
                            _this.runGetRandomNote(getNotes[j], true);
                            _this.deactivateButtons.deactivateBtns();
                            _this.score.setPositive();
                            break;
                        }
                        if (getNotes[j].style.opacity === '1' && getNotes[j].getAttribute('data-attr') != _this.buttonsNotes[i].innerHTML) {
                            _this.deactivateButtons.deactivateBtns();
                            _this.setRightNoteAndColorIfNoteIsWrong(getNotes[j]);
                            _this.score.setNegative();
                            break;
                        }
                    }
                });
            })(i);
        }
    };
    ConnectButtonNotesWithKeyboardNotes.prototype.runGetRandomNote = function (note, noteFound) {
        var _this = this;
        if (noteFound) {
            setTimeout(function () {
                note.style.opacity = 0;
                _this.removeNoteHTML(note);
                _this.randomNote.getRandomNote();
                _this.activateButtons.activeBtns();
            }, 2000);
        }
    };
    return ConnectButtonNotesWithKeyboardNotes;
}(GetNotesFromKeys));
var getNotesFromKeys = new GetNotesFromKeys();
getNotesFromKeys.getNotesFromKeys();
var connectButtonNotesWithKeyboardNotes = new ConnectButtonNotesWithKeyboardNotes();
connectButtonNotesWithKeyboardNotes.addClickToButtons();
var getRandomNote = new GetRandomNote();
getRandomNote.getRandomNote();
