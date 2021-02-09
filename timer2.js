"use strict";

const forms = document.form,
	maxPlayTime = Number(forms.inputTime.value),
	maxRelaxTime = Number(forms.inputRelaxTime.value),
	maxCount = Number(forms.inputRepeat.value),
	playButton = forms.playButton,
	pauseButton = forms.pauseButton,
	stopButton = forms.stopButton;

let playId, 
	relaxId,
	count = 0,
	playTime = 0,
	relaxTime = 0;


let handleTimer = {
	isPause: false,
	init: function(){

		if( this.isPause ){
			this.play();
			return;
		} 

		count += 1;

		if( count <= maxCount ){
			this.play();
		} else {
			this.stop(true);
		}

		displayPlayTime.textContent = '';
		displayRelaxTime.textContent = '';

	},
	play: function(){

		playButton.disabled = true;
		pauseButton.disabled = false;
		stopButton.disabled = false;
		displayCount.textContent = count;

		if( this.isPause ){
			let obj = timer.isPlaying ? timer : relaxTimer;
			obj.run();
			this.isPause = false;
			return;
		} 

		timer.run();
		
	},
	stop: function( isReset ){
		timer.stop();
		relaxTimer.stop();

		count = 0;

		playButton.disabled = false;
		pauseButton.disabled = true;
		stopButton.disabled = true;

		if( isReset ){
			displayCount.textContent = '';
			displayPlayTime.textContent = '';
			displayRelaxTime.textContent = '';
		}
	},
	pause: function(){
		let obj = timer.isPlaying ? timer : relaxTimer;
		obj.pause();
		this.isPause = true;

		playButton.disabled = false;
		pauseButton.disabled = true;
		
	}
};


let timer = {
	isPlaying: false,
	run: function(){
		playId = setInterval( this.tick.bind(this), 1000 );
		this.isPlaying = true;
	},
	tick: function(){
		playTime += 1;

		displayPlayTime.textContent = playTime;

		if( playTime === maxPlayTime ){
			this.stop();
			relaxTimer.run();
		}
	},
	stop: function(){
		clearInterval(playId);
		playTime = 0;
		this.isPlaying = false;
	},
	pause: function(){
		clearInterval(playId);
	}
};


let relaxTimer = {
	isPlaying: false,
	run: function(){
		relaxId = setInterval( this.tick.bind(this), 1000 );
		this.isPlaying = true;
	},
	tick: function(){
		relaxTime += 1;
		displayRelaxTime.textContent = relaxTime;

		if( relaxTime === maxRelaxTime+1 ){
			this.stop();
			handleTimer.init();
		}
	},
	stop: function(){
		clearInterval(relaxId);
		relaxTime = 0;
		this.isPlaying = false;
	},
	pause: function(){
		clearInterval(relaxId);
	}
};



