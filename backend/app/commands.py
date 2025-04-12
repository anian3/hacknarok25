from flask.cli import with_appcontext
import click
from app import db
from app.models import User, Profile, BusinessProfile


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

@click.command("seed")
@with_appcontext
def seed():
    db.drop_all()
    db.create_all()

    user1 = User(username="admin", email="admin@example.com")
    user2 = User(username="guest", email="guest@example.com")

    db.session.add_all([user1, user2])
    db.session.commit()

    click.echo("✅ Seeded the database!")

def register_commands(app):
    app.cli.add_command(seed)
    app.cli.add_command(create_sample_profile)
    app.cli.add_command(create_sample_business_profile)
