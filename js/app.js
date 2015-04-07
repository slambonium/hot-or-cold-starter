
//$(document).ready(function(){

/* http://stackoverflow.com/questions/2304941/what-is-the-non-jquery-equivalent-of-document-ready */

/* for IE<=8, can use below instead of jQuery $(document).ready(function() {...code}); :

document.attachEvent("onreadystatechange", function(){
  if (document.readyState === "complete"){
    document.detachEvent( "onreadystatechange", arguments.callee );
    // code ...
  }
});

*/

/* for IE>8, can use this instead of jQuery $(document).ready(function() {...code}); : */
document.addEventListener("DOMContentLoaded", function() {

  /* set global environment variables on page load */
  var numGuesses = 0, guesses = [], numToGuess, maxNum = 100, clearFeedback = false, toggleTimer;

  // start a new game on completion of page load
  newGame();

	/*--- Display information modal box ---*/
  	// $(".what").click(function(){
   //  	$(".overlay").fadeIn(1000);

  	// });

  	/*--- Hide information modal box ---*/
  	// $("a.close").click(function(){
  	// 	$(".overlay").fadeOut(1000);
  	// });

    document.querySelector('.what').onclick = showInstructions;

    document.querySelector('.close').onclick = hideInstructions;

    function showInstructions() {
      document.querySelector('#modal').classList.add('fadeMeIn');
      // console.log(document.querySelector('#modal').classList);
    }

    function hideInstructions() {
      document.querySelector('#modal').classList.remove('fadeMeIn');
    }

    function toggleClass(selector, classToToggle) {
      /* https://developer.mozilla.org/en-US/docs/Web/API/Element/classList */
      // if class 'drawAttention' is set remove it, otherwise add it
      // document.querySelector('nav ul li:last-child').classList.toggle('drawAttention');
      selector.classList.toggle(classToToggle);
      // console.log(selector.classList);
    } // end function toggleClass()

    function newGame() {
      /* reset environment variables and elements */
      // alert('page loaded, or, + new Game clicked');
      numGuesses = 0;
      guesses = [];
      numToGuess = randomNumGen(maxNum);                 
      document.querySelector('#feedback').innerHTML = "Make your Guess!";
      // reset user guess input text field
      document.querySelector('#userGuess').value = '';
      document.querySelector('#count').innerHTML = numGuesses;
      document.querySelector('#maxNum').innerHTML = maxNum.toString();
      /* NOTE:
         document.querySelector('#guessButton').setAttribute('disabled', true);
         did not work just below but does in checkGuess()!`
      */
      document.querySelector('#guessButton').disabled = false;
      document.querySelector('#userGuess').disabled = false;

      // Removing all children from #guessList ul element
      /* https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild */
      var guessesUl = document.querySelector('#guessList');
      while (guessesUl.firstChild) {
        guessesUl.removeChild(guessesUl.firstChild);
      }
      window.clearInterval(toggleTimer);
      document.querySelector('nav ul li:last-child').classList.remove('drawAttention');
      document.querySelector('#userGuess').focus();
    } // end function newGame()

    function randomNumGen(max) {
    /* function randomNumGen will generate a random integer 
       between 1 and max */    
      var randomNum = Math.floor(Math.random() * max + 1);
      return randomNum;
    } // end function randomNumGen()

    function checkGuess() {
      var thisGuess = document.querySelector('#userGuess').value;
      var howHot;
      // alert('thisGuess =' + thisGuess);
      // validate guess as a number
      if (!isInt(thisGuess) || parseInt(thisGuess) > maxNum) {
        // alert(thisGuess + ' is INVALID!\n\nPlease guess an integer between 1 and ' + maxNum);
        // reset guess text field
        // document.querySelector('#userGuess').value = '';        
        document.querySelector('#feedback').innerHTML = thisGuess + ' is INVALID!';
        document.querySelector('#userGuess').focus();
        clearFeedback = true;
        return;
      }

      // after validating guess as a number
      numGuesses += 1;
      document.querySelector('#count').innerHTML = numGuesses;
      // reset user guess input text field
      document.querySelector('#userGuess').value = '';
      document.querySelector('#userGuess').focus();
      /* if a user is 50 or further away from the secret number, they are told they are “Ice cold”, if they are between 30 and 50 they are “cold”, if they are between 20 and 30 they are warm, between 10 and 20 hot, and between 1 and 10 “very hot” */

      // using abs value below will not divulge directional +/- feedback
      var proximity = Math.abs(numToGuess - parseInt(thisGuess));
      if (proximity >= 50) {
        howHot = ' is Ice Cold';
      } else if (proximity < 50 && proximity >= 30) {
          howHot = ' is Cold';
      } else if (proximity < 30 && proximity >= 20) {
          howHot = ' is Warm';
      } else if (proximity < 20 && proximity >= 10) {
          howHot = ' is Hot';
      } else if (proximity < 10 && proximity >= 1) {
          howHot = ' is Very Hot';
      } else {
          howHot = ' is CORRECT!';
          /* https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute */
          document.querySelector('#guessButton').setAttribute('disabled', true);
          document.querySelector('#userGuess').setAttribute('disabled', true);
          // OR: document.querySelector('#guessButton').disabled = true;
          document.querySelector('#userGuess').value = 'Click +New Game';

          /* http://www.w3schools.com/js/js_timing.asp */
          // var myVar=setInterval(function () {myTimer()}, 1000);
          toggleTimer = setInterval(function() {
            toggleClass(document.querySelector('nav ul li:last-child'), 'drawAttention')}, 1000
          );
      } // end if (proximity ...)
      document.querySelector('#feedback').innerHTML = thisGuess + howHot;

      /* append guesses list */
      var newLi = document.createElement('li');
      newLi.innerHTML = thisGuess + howHot;
      // console.log(newLi);

      /* to append: */
      // document.querySelector('#guessList').appendChild(newLi);

      /* to prepend:
         https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
         syntax: parentElement.insertBefore(newElement, referenceElement);
      */
      document.querySelector('#guessList').insertBefore(newLi, document.querySelector('#guessList').firstChild);

    } // end function checkGuess()

    function isInt(x) {
    /* isNum() accepts a string and returns true if it contains
       only characters 0-9, false otherwise */      
      if (x === undefined || x === '') {
        return false;
      }
      for (var i=0; i<x.length; i++) {
        if (x.charCodeAt(i) < 48 || x.charCodeAt(i) > 57) {
          return false;
        }
      }
      return true;
    } // end function isNum()

    function changeDefaultAction(event, insteadFn) {
    /* function changeDefaultAction(event, insteadFn) will 
       prevent the default behavior as a result of event e
       and will instead call function insteadFn */      
      event.preventDefault();
      insteadFn();
    }

    function checkClearFeedback() {
      // alert('keyup detected on userGuess');
      if (clearFeedback && document.querySelector('#userGuess').value === '') {
        document.querySelector('#feedback').innerHTML = 'Make your Guess!';
        clearFeedback = false;
      }
    } // end function checkClearFeedback()

    // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick
    document.querySelector('.new').onclick = newGame;

    /* prevent default submission behavior and execute JS function instead, using jQuery */
    // either selector and eventlistener below works
    // $('#guessButton').on('click', function(e) {
    // $('form').on('submit', function(e) {
    //   e.preventDefault();
    //   checkGuess();
    // });

    /* prevent default submission behavior and execute JS function instead, using JS */
    /* https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault */
    /* http://www.w3schools.com/jsref/event_preventdefault.asp */
    // document.querySelector('#guessButton').onclick = checkGuess;
    document.querySelector('form').addEventListener('submit', function(e) {changeDefaultAction(e, checkGuess)});    

    /* either of the two below event listeners work */
    // document.querySelector('#userGuess').addEventListener('keyup', checkClearFeedback);
    document.querySelector('#userGuess').onkeyup = checkClearFeedback;    

}); // end $(document).ready() OR equivalent JS -- see top


