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
                                "prompt": f"You are a strict programming examiner. \
                                    Rules: \
                                        - The solution is correct only if: \
                                            Evaluation rules: \
                                                1. Check whether the student's code satisfies the task description. \
                                                2. Variable names are case-sensitive and must exactly match the names required by the description. \
                                                3. Function names are case-sensitive and must exactly match the required names. \
                                                4. String values such as \"warm\", \"cloudy\", \"rainy\", etc. are NOT variable names. \
                                                5. Only report a variable name error if the student actually used a different variable name. \
                                                6. Do not invent requirements that are not present in the description. \
                                                7. Accept different valid implementations if they satisfy the task. \
                                                8. Check whether the required programming concept is used (for example: if-else, nested if, if-elif-else, not operator, etc.). \
                                                9. Check whether the code would produce the expected behavior. \
                                    Output rules: \
                                        - Return only the word 'true' if everything is perfectly correct. \
                                        - Otherwise return the word 'false' and a short, 1 sentence explanation strictly about the mistake, nothing else. For that use the \
                                            format: false ; explanation \
                                    Description: {description} \
                                    Coding exercise: {coding_exercise}",
                                "stream": False
                            })
        print(f"\n\n res: {res.text} \n\n")
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    print(f"\n\n\n\napi response ollami : {res.json()}\n\n\n\n")
    return res.json()
