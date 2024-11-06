from flask_sqlalchemy import SQLAlchemy

# Initialize extensions
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

class Blog(db.Model):  # New Blog model
    id = db.Column(db.Integer, primary_key=True)
    imageSrc = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, nullable=False)
    author = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    introduction = db.Column(db.Text, nullable=False)
    details = db.Column(db.Text, nullable=False)
    conclusion = db.Column(db.Text, nullable=False)
    tags = db.Column(db.String, nullable=False)
