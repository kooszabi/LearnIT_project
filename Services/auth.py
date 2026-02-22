from flask import Blueprint, request, jsonify
from extensions import db
from Models.user import User
from Models.auth_provider import AuthProvider
from datetime import datetime
import os
from google.oauth2 import id_token
from google.auth.transport import requests
# from flask_cors import cross_origin
import requests as github_requests

auth_bp = Blueprint('auth', __name__)

GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')

@auth_bp.route('/google', methods=['POST'])
def google_login():
    token = request.json.get('token')
    if not token:
        return jsonify({'error': 'Token is missing'}), 400
    try:
        id_info = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        # print('id_info: ', id_info)

        provider_user_id = id_info.get('sub')
        email = id_info.get('email')
        username = id_info.get('name')
        created_at = datetime.utcnow()
    except ValueError:
        return jsonify({'error': 'Invalid token'}), 401
    
    user = User.query.filter_by(email=email).first()
    auth_provider = AuthProvider.query.filter_by(provider_user_id=provider_user_id).first()

    if not user and not auth_provider:
        user = User(
            username=username,
            email=email,
            created_at=created_at
        )
        db.session.add(user)
        db.session.commit()

        user = User.query.filter_by(email=email).first()
        auth_provider = AuthProvider(
            provider_name = 'google',
            provider_user_id = provider_user_id,
            created_at = created_at,
            user_id = user.id
        )
        db.session.add(auth_provider)
        db.session.commit()

        return jsonify({
            'message': 'User created with google auth',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'created_at': user.created_at,
                'proivider_user_id': provider_user_id,
                'provider_name': auth_provider.provider_name
            }
        }), 201
    
    elif user and not auth_provider:
        auth_provider = AuthProvider(
            provider_name = 'google',
            provider_user_id = provider_user_id,
            created_at = created_at,
            user_id = user.id
        )
        db.session.add(auth_provider)
        db.session.commit()

        return jsonify({'message': 'Auth provider linked to existing user'}), 201
    
    else:
        return jsonify({'message': 'User already exists'}), 200
    

@auth_bp.route('/github', methods=['POST'])
# @cross_origin(origin='http://localhost:5173')
def github_login():
    code = request.json.get('code')
    if not code:
        return jsonify({'error': 'Code is missing'}), 400
    

    token_response = github_requests.post(
        "https://github.com/login/oauth/access_token",
        headers={
            "Accept": "application/json"
        },
        data={
            "client_id": os.getenv("GITHUB_CLIENT_ID"),
            "client_secret": os.getenv("GITHUB_CLIENT_SECRET"),
            "code": code,
        },
    )

    token_response_data = token_response.json()
    access_token = token_response_data.get("access_token")

    if not access_token:
        return jsonify({'error': 'Failed to obtain access token'}), 401


    user_response = github_requests.get(
        "https://api.github.com/user",
        headers={
            "Authorization": f"Bearer {access_token}"
        }
    )
    user_email_response = github_requests.get(
        "https://api.github.com/user/emails",
        headers={
            "Authorization": f"Bearer {access_token}"
        }
    )

    user_data = user_response.json()
    if not user_data:
        return jsonify({'error': 'Invalid token'}), 401
    # print('user_data: ', user_data)
    username = user_data.get('login')
    provider_user_id = user_data.get('id')
    created_at = datetime.utcnow()


    user_email_data = user_email_response.json()
    if not user_email_data:
        return jsonify({'error': 'Failed to fetch user email'}), 401
    # print('user_email_data: ', user_email_data)


    primary_email = next((e["email"] for e in user_email_data if e["primary"]), None)
    # print('primary_email: ', primary_email)


    user = User.query.filter_by(email=primary_email).first()
    auth_provider = AuthProvider.query.filter_by(provider_user_id=provider_user_id).first()

    if not user and not auth_provider:
        user = User(
            username = username,
            email = primary_email,
            created_at = created_at
        )
        db.session.add(user)
        db.session.commit()

        user = User.query.filter_by(email=primary_email).first()
        auth_provider = AuthProvider(
            provider_name = 'github',
            provider_user_id = provider_user_id,
            created_at = created_at,
            user_id = user.id
        )
        db.session.add(auth_provider)
        db.session.commit()

        return jsonify({
            'message': 'User created with github auth',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'created_at': user.created_at,
                'proivider_user_id': provider_user_id,
                'provider_name': auth_provider.provider_name
            }
        }), 201


    elif user and not auth_provider:
        auth_provider = AuthProvider(
            provider_name = 'github',
            provider_user_id = provider_user_id,
            created_at = created_at,
            user_id = user.id
        )
        db.session.add(auth_provider)
        db.session.commit()

        return jsonify({'message': 'Auth provider linked to existing user'}), 201

    else:
        return jsonify({'message': 'User already exists'}), 200

