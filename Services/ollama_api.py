from flask import Blueprint, request, jsonify
import requests

ollama_bp = Blueprint('fix-code', __name__)

@ollama_bp.route('/fix-code', methods=['POST'])
def fix_coding_exercise():
    data = request.json

    print("\n\nReceived fix_coding_exercise() data: ", data, "\n\n")
    if not data:
        return jsonify({'error': 'No data received'}), 400

    coding_exercise = data.get('code')
    description = data.get('description')

    if not coding_exercise and not description:
        return jsonify({'error': 'No coding exercise and description received'}), 400

    print(f"\n\n received coding exercise: {coding_exercise} \n\n") 
    print(f"\n\n received coding exercise description: {description} \n\n")
    try:
        res = requests.post("http://localhost:11434/api/generate",
                            json={
                                "model": "llama3",
                                "prompt": f"Give back only the word: true or false, whether the solution is correct according to the description. \
                                    Description: {description} \
                                    Coding exercise: {coding_exercise}",
                                "stream": False
                            })
        print(f"\n\n res: {res.text} \n\n")
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    print(f"\n\n\n\napi response ollami : {res.json()}\n\n\n\n")
    return res.json()
