from datetime import datetime

from flask.cli import with_appcontext
import click
from app import db
from app.models import Profile, BusinessProfile, Post, Category
from app.models import ArtistProfile

@click.command(name="create_sample_artist_profile")
@with_appcontext
def create_sample_artist_profile():
    # Create a sample artist profile
    base_profile = Profile(
        id="artist_6",  # Unique ID
        name="Elena Sanchez",  # Name field
        title="Pianist, Composer",  # Title
        avatar="https://example.com/sanchena_avatar.jpg",  # Avatar
        cover_image="https://example.com/sanchena_cover.jpg",  # Cover Image
        bio="A passionate pianist.",  # Bio
        location="Havana ,Cuba",  # Location
        contact_email="elena.doe@example.com",  # Email
        contact_website="https://sanchenaportfolio.com",  # Website
        contact_social={"linkedin": "https://linkedin.com/in/sanchena", "twitter": "https://twitter.com/sanchena"},  # Social links
        type="artist"  # Type (artist)
    )

    # computer_graphics = Category.query.filter_by(name="Computer Graphics").first()
    # if not computer_graphics:
    #     computer_graphics="Computer Graphics"
    # Create the artist profile
    artist_profile = ArtistProfile(
        id="artist_6",  # Linking to the base profile's id
        category = "Music",
        stats={"followers": 5000, "following": 0, "projects": 250},  # Stats
        skills=["Piano", "Composing", "Sound Design"],
        portfolio=[{"title": "Symphony in C", "image": "https://example.com/symphony_c.jpg"},
        {"title": "Electronic Composition", "image": "https://example.com/electronic_composition.jpg"}
    ]
    )

    db.session.add(base_profile)
    db.session.add(artist_profile)
    db.session.commit()

    print("Sample artist profile created successfully!")

@click.command(name="create_sample_business_profile")
@with_appcontext
def create_sample_business_profile():
    # Create a sample base profile instance (same as before)
    sample_profile = Profile(
        id="business_1",
        name="Tech Solutions Inc.",
        title="Software Development Company",
        avatar="https://example.com/business_avatar.jpg",
        cover_image="https://example.com/business_cover.jpg",
        bio="We deliver cutting-edge software solutions.",
        location="San Francisco, CA",
        contact_email="contact@techsolutions.com",
        contact_website="https://techsolutions.com",
        contact_social={"linkedin": "https://linkedin.com/company/techsolutions"},
        type="business"
    )

    # Create a sample business profile instance
    sample_business_profile = BusinessProfile(
        id="business_1",  # Linking to the base profile's id
        stats={"revenue": 5000000, "clients": 150},
        services=["Web Development", "Mobile App Development", "Cloud Solutions"],
        featured_work=[{"title": "AI for Finance", "image": "https://example.com/project1.jpg"}],
        contact_phone="+1 800 555 4567",
        contact_address="456 Tech Street, San Francisco, CA"
    )

    # Add both the base profile and the business profile to the session
    db.session.add(sample_profile)
    db.session.add(sample_business_profile)

    # Commit the changes to the database
    db.session.commit()

    print("Sample business profile created successfully!")

@click.command(name="delete_profile")
@with_appcontext
def delete_profile_command():
    profile_id = input("Enter the profile ID to delete: ")

    # Find the profile by ID
    profile = Profile.query.get(profile_id)

    if not profile:
        print("Profile not found.")
        return
    db.session.delete(profile)
    # Delete the base profile
    db.session.commit()

    print(f"Profile with ID {profile_id} and associated artist profile deleted successfully!")

@click.command("create-sample-profile")
@with_appcontext
def create_sample_profile():
    # Create a sample profile instance
    sample_profile = Profile(
        id="1",
        name="John Doe",
        title="Software Developer",
        avatar="https://example.com/avatar.jpg",
        cover_image="https://example.com/cover.jpg",
        bio="A passionate developer.",
        location="New York, NY",
        contact_email="john.doe@example.com",
        contact_website="https://johnswebsite.com",
        contact_social={"linkedin": "https://linkedin.com/in/johndoe", "twitter": "https://twitter.com/johndoe"},
        type="business"  # Can be 'business' or 'artist'
    )

    # Add the sample profile to the session and commit
    db.session.add(sample_profile)
    db.session.commit()

    print("Sample profile created successfully!")

@click.command("create-post")
@with_appcontext
def create_post():
    # Ensure a profile exists for the author (assuming 'artist_5' profile exists or is created)

    # Create a new post (without comments initially)
    new_post = Post(
        id="1",
        author_id="artist_5",  # The author's ID
        content="Finally completed this marble piece after 3 months of work. Trying to capture the flowing movement in static stone was challenging but rewarding.",  # The post content
        timestamp=datetime.strptime("22/02/2022 02:22:22", "%d/%m/%Y %H:%M:%S"),
        images=["post_picture.png", "pudzian.png"],  # Optional images
        likes=213,  # Set likes to 0 initially
        comments=[]  # No comments initially
    )

    # Add the post to the session and commit
    db.session.add(new_post)
    db.session.commit()

    print(f"Post created with ID: {new_post.id}")

@click.command("init-categories")
@with_appcontext
def init_categories():
    categories = [
        "Music", "Film", "Theater", "Literature", "Painting", "Photography",
        "Sculpture", "Fashion", "Computer Graphics", "Main"
    ]

    # Add categories if they don't exist
    for category_name in categories:
        # if not Category.query.filter_by(name=category_name).first():
        category = Category(name=category_name)
        db.session.add(category)

    cg_category = Category.query.filter_by(name="Computer Graphics").first()

    # Update all artist profiles to that category
    all_profiles = ArtistProfile.query.all()
    for profile in all_profiles:
        profile.category_id = cg_category.id

    db.session.commit()

def register_commands(app):
    app.cli.add_command(create_sample_profile)
    app.cli.add_command(create_sample_business_profile)
    app.cli.add_command(create_sample_artist_profile)
    app.cli.add_command(delete_profile_command)
    app.cli.add_command(create_post)
    app.cli.add_command(init_categories)