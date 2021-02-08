"use strict";

let maxTime = Number(inputTime.value),
	maxRelaxTime = Number(inputRelaxTime.value),
	maxRepeat = Number(inputRepeat.value);

let playId, 
	relaxId,
	time = 0,
	relaxTime = 0,
	repeatCount = 0;


let handleRepeat = {
	init: function(){
		displayEnd.textContent = '';

		if(this.isPause){
			console.log( 'repeatCount', repeatCount);
			console.log( 'time', time);
			console.log( 'relaxTime', relaxTime);
		} else {
			repeatCount += 1;
			if( repeatCount <= maxRepeat ){
				handleRepeat.play();
			} else {
				handleRepeat.stop(true);
			}
		}
	},
	play : function(){
		displayRepeat.textContent = repeatCount;
		displayTime.textContent = 0;
		displayRelaxTime.textContent = 0;
		timer.interval();
	},
	stop : function( isEnd ){
		timer.stop();
		relaxTimer.stop();
		repeatCount = 0;
		displayRepeat.textContent = repeatCount;
		displayTime.textContent = 0;
		displayRelaxTime.textContent = 0;
		if(isEnd){
			displayEnd.textContent = 'End';
		}
	}
}


let timer = {
	interval: function(){
		playId = setInterval( this.play.bind(this), 1000 );
	},
	play: function(){
		time += 1;
		displayTime.textContent = time;

		if( time === maxTime ){
			this.stop();
			relaxTimer.interval();
		}
	},
	stop: function(){
		clearInterval(playId);
		time = 0;
	},
	isPlaying: function(){
		return time === 0 ? false : true;
	},
	pause: function(){
		clearInterval(playId);
	}
};


let relaxTimer = {
	interval: function(){
		relaxId = setInterval( this.play.bind(this), 1000 );
	},
	play: function(){
		relaxTime += 1;
		displayRelaxTime.textContent = relaxTime;

		if( relaxTime === maxRelaxTime ){
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
	}
};
