"uset strict";

let actionTime = 0,
	maxActionTime = 3,
	repeatCount = 0,
	maxRepeatCount = 3,
	intervalActionId;

function handleActionTime(){

	actionTime += 1;
	console.log(actionTime);

	if( actionTime === maxActionTime ){
		cleanActionTime();

		handleRepeat();
	}
}


function handleRepeat(){

	repeatCount += 1;
	console.log( 'repeatCount', repeatCount );

	intervalActionId = setInterval( handleActionTime, 1000 );

	if( repeatCount === maxRepeatCount ){
		cleanActionTime();
		repeatCount = 0;
	}
}

function cleanActionTime(){
	clearInterval(intervalActionId);
	actionTime = 0;
}


intervalActionId = setInterval( handleActionTime, 1000 );

