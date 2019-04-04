package db;

import java.util.List;

import entity.Place;

public interface DBConnection {
	
	public void close();
	
	public void setItinerary(String itId, String itName,String startDate,String endDate);
		
	public void setStops(List<Place> orderedList);
	
	public void unsetItinerary(String itId);
}
