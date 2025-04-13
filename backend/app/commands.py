from flask.cli import with_appcontext
import click
from app import db
from app.models import Profile, BusinessProfile
from app.models import ArtistProfile

@click.command(name="create_sample_artist_profile")
@with_appcontext
def create_sample_artist_profile():
    # Create a sample artist profile
    base_profile = Profile(
        id="artist_3",  # Unique ID
        name="John Doe",  # Name field
        title="Digital Artist",  # Title
        avatar="https://example.com/johndoe_avatar.jpg",  # Avatar
        cover_image="https://example.com/johndoe_cover.jpg",  # Cover Image
        bio="A passionate digital artist focusing on 3D art.",  # Bio
        location="New York, NY",  # Location
        contact_email="john.doe@example.com",  # Email
        contact_website="https://johndoeportfolio.com",  # Website
        contact_social={"linkedin": "https://linkedin.com/in/johndoe", "twitter": "https://twitter.com/johndoe"},  # Social links
        type="artist"  # Type (artist)
    )

    # Create the artist profile
    artist_profile = ArtistProfile(
        id="artist_3",  # Linking to the base profile's id
        category="Digital Art",  # Category of the artist
        stats={"followers": 3000, "following": 150, "projects": 25},  # Stats
        skills=["3D Modeling", "Digital Illustration", "Character Design"],  # Skills
        portfolio=[  # Portfolio items (title, image)
            {"title": "3D Model of a Dragon", "image": "https://example.com/portfolio1.jpg"},
            {"title": "Character Design for Game X", "image": "https://example.com/portfolio2.jpg"}
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


def register_commands(app):
    app.cli.add_command(create_sample_profile)
    app.cli.add_command(create_sample_business_profile)
    app.cli.add_command(create_sample_artist_profile)
    app.cli.add_command(delete_profile_command)