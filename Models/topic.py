from extensions import db

class Topic(db.Model):
    __tablename__ = 'topics'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    order_index = db.Column(db.Integer, nullable=False)

    lessons = db.relationship('Lesson', backref='topic', lazy=True, cascade="all, delete-orphan")