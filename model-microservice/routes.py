from flask import jsonify, Blueprint, request
from controller import hello_world,get_hostel
import requests

main_blueprint = Blueprint('main', __name__)

@main_blueprint.route('/')
def index():
    return hello_world()

@main_blueprint.route('/model/hostels',methods=['POST'])
def filter_hostels():
    data = request.get_json()  
    filtered_hostels = get_hostel(data)
    return filtered_hostels
