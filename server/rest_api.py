import json
import subprocess
from OpenSSL import crypto
from os import listdir,path,remove
from flask import Flask, request, jsonify, make_response
app = Flask(__name__, static_path='/static')
app.config['PROPAGATE_EXCEPTIONS'] = True

PRIVATE_KEY_DIR = "private_keys/"
CERTIFICATE_SIGNING_REQUEST_DIR = "certificate_signing_requests/"
TRUSTSTORE_DIR = 'certificates/'
MAXIMUM_PRIVATE_KEY_SIZE_IN_BITS = 4096
MINIMUM_PRIVATE_KEY_SIZE_IN_BITS = 512
INVALID_PRIVATE_KEY_SIZE_ERROR_MSG = 'Invalid private key size.' 

@app.route('/')
@app.route('/csrGeneration')
@app.route('/keypairGeneration')
@app.route('/truststoreConfiguration')
def basic_pages(**kwargs):
    return make_response(open('templates/index.html').read())


@app.route('/keypair', methods = ['POST'])
def keypair():
	request_data = json.loads(request.data.decode())
	
	potential_pkey_size = request_data['pkey_size']
	if not potential_pkey_size.isdigit() or len(potential_pkey_size) > 4:
		return INVALID_PRIVATE_KEY_SIZE_ERROR_MSG, 400
	pkey_size = int(request_data['pkey_size'])

	encryption_method = str(request_data['encryption_method'])
	pkey_file_name = str(request_data['pkey_file'])
	passphrase = str(request_data['passphrase'])

	if path.isfile(PRIVATE_KEY_DIR + pkey_file_name):
		return 'Private key file ' + pkey_file_name + ' already exists.', 409
	elif pkey_size < MINIMUM_PRIVATE_KEY_SIZE_IN_BITS or MAXIMUM_PRIVATE_KEY_SIZE_IN_BITS < pkey_size:
		return INVALID_PRIVATE_KEY_SIZE_ERROR_MSG, 400
	else:
		private_key = crypto.PKey()
		private_key.generate_key(crypto.TYPE_RSA, pkey_size)
		with open(PRIVATE_KEY_DIR + pkey_file_name, "w") as private_key_file:
			if (encryption_method):
				print private_key_file.write(crypto.dump_privatekey(crypto.FILETYPE_PEM, private_key, encryption_method, passphrase))
			else:
				print private_key_file.write(crypto.dump_privatekey(crypto.FILETYPE_PEM, private_key))
			return 'Keypair successfully created.', 201


@app.route('/keypairs', methods = ['GET'])
def fetch_keypairs():
	keypair_list = listdir(PRIVATE_KEY_DIR)
	return jsonify(results=keypair_list), 200

@app.route('/csr', methods = ['POST'])
def generate_csr():
	request_data = json.loads(request.data.decode())
	csr_filename = str(request_data['csrFilename'])
	with open(CERTIFICATE_SIGNING_REQUEST_DIR + csr_filename, "w+") as csr_file:
		certificate_signing_request = crypto.X509Req()
		certificate_signing_request.get_subject().CN = str(request_data['commonName'])
		certificate_signing_request.get_subject().O = str(request_data['organization'])
		certificate_signing_request.get_subject().OU = str(request_data['organizationalUnit'])
		certificate_signing_request.get_subject().L = str(request_data['city'])
		certificate_signing_request.get_subject().ST = str(request_data['state'])
		certificate_signing_request.get_subject().C = str(request_data['country'])
		certificate_signing_request.get_subject().emailAddress = str(request_data['email'])
		selected_pkey_filename = str(request_data['pkey'])
		try:
			if 'passphrase' in request_data:
				selected_pkey_passphrase = str(request_data['passphrase'])
				selected_key = crypto.load_privatekey(crypto.FILETYPE_PEM, open(PRIVATE_KEY_DIR + selected_pkey_filename).read(), selected_pkey_passphrase)
			else:
				selected_key = crypto.load_privatekey(crypto.FILETYPE_PEM, open(PRIVATE_KEY_DIR + selected_pkey_filename).read())
			certificate_signing_request.set_pubkey(selected_key)
			certificate_signing_request.sign(selected_key, "sha256")
			print csr_file.write(crypto.dump_certificate_request(crypto.FILETYPE_PEM, certificate_signing_request))
			csr_file.seek(0)
			csr_data = csr_file.read()
			responseObject = {}
			responseObject['csr'] = csr_data,
			responseObject['message'] = 'CSR successfully created.'
			return jsonify(responseObject), 201
		except Error, error:
			return jsonify(str(error)), 400

@app.route('/truststores', methods = ['GET'])
def fetch_truststores():
	truststore_list = listdir(TRUSTSTORE_DIR)
	return jsonify(results=truststore_list), 200

@app.route('/truststore', methods = ['POST'])
def add_certificate():
	request_data = json.loads(request.data.decode())

	certificate = str(request_data['certificate'])
	with open(TRUSTSTORE_DIR + "current-cert.pem", "w") as current_certificate_file:
		current_certificate_file.write(certificate)

	certificate_file_to_be_imported = TRUSTSTORE_DIR + "current-cert.pem"
	selected_truststore = TRUSTSTORE_DIR + str(request_data['selectedTruststore'])
	alias = str(request_data['alias'])
	passphrase = str(request_data['passphrase'])
	process = subprocess.Popen(['keytool', '-import', '-alias', alias, '-keystore', selected_truststore, '-storepass', passphrase, '-file', certificate_file_to_be_imported], stdin=subprocess.PIPE, stdout=subprocess.PIPE)
	process.communicate("yes" + "\n")
	remove(TRUSTSTORE_DIR + "current-cert.pem")
	return_code = process.returncode
	responseObject = {}
	if return_code == 0:
		responseObject['message'] = 'Certificate successfully added.'
		return jsonify(responseObject), 201
	else:
		responseObject['message'] = 'An error was encountered while adding the certificate.'
		return jsonify(responseObject), 500


@app.after_request
def after_request(response):
	response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response

if __name__ == '__main__':
	app.run(host='0.0.0.0')