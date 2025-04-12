from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flasgger import Swagger

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    db.init_app(app)
    CORS(app)
    Swagger(app)

    from app.routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from app.commands import register_commands
    register_commands(app)

    with app.app_context():
        db.create_all()

    return app
