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
