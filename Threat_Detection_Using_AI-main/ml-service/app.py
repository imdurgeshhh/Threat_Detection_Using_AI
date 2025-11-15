from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/detect", methods=["POST"])
def detect():
    data = request.json
    text = data.get("text", "")
    # TODO: implement AI prompt injection detection
    return jsonify({"text": text, "suspicious": False})

if __name__ == "__main__":
    app.run(port=8000, debug=True)
