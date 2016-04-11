var age = Math.floor((Math.random() * 10) + 1) + 15;

var newASL = "F "+age+" USA";

var myArray = ["asl?", newASL,"You wanna fool around?","Too bad. I'm a bot :'(",
				 "No seriously. I'm a bot haha", "My answers are gonna start looping...", "looping", "this isn't a joke",
				 "My answers come every 14 seconds. Seriously count", "Did you count? Try again.", "Told ya!", "No more unique phrases."
				 ]; // "Good luck finding someone!"
var place = 0;
var doneLength = myArray.length;


function disconnect() {
	var disconnectBtn = document.getElementsByClassName("disconnectbtn")[0];
	disconnectBtn.click();
}

function checkAndDisconnect(s) {
	if (document.getElementsByClassName("disconnectbtn")[0].innerHTML.substr(0,s.length) === s) 
		disconnect();
	else {
		console.log("Forgo "+s);
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

function convo() {
	console.log("place " + place);
	fill();
	place = (place + 1) % myArray.length;
}

function omegleChat() {
	convo();
	var timeBetweenResponses = 14000;
	for(var i=1;i<doneLength;i++) {
		setTimeout(convo,timeBetweenResponses*i);
	}

	setTimeout(stop, timeBetweenResponses*(doneLength+1)); //Stop
	setTimeout(really, timeBetweenResponses*(doneLength+1)+1000);//Really?
	setTimeout(newConversation, timeBetweenResponses*(doneLength+1)+1200);//New
}

console.log("Before addListener");
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    	console.log("Started chat!");
    	omegleChat();
    	//setInterval(omegleChat, timeBetweenResponses*(doneLength+1)+1200+500);
		//document.addEventListener('DOMContentLoaded', solveSudoku);
	}
});
console.log("After addListener");