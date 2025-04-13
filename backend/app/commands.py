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


@click.command("create-artist")
@with_appcontext
def create_artist():
    # Ensure category exists
    category = Category.query.filter_by(name="Music").first()
    if not category:
        category = Category(name="Music")
        db.session.add(category)
        db.session.commit()

    # Create the artist profile
    profile = Profile(
        name="Elena Sánchez",
        title="Pianist & Composer",
        avatar="/assets/avatar_placeholder.png",
        cover_image="/assets/cover_placeholder.jpg",
        bio="Classical pianist with 15 years of experience, specializing in contemporary compositions. Currently working on my third album that explores the intersection of classical and electronic music.",
        location="Barcelona, Spain",
        type="artist",
        social={"instagram": "@elenasanchez", "twitter": "@elenasmusic"},
        contact={"email": "elena@musicexample.com", "website": "www.elenasanchez.com"}
    )

    # Add the profile to the session and commit
    db.session.add(profile)
    db.session.commit()

    # Create the artist profile linked to the profile
    artist_profile = ArtistProfile(
        id=profile.id,  # Link to the profile by ID
        category="Music",  # The category for this artist
        stats={
            "followers": 3245,
            "following": 420,
            "projects": 28
        },
        skills=[
            "Piano",
            "Composition",
            "Music Theory",
            "Orchestra Arrangement",
            "Electronic Production"
        ],
        portfolio=[
            {"title": "Moonlight Sonatas", "image": "/api/placeholder/300/200"},
            {"title": "Electric Concerto No. 2", "image": "/api/placeholder/300/200"},
            {"title": "Ambient Variations", "image": "/api/placeholder/300/200"}
        ]
    )

    # Add the artist profile and commit
    db.session.add(artist_profile)
    db.session.commit()

    click.echo("Artist profile for Elena Sánchez created successfully!")

import json

@click.command("seed_profiles")
@with_appcontext
def seed_profiles():
    """Seed profiles and artist profiles from a JSON file into the database."""

    # Path to your JSON file
    json_file_path = 'app/artists.json'

    try:
        with open(json_file_path, 'r') as file:
            artists_data = json.load(file)
            print(f"Loaded {len(artists_data)} artist profiles from JSON.")

            for artist_data in artists_data:
                # Create the Profile (common base for ArtistProfile)
                profile = Profile(
                    name=artist_data["name"],
                    title=artist_data["title"],
                    avatar=artist_data["avatar"],
                    cover_image=artist_data["cover_image"],
                    bio=artist_data["bio"],
                    location=artist_data["location"],
                    social=artist_data.get("social", None),
                    contact=artist_data.get("contact", None),
                    type='artist'  # Mark the type as 'artist' for ArtistProfile
                )

                # Create the ArtistProfile (specific to artist data)
                artist_profile = ArtistProfile(
                    stats_followers=artist_data["stats_followers"],
                    stats_following=artist_data["stats_following"],
                    stats_projects=artist_data["stats_projects"],
                    category_id=artist_data["category_id"],
                    skills=artist_data["skills"],
                    portfolio=artist_data["portfolio"]
                )

                # Associate the ArtistProfile with the Profile
                profile.artist_profile = artist_profile

                # Add both the profile and artist_profile to the session
                db.session.add(profile)

            # Commit the session after processing all the artists
            db.session.commit()
            print(f"Successfully inserted {len(artists_data)} artist profiles into the database.")

    except Exception as e:
        print(f"An error occurred: {e}")
        db.session.rollback()


def register_commands(app):
    app.cli.add_command(create_sample_profile)
    app.cli.add_command(create_sample_business_profile)
    app.cli.add_command(create_sample_artist_profile)
    app.cli.add_command(delete_profile_command)
    app.cli.add_command(create_post)
    app.cli.add_command(init_categories)
    app.cli.add_command(seed_profiles)