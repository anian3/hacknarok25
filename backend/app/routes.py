from datetime import datetime

from flasgger import swag_from

from . import db

from flask import Blueprint, jsonify, request
from app.models import Profile, BusinessProfile, ArtistProfile, Post, Comment, Category

main = Blueprint("main", __name__)

@main.route('/categories', methods=['GET'])
def get_categories():
    """
    Get all categories
    ---
    responses:
      200:
        description: A list of all category names
        content:
          application/json:
            schema:
              type: array
              items:
                type: string
    """
    categories = Category.query.all()
    return jsonify([category.name for category in categories])
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

@main.route('/artist/<artist_id>', methods=['DELETE'])
def delete_artist(artist_id):
    """
    Delete an artist profile by ID
    ---
    parameters:
      - name: artist_id
        in: path
        required: true
        description: The ID of the artist profile to be deleted.
        schema:
          type: string
    responses:
      200:
        description: Artist profile deleted successfully.
      404:
        description: Artist profile not found.
    """
    # Find the artist profile by ID
    artist = ArtistProfile.query.get(artist_id)

    if not artist:
        return jsonify({"message": "Artist profile not found"}), 404

    db.session.delete(artist)
    db.session.commit()

    return jsonify({"message": "Artist profile deleted successfully"}), 200

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
              Get an artist profile by ID
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



api = Blueprint('api', __name__)

# Post Endpoints
@main.route('/post', methods=['POST'])
def create_post():
    """
    Create a new post
    ---
    parameters:
      - in: body
        name: post
        required: true
        schema:
          type: object
          properties:
            author_id:
              type: string
              description: The ID of the profile author
            content:
              type: string
              description: The content of the post
            images:
              type: array
              items:
                type: string
              description: A list of image URLs for the post
            likes:
              type: integer
              description: The number of likes for the post
            comments:
              type: array
              items:
                type: object
                properties:
                  author_id:
                    type: string
                    description: The ID of the profile author
                  content:
                    type: string
                    description: The content of the comment
                  timestamp:
                    type: string
                    description: The timestamp of the comment
              description: A list of comments on the post
            timestamp:
              type: string
              description: The timestamp when the post was created
    responses:
      201:
        description: Post created successfully
        schema:
          type: object
          properties:
            message:
              type: string
            post:
              type: object
              properties:
                id:
                  type: integer
                author_id:
                  type: string
                content:
                  type: string
                images:
                  type: array
                  items:
                    type: string
                likes:
                  type: integer
                comments:
                  type: array
                  items:
                    type: object
                    properties:
                      author_id:
                        type: string
                      content:
                        type: string
                      timestamp:
                        type: string
    """
    # Get the data from the request body
    data = request.get_json()

    # Check if required fields are present
    if not data.get("author_id") or not data.get("content"):
        return jsonify({"message": "Missing required fields"}), 400

    # Create the post
    post = Post(
        author_id=data["author_id"],
        content=data["content"],
        images=data.get("images", []),
        likes=data.get("likes", 0),
        comments=data.get("comments", []),
        timestamp=data["timestamp"]
    )

    # Add the post to the database session
    db.session.add(post)
    db.session.commit()

    return jsonify({"message": "Post created successfully", "post": post.to_dict()}), 201



@main.route('/post/<int:post_id>', methods=['GET'])
def get_post(post_id):
    """
    Get a specific post by its ID
    ---
    parameters:
      - in: path
        name: post_id
        required: true
        type: integer
        description: The ID of the post to retrieve
    responses:
      200:
        description: A post object
        schema:
          type: object
          properties:
            id:
              type: integer
            author_id:
              type: string
            content:
              type: string
            images:
              type: array
              items:
                type: string
            likes:
              type: integer
            comments:
              type: array
              items:
                type: object
                properties:
                  author_id:
                    type: string
                  content:
                    type: string
                  timestamp:
                    type: string
            timestamp:
              type: string
      404:
        description: Post not found
    """
    post = Post.query.get(post_id)

    # If post is not found, return an error
    if not post:
        return jsonify({"message": "Post not found"}), 404

    # Return the serialized post data using the to_dict method
    return jsonify(post.to_dict()), 200

def get_posts():
    posts = Post.query.all()
    return jsonify([p.to_dict for p in posts])


# Comment Endpoints
@main.route('/comment', methods=['POST'])
def create_comment():
    """
    Create a new comment on a post
    ---
    parameters:
      - in: body
        name: comment
        required: true
        schema:
          type: object
          properties:
            post_id:
              type: string
              description: The ID of the post the comment is related to
            author_id:
              type: string
              description: The ID of the profile author of the comment
            content:
              type: string
              description: The content of the comment
            timestamp:
              type: string
              description: The timestamp of the comment creation
    responses:
      201:
        description: Comment created successfully
        schema:
          type: object
          properties:
            message:
              type: string
            comment:
              type: object
              properties:
                id:
                  type: string
                post_id:
                  type: string
                author_id:
                  type: string
                content:
                  type: string
                timestamp:
                  type: string
    """
    # Get the data from the request body
    data = request.get_json()

    # Check if required fields are present
    if not data.get("post_id") or not data.get("author_id") or not data.get("content"):
        return jsonify({"message": "Missing required fields"}), 400

    # Convert the timestamp from string to datetime object
    timestamp_str = data.get("timestamp")
    if timestamp_str:
        try:
            timestamp = datetime.strptime(timestamp_str, "%Y-%m-%dT%H:%M:%SZ")
        except ValueError:
            return jsonify({"message": "Invalid timestamp format. Please use 'YYYY-MM-DDTHH:MM:SSZ'"}), 400
    else:
        timestamp = datetime.utcnow()  # default to current UTC time if not provided

    # Create a new comment
    comment = Comment(
        post_id=data["post_id"],
        author_id=data["author_id"],
        content=data["content"],
        timestamp=timestamp  # Use the datetime object
    )

    # Add the comment to the database session
    db.session.add(comment)
    db.session.commit()

    return jsonify({"message": "Comment created successfully", "comment": comment.to_dict()}), 201

# @api.route('/comments', methods=['POST'])
# @swag_from({
#     'tags': ['Comment'],
#     'description': 'Create a new comment.',
#     'parameters': [
#         {
#             'name': 'comment',
#             'in': 'body',
#             'required': True,
#             'schema': {
#                 'type': 'object',
#                 'properties': {
#                     'post_id': {'type': 'string'},
#                     'author_id': {'type': 'string'},
#                     'content': {'type': 'string'}
#                 },
#                 'example': {
#                     'post_id': '1',
#                     'author_id': '123',
#                     'content': 'This is a comment!'
#                 }
#             }
#         }
#     ],
#     'responses': {
#         '201': {
#             'description': 'Comment added successfully',
#             'schema': {
#                 'type': 'object',
#                 'properties': {
#                     'message': {'type': 'string'},
#                     'id': {'type': 'string'}
#                 }
#             }
#         }
#     }
# })
def create_comment():
    data = request.get_json()
    comment = Comment(
        post_id=data['post_id'],
        author_id=data['author_id'],
        content=data['content']
    )
    db.session.add(comment)
    db.session.commit()
    return jsonify({"message": "Comment added", "id": comment.id}), 201

@main.route('/comment/<int:comment_id>', methods=['GET'])
def get_comment(comment_id):
    """
    Get a specific comment by its ID
    ---
    parameters:
      - in: path
        name: comment_id
        required: true
        type: integer
        description: The ID of the comment to retrieve
    responses:
      200:
        description: A comment object
        schema:
          type: object
          properties:
            id:
              type: integer
            author_id:
              type: string
            content:
              type: string
            timestamp:
              type: string
      404:
        description: Comment not found
    """
    # Retrieve the comment from the database
    comment = Comment.query.get(comment_id)

    # If comment is not found, return an error
    if not comment:
        return jsonify({"message": "Comment not found"}), 404

    # Return the serialized comment data using the to_dict method
    return jsonify(comment.to_dict()), 200

import os
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static/uploads/images')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@main.route('/upload_image', methods=['POST'])
def upload_image():
    """
       Upload an image and return the file path
       ---
       parameters:
         - in: formData
           name: file
           type: file
           required: true
           description: The image file to be uploaded
       responses:
         200:
           description: File uploaded successfully
           schema:
             type: object
             properties:
               message:
                 type: string
                 example: "File uploaded"
               file_path:
                 type: string
                 example: "/static/uploads/images/your_image.jpg"
         400:
           description: Invalid file or no file selected
           schema:
             type: object
             properties:
               message:
                 type: string
                 example: "No file part"
       """
    file = request.files.get('file')

    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400

    if file and allowed_file(file.filename):
        # Create the directory if it doesn't exist
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)

        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)

        return jsonify({"message": "File uploaded", "file_path": file_path}), 200

    return jsonify({"message": "Invalid file type"}), 400

