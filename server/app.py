from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/')
def testing():
    return "<a>hello this is working really fine<a/>"

if __name__ == "__main__":
    app.run(debug=True)