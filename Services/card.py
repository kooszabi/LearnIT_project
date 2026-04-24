from Models.lesson import Lesson
from Models.question import Question
from Models.coding_exercise import CodingExercise
from Models.user_progress import UserProgress
from Models.user import User
from flask import Blueprint, request, jsonify
from extensions import db
from Services.get_user_id import get_user_id_from_token
import jwt

card_bp = Blueprint('card', __name__)

@card_bp.route('/card', methods=['POST'])
def create_card():
    data = request.json
    print('\n\nReceived data: ', data, '\n\n')
    if not data:
        return jsonify({'error': 'No data received'}), 400
    
    # lesson data
    lesson_id = data.get('lessonId')

    if lesson_id is None:
        return jsonify({'error': 'No lessonId received'}), 400

    """ if not lesson_id:
        return jsonify({'error': 'No lessonId received'}), 400 """
    
    lesson = Lesson.query.filter_by(id=lesson_id).first()

    if not lesson:
        return jsonify({'error': 'Lesson not found'}), 404
    
    #question number
    questions = Question.query.filter_by(lesson_id=lesson.id).all()
    if not questions:
        return jsonify({'error': 'No questions received'}), 400
    qustionNumber = len(questions)

    # coding exercise number
    codingExercises = CodingExercise.query.filter_by(lesson_id=lesson.id).all()
    if not codingExercises:
        return jsonify({'error': 'No coding exercises received'}), 400
    codingExerciseNumber = len(codingExercises)

    #score 
    try:
        user_id = get_user_id_from_token(request)
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Expired token"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Expired token"}), 401
    except Exception as e:
        return jsonify({"error": "Expired token"}), 401
    if not user_id:
        return jsonify({'error': str(e)}), 401
    user_progress = UserProgress.query.filter_by(lesson_id=lesson_id).filter_by(user_id=user_id).first()
    if not user_progress:
        score = 0
    if user_progress:
        score = user_progress.score
    
    return jsonify({
        "lessonTitle": lesson.title,
        "questionNumber": qustionNumber,
        "codingExerciseNumber": codingExerciseNumber,
        "score": score
    })