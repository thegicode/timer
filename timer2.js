"use strict";

const forms = document.form,
	maxTime = Number(forms.inputTime.value),
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

		displayPlayTime.textContent = '';
		displayRelaxTime.textContent = '';

		if( count <= maxCount ){
			this.play();
		} else {
			this.stop(true);
		}

	},
	play: function(){

		playButton.disabled = true;
		pauseButton.removeAttribute('disabled');
		stopButton.removeAttribute('disabled');
		displayCount.textContent = count;

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

		count = 0;

		playButton.removeAttribute('disabled');
		pauseButton.disabled = true;
		stopButton.disabled = true;

		if( isReset ){
			displayCount.textContent = '';
			displayPlayTime.textContent = '';
			displayRelaxTime.textContent = '';
		}
	},
	pause: function(){
		let obj = timer;
		if( relaxTimer > 0 ){
			obj = relaxTimer;
		}
		obj.pause();
		this.isPause = true;
		playButton.removeAttribute('disabled');
		pauseButton.disabled = true;
		
	}
};


let timer = {
	isPause: false,
	run: function(){
		playId = setInterval( this.tick.bind(this), 1000 );
	},
	tick: function(){
		playTime += 1;
		displayPlayTime.textContent = playTime;

		if( playTime === maxTime ){
			this.stop();
			relaxTimer.run();
		}
	},
	stop: function(){
		clearInterval(playId);
		playTime = 0;
	},
	pause: function(){
		clearInterval(playId);
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
			handleTimer.init();
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
