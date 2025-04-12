
from . import db

from flask import Blueprint, jsonify, request
from app.models import User

main = Blueprint("main", __name__)

@main.route("/users")
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return jsonify({"message": "Welcome to the Flask backend!"})

@main.route('/users', methods=['GET'])
def get_users():
    """
    Get list of users
    ---
    responses:
      200:
        description: A list of users
        schema:
          type: array
          items:
            properties:
              id:
                type: integer
              username:
                type: string
              email:
                type: string
    """
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@main.route('/users', methods=['POST'])
def add_user():
    """
    Add a new user
    ---
    parameters:
      - in: body
        name: user
        required: true
        schema:
          properties:
            username:
              type: string
            email:
              type: string
    responses:
      201:
        description: User created successfully
    """
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201
