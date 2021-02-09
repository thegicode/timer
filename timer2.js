"use strict";

const forms = document.form,
	maxTime = Number(forms.inputTime.value),
	maxRelaxTime = Number(forms.inputRelaxTime.value),
	maxRepeatCount = Number(forms.inputRepeat.value),
	playButton = forms.playButton,
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

		displayTime.textContent = '';
		displayRelaxTime.textContent = '';

		if( repeatCount <= maxRepeatCount ){
			this.play();
		} else {
			this.stop(true);
		}

	},
	play: function(){

		playButton.disabled = true;
		pauseButton.removeAttribute('disabled');
		stopButton.removeAttribute('disabled');
		displayRepeat.textContent = repeatCount;

		if( this.isPause ){
			let obj = timer.isPause ? timer : relaxTimer;
			obj.run();
			obj.isPause = false;
			this.isPause = false;
			return;
		} 

		timer.run();
		
	},
	stop: function( isReset ){
		timer.stop();
		relaxTimer.stop();

		repeatCount = 0;

		playButton.removeAttribute('disabled');
		pauseButton.disabled = true;
		stopButton.disabled = true;

		if( isReset ){
			displayRepeat.textContent = '';
			displayTime.textContent = '';
			displayRelaxTime.textContent = '';
		}
	},
	pause: function(){
		let obj = tickTime > 0 ? timer : relaxTimer;
		obj.pause();
		this.isPause = true;
		playButton.removeAttribute('disabled');
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
	pause: function(){
		clearInterval(relaxId);
		this.isPause = true;
	}
};
