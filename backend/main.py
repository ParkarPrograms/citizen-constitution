
from flask import Flask, render_template, redirect, flash, url_for, request
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
import wtforms
from wtforms.fields import EmailField
from wtforms.validators import DataRequired, URL, Email
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, login_user, LoginManager, login_required, current_user, logout_user


# Create a Flask application instance
app = Flask(__name__)
app.config['SECRET_KEY'] = "SECRETKEY"
Bootstrap(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)




db = SQLAlchemy(app)


# Define the User model
class User(UserMixin, db.Model):
    __tablename__ = 'login_information'
    id = db.Column(db.String(250), primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)


class Register(FlaskForm):
    user_id = wtforms.StringField("User ID: ", validators=[DataRequired()])
    name = wtforms.StringField("Name: ", validators=[DataRequired()])
    email = EmailField("Email:", validators=[DataRequired(), Email()])
    password = wtforms.PasswordField("Password: ", validators=[DataRequired()])
    submit = wtforms.SubmitField("submit")

class Login(FlaskForm):
    email = EmailField("Email:", validators=[DataRequired(), Email()])
    password = wtforms.PasswordField(validators=[DataRequired()])
    submit = wtforms.SubmitField("submit")

# Define a route for the root URL
@app.route('/')
def home():
    return render_template('welcome.html')

@app.route("/login", methods=['GET', 'POST'])
def login():
    form = Login()
    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data
        user = User.query.filter_by(email=email).first()
        if not user:
            flash("That email does not exist, please try again.")
            return redirect(url_for('login'))
        elif not check_password_hash(user.password, password):
            flash('Password incorrect, please try again.')
            return redirect(url_for('login'))
        else:

            login_user(user)
        return redirect(url_for('dashboard'))
    return render_template("login.html", form = form)


@app.route("/register", methods=['GET', 'POST'])
def register():
    form = Register()
    if form.validate_on_submit():
        if User.query.filter_by(id = form.user_id.data).first():
            flash("ID already taken. Please Try another one")
            return redirect(url_for('register'))
        if User.query.filter_by(email=form.email.data).first():
            flash("You have already registered. Log in instead.")
            return redirect(url_for('login'))
        hash_and_salted_password = generate_password_hash(
            form.password.data,
            method='pbkdf2:sha256',
            salt_length=8
        )
        new_user = User(
            id=form.user_id.data,
            name=form.name.data,
            email=form.email.data,
            password=hash_and_salted_password,
        )
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        return redirect(url_for('home'))
    return render_template("register.html", form=form)


@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', current_user=current_user)


@app.route('/lesson1')
def lesson1():
    return render_template('lesson1.html')

# with app.app_context():
#     db.create_all()


# Run the application
if __name__ == '__main__':
    app.run(debug=True)
