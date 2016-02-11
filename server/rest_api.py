import subprocess
from flask import Flask, request
app = Flask(__name__)

@app.route('/keypair', methods = ['POST'])
def keypair():
	encryption_method = request.args.get('encryption_method')
	pkey_size = request.args.get('pkey_size')
	pkey_file = request.args.get('pkey_file')
	passphrase = request.args.get('passphrase')
	if (encryption_method):
		keypair_gen_command = "openssl genrsa -" + str(encryption_method) + " -out " + str(pkey_file) + " " + str(pkey_size) + " -passout " + passphrase
	else:
		subprocess.call("openssl genrsa" + " -out " + str(pkey_file) + " " + str(pkey_size), shell=True)
	return 'Keypair successfully created.', 200


@app.after_request
def after_request(response):
	print "hello"
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response

if __name__ == '__main__':
	app.run(debug=True)