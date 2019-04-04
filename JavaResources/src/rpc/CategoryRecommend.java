package rpc;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import entity.Place;
import external.GoogleMapAPI;

/**
 * Servlet implementation class CategoryRecommend
 */
@WebServlet("/CategoryRecommend")
public class CategoryRecommend extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CategoryRecommend() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		//double lat = Double.parseDouble(request.getParameter("lat"));
		//double lon = Double.parseDouble(request.getParameter("lon"));
		GoogleMapAPI gmAPI = new GoogleMapAPI();
		String category = request.getParameter("category");
		
		List<Place> places = gmAPI.nearbySearch(34.05, -118.24, category);
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
