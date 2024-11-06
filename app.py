from flask import Flask, render_template, flash, redirect, url_for, session, request, jsonify
import wikipedia
from forms import RegistrationForm, LoginForm
from models import db, User, Blog  # Import the new Blog model
from flask_bcrypt import Bcrypt
from recommender import recommend_breed

visitor_count = 0

def create_app():
    app = Flask(__name__)

    # Set a secret key for CSRF protection
    app.config['SECRET_KEY'] = 'abcdefghij'                      
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/flask_auth_db'

    bcrypt = Bcrypt()

    db.init_app(app)
    bcrypt.init_app(app)

    with app.app_context():
        db.create_all()

    @app.route('/')
    def index():
        return render_template("home.html")
    
    @app.route('/login', methods=['GET', 'POST'])
    def login():
        form = LoginForm()
        if form.validate_on_submit():
            user = User.query.filter_by(email=form.email.data).first()
            if user and bcrypt.check_password_hash(user.password, form.password.data):
                session['user_id'] = user.id
                session['username'] = user.username
                flash('You have been logged in!', 'success')
                return redirect(url_for('dashboard'))
        return render_template("login.html", form=form)

    @app.route("/register", methods=['GET', 'POST'])
    def register():
        form = RegistrationForm()
        if form.validate_on_submit():
            hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
            user = User(username=form.username.data, email=form.email.data, password=hashed_password)
            db.session.add(user)
            db.session.commit()
            flash('Your account has been created!', 'success')
            return redirect(url_for('login')) 
        return render_template("register.html", title='Register', form=form)
    
    @app.route('/recommend', methods=['POST'])
    def recommend():
        user_input = request.form['requirement']
        breed_name, image_url = recommend_breed(user_input)  # Fetch both breed name and image URL
        summary = wikipedia.summary(breed_name)
        return render_template('result.html', breed=breed_name.title(), image_url=image_url,summary=summary)  # Pass image URL to template

    # New route to handle blog submission
    @app.route('/added', methods=['POST'])
    def add_blog():
        imageSrc = request.form['imageSrc']
        title = request.form['title']
        date = request.form['date']
        author = request.form['author']
        description = request.form['description']
        introduction = request.form['introduction']
        details = request.form['details']
        conclusion = request.form['conclusion']
        tags = request.form['tags']

        new_blog = Blog(
            imageSrc=imageSrc,
            title=title,
            date=date,
            author=author,
            description=description,
            introduction=introduction,
            details=details,
            conclusion=conclusion,
            tags=tags
        )
        
        db.session.add(new_blog)
        db.session.commit()
        flash('Your blog has been added!', 'success')
        return redirect(url_for('blogs'))

    # Additional Routes
    @app.route('/dashboard')
    def dashboard():
        return render_template("dashboard.html")

    @app.route('/about')
    def about():
        return render_template("about.html")

    @app.route('/services')
    def services():
        return render_template("services.html")

    @app.route('/blogs')
    def blogs():
        return render_template("blogs.html")

    @app.route('/contact')
    def contact():
        return render_template("contact.html")

    @app.route('/result')
    def result():
        return render_template("result.html")    
    
    @app.route('/postedblogs')
    def posted_blogs():
        blogs = Blog.query.all()  # Fetch all blogs from the database
        return render_template('postedblogs.html', blogs=blogs)
    


    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
