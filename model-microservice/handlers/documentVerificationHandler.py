import os
import json


def handle_document_verification(data):
    parse_json = convert_to_json(data_str=data)
    current_directory = os.getcwd()
    parent_directory = os.path.dirname(current_directory)
    print("Parent Directory:", os.path.join(parent_directory,'backend-microservice',parse_json['photoPath']))
    




def convert_to_json(data_str):
    try:
        if isinstance(data_str, str):
            return json.loads(data_str)
    except json.decoder.JSONDecodeError as json_error:
        print(f'Error Decoding the json',json_error)