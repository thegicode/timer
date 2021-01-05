"uset strict";


/*const seconds = new Date().getSeconds();;
console.log(seconds);*/

let seconds = 0,
	maxSeconds = 5,
	intervalId;

function alertSeconds(){
	seconds += 1;
	console.log(seconds);
	if( seconds === maxSeconds ){
		clean();
	}
}

function clean(){
	clearInterval(intervalId);
	seconds = 0;
	console.log('Clean');
}

intervalId = setInterval( alertSeconds, 1000 );

