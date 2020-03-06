import org.json.JSONArray;
import org.json.JSONObject;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;


class HttpRoadSignDao {
    CreateUri createUri = new CreateUri();
    private final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .build();

    /**
     *
     * @param lat latitude value that get sent from the frontend
     * @param lon longitude value that get sent from the frontend
     * @param sign_id the unique id of the type of sign (Yield, priority, speed limit etc)
     * @return returns a list of the signs with matching sign_id within a square bounding box where the distance from
     * center to the edge is decided by radius. Make radius an argument?
     * @throws Exception JSONException
     */
    public List<JSONObject> getBoundingBox(double lat, double lon, int sign_id) throws Exception {
        List<JSONObject> list = new ArrayList<>();
        Deg2UTM utm = new Deg2UTM(lat, lon); //Converts latitude and longitude to Eastings and Northings
        double x = utm.getEasting();
        double y = utm.getNorthing();
        double radius = 100; //Distance from center to edge of box in cardinal directions
        double west = x - radius;
        double east = x + radius;

        double south = y - radius;
        double north = y + radius;
        URI uri = createUri.getNVDB(west, south, east, north);
        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(uri)
                .setHeader("User-Agent", "Skiltinfo")
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        JSONObject object = new JSONObject(response.body());
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
        if(list.size() == 0){
            JSONObject notARoad = new JSONObject("{id: Koordinatene er ikke i nærheten av en vei}");
            list.add(notARoad);
        }
        return list;
    }
}
