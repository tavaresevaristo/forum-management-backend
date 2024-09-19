
1 - Generate the RSA private key:
  openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048


2 - Extract the public key from the private key:
  openssl rsa -pubout -in private_key.pem -out public_key.pem


3 - View the contents of the keys (optional):
  cat private_key.pem or cat public_key.pem


4 - Convert the file to Base64:

  4.1 - base64 private_ke.pem -w 0 > private_ke_base64.txt
  4.2 - base64 public_key.pem -w 0 > public_key_base64.txt

