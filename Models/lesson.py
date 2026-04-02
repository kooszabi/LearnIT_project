from extensions import db

class Lesson(db.Model):
    __tablename__ = 'lessons'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.JSON, nullable=False)
    order_index = db.Column(db.Integer, nullable=False)

    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)

    questions = db.relationship('Question', backref='lesson', lazy=True, cascade="all, delete-orphan")
    coding_exercises = db.relationship('CodingExercise', backref='lesson', lazy=True, cascade="all, delete-orphan")
    user_progress = db.relationship('UserProgress', backref='lesson', lazy=True, cascade="all, delete-orphan")