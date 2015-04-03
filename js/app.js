
$(document).ready(function(){

  var guesses = 0, numToGuess;

  // start a new game on completion of page load
  newGame();

  // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick
  document.querySelector('.new').onclick = newGame;
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

    // function newGame to start a new game
    function newGame() {
      guesses = 0;
      document.querySelector('#count').innerHTML = guesses;
      numToGuess = randomNumGen();
      console.log(numToGuess);
    }

    // function randomNumGen will generate a random integer between 1 and max
    function randomNumGen(max) {
      if (max === undefined) {max = 100;}
      var randomNum = Math.floor(Math.random() * max + 1);
      return randomNum;
    }

});


