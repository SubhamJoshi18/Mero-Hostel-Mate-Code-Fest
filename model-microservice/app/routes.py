from flask import Blueprint
from app.controller import hello_world, get_user

main_blueprint = Blueprint('main', __name__)

@main_blueprint.route('/')
def index():
    return hello_world()

@main_blueprint.route('/user/<int:user_id>')
def user(user_id):
    return get_user(user_id)
