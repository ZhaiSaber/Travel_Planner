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

import entity.Place;
import external.GoogleMapAPI;

/**
 * Servlet implementation class GeneralRecommend
 */
@WebServlet("/GeneralRecommend")
public class GeneralRecommend extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GeneralRecommend() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		GoogleMapAPI gmAPI = new GoogleMapAPI();
		List<Place> places = new ArrayList<>();
		String[] attractions = {"Disneyland Los Anegeles", "Universal Studio Hollywood",
				"Malibu Beach", "OUE Skyspace LA", "SixFlags Magic Mountain LA, Venice Beach LA",
				"Santa Monica Pier", "Staples Center", "Los Angeles Convention Center", "The Grove LA"};
		for (String attraction : attractions) {
			Place place = gmAPI.findPlace(attraction);
			places.add(place);
		}
		JSONArray array = new JSONArray();
		for (Place place : places) {
			array.put(place.toJSONObject());
		}
		RpcHelper.writeJsonArray(response, array);
		return ;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
