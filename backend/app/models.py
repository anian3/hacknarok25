from . import db

class Profile(db.Model):
    __tablename__ = 'profiles'

    id = db.Column(db.String(50), primary_key=True, unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(255), nullable=False)
    cover_image = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.Text)
    location = db.Column(db.String(255))
    contact_email = db.Column(db.String(255))
    contact_website = db.Column(db.String(255))
    contact_social = db.Column(db.JSON)  # Stores social links as a JSON object
    type = db.Column(db.String(20), nullable=False)  # 'business' or 'artist'

    artist_profile = db.relationship('ArtistProfile', back_populates='profile', uselist=False)
    business_profile = db.relationship('BusinessProfile', back_populates='profile', uselist=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "title": self.title,
            "avatar": self.avatar,
            "cover_image": self.cover_image,
            "bio": self.bio,
            "location": self.location,
            "contact": {
                "email": self.contact_email,
                "website": self.contact_website,
                "social": self.contact_social
            },
            "type": self.type
        }
# Artist Profile model
class ArtistProfile(db.Model):
    __tablename__ = 'artist_profiles'
    id = db.Column(db.String, db.ForeignKey('profiles.id'), primary_key=True)

    category = db.Column(db.String(255), nullable=False)
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

    def __repr__(self):
        return f'<ArtistProfile {self.name}>'

# Business Profile model
class BusinessProfile(db.Model):
    __tablename__ = 'business_profiles'
    id = db.Column(db.String, db.ForeignKey('profiles.id'), primary_key=True)

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

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }
