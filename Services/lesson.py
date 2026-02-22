from Models.lesson import Lesson
from flask import Blueprint, request, jsonify
from extensions import db

lesson_bp = Blueprint('lesson', __name__)

@lesson_bp.route('/<int:lesson_id>', methods=['GET'])
def get_lesson(lesson_id):
    received_lesson_id = lesson_id
    # print('\n\nReceived lesson_id: ', received_lesson_id, '\n\n')
    if not received_lesson_id:
        return jsonify({'error': 'No data received'}), 400
        
    lesson = Lesson.query.filter_by(id=received_lesson_id).first()
    # print('\n\nQueried lesson: ', lesson, '\n\n')

    if not lesson:
        return jsonify({'error': 'Lesson not found'}), 404
    

    print('\n\nReturning lesson content: ', lesson.content, '\n\n')
    return jsonify({"content": lesson.content})