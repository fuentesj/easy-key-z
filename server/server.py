from flask import Flask, requst, url_for
app = Flask(__name__)

from flask import Flask, requst, url_for
app = Flask(__name__)

@app.route('/gen_private_key', methods = ['POST'])
def gen_private_key():
	print request.json


if __name__=='__main__':
	app.run(debug=True)