import json
from OpenSSL import crypto
import subprocess
import os.path
from os import listdir
from flask import Flask, request, jsonify, make_response
app = Flask(__name__, static_path='/static')

PRIVATE_KEY_DIR = "private_keys/"
CERTIFICATE_SIGNING_REQUEST_DIR = "certificate_signing_requests/"


@app.route('/')
@app.route('/csrGeneration')
@app.route('/keypairGeneration')
def basic_pages(**kwargs):
    return make_response(open('templates/index.html').read())


@app.route('/keypair', methods = ['POST'])
def keypair():
	request_data = json.loads(request.data.decode())
	print request_data
	encryption_method = str(request_data['encryption_method'])
	pkey_size = int(request_data['pkey_size'])
	pkey_file_name = str(request_data['pkey_file'])
	passphrase = str(request_data['passphrase'])

	if os.path.isfile(PRIVATE_KEY_DIR + pkey_file_name):
		return 'Private key file ' + pkey_file_name + ' already exists.', 409
	elif pkey_size <= 0:
		return 'Invalid private key size.', 400
	elif 0 < pkey_size < 112:
		return 'At minimum private key size must be greater than 112 bits.', 400
	else:
		private_key = crypto.PKey()
		private_key.generate_key(crypto.TYPE_RSA, pkey_size)
		private_key_file = open(PRIVATE_KEY_DIR + pkey_file_name, "w")
		if (encryption_method):
			print "Cipher: " + encryption_method
			print private_key_file.write(crypto.dump_privatekey(crypto.FILETYPE_PEM, private_key, encryption_method, passphrase))
		else:
			print private_key_file.write(crypto.dump_privatekey(crypto.FILETYPE_PEM, private_key))

		private_key_file.close()
		return 'Keypair successfully created.', 201


@app.route('/keypairs', methods = ['GET'])
def fetch_keypairs():
	keypair_list = listdir(PRIVATE_KEY_DIR);
	print keypair_list
	return jsonify(results=keypair_list), 200

@app.route('/csr', methods = ['POST'])
def generate_csr():
	request_data = json.loads(request.data.decode())
	
	certificate_signing_request = crypto.X509Req()
	certificate_signing_request.get_subject().CN = str(request_data['commonName'])
	certificate_signing_request.get_subject().O = str(request_data['organization'])
	certificate_signing_request.get_subject().OU = str(request_data['organizationalUnit'])
	certificate_signing_request.get_subject().L = str(request_data['city'])
	certificate_signing_request.get_subject().ST = str(request_data['state'])
	certificate_signing_request.get_subject().C = str(request_data['country'])
	certificate_signing_request.get_subject().emailAddress = str(request_data['email'])
	
	selected_pkey_filename = str(request_data['pkey'])
	selected_key = crypto.load_privatekey(crypto.FILETYPE_PEM, open(PRIVATE_KEY_DIR + selected_pkey_filename).read())
	csr_filename = str(request_data['csrFilename'])
	with open(CERTIFICATE_SIGNING_REQUEST_DIR + csr_filename, "w") as csr_file:
		certificate_signing_request.set_pubkey(selected_key)
		certificate_signing_request.sign(selected_key, "sha256")
		print csr_file.write(crypto.dump_certificate_request(crypto.FILETYPE_PEM, certificate_signing_request))
		csr_file.close()
		return 'CSR successfully created.', 201


@app.after_request
def after_request(response):
	response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response

if __name__ == '__main__':
	app.run(host='0.0.0.0')