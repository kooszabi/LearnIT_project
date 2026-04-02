from extensions import db

class UserProgress(db.Model):
    __tablename__ = 'users_progress'

    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Float, default=0)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'), nullable=False)

    __table_args__ = (
        db.UniqueConstraint('user_id', 'lesson_id', name='unique_user_lesson'),
    )