from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, LoginManager, login_user, logout_user, current_user, login_required
from flask_cors import CORS

# Create a Flask application instance
app = Flask(__name__)
app.config['SECRET_KEY'] = "SECRETKEY"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
CORS(app)  # Enable CORS for handling requests from a different domain

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Define the User model with an auto-incrementing integer ID
class User(UserMixin, db.Model):
    __tablename__ = 'login_information'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'Email not found'}), 404
    if not check_password_hash(user.password, password):
        return jsonify({'message': 'Incorrect password'}), 401
    
    login_user(user)
    return jsonify({
        'message': 'Login successful',
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
    }), 200


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already registered'}), 400

    hashed_password = generate_password_hash(
        password,
        method='pbkdf2:sha256',
        salt_length=8
    )
    new_user = User(
        name=name,
        email=email,
        password=hashed_password
    )
    db.session.add(new_user)
    db.session.commit()
    login_user(new_user)
    return jsonify({
        'message': 'Registration successful',
        'user': {
            'id': new_user.id,
            'name': new_user.name,
            'email': new_user.email
        }
    }), 201

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'}), 200

# Ensure the database and tables are created
@app.before_first_request
def create_tables():
    db.create_all()

# Run the application
if __name__ == '__main__':
    app.run(debug=True)
