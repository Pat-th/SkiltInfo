import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;


class HttpRoadSignDao {
    private final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .build();

    private static String setBoundingBox(double lat, double lon, int radius){
        WGS2UTM wgs = new WGS2UTM(lat, lon); //Converts latitude and longitude to Eastings and Northings
        double eastings = wgs.getEasting();
        double northings = wgs.getNorthing();
        double west = eastings - radius;
        double east = eastings + radius;
        double south = northings - radius;
        double north = northings + radius;
        return String.format("%s,%s,%s,%s",west, south, east, north);
    }

    private static List <JSONObject> handleResponse(String response, int sign_id) throws JSONException {
        List <JSONObject> list = new ArrayList<>();
        JSONObject object = new JSONObject(response);
        JSONArray array = object.getJSONArray("objekter");
        for (int index = 0; index < array.length(); index++) {
            JSONObject object1 = array.getJSONObject(index);
            JSONArray array1 = object1.getJSONArray("egenskaper");
            for(int index1 = 0; index1 <array1.length(); index1++){
                JSONObject object2 = array1.getJSONObject(index1);
                if (object2.has("enum_id") && object2.getInt("enum_id") == sign_id && object2.getString("navn").equals("Skiltnummer")) {
                    list.add(object1);
                    break;
                }
            }
        }
        return list;
    }

    /**
     *
     * @param lat latitude value that get sent from the frontend
     * @param lon longitude value that get sent from the frontend
     * @param sign_id the unique id of the type of sign (Yield, priority, speed limit etc)
     * @param radius the distance from the center of the map to the edges.
     * @return returns a list of the signs with matching sign_id within a square bounding box where the distance from
     * center to the edge is decided by radius. Make radius an argument?
     * @throws Exception JSONException
     */
    public List<JSONObject> getBoundingBox(double lat, double lon, int sign_id, int radius) throws Exception {
        List<JSONObject> list;
        String box = setBoundingBox(lat, lon, radius);
        URI uri = CreateUriUtil.getNVDB(box);
        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(uri)
                .setHeader("User-Agent", "Skiltinfo")
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        list = handleResponse(response.body(), sign_id);
        return list;
    }
}
