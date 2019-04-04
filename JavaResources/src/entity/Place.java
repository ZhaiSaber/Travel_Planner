package entity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Place {
	private String placeId;
	private String name;
	private Double lat;
	private Double lon;
	private String address;
	private String imgUrl;
	private Integer duration;
	private String itineraryId;
	
	// this is a builder pattern
	private Place(PlaceBuilder builder) {
		this.placeId = builder.placeId;
		this.name = builder.name;
		this.lat = builder.lat;
		this.lon = builder.lon;
		this.address = builder.address;
		this.imgUrl = builder.imgUrl;
		this.duration = builder.duration;
		this.itineraryId = builder.itineraryId;		
	}
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		try {
			obj.put("placeId", placeId);
			obj.put("name", name);
			obj.put("lat", lat);
			obj.put("lng", lon);
			obj.put("address", address);
			obj.put("imgUrl", imgUrl);
			obj.put("duration", duration);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return obj;
	}
	public String getName() {
		return this.name;
	}
	
	public static class PlaceBuilder{
		private String placeId;
		private String name;
		private Double lat;
		private Double lon;
		private String address;
		private String imgUrl;
		private Integer duration;
		private String itineraryId;
		
		public void setPlaceId(String placeId) {
			this.placeId = placeId;
		}
		public void setName(String name) {
			this.name = name;
		}
		public void setLat(Double lat) {
			this.lat = lat;
		}
		public void setLon(Double lon) {
			this.lon = lon;
		}
		public void setAddress(String address) {
			this.address = address;
		}
		
		public void setImgUrl(String imgUrl) {
			this.imgUrl = imgUrl;
		}
		
		public void setDuration(int duration) {
			this.duration = duration;
		}
		public void setItineraryId(String itineraryId) {
			this.itineraryId =itineraryId;
		}
		public Place build() {
			return new Place(this);
		}
		
	}
	
}
