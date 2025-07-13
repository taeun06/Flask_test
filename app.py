import requests
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/api/solvedac', methods=['GET'])
def proxy():
    problem_id = request.args.get('problemId')
    url = f"https://solved.ac/api/v3/problem/show?problemId={problem_id}"
    res = requests.get(url)
    return jsonify(res.json())

if __name__ == '__main__':
    app.run(port=5000)