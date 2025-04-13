
from . import db

from flask import Blueprint, jsonify, request
from app.models import User, Profile, BusinessProfile, ArtistProfile

main = Blueprint("main", __name__)

@main.route('/artist_profile', methods=['POST'])
def create_artist_profile():
    """
       Create a new artist profile
       ---
       parameters:
         - in: body
           name: artist_profile
           required: true
           schema:
             type: object
             properties:
               id:
                 type: string
               name:
                 type: string
               title:
                 type: string
               avatar:
                 type: string
               cover_image:
                 type: string
               bio:
                 type: string
               location:
                 type: string
               contact_email:
                 type: string
               contact_website:
                 type: string
               contact_social:
                 type: object
                 additionalProperties:
                   type: string
               type:
                 type: string
               category:
                 type: string
               stats:
                 type: object
                 properties:
                   followers:
                     type: integer
                   following:
                     type: integer
                   projects:
                     type: integer
               skills:
                 type: array
                 items:
                   type: string
               portfolio:
                 type: array
                 items:
                   type: object
                   properties:
                     title:
                       type: string
                     image:
                       type: string
                       format: uri
       responses:
         201:
           description: Artist profile created successfully
       """
    # Get the data from the request body
    data = request.get_json()

    # Check if required fields are present
    if not data.get("id") or not data.get("name") or not data.get("category"):
        return jsonify({"message": "Missing required fields"}), 400

    base_profile = Profile(
        id=data["id"],
        name=data["name"],
        title=data["title"],
        avatar=data.get("avatar", ""),
        cover_image=data.get("cover_image", ""),
        bio=data.get("bio", ""),
        location=data.get("location", ""),
        contact_email=data.get("contact_email", ""),
        contact_website=data.get("contact_website", ""),
        contact_social=data.get("contact_social", {}),
        type=data["type"]
    )

    # Create the artist profile
    artist_profile = ArtistProfile(
        id=data["id"],  # Linking to the base profile's id
        category=data["category"],  # Category of the artist (must be provided)
        stats=data.get("stats", {}),
        skills=data.get("skills", []),
        portfolio=data.get("portfolio", [])
    )

    # Add both the base profile and the artist profile to the session
    db.session.add(base_profile)
    db.session.add(artist_profile)

    # Commit the changes to the database
    db.session.commit()

    # Return a success message with the profile data
    return jsonify({"message": "Artist profile created successfully", "profile": artist_profile.to_dict()}), 201


@main.route('/profile/<profile_id>', methods=['DELETE'])
def delete_profile(profile_id):
    """
      Delete a by id
      Parameters:
        - profile_id (string): The ID of the profile to be deleted.

      Responses:
        200:
          description: Profile  deleted successfully.
        404:
          description: Profile not found.
      """
    # Find the base profile by ID
    profile = Profile.query.get(profile_id)

    if not profile:
        return jsonify({"message": "Profile not found"}), 404

    db.session.delete(profile)
    db.session.commit()

    return jsonify({"message": "Profile deleted successfully"}), 200

@main.route('/artist_profile/', methods=['GET'])
def get_artist_profiles():
    """
               Get all artist profiles
               ---
               responses:
                  200:
                    description: A list of profiles
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
    artists = ArtistProfile.query.all()
    return jsonify([a.to_dict() for a in artists]), 200

@main.route('/artist_profile/<profile_id>', methods=['GET'])
def get_artist_profile_by_id(profile_id):
    """
              Get a artist profile by ID
              ---
              parameters:
                - name: profile_id
                  in: path
                  type: string
                  required: true
                  description: The ID of the profile
              responses:
                200:
                  description: The profile details
                  schema:
                    type: object
                    properties:
                      id:
                        type: string
                      name:
                        type: string
                      title:
                        type: string
              """
    # Query the artist profile by ID
    artist_profile = ArtistProfile.query.get(profile_id)

    if artist_profile:
        # Return the artist profile data in JSON format
        return jsonify(artist_profile.to_dict()), 200
    else:
        # Return a message if the profile is not found
        return jsonify({"message": "Artist profile not found"}), 404


@main.route('/business_profile', methods=['POST'])
def create_business_profile():
    """
       Create a new business profile
       ---
       parameters:
         - in: body
           name: business_profile
           required: true
           schema:
             type: object
             properties:
               id:
                 type: string
               name:
                 type: string
               title:
                 type: string
               avatar:
                 type: string
               cover_image:
                 type: string
               bio:
                 type: string
               location:
                 type: string
               contact_email:
                 type: string
               contact_website:
                 type: string
               contact_social:
                 type: object
               type:
                 type: string
               stats:
                 type: object
               services:
                 type: array
                 items:
                   type: string
               featured_work:
                 type: array
                 items:
                   type: object
                   properties:
                     title:
                       type: string
                     image:
                       type: string
               contact_phone:
                 type: string
               contact_address:
                 type: string
       responses:
         201:
           description: Business profile created successfully
       """
    # Get the data from the request body
    data = request.get_json()

    # Check if required fields are present
    if not data.get("id") or not data.get("name") or not data.get("title"):
        return jsonify({"message": "Missing required fields"}), 400

    # Create the base profile
    base_profile = Profile(
        id=data["id"],
        name=data["name"],
        title=data["title"],
        avatar=data.get("avatar", ""),
        cover_image=data.get("cover_image", ""),
        bio=data.get("bio", ""),
        location=data.get("location", ""),
        contact_email=data.get("contact_email", ""),
        contact_website=data.get("contact_website", ""),
        contact_social=data.get("contact_social", {}),
        type=data["type"]
    )

    # Create the business profile
    business_profile = BusinessProfile(
        id=data["id"],  # Linking to the base profile's id
        stats=data.get("stats", {}),
        services=data.get("services", []),
        featured_work=data.get("featured_work", []),
        contact_phone=data.get("contact_phone", ""),
        contact_address=data.get("contact_address", "")
    )

    # Add both the base profile and the business profile to the session
    db.session.add(base_profile)
    db.session.add(business_profile)

    # Commit the changes to the database
    db.session.commit()

    # Return a success message with the profile data
    return jsonify({"message": "Business profile created successfully", "profile": business_profile.to_dict()}), 201

@main.route('/business_profile/', methods=['GET'])
def get_business_profiles():
    """
           Get all business profiles
           ---
           responses:
              200:
                description: A list of profiles
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
    profiles = BusinessProfile.query.all()
    return jsonify([p.to_dict() for p in profiles]), 200

@main.route('/business_profile/<profile_id>', methods=['GET'])
def get_business_profile_by_id(profile_id):
    """
           Get a business profile by ID
           ---
           parameters:
             - name: profile_id
               in: path
               type: string
               required: true
               description: The ID of the profile
           responses:
             200:
               description: The profile details
               schema:
                 type: object
                 properties:
                   id:
                     type: string
                   name:
                     type: string
                   title:
                     type: string
           """
    # Query the business profile by ID
    business_profile = BusinessProfile.query.get(profile_id)

    if business_profile:
        # Return the business profile data in JSON format
        return jsonify(business_profile.to_dict()), 200
    else:
        # Return a message if the profile is not found
        return jsonify({"message": "Business profile not found"}), 404


@main.route('/profile/', methods=['GET'])
def get_profiles():
    """
              Get all profiles
              ---
              responses:
                 200:
                   description: A list of profiles
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
    profiles = Profile.query.all()
    return jsonify([p.to_dict() for p in profiles]), 200

@main.route('/profile/<profile_id>', methods=['GET'])
def get_profile(profile_id):
    """
       Get a profile by ID
       ---
       parameters:
         - name: profile_id
           in: path
           type: string
           required: true
           description: The ID of the profile
       responses:
         200:
           description: The profile details
           schema:
             type: object
             properties:
               id:
                 type: string
               name:
                 type: string
               title:
                 type: string
       """
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
