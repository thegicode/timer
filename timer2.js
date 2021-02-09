"use strict";

let forms = document.form,
	maxTime = Number(forms.inputTime.value),
	maxRelaxTime = Number(forms.inputRelaxTime.value),
	maxRepeatCount = Number(forms.inputRepeat.value),
	startButton = forms.startButton,
	pauseButton = forms.pauseButton,
	stopButton = forms.stopButton;

let tickId, 
	relaxId,
	repeatCount = 0,
	tickTime = 0,
	relaxTime = 0;


let handleRepeat = {
	isPause: false,
	init: function(){

		if( this.isPause ){
			this.play();
			return;
		} 

		repeatCount += 1;

		displayEnd.textContent = '';
		displayTime.textContent = '';
		displayRelaxTime.textContent = '';

		if( repeatCount <= maxRepeatCount ){
			this.play();
		} else {
			this.stop(true);
		}
		
		displayRepeat.textContent = repeatCount;

	},
	play: function(){

		startButton.disabled = true;
		pauseButton.removeAttribute('disabled');
		stopButton.removeAttribute('disabled');

		if( this.isPause ){
			let obj = timer.isPause ? timer : relaxTimer;
			obj.run();
			obj.isPause = false;
			this.isPause = false;
			return;
		} 

		timer.run();
		
	},
	stop: function( isEnd ){
		timer.stop();
		relaxTimer.stop();

		repeatCount = '';
		startButton.removeAttribute('disabled');
		pauseButton.disabled = true;
		stopButton.disabled = true;
		
		if(isEnd){
			displayEnd.textContent = 'End';
		}
	},
	pause: function(){
		let obj = tickTime > 0 ? timer : relaxTimer;
		obj.pause();
		this.isPause = true;
		startButton.removeAttribute('disabled');
		pauseButton.disabled = true;
		
	}
};


let timer = {
	isPause: false,
	run: function(){
		tickId = setInterval( this.tick.bind(this), 1000 );
	},
	tick: function(){
		tickTime += 1;
		displayTime.textContent = tickTime;

		if( tickTime === maxTime ){
			this.stop();
			relaxTimer.run();
		}
	},
	stop: function(){
		clearInterval(tickId);
		tickTime = 0;
	},
	isPlaying: function(){
		return tickTime === 0 ? false : true;
	},
	pause: function(){
		clearInterval(tickId);
		this.isPause = true;
	}
};


let relaxTimer = {
	isPause: false,
	run: function(){
		relaxId = setInterval( this.tick.bind(this), 1000 );
	},
	tick: function(){
		relaxTime += 1;
		displayRelaxTime.textContent = relaxTime;

		if( relaxTime === maxRelaxTime+1 ){
			this.stop();
			handleRepeat.init();
		}
	},
	stop: function(){
		clearInterval(relaxId);
		relaxTime = 0;
	},
	isPlaying: function(){
		return relaxTime === 0 ? false : true;
	},
	pause: function(){
		clearInterval(relaxId);
		this.isPause = true;
	}
};
