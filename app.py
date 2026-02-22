from flask import Flask
from extensions import db
from flask_migrate import Migrate
from flask_cors import CORS
from Services.auth import auth_bp
from Services.card import card_bp
from Services.lesson import lesson_bp
from Services.question import question_bp
from Services.coding_exercise import coding_exercise_bp
from Services.ollama_api import ollama_bp
# database models
from Models.user import User
from Models.auth_provider import AuthProvider
from Models.topic import Topic
from Models.lesson import Lesson
from Models.question import Question
from Models.question_option import QuestionOption
from Models.coding_exercise import CodingExercise

def create_app():

    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
    app.config.from_prefixed_env()


    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///learn_it.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


    db.init_app(app)
    migrate = Migrate(app, db)

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(card_bp, url_prefix='/api/cards')
    app.register_blueprint(lesson_bp, url_prefix='/api/lessons')
    app.register_blueprint(question_bp, url_prefix='/api/questions')
    app.register_blueprint(coding_exercise_bp, url_prefix='/api/coding-exercises')
    app.register_blueprint(ollama_bp, url_prefix='/api/fix-codes')

    @app.route('/')
    def home():
        return "Hello, World!"

    return app