
from . import db

from flask import Blueprint, jsonify, request
from app.models import User, Profile

main = Blueprint("main", __name__)

@main.route('/profile/', methods=['GET'])
def get_profiles():
    profiles = Profile.query.all()
    return jsonify([p.to_dict() for p in profiles]), 200

@main.route('/profile/<profile_id>', methods=['GET'])
def get_profile(profile_id):
    # Query the profile by ID
    profile = Profile.query.get(profile_id)

    if profile:
        # Return the profile data in JSON format
        return jsonify(profile.to_dict()), 200
    else:
        # Return a message if the profile is not found
        return jsonify({"message": "Profile not found"}), 404



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
