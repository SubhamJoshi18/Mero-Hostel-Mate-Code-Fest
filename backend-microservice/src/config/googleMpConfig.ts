import { Client } from '@googlemaps/google-maps-services-js';

export const getGoogleMapClient = () => {
  const client = new Client({});
  return client;
};
