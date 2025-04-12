from flask.cli import with_appcontext
import click
from app import db
from app.models import User, Profile


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
