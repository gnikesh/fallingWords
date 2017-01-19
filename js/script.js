function getRandom(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

function restartGame(){
	window.location.reload();
}

this.STRING = "William Henry Bill Gates born October 28 1955 is an American business magnate entrepreneur investor author and philanthropist In 1975 Gates and Paul Allen cofounded Microoft which became the worlds largest PC software company During his career at Microsoft Gates held the positions of chairman CEO and chief software architect and was the largest individual shareholder until May 2014 Gates has authored and coauthored several books Since 1987 Gates has been included in the Forbes list of the worlds wealthiest people and was the wealthiest from 1995 to 2007 again in 2009 and has been since 2014 Between 2009 and 2014 his wealth doubled from to more than billion Between 2013 and 2014 his wealth increased by Gates is currently the richest person in the world with an estimated net worth of billion as of January 2017"
this.Words = this.STRING.split(' ');

function RandomLetters(x, y, text, wordNo){
	this.x = x;
	this.y = y;
	this.element;
	this.text = text;
	this.span;
	this.wordNo = wordNo;
	this.init = function() {
		this.element = document.createElement('div');
		this.element.setAttribute("id", "word" + this.wordNo);
		this.element.style.position = 'absolute';
		this.element.style.top = this.y + 'px';
		this.element.style.left = this.x + 'px';
		document.getElementById('border').appendChild(this.element);
		
		for (var i = 0; i < this.text.length; i++){
			this.span = document.createElement('span');
			this.span.setAttribute('id', 'span' + i);
			this.span.innerHTML = text.substring(i, i+1);
			document.getElementById('word' + this.wordNo).appendChild(this.span);
		}
		// this.element.innerHTML = this.text;
	}

	this.redraw = function(){
		this.element.style.top = this.y + 'px';
		this.element.style.left = this.x + 'px';
	}

	this.returnId = function(){
		return this.element.getAttribute('id');
	}
}


function wordsAnimation(){
	this.wordsArray = [];
	this.wordNo = 0;
	this.pressedLetters = '';
	this.FLAG = 0;
	this.SCORE = 0;
	this.wordToTrack = 0;
	this.letterToTrack = 1;
	that = this;

	console.log(this.Words);

	for (var i = 0 ; i < 30; i++){
		var a = new RandomLetters(getRandom(10, 580), -60 * i, this.Words[getRandom(0, 136)], that.wordNo);
		a.init();
		wordNo += 1;
		that.wordsArray.push(a);
	}


	this.keyPress = function(e){
		var keynum;
		if(window.event) { // IE                    
			keynum = e.keyCode;
		} else if(e.which){ // Netscape/Firefox/Opera                   
			keynum = e.which;
		}

		var pressedKey = String.fromCharCode(keynum);
		// if (e.keyCode == '32'){
		// 	console.log("button left");	
		// }

		for (i = 0; i < that.wordsArray.length; i ++ ){
			if (that.wordsArray[i].y > 380){
				that.wordsArray.splice[i, 1];
				that.pressedLetters = '';
				that.FLAG = 0;
				that.wordToTrack = 0;
				that.letterToTrack = 1;

				var childSpan = that.wordsArray[i].element.childNodes;
				for (var j = 0; j < childSpan.length; j++){
					childSpan[j].style.color = 'black';
				}
			}
		}

		if (pressedKey == ' '){

			var childSpan = that.wordsArray[wordToTrack].element.childNodes;
			for (var j = 0; j < childSpan.length; j++){
				childSpan[j].style.color = 'black';
			}
				
			that.wordsArray.splice[i, 1];
			that.pressedLetters = '';
			that.FLAG = 0;
			that.wordToTrack = 0;
			that.letterToTrack = 1;
			// console.log("HELL NO");

		}
		// console.log(that.wordsArray[0], that.wordsArray[1], that.wordsArray[2]);
		if (that.FLAG == 0){
			for (var i = 0; i < that.wordsArray.length; i++){
				if (that.wordsArray[i].y > 0 && that.wordsArray[i].y < 400){
					var word = that.wordsArray[i].text;
					if (pressedKey == word.substring(0, 1)){
						that.FLAG = 1;
						that.wordToTrack = i;
						that.pressedLetters += pressedKey;
						var childSpan = that.wordsArray[i].element.childNodes;
						// console.log(childSpan);
						childSpan[0].style.color = 'red';
						return;
						// console.log(that.wordsArray[i].element.childNodes);
					}
				}
			}
		} else if (that.FLAG == 1){
			var wd = that.wordsArray[that.wordToTrack].text;
			if (pressedKey == wd.substring(that.letterToTrack, that.letterToTrack+1)){
				var childSpan = that.wordsArray[that.wordToTrack].element.childNodes;
				childSpan[that.letterToTrack].style.color = 'red';
				that.letterToTrack += 1;
				that.pressedLetters += pressedKey;
			}

			if (that.pressedLetters.trim() == wd.trim()){
				that.pressedLetters = '';
				that.FLAG = 0;
				that.wordToTrack = 0;
				that.letterToTrack = 1;
				that.SCORE += wd.length;

				// console.log("Pressed letters", that.wordsArray[that.wordToTrack]);

				// console.log("BOOM SCORE ", that.SCORE);
				// console.log("LETTER TO TRACK: ", that.letterToTrack)
				// console.log("FLAG: ", that.FLAG);
				// console.log("WORD TO TRACK: ", that.wordToTrack);
				// console.log("PRESSED LETTER: ", that.pressedLetters);

				var toRemove = that.wordsArray.splice(that.wordToTrack, 1);
				var child = document.getElementById (toRemove[0].returnId());
				child.parentNode.removeChild(child);
			}
		}
		
		// console.log(that.wordsArray.length);
	}
	
	this.moveWords = function(){

		if (that.wordsArray.length < 5){
			var a = new RandomLetters(getRandom(10, 580), -60 * getRandom(1, 5), getRandom(1000, 5000).toString(), that.wordNo);
			a.init();
			wordNo += 1;
			that.wordsArray.push(a);
		}

		for (var i = 0; i < that.wordsArray.length; i++){
			that.wordsArray[i].y += 2;
			that.wordsArray[i].redraw();
			if (that.wordsArray[i].y > 420){
				var toRemove = that.wordsArray.splice(i, 1);
				var child = document.getElementById (toRemove[0].returnId());
				child.parentNode.removeChild(child);				
			}
		}
		document.getElementById('score-span').innerHTML = this.SCORE;
		document.addEventListener("keypress", keyPress, false);
		// console.log(that.wordsArray.length);
	}

	setInterval(this.moveWords, 50);
}

wordsAnimation();