$(function () {

var sentence, time;
var sentenceIndex = 0;
var letterIndex = 0;
var errors = 0;

var sentences = ['ten ate neite ate nee enet ite ate inet ent eate','Too ato too n0t enot one totA not anot t00 aNot','oat itain oat tain nate eate tea anne inant nean','itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];

$('#keyboard-upper-container').toggle ();
$(document).keydown (function (e) {
    if(e.shiftKey) {
        $('#keyboard-upper-container').toggle ();

    }


})

$(document).keyup (function(e) {
    if (e.shiftKey) {
        $('#keyboard-upper-container'.toggle();

    }

})
$(document).keydown (function(e) {
    if (e.shiftKey) {
        $('#keyboard-lower-container').toggle();
    }
})
$(document).keyup (function(e) {
    if (e.shiftKey) {
        $('#keyboard-lower-container').toggle();
    }
})

function setWordText(e) {
    if (sentenceIndex < sentences.length) {
        sentence = sentences[sentenceIndex];
        letterIndex = 0;
        sentenceIndex++;
        $('#words').text(sentence);
        nextLetterDiv(sentence[letterIndex]);
        var numErrors = ($('#words-typed').find('span.glyphicon-remove').length);
        errors += numErrors;
        $('#words-typed').empty();
        $('#block').stop(true, true).animate({'left':'15px'});
    } else {
        wpm(e);
        showWPM(wpm());
        playAgain();
    }
}
setWordText();

function nextLetterDiv(letter) {
    $('#next-letter').text(letter);
}
function moveBlock() {
    $('#block').animate({'left':'+=17.5px'}, 'fast');
}
$(document).keypress(function(e){
    if(!time) {
        time = e.timeStamp;
    }
    var letter = e.keyCode;
    if (letter === sentence[letterIndex].charCodeAt()) {
        $('#words-typed').append($("<span class = 'glyphicon glyphicon-ok'></span>"));
    } else {
        $('#words-typed').append($("<span class = 'glyphicon glyphicon-remove'></span>"));
    }
    letterIndex++;
    if (letterIndex < sentence.length) {
        moveBlock();
        nextLetterDiv(sentence[letterIndex]);
    } else {
        setWordText(e);
    }
    var selector = '#' + letter;
    $(selector).css({'background-color': 'yellow', 'color': 'black'});     
})
$(document).keypress(function(e) {
    console.dir(e);
    
        console.log(e.keyCode);

function wpm(e) {
    time = e.timeStamp - time;
    var numWords = 54;
    var mins = (time/100)/60;
    var wordspermin = Math.floor(numWords / mins - (errors * 2));
    return wordspermin;
}
function showWPM(e) {
    $('#target').html('You typed ' + e + ' words per minute!');
}

function playAgain() {
    setTimeout(function() {
        if(confirm('Play again?')) {
            sentenceIndex = 0;
            time = undefined;
            $('#message').empty();
            setWordText();
        }
    }, 5000);
}
})
