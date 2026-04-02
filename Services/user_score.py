from Models.user_progress import UserProgress
from Models.user import User
from flask import Blueprint, request, jsonify
from extensions import db
import Services.auth as auth
from sqlalchemy import update
user_progress_bp = Blueprint('progress', __name__)

@user_progress_bp.route('/progress', methods=['POST'])
def user_progress():
    data = request.json
    # print('\n\nReceived data: ', data, '\n\n')
    if not data:
        return jsonify({'error': 'No data received'}), 400
    
    # lesson data
    lesson_id = data.get('lessonId')

    if not lesson_id:
        return jsonify({'error': 'No lessonId received'}), 400
    
    score = data.get('score')

    if not score:
        return jsonify({'error': 'No score received'}), 400
    
    email = data.get('email')

    if not email:
        return jsonify({'error': 'No email received'}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'No user_id received'}), 400

    user_id = user.id
    progress = UserProgress.query.filter_by(user_id=user_id).filter_by(lesson_id=lesson_id).first()

    if not progress:
        temp = UserProgress(
            score=score,
            user_id=user_id,
            lesson_id=lesson_id
        )
        db.session.add(temp)
        db.session.commit()

        return jsonify({'message': 'User progress created'})
    else:
        progress.score=score
        db.session.commit()

        return jsonify({'message': 'User progress updated'})