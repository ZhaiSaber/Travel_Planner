package RoutePlanner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import entity.Place;
import external.GoogleMapAPI;

public class RoutePlanner {
	public List<Place> planR(List<Place> places){
		// spcial case <=2
		
		Map<Pair, Integer> map = new HashMap<>();
		GoogleMapAPI gmAPI = new GoogleMapAPI();
		// preprocessing
		// get the duration of travelling between any two points
		for (int i = 0; i < places.size(); i++) {
			for (int j = 0; j < places.size(); j++) {
				if (i != j) {
					String origin = places.get(i).getName();
					String des = places.get(j).getName();
					Integer duration = gmAPI.findDuration(origin, des);
					map.put(new Pair(origin, des), duration);
				}
			}
		}
		// debugging
		/*for (Map.Entry<Pair, Integer> entry: map.entrySet() ) {
			System.out.println(String.format("entry %s, %s", entry.getKey().origin, entry.getKey().des));
			System.out.println(entry.getValue());
		}*/
			
		// find all permutations 
		List<List<Place>> res = new ArrayList<List<Place>>();
		findAllPer(places, 0, res);
		
		// debugging 
		/*for (List<Place> ps : res) {
			System.out.println("one route");
			for (Place p: ps ) {
				System.out.println(p.getName());
			}
		}*/
		// find the total duration for each route
		// return the shorest one
		int globalMin = Integer.MAX_VALUE;
		List<Place> shortestRoute = null;
		for (List<Place> ps : res ) {
			int curDuration = 0;
			for (int i = 0; i < ps.size() - 1; i++) {
				System.out.println(ps.get(i).getName());
				System.out.println(ps.get(i+1).getName());
				System.out.println(map.containsKey(new Pair(ps.get(i).getName(), ps.get(i+1).getName())));
				curDuration += map.get(new Pair(ps.get(i).getName(), ps.get(i+1).getName()));
			}
			if (curDuration < globalMin) {
				globalMin = curDuration;
				shortestRoute = ps;
			}
		}
		return shortestRoute;
	}
	private void findAllPer(List<Place> places, int s, List<List<Place>> res){
		if (s == places.size() - 1) {
			res.add(new ArrayList<Place>(places));
			return ;
		}
		for (int i = s; i < places.size(); i++) {
			swap(places, s, i);
			findAllPer(places, s+1, res);
			swap(places, s, i);
		}
	}
	private void swap(List<Place> places, int i, int j) {
		Place tmp = places.get(i);
		places.set(i, places.get(j));
		places.set(j, tmp);
	}
	private static class Pair {
		public String origin;
		public String des;
		public Pair(String origin, String des) {
			this.origin = origin;
			this.des = des;
		}
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + (origin == null ? 0 : origin.hashCode());
			result = prime * result + (des == null ? 0 : des.hashCode());
			return result;
		}
		@Override
		public boolean equals(Object o) {
			if (o == this) {
				return true;
			}
			//System.out.println("here!");
			if (!(o instanceof Pair)) {
				return false;
			}
			Pair c = (Pair)o;
			
			return c.origin.equals(this.origin) && c.des.equals(this.des);
		}
	}
	public static void main(String[] args) {
		RoutePlanner rp = new RoutePlanner();
		//rp.findAllPer
		Pair p1 = new RoutePlanner.Pair("s","b");
		Pair p2 = new RoutePlanner.Pair("s","b");
		//System.out.println(p1.equals(p2));
		Map<Pair, Integer> map = new HashMap<>();
		map.put(p1, 1);
		System.out.println(map.containsKey(p2));
	}
}
