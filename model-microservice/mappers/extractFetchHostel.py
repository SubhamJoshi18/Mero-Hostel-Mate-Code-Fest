from dotenv import load_dotenv,find_dotenv

load_dotenv(find_dotenv())



def extract_college_mongo(json_data):
    allHostel = json_data['fetchAllHostel']
    collegeName = json_data['collegeName']
    return allHostel, collegeName
    
