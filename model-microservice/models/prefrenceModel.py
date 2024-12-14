from flask import jsonify
from mappers.extractFetchHostel import extract_college_mongo
from helpers.helperGooglemap import HelperGoogleMap

helper_google_map_instance = HelperGoogleMap()

def select_refrence_model(hostel_data):
    try:
        allMongo, college_name = extract_college_mongo(hostel_data)
        nearbyResult = helper_google_map_instance.fetch_hostels_near_college(college_name=college_name)
        
      
        allMongoList = list(allMongo)
        nearbyResultList = list(nearbyResult)
        
        nearbyNames = {hostel['name'] for hostel in nearbyResultList}
     
        matching_hostels = [hostel for hostel in allMongoList if hostel['name'] in nearbyNames]
        print('This is',matching_hostels)
        
        return jsonify(matching_hostels)

    except Exception as error:
        print(f'Error selecting the reference models: {error}')
        return jsonify({"error": str(error)}), 500