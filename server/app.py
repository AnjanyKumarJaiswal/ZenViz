from flask import Flask

app = Flask(__name__)

@app.route('/')
def testing():
    return "<a>hello this is working really fine<a/>"

if __name__ == "__main__":
    app.run(debug=True)