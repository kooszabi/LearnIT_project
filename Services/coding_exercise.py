from Models.coding_exercise import CodingExercise
from flask import Blueprint, request, jsonify
from extensions import db

coding_exercise_bp = Blueprint('coding-exercise', __name__)

@coding_exercise_bp.route('/coding-exercise', methods=['POST'])
def get_coding_exercises():
    data = request.json

    print("\n\nReceived data: ", data, "\n\n")
    if not data:
        return jsonify({'error': 'No lesson_id received'}), 400

    lesson_id = data.get('lesson_id')
    if not lesson_id:
        return jsonify({'error': 'No data received'}), 400
        
    coding_exercises = CodingExercise.query.filter_by(lesson_id=lesson_id).all()
    
    print('\n\nQueried Coding exercises: ', coding_exercises, '\n\n')

    if not coding_exercises:
        return jsonify({'error': 'Coding exercises not found'}), 404
    
    return jsonify(
        {
            "coding_exercises": [
                {
                    "id": cd.id,
                    "title": cd.title,
                    "description": cd.description,
                    "starter_code": cd.starter_code
                }
                for cd in coding_exercises
            ]
        }
    )