"uset strict";

let intervalActionId,
	intervalRelaxId
	actionTime = 0,
	maxActionTime = 3,
	repeatCount = 0,
	maxRepeatCount = 2,
	relaxTime = 0,
	maxRelaxTime = 2
	isRelaxRunning = false;


function handleRepeat(){

	repeatCount += 1;

	if( repeatCount <= maxRepeatCount ){
		console.log('------');
		console.log( `${repeatCount}회` );
		intervalActionId = setInterval( handleActionTime, 1000 );
	} else {
		cleanActionTime();
		repeatCount = 0;
	}

}

function handleActionTime(){

	actionTime += 1;
	console.log(actionTime);

	if( actionTime === maxActionTime ){

		cleanActionTime();

		console.log('[휴식]');
		isRelaxRunning = true;
		intervalRelaxId = setInterval( handleRelax, 1000 );
		
	}
}


function handleRelax(){
	relaxTime += 1;
	console.log(relaxTime);

	if( relaxTime === maxRelaxTime ){
		cleanRelaxTime();
	}
}


function cleanActionTime(){
	clearInterval(intervalActionId);
	actionTime = 0;
}

function cleanRelaxTime(){
	isRelaxRunning = false;
	clearInterval(intervalRelaxId);
	relaxTime = 0;

	handleRepeat();
}


handleRepeat();


