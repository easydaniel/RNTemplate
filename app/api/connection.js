import dgram from 'react-native-udp';


export const sendUDP = (msg, host) => {
  const client = dgram.createSocket('udp4');
  client.send(Buffer.from(msg), 8849, host, (err) => {
    client.close();
  });
};

export const createUDPServer = (port) => {
  const server = dgram.createSocket('udp4');
  server.bind(port);
  return server;
};
