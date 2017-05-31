import request from '../utils/request';

export function delay(timeout=1700){
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export function socket(action, id) {
	var io = require('socket.io-client');
	var socket = io.connect('http://localhost:6001');
	// var socket = new WebSocket('ws://localhost:6001');
	socket.on('connection', function (message) {
	  console.log(message);
	});
	console.log(io)
	console.log(id)
	console.log(socket)
	socket.on('public:App\\Events\\NoticeEvent', function(message){
	  action(message);
	});
  socket.on(`private-${id}:App\\Events\\TaskCreate`, function(message){
	  action(message);
	});
	socket.on(`private-${id}:App\\Events\\TaskUpdate`, function(message){
	  action(message);
	});
}