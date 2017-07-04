var dgram = require('dgram')

var server = dgram.createSocket('udp4')
server.bind(8849)

server.on('message', function(msg, info) {
  var str = Object.keys(msg).map(key => String.fromCharCode(msg[key])).join('');
  console.log(str)
})
