"use strict";

let elInputTime = inputTime,
	elTime = displayTime;

let playId, 
	time = 0;

let timer = {
	play : function(){
		let maxTime = elInputTime.value,
			self = this;

		let playTime = function(){
			time += 1;
			if( time > maxTime ){
				self.stop();
			} else {
				elTime.value = time;
			}
		};
		
		playId = setInterval( playTime, 1000 );
		
	},
	stop : function(){
		clearInterval(playId);
		time = 0;
		elTime.value = time;
	},
	pause : function(){
		clearInterval(playId);
	}

};

