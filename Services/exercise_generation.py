from Models.lesson import Lesson
from flask import Blueprint, request, jsonify
from extensions import db
import requests
import json

generate_bp = Blueprint('generate', __name__)

@generate_bp.route('/generate', methods=['POST'])
def generate():
    data = request.json

    print("\n\nReceived generate() data: ", data, "\n\n")
    if not data:
        return jsonify({'error': 'No data received'}), 400

    lessonId = data.get('lessonId')
    if not lessonId:
        return jsonify({'error': 'No lessonId received'}), 400
    

    lesson = Lesson.query.filter_by(id=lessonId).first()
    
    print('\n\nQueried lesson: ', lesson, '\n\n')

    if not lesson:
        return jsonify({'error': 'lesson not found'}), 404
        
    try:
        res = requests.post("http://localhost:11434/api/generate",
                            json={
                                "model": "llama3",
                                "prompt": f"""Give back 5 multiple choice questions with 4 options each, and 
                                    5 true or false questions according to the description 
                                    Give me questions in STRICT JSON format. 
                                    Return ONLY valid JSON. 
                                    Do not include any extra text. 
                                    Ensure all keys and values are valid JSON. 
                                    Do not include trailing commas or invalid quotes.
                                    If the JSON is invalid, fix it before returning.
                                    Format 
                                    {{
                                    "questions": [
                                        {{
                                        "id": 1,
                                        "text": "Question text",
                                        "type": "multiple_choice",
                                        "options": [
                                            {{
                                            "id": 1,
                                            "question_option_text": "Option text",
                                            "is_correct": false
                                            }},
                                            {{
                                            "id": 2,
                                            "question_option_text": "Option text",
                                            "is_correct": true
                                            }}
                                        ]
                                        }},
                                        {{
                                        "id": 6,
                                        "text": "Statement text",
                                        "type": "true_false",
                                        "options": [
                                            {{
                                            "id": 1,
                                            "question_option_text": "True",
                                            "is_correct": true
                                            }},
                                            {{
                                            "id": 2,
                                            "question_option_text": "False",
                                            "is_correct": false
                                            }}
                                        ]
                                        }}
                                    ]
                                    }}
                                    Description: {lesson.content}""",
                                "stream": False
                            })
        # print(f"\n\n res: {res.text} \n\n")
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    # print(f"\n\n\n\n{res.json()}\n\n\n\n")
    # return res.json()

    cleaned = res.text.replace('"\n', '\n')
    try:
        parsed = json.loads(cleaned)
    except:
        fixed = cleaned.replace('",', ',').replace('"}', '}')
        parsed = json.loads(fixed)
    """ print(f"\n\n\n\nres.json: {res.json()}\n\n\n\n")
    return res.json() """
    print(f"\n\n\n\nparsed: {parsed}\n\n\n\n")
    return jsonify(parsed)
    