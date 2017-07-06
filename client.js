var net = require('net');

var client = new net.Socket();
client.connect(8848, '192.168.10.100', function() {
    console.log('Connected');
});

client.setTimeout(3000, function() {
  console.log('timeout')
  client.destroy();
})

client.on('error', function(err) {
  console.log(err)
})

client.on('data', function(data) {
  console.log(data.toString());
})


client.on('end', function() {
  console.log('Connection Close')
})



/*
var dgram = require('dgram')
var client = dgram.createSocket('udp4')
var message = Buffer.from(`WCTC_something_OK\r\n`);

client.send(message, 0, message.length, 8080, 'localhost', (err) => {
  client.close();
});
*/
