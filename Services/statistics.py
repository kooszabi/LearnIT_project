from Models.question import Question
from Models.coding_exercise import CodingExercise
from Models.lesson import Lesson
from Models.topic import Topic
from Models.user_progress import UserProgress
from Models.user import User
from extensions import db
from flask import Blueprint, jsonify, request
from Services.get_user_id import get_user_id_from_token

statistics_bp = Blueprint('statistics', __name__)
@statistics_bp.route('/get-statistics', methods=['GET'])
def get_statistics():
    user_id = get_user_id_from_token(request)
    if not user_id:
        print("No user_id found from token")
    

    user = User.query.filter_by(id=user_id).first()
    username = user.username
    print(username)


    # overall statistics
    completed_lessons = UserProgress.query.filter_by(user_id=user_id).count()
    print(f"\n\n\nCompleted lessons: {completed_lessons}\n\n\n")
    all_lessons = Lesson.query.count()
    print(f"\n\n\nAll lessons: {all_lessons}\n\n\n")
    remaining_lessons = all_lessons - completed_lessons
    print(f"\n\n\nRemaining lessons: {remaining_lessons}\n\n\n")
    overall_progress = (completed_lessons / all_lessons) * 100
    print(f"Overall progress: {overall_progress}")
    all_questions = Question.query.count()
    print(f"\n\n\nAll questions: {all_questions}\n\n\n")
    all_coding_exercises = CodingExercise.query.count()
    print(f"\n\n\nAll coding exercises: {all_coding_exercises}\n\n\n")

    completed_lesson_ids = [item.lesson_id for item in UserProgress.query.filter_by(user_id=user_id).all()]
    print(f"\n\n\n{completed_lesson_ids}\n\n\n")
    completed_questions = Question.query.filter(Question.lesson_id.in_(completed_lesson_ids)).count()
    print(f"\n\n\nCompleted questions: {completed_questions}\n\n\n")

    completed_coding_exercises = CodingExercise.query.filter(CodingExercise.lesson_id.in_(completed_lesson_ids)).count()
    print(f"\n\n\nCompleted coding exercises: {completed_coding_exercises}\n\n\n")

    remaining_questions = all_questions - completed_questions
    print(f"\n\n\Remaining questions: {remaining_questions}\n\n\n")
    remaining_coding_exercises = all_coding_exercises - completed_coding_exercises
    print(f"\n\n\Remaining coding exercises: {remaining_coding_exercises}\n\n\n")

    question_progress = (completed_questions / all_questions) * 100
    print(f"\n\n\Question progress: {question_progress}\n\n\n")
    coding_exercise_progress = (completed_coding_exercises / all_coding_exercises) * 100
    print(f"\n\n\Coding exercise progress: {coding_exercise_progress}\n\n\n")


    # specific statistics
    # topics
    topics = Topic.query.all()
    topics_progress_list = []
    for topic in topics:
        topic_id = topic.id
        all_topic_lesson = Lesson.query.filter(Lesson.topic_id == topic_id).count()
        completed_topic_lesson = Lesson.query.filter(Lesson.topic_id == topic_id, Lesson.id.in_(completed_lesson_ids)).count()
        topic_progress = (completed_topic_lesson / all_topic_lesson) * 100 if all_topic_lesson else 0
        topics_progress_list.append({
            "topic_id": topic.id,
            "topic_name": topic.name,
            "all_topic_lesson": all_topic_lesson,
            "completed_topic_lesson": completed_topic_lesson,
            "topic_progress": round(topic_progress, 2)
        })
        print(f"\n\n\nTopics progress list: {topics_progress_list}\n\n\n")

    # best and worst topics
    topic_average_score = []
    for best in topics:
        topic_id = best.id
        completed_lessons_in_topic = Lesson.query.filter(Lesson.topic_id == topic_id, Lesson.id.in_(completed_lesson_ids)).all()
        print(f"\n\n\nCompleted Lessons In Topic: {completed_lessons_in_topic}\n\n\n")
        scores = 0
        if not completed_lessons_in_topic:
            average_topic_score = scores
            topic_average_score.append({
                "topic_id": topic_id,
                "topic_name": best.name,
                "topic_result": average_topic_score
            })
        else:
            for item in completed_lessons_in_topic:
                scores += UserProgress.query.filter(UserProgress.user_id == user_id, UserProgress.lesson_id == item.id).first().score
            average_topic_score = round(scores / len(completed_lessons_in_topic), 2)
            topic_average_score.append({
                "topic_id": topic_id,
                "topic_name": best.name,
                "topic_result": average_topic_score
            })

    topic_average_score.sort(key=lambda topic: topic["topic_result"], reverse=True)
    print(f"\n\n\nThe Best Topic List (Sorted): {topic_average_score}\n\n\n")

    # best topic(s)
    highest_score = topic_average_score[0]["topic_result"]
    best_topic_result = [topic for topic in topic_average_score if topic["topic_result"] == highest_score]
    print(f"\n\n\nBest topic result: {best_topic_result}\n\n\n")
    # worst topic(s)
    lowest_score = topic_average_score[-1]["topic_result"]
    worst_topic_result = [topic for topic in topic_average_score if topic["topic_result"] == lowest_score]
    print(f"\n\n\nWorst topic result: {worst_topic_result}\n\n\n")





    #"best_topic": ,
    #"need_improvement_topic":,
    return jsonify({
        "username": username,
        "overall_statistics": {
            "completed_lessons": completed_lessons,
            "all_lessons": all_lessons,
            "remaining_lessons": remaining_lessons,
            "overall_progress": round(overall_progress, 2),
            "all_questions": all_questions,
            "all_coding_exercises": all_coding_exercises,
            "completed_questions": completed_questions,
            "completed_coding_exercises": completed_coding_exercises,
            "question_progress": round(question_progress, 2),
            "coding_exercise_progress": round(coding_exercise_progress, 2),
            "remaining_questions": remaining_questions,
            "remaining_coding_exercises": remaining_coding_exercises 
        },
        "topics_progress_list": topics_progress_list,
        "best_topic_result": best_topic_result,
        "wort_topic_result": worst_topic_result,
    })