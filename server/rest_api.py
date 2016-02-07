from flask import Flask, request, url_for
app = Flask(__name__)

@app.route('/keypair', methods = ['POST'])
def api_root():
	return "test"


@app.after_request
def after_request(response):
	response.headers.add('Access-Control-Allow-Origin', 'null')
	return response

if __name__ == '__main__':
	app.run(debug=False)