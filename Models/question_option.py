from extensions import db

class QuestionOption(db.Model):
    __tablename__ = 'question_options'

    id = db.Column(db.Integer, primary_key=True)
    question_option_text = db.Column(db.Text, nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)
    order_index = db.Column(db.Integer, nullable=False)

    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)

