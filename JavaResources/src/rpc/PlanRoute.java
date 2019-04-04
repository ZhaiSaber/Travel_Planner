package rpc;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import RoutePlanner.RoutePlanner;
import entity.Place;
import entity.Place.PlaceBuilder;

/**
 * Servlet implementation class PlanRoute
 */
@WebServlet("/PlanRoute")
public class PlanRoute extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PlanRoute() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			JSONObject input = RpcHelper.readJSONObject(request);
	  		boolean generateRoute = false;
	  		String itId, itName, startDate, endDate;
	  		if (!input.isNull("generateRoute")) {
	  			generateRoute = input.getBoolean("generateRoute");
			}
	  		if (!input.isNull("itineraryId")) {
	  			itId = input.getString("itineraryId");
	  		}
	  		if (!input.isNull("name")) {
	  			itName = input.getString("name");
	  		}
	  		if (!input.isNull("startDate")) {
	  			startDate = input.getString("startDate");
	  		}
	  		if (!input.isNull("endDate")) {
	  			endDate = input.getString("endDate");
	  		}
	  		 
	  		JSONArray places = input.getJSONArray("places");
	  		List<Place> placeList = new ArrayList<>(); 
	  		for (int i = 0; i < places.length(); i++) {
	  			JSONObject place = places.getJSONObject(i);
	  			PlaceBuilder placeBuilder = new PlaceBuilder();
	  			if (!place.isNull("name")) {
					placeBuilder.setName(place.getString("name"));
				}
	  			if (!place.isNull("name")) {
					placeBuilder.setPlaceId(place.getString("placeId"));
				}
	  			if (!place.isNull("lat")){
	  				placeBuilder.setLat(place.getDouble("lat"));
	  			}
	  			if (!place.isNull("lng")){
	  				placeBuilder.setLon(place.getDouble("lng"));
	  			}
	  			if (!place.isNull("address")) {
	  				placeBuilder.setAddress(place.getString("address"));
	  			}
	  			if (!place.isNull("imgUrl")) {
	  				placeBuilder.setImgUrl(place.getString("imgUrl"));
	  			}
	  			if (!place.isNull("duration")) {
	  				placeBuilder.setDuration(place.getInt("duration"));
	  			}
	  			placeList.add(placeBuilder.build());
	  		}
	  		if (generateRoute) {
	  			placeList = new RoutePlanner().planR(placeList);
	  			JSONArray orderedPlaces = new JSONArray();
		  		for (Place place : placeList) {
		  			orderedPlaces.put(place.toJSONObject());
		  		}
		  		input.put("places", orderedPlaces);
	  		}
	  		 // Todo: store placeList and itinerary information to database 
	  		 
	  		RpcHelper.writeJsonObject(response, input);
	  		return ;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
