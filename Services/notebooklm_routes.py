from Models.lesson import Lesson
from extensions import db
from flask import Blueprint, request, jsonify
from Services.notebooklm_services import NotebookLMService

notebooklm_bp = Blueprint('notebooklm', __name__)
service = NotebookLMService()

@notebooklm_bp.route('/generate-flashcards/<int:topic_id>', methods=['POST'])
async def generate_flashcards(topic_id):
    lessons_object = Lesson.query.filter(Lesson.topic_id == topic_id).all()
    if not lessons_object:
        return jsonify({
            "success": False,
            "message": "No lessons found for this topic"
        }), 404
    lessons = [lesson.content for lesson in lessons_object]

    try:
        flashcards_generation_result = await service.generate_lesson_flashcards(lessons)
        print(f"\n\n\nflashcards_generation_result: {flashcards_generation_result}\n\n\n")
        return flashcards_generation_result, 200
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@notebooklm_bp.route('/generate-quiz/<int:topic_id>', methods=['POST'])
async def generate_quiz(topic_id):
    lessons_object = Lesson.query.filter(Lesson.topic_id == topic_id).all()
    if not lessons_object:
        return jsonify({
                    "success": False,
                    "message": "No lessons found for this topic"
        }), 404
    lessons = [lesson.content for lesson in lessons_object]

    try:
        quiz_generation_result = await service.generate_lesson_quiz(lessons)
        print(f"\n\n\nflashcards_generation_result: {quiz_generation_result}\n\n\n")
        return quiz_generation_result, 200
    except Exception as e:
        return jsonify({
                    "success": False,
                    "message": str(e)
        }), 500