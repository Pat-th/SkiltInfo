import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Quan Tran
 */
class HttpRoadSignDao {

    /**
     * Builder for httpClient
     */
    private final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .build();

    /**
     * Method to create the bounding box values.
     *
     * <p>
     *     Method uses the geodetical systems converter in WGS2UTM to convert the values.
     *     Creates a String based on the returned eastings and northings values and the radius to set a bounding box
     * </p>
     * @param lat - latitude value in wsg84
     * @param lon - latitude value in wsg84
     * @param radius - how far away from the center in north, east, south and west direction
     *              the bounding box is to be set
     * @return the String that sets the bounding box for the map
     */
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

    /**
     * Method to go one step further in the JSON-array given from the database to lessen the load on the client
     * @param response - the body of the response given from the database
     * @return List <JSONObject>, returns a list of JSON objects
     * @throws JSONException throws an exception in case objects are not JSON-objects
     */

    private static List <JSONObject> handleResponse(String response) throws JSONException {
        List <JSONObject> list = new ArrayList<>();
        JSONObject object = new JSONObject(response);
        JSONArray array = object.getJSONArray("objekter");
        for (int index = 0; index < array.length(); index++) {
            JSONObject object1 = array.getJSONObject(index);
            list.add(object1);
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
        URI uri = CreateUriUtil.getNVDB(box, sign_id);
        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(uri)
                .setHeader("User-Agent", "Skiltinfo")
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        list = handleResponse(response.body());
        System.out.println(uri);
        return list;
    }
}
