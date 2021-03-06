var webSocket;

$(document).ready(function(){
	document.getElementById('sendbutton').disabled = true;
	addConnectEvents();
	addDisconnectEvents();
	addSendMessageEvents();
});

function addSendMessageEvents(){
	document.getElementById('sendbutton').addEventListener('click', function(){
		var message = document.getElementById('sendinput').value;
		document.getElementById('sendinput').value = "";
		webSocket.send(message);
	});
}

function addConnectEvents(){
	document.getElementById('connectbutton').addEventListener('click', function(){
		var url = document.getElementById('wsurlinput').value;
		webSocket = new WebSocket(url);
		webSocket.onopen = function(){
			messageThatWebsocketIsOpen();
			disableOpenConnectionButton();
			enableCloseConnectionButton();
			document.getElementById('sendbutton').disabled = false;
		}
		webSocket.onmessage = function(evt){
			var message = evt.data;
			var datetime = new Date();
			var hours = datetime.getHours();
			var minutes = datetime.getMinutes();
			document.getElementById('messages').value += hours + ":" + minutes + "| "+ message +"\n";
			return false;			
		}
	});
}

function addDisconnectEvents(){
	disableCloseConnectionButton();
	document.getElementById('disconnectbutton').addEventListener('click', function(){
		webSocket.onbeforeunload = function(){
			websocket.onclose = function () {}
			websocket.close();
		}
		webSocket.close();
		disableCloseConnectionButton();
		enableOpenConnectionButton();
		messageThatWebsocketIsClosed();
		document.getElementById('sendbutton').disabled = true;
	});
}

function getCurrentTime(){
	var datetime = new Date();
	var hours = datetime.getHours();
	var minutes = datetime.getMinutes();
	return hours + ":" + minutes;
}

function messageThatWebsocketConnectionFailed(){
	document.getElementById('messages').value += getCurrentTime() + "| Connection failed\n";
}

function messageThatWebsocketIsClosed(){
	document.getElementById('messages').value += getCurrentTime() + "| Connection closed\n";	
}

function messageThatWebsocketIsOpen(){
	document.getElementById('messages').value += getCurrentTime() + "| Connection established\n";
}

function disableOpenConnectionButton(){
	document.getElementById('connectbutton').disabled = true;
}

function disableCloseConnectionButton(){
	document.getElementById('disconnectbutton').disabled = true;
}

function enableOpenConnectionButton(){
	document.getElementById('connectbutton').disabled = false;
}

function enableCloseConnectionButton(){
	document.getElementById('disconnectbutton').disabled = false;
}
