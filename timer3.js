"use strict";

const forms = document.form,
	startButton = forms.startButton;
	
let maxCircuit = 0,
	maxWorkTime = 0,
	maxRelaxTime = 0;

let handleTimer = {
	circuit: 0,
	isPause: false,
	init: function(){

		if( !this.validation() ){
			return;
		}
		
		display.hidden = false;

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

	},
	validation: function(){
		maxCircuit = Number(forms.inputCircuit.value);
		maxWorkTime = Number(forms.inputWorkTime.value);
		maxRelaxTime = Number(forms.inputRelaxTime.value);
		if( maxCircuit <= 0 ){
			forms.inputCircuit.focus();
			return false;
		} 
		if( maxWorkTime <= 0 ){
			forms.inputWorkTime.focus();
			return false;
		}
		if( maxRelaxTime <= 0 ){
			forms.inputRelaxTime.focus();
			return false;
		}
		return true;
	},
	play: function(){

		startButton.hidden = true;
		playButton.hidden = true;
		pauseButton.hidden = false;
		stopButton.hidden = false;

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

		startButton.hidden = false;
		playButton.hidden = true;
		pauseButton.hidden = true;
		stopButton.hidden = true;

		if( isReset ){
			displayCircuit.dataset.hidden = true;
			displayMaxCircuit.textContent = '';
			displayCircuitValue.textContent = '';
			displayWorkTime.textContent = '';
			// displayRelaxTime.textContent = '';
			displayTimeTitle.textContent = '';
		}
	},
	pause: function(){
		let obj = workTimer.isPlaying ? workTimer : relaxTimer;
		obj.pause();
		this.isPause = true;

		playButton.hidden = false;
		pauseButton.hidden = true;
		
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

		displayCircuit.dataset.hidden = false;
		displayMaxCircuit.textContent = maxCircuit;
		displayCircuitValue.textContent = handleTimer.circuit;
		display.dataset.role="work";
		displayTimeTitle.textContent = '운동';
		displayWorkTime.textContent = this.time;
		// displayRelaxTime.textContent = '';

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

		// displayWorkTime.textContent = '';
		// displayRelaxTime.textContent = this.time;
		displayWorkTime.textContent = this.time;
		displayTimeTitle.textContent = '휴식';
		display.dataset.role="relax";

		if( this.time === maxRelaxTime || handleTimer.circuit === maxCircuit ){
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



