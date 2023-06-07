# CLN gRPC Client
Core Lightning gRPC Client

# How to Run
- npm install
- create certs folder
- copy ca.pem, client.pem & client-key.pem files from .../.lightning/bitcoin folder to certs folder
- copy node.proto & primitives.proto from ...lightning/cln-grpc/proto directory (if needed)
- adjust GRPC_PORT setting in grpc-client.js (defaults to 5010)
- node grpc-client.js
