from extensions import db

class AuthProvider(db.Model):
    __tablename__ = 'auth_providers'

    id = db.Column(db.Integer, primary_key=True)
    provider_name = db.Column(db.Enum("google", "github", name="auth_provider_enum"), nullable=False)
    provider_user_id = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)