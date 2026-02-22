from Models.question import Question
from Models.question_option import QuestionOption
from extensions import db
from flask import Blueprint, request, jsonify
from sqlalchemy.orm import joinedload

question_bp = Blueprint('question', __name__)

@question_bp.route('/question', methods=['POST'])
def get_questions():
    data = request.json
    print("\n\nReceived question - lessonId: ", data)

    if not data:
        return jsonify({"error": "No data received."}), 400
    
    lesson_id = data.get('lesson_id')

    if not lesson_id:
        return jsonify({'error': 'No lessonId received'}), 400
    
    questions = Question.query.options(joinedload(Question.options)) \
    .filter_by(lesson_id=lesson_id).all()

    print("\n\nFound questions: ", questions, "\n\n")

    if not questions:
        return jsonify({'error': 'No questions received'}), 400
    
    return jsonify({
        "questions": [
            {
                "id": q.id,
                "text": q.text,
                "type": q.type,
                "options": [
                    {
                        "id": opt.id,
                        "question_option_text": opt.question_option_text,
                        "is_correct": opt.is_correct
                    }
                    for opt in q.options
                ]
            }
            for q in questions
        ]
    })