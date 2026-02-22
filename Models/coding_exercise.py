from extensions import db

class CodingExercise(db.Model):
    __tablename__ = 'coding_exercises'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    starter_code = db.Column(db.Text, nullable=False)
    order_index = db.Column(db.Integer, nullable=False)

    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'), nullable=False)
