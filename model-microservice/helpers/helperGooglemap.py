import os
import googlemaps
from time import sleep


class HelperGoogleMap:

    
    def __init__(self):
        pass

    def get_google_maps_client(self):
        return googlemaps.Client(key='AIzaSyChRHG8gb0TwMq2YOdf_djXNkDxtokdAJI')
    

  

    def fetch_hostels_near_college(self,college_name):
        gmaps = self.get_google_maps_client()
        
        gecode_result = gmaps.geocode(college_name)
        
        if not gecode_result:
            print(f'No result found for the college name {college_name}')
        
        location = gecode_result[0]['geometry']['location']
        
        lat , lng = location['lat'], location['lng']
        
        all_hostels = []
        next_page_token = None

        try:
        
            places = gmaps.places_nearby(
                    location=(lat,lng),
                    radius=5000,
                    keyword="hostels", 
                    open_now=False,
                    page_token=next_page_token
                )

            excluded_types = {"bar", "restaurant", "travel_agency", "food"}
            
            hostels = [
                    place for place in places['results']
                    if 'lodging' in place.get('types', []) and
                    'hostel' in place['name'].lower() and
                    not any(t in excluded_types for t in place.get('types', []))
                ]
            
            all_hostels.extend(hostels)

        
            print('Total Hostels Found:', len(all_hostels))
            return all_hostels

        except Exception as e:
            print(f"Error fetching hostels: {e}")
            return []
