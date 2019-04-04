package external;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import entity.Place;
import entity.Place.PlaceBuilder;


public class GoogleMapAPI {
	private static final String NearbySearchURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
	private static final String FindPlaceURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";
	private static final String PhotoRequestURL = "https://maps.googleapis.com/maps/api/place/photo";
	private static final String DirectionURL = "https://maps.googleapis.com/maps/api/directions/json";
	private static final String DEFAULT_KEYWORD = "amusement park"; // no restriction
	private static final double DEFAULT_LAT = 34.05; // LA's latitude and longitude
	private static final double DEFAULT_LON = -118.24;
	private static final String API_KEY = "AIzaSyDrmzRoLbZA-MT5kYFMfcrcse5zMLgJI3E";
	public Integer findDuration(String origin, String des) {
		try {
			origin = URLEncoder.encode(origin, "UTF-8"); //"Rick Sun" => "Rick%20Sun"
			des = URLEncoder.encode(des, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String query = String.format("origin=%s&destination=%s&key=%s", origin, des, API_KEY);
		String url = DirectionURL + "?" + query;
		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
			connection.setRequestMethod("GET");
			
			int responseCode = connection.getResponseCode();
			System.out.println("Sending request to url: " + url);
			System.out.println("Response code: " + responseCode);
			
			if (responseCode != 200) {
				return null;
			}
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String line;
			StringBuilder response = new StringBuilder();
			
			while ((line = reader.readLine()) != null) {
				response.append(line);
			}
			reader.close();
			//System.out.println(response.toString());
			JSONObject input = new JSONObject(response.toString());
			Integer duration = input.getJSONArray("routes").getJSONObject(0).getJSONArray("legs").getJSONObject(0).getJSONObject("duration").getInt("value");
			return duration;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public Place findPlace(String name) {
		try {
			name = URLEncoder.encode(name, "UTF-8"); //"Rick Sun" => "Rick%20Sun"
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String query = String.format("input=%s&inputtype=textquery&fields=place_id,photos,formatted_address,name,rating,opening_hours,geometry&key=%s", name, API_KEY);
		String url = FindPlaceURL + "?" + query;
		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
			connection.setRequestMethod("GET");
			
			int responseCode = connection.getResponseCode();
			System.out.println("Sending request to url: " + url);
			System.out.println("Response code: " + responseCode);
			
			if (responseCode != 200) {
				return null;
			}
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String line;
			StringBuilder response = new StringBuilder();
			
			while ((line = reader.readLine()) != null) {
				response.append(line);
			}
			reader.close();
			//System.out.println(response.toString());
			JSONObject obj= new JSONObject(response.toString());
			JSONArray candidates = obj.getJSONArray("candidates");
			JSONObject place = candidates.getJSONObject(0);
			PlaceBuilder builder = new Place.PlaceBuilder();
			if (!place.isNull("place_id")) {
				builder.setPlaceId(place.getString("place_id"));
			}
			if (!place.isNull("name")) {
				builder.setName(place.getString("name"));
			}
			if (!place.isNull("formatted_address")) {
				builder.setAddress(place.getString("formatted_address"));
			}
			if (!place.isNull("geometry")) {
				JSONObject geometry = place.getJSONObject("geometry");
				if (!geometry.isNull("location")) {
					JSONObject location = geometry.getJSONObject("location");
					if (!location.isNull("lat")) {
						builder.setLat(location.getDouble("lat"));
					}
					if (!location.isNull("lng")) {
						builder.setLon(location.getDouble("lng"));
					}
				}					
			}
			if (!place.isNull("photos")) {
				JSONArray photos = place.getJSONArray("photos");
				builder.setImgUrl(photos.getJSONObject(0).getString("photo_reference"));
			}
			return builder.build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public List<Place> nearbySearch(double lat, double lon, String keyword) {
		if (keyword == null) {
			keyword = DEFAULT_KEYWORD;
		}
		
		
		try {
			keyword = URLEncoder.encode(keyword, "UTF-8"); //"Rick Sun" => "Rick%20Sun"
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
		// type amusement_park aquarium art_gallery campground zoo stadium museum
		String query = String.format("location=%s,%s&radius=20000&keyword=%s&key=%s", lat, lon, keyword, API_KEY);
		String url = NearbySearchURL + "?" + query;
		
		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
			connection.setRequestMethod("GET");
			
			int responseCode = connection.getResponseCode();
			System.out.println("Sending request to url: " + url);
			System.out.println("Response code: " + responseCode);
			
			if (responseCode != 200) {
				return null;
			}
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String line;
			StringBuilder response = new StringBuilder();
			
			while ((line = reader.readLine()) != null) {
				response.append(line);
			}
			reader.close();
			//System.out.println(response.toString());
			JSONObject obj = new JSONObject(response.toString());
			if (!obj.isNull("results")) {
				JSONArray results = obj.getJSONArray("results");
				return getPlaceList(results);
			}
			return null;
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	private List<Place> getPlaceList(JSONArray places) throws JSONException{
		List<Place> res = new ArrayList<>(); 
		for (int i = 0; i < places.length(); i++) {
			JSONObject place = places.getJSONObject(i);
			PlaceBuilder builder = new Place.PlaceBuilder();
			if (!place.isNull("place_id")) {
				builder.setPlaceId(place.getString("place_id"));
			}
			if (!place.isNull("name")) {
				builder.setName(place.getString("name"));
			}
			if (!place.isNull("vicinity")) {
				builder.setAddress(place.getString("vicinity"));
			}
			if (!place.isNull("geometry")) {
				JSONObject geometry = place.getJSONObject("geometry");
				if (!geometry.isNull("location")) {
					JSONObject location = geometry.getJSONObject("location");
					if (!location.isNull("lat")) {
						builder.setLat(location.getDouble("lat"));
					}
					if (!location.isNull("lng")) {
						builder.setLon(location.getDouble("lng"));
					}
				}					
			}
			if (!place.isNull("photos")) {
				JSONArray photos = place.getJSONArray("photos");
				builder.setImgUrl(photos.getJSONObject(0).getString("photo_reference"));
			}
			res.add(builder.build());
		}
		return res;
	}
	
	public static void main(String[] args){
		GoogleMapAPI gmAPI = new GoogleMapAPI();
		//gmAPI.nearbySearch(DEFAULT_LAT, DEFAULT_LON,null);
		int d = gmAPI.findDuration("LAX", "Irvine CA");
		System.out.println(d);
	}
}


