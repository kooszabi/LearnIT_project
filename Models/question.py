from extensions import db

class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    type = db.Column(db.Enum("multiple_choice", "true_false", name="question_type_enum"), nullable=False)
    order_index = db.Column(db.Integer, nullable=False)

    options = db.relationship('QuestionOption', backref='question', lazy=True, cascade="all, delete-orphan")

    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'), nullable=False)    