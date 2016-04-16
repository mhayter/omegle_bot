var age = Math.floor((Math.random() * 10) + 1) + 15;

var newASL = "F "+age+" USA";

var myArray = ["asl?", newASL,"You wanna fool around?","Too bad. I'm a bot :'(",
				 "No seriously. I'm a bot haha", "My answers are gonna start looping...", "looping :p", "this isn't a joke",
				 "My answers come every 14 seconds. Seriously count", "Did you count? Try again.", "Told ya!", "No more unique phrases."
				 ]; // "Good luck finding someone!"
var place = 0;
var doneLength = myArray.length;

var timeBetweenResponses = 14000;


//call recursive settimeout

function reset() {
	place = 0;
	age = Math.floor((Math.random() * 10) + 1) + 15;
}



function disconnect() {
	var disconnectBtn = document.getElementsByClassName("disconnectbtn")[0];
	disconnectBtn.click();
}

function checkAndDisconnect(s) {
	if (document.getElementsByClassName("disconnectbtn")[0].innerHTML.substr(0,s.length) === s) {
		disconnect();
	    return true;
	} else {
		console.log("Forgo "+s);
		return false;
	}
}

function newConversation() {
	checkAndDisconnect("New");
}

function really() {
	checkAndDisconnect("Really?");
}

function stop() {
	checkAndDisconnect("Stop");
}

function disconnect() {
	var disconnectBtn = document.getElementsByClassName("disconnectbtn")[0];
	disconnectBtn.click();
}
function fill () {
	var textareas = document.getElementsByClassName("chatmsg"); //only one area
	var textarea = textareas[0];
	textarea.value = myArray[place];
	var sendButton = document.getElementsByClassName("sendbtn")[0];
	sendButton.click();
}

var unwind = false;

function convo() {
	console.log("place " + place);
    if (unwind) return;
	//check if new chat
	if (checkAndDisconnect("New")) { // if New aka I'm disconnected move on
		unwind = true;
		reset();
		return;
	}
	fill();
	place = (place + 1) % myArray.length;
	if (place == 0) {
		setTimeout(stop, timeBetweenResponses/2 ); //Stop
		setTimeout(really, timeBetweenResponses/2+1000);//Really?
		setTimeout(newConversation, timeBetweenResponses/2+1200);//New
	} else {
		setTimeout(convo, timeBetweenResponses);
	}
}

console.log("Before addListener");
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    	console.log("Started chat!");
    	unwind = false;
    	convo();
    	//setInterval(omegleChat, timeBetweenResponses*(doneLength+1)+1200+500);
		//document.addEventListener('DOMContentLoaded', solveSudoku);
	}
});
console.log("After addListener");