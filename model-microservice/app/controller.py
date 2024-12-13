from flask import jsonify

def hello_world():
    return jsonify({"message": "Hello, World!"})

def get_user(user_id):
    user_data = {
        1: {"name": "Alice", "age": 25},
        2: {"name": "Bob", "age": 30}
    }
    user = user_data.get(user_id, {"error": "User not found"})
    return jsonify(user)
