from Models.lesson import Lesson
from Models.question import Question
from Models.coding_exercise import CodingExercise
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
    

    questions = Question.query.filter_by(lesson_id=lesson.id).all()
    if not questions:
        return jsonify({'error': 'No questions received'}), 400
    qustionNumber = len(questions)

    codingExercises = CodingExercise.query.filter_by(lesson_id=lesson.id).all()
    if not codingExercises:
        return jsonify({'error': 'No coding exercises received'}), 400
    codingExerciseNumber = len(codingExercises)

    return jsonify({
        "lessonTitle": lesson.title,
        "questionNumber": qustionNumber,
        "codingExerciseNumber": codingExerciseNumber
    })