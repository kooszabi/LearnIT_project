from Models.lesson import Lesson
from flask import Blueprint, request, jsonify
from extensions import db

card_bp = Blueprint('card', __name__)

@card_bp.route('/card', methods=['POST'])
def create_card():
    data = request.json
    # print('\n\nReceived data: ', data, '\n\n')
    if not data:
        return jsonify({'error': 'No data received'}), 400
    
    lesson_id = data.get('lessonId')

    if not lesson_id:
        return jsonify({'error': 'No lessonId received'}), 400
    
    lesson = Lesson.query.filter_by(id=lesson_id).first()

    if not lesson:
        return jsonify({'error': 'Lesson not found'}), 404
    
    return jsonify({
        "lessonTitle": lesson.title
    })