import uuid
from datetime import datetime
from enum import unique

from . import db

class Profile(db.Model):
    __tablename__ = 'profiles'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(255), nullable=False)
    cover_image = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.Text)
    location = db.Column(db.String(255))
    social = db.Column(db.JSON, nullable=True)
    contact = db.Column(db.JSON, nullable=True)
    type = db.Column(db.String(20), nullable=False)  # 'business' or 'artist'

    artist_profile = db.relationship('ArtistProfile', back_populates='profile', uselist=False)
    business_profile = db.relationship('BusinessProfile', back_populates='profile', uselist=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "title": self.title,
            "avatar": self.avatar,
            "coverImage": self.cover_image,
            "bio": self.bio,
            "location": self.location,
            "contact": self.contact,
            "social": self.social,
            "type": self.type
        }

class ArtistProfile(db.Model):
    __tablename__ = 'artist_profiles'

    id = db.Column(db.Integer, db.ForeignKey('profiles.id'), primary_key=True)
    category = db.Column(db.String(255), db.ForeignKey('categories.name'), nullable=True)
    stats = db.Column(db.JSON, nullable=False)  # { followers, following, projects }
    skills = db.Column(db.JSON, nullable=False)  # List of skills
    portfolio = db.Column(db.JSON, nullable=False)  # List of portfolio items (title, image)

    profile = db.relationship('Profile', back_populates='artist_profile')

    def to_dict(self):
        profile_dict = self.profile.to_dict()  # Get the base profile's dictionary
        profile_dict.update({
            "category": self.category,
            "stats": self.stats,
            "skills": self.skills,
            "portfolio": self.portfolio
        })
        return profile_dict

# Business Profile model
class BusinessProfile(db.Model):
    __tablename__ = 'business_profiles'
    id = db.Column(db.Integer, db.ForeignKey('profiles.id'), primary_key=True)

    stats = db.Column(db.JSON)  # Flexible stats for businesses (e.g., revenue, clients)
    services = db.Column(db.JSON)  # List of services offered by the business
    featured_work = db.Column(db.JSON)  # List of featured works (title, image)

    contact_phone = db.Column(db.String(255))
    contact_address = db.Column(db.Text)

    profile = db.relationship('Profile', back_populates='business_profile')
    # profile = db.relationship('Profile', backref=db.backref('business_profile', uselist=False))

    def to_dict(self):
        base_dict = self.profile.to_dict()  # Access BaseProfileData's to_dict
        base_dict.update({
            "stats": self.stats,
            "services": self.services,
            "featured_work": self.featured_work,
            "contact": {
                **base_dict["contact"],
                "phone": self.contact_phone,
                "address": self.contact_address
            }
        })
        return base_dict

    def __repr__(self):
        return f'<BusinessProfile {self.profile.name}>'


class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    author_id = db.Column(db.String, db.ForeignKey('profiles.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow())
    content = db.Column(db.Text, nullable=False)
    likes = db.Column(db.Integer, default=0)

    # Optional images: stored as comma-separated URLs (or use a separate table if you prefer)
    images = db.Column(db.JSON)
    # images = db.Column(db.ARRAY(db.String), nullable=True)

    # relationships
    comments = db.relationship('Comment', backref='post', lazy=True)

    def to_dict(self):
        """
        Convert the Post object into a dictionary for JSON serialization.
        """
        return {
            "id": self.id,
            "author_id": self.author_id,
            "content": self.content,
            "images": self.images,  # Images will be a list of strings (URLs)
            "likes": self.likes,
            "comments": [comment.to_dict() for comment in self.comments],  # Serialize comments
            "timestamp": self.timestamp
        }

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    post_id = db.Column(db.String, db.ForeignKey('posts.id'), nullable=True)
    author_id = db.Column(db.String, db.ForeignKey('profiles.id'), nullable=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        """
        Convert the Comment object into a dictionary for JSON serialization.
        """
        return {
            "id": self.id,
            "author_id": self.author_id,
            "content": self.content,
            "timestamp": self.timestamp
        }

# Define the Category model
class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)

    # artists = db.relationship("ArtistProfile", backref="category", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }

    def __repr__(self):
        return f"<Category {self.name}>"


# Initialize the categories
