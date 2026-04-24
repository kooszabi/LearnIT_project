from Models.user_progress import UserProgress
from Models.user import User
from flask import Blueprint, request, jsonify
from extensions import db
import Services.auth as auth
from sqlalchemy import update
import jwt
import os
from Services.get_user_id import get_user_id_from_token

user_progress_bp = Blueprint('progress', __name__)
""" SECRET_KEY = os.getenv("SECRET_KEY") """

""" def get_user_id_from_token(req):
    auth_header = req.headers.get("Authorization")

    if not auth_header:
        return None
    
    try:
        token = auth_header.split(" ")[1]
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded["user_id"]
    except Exception as e:
        return None """
    


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