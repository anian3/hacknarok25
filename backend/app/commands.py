from flask.cli import with_appcontext
import click
from app import db
from app.models import User

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
