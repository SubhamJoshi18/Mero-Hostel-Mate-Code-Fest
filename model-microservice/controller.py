from flask import jsonify
from models.prefrenceModel import select_refrence_model
def hello_world():
    return jsonify({"message": "Hello, World!"})

def get_hostel(hostel_data):
    try:
        json_data = select_refrence_model(hostel_data=hostel_data)
        return json_data
    except Exception as error:
        print(f'Error Filtering Payload Json For Models, Error : {error}')