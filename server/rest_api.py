from OpenSSL import crypto
import subprocess
from flask import Flask, request
app = Flask(__name__)

@app.route('/keypair', methods = ['POST'])
def keypair():
	encryption_method = str(request.args.get('encryption_method'))
	pkey_size = int(request.args.get('pkey_size'))
	pkey_file_name = request.args.get('pkey_file')
	passphrase = str(request.args.get('passphrase'))

	private_key = crypto.PKey()
	private_key.generate_key(crypto.TYPE_RSA, pkey_size)
	private_key_file = open("certificates/" + pkey_file_name, "w")
	if (encryption_method):
		print "Cipher: " + encryption_method
		print private_key_file.write(crypto.dump_privatekey(crypto.FILETYPE_PEM, private_key, encryption_method, passphrase))
	else:
		print private_key_file.write(crypto.dump_privatekey(crypto.FILETYPE_PEM, private_key))

	private_key_file.close()
	return 'Keypair successfully created.', 200


@app.after_request
def after_request(response):
	print "hello"
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response

if __name__ == '__main__':
	app.run(debug=True)