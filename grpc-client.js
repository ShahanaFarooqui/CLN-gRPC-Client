const fs = require('fs');
const grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './node.proto';
const client_key = fs.readFileSync('./client-key.pem');
const client_cert = fs.readFileSync('./client.pem');
const ca_cert = fs.readFileSync('./ca.pem');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const CLNService = grpc.loadPackageDefinition(packageDefinition).cln.Node;
let credentials = grpc.credentials.createSsl(ca_cert, client_key, client_cert);

const client = new CLNService(
  'localhost:5937',
  credentials
);

client.Getinfo({}, (error, info) => {
  if (error) throw error;
  info.id = Buffer.from(info.id, 'base64').toString('hex');
  info.color = Buffer.from(info.color, 'base64').toString('hex')
  console.log(info);
});

