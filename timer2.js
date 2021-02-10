"use strict";

const forms = document.form,
	maxCircuit = Number(forms.inputCircuit.value),
	maxWorkTime = Number(forms.inputWorkTime.value),
	maxRelaxTime = Number(forms.inputRelaxTime.value),
	playButton = forms.playButton,
	pauseButton = forms.pauseButton,
	stopButton = forms.stopButton;

let handleTimer = {
	circuit: 0,
	isPause: false,
	init: function(){

		if( this.isPause ){
			this.play();
			return;
		} 

		this.circuit += 1;

		if( this.circuit <= maxCircuit ){
			this.play();
		} else {
			this.stop(true);
		}

		displayWorkTime.textContent = '';
		displayRelaxTime.textContent = '';

	},
	play: function(){

		playButton.disabled = true;
		pauseButton.disabled = false;
		stopButton.disabled = false;
		displayCircuit.textContent = this.circuit;

		if( this.isPause ){
			let obj = workTimer.isPlaying ? workTimer : relaxTimer;
			obj.run();
			this.isPause = false;
			return;
		} 

		workTimer.run();
		
	},
	stop: function( isReset ){
		workTimer.stop();
		relaxTimer.stop();

		this.circuit = 0;

		playButton.disabled = false;
		pauseButton.disabled = true;
		stopButton.disabled = true;

		if( isReset ){
			displayCircuit.textContent = '';
			displayWorkTime.textContent = '';
			displayRelaxTime.textContent = '';
		}
	},
	pause: function(){
		let obj = workTimer.isPlaying ? workTimer : relaxTimer;
		obj.pause();
		this.isPause = true;

		playButton.disabled = false;
		pauseButton.disabled = true;
		
	}
};


let workTimer = {
	intervalId: '',
	isPlaying: false,
	time: 0,
	run: function(){
		this.intervalId = setInterval( this.tick.bind(this), 1000 );
		this.isPlaying = true;
	},
	tick: function(){
		this.time += 1;

		displayWorkTime.textContent = this.time;

		if( this.time === maxWorkTime ){
			this.stop();
			relaxTimer.run();
		}
	},
	stop: function(){
		clearInterval(this.intervalId);
		this.time = 0;
		this.isPlaying = false;
	},
	pause: function(){
		clearInterval(this.intervalId);
	}
};


let relaxTimer = {
	intervalId: '',
	isPlaying: false,
	time: 0,
	run: function(){
		this.intervalId = setInterval( this.tick.bind(this), 1000 );
		this.isPlaying = true;
	},
	tick: function(){
		this.time += 1;

		displayRelaxTime.textContent = this.time;

		if( this.time === maxRelaxTime+1 ){
			this.stop();
			handleTimer.init();
		}
	},
	stop: function(){
		clearInterval(this.intervalId);
		this.time = 0;
		this.isPlaying = false;
	},
	pause: function(){
		clearInterval(this.intervalId);
	}
};



