from server.rest_api import app

def application(env, start_response):
    app.run(debug=True)