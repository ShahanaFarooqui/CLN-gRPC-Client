const fs = require("fs");
const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./cln.proto";
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
  "localhost:59375",
  credentials
);

client.Getinfo({}, (error, info) => {
  if (error) throw error;
  console.log(info);
});
