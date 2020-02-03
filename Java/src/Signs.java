import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;


class Signs {


    private final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .build();

    String getJSONObject(int objectId) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create("https://apilesv3.utv.atlas.vegvesen.no/vegobjekter/96/" + objectId + "/1"))
                .setHeader("User-Agent", "Skiltinfo")
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    void getRoad(double lat, double lon, int enum_id) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create("https://apilesv3.utv.atlas.vegvesen.no/posisjon?lat=" + lat + "&lon=" + lon))
                .setHeader("User-Agent", "Skiltinfo")
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        StringBuilder sb = new StringBuilder();
        sb.append(response.body());
        sb.deleteCharAt(0);
        sb.deleteCharAt(sb.length() - 1);

        JSONObject json = new JSONObject(sb.toString());
        JSONObject object = json.getJSONObject("vegsystemreferanse");
        JSONObject object1 = object.getJSONObject("vegsystem");

        System.out.println(object1.getInt("id"));

        HttpRequest request1 = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create("https://apilesv3.utv.atlas.vegvesen.no/vegobjekter/915/" + object1.getInt("id") + "/1"))
                .setHeader("User-Agent", "Skiltinfo")
                .build();

        HttpResponse<String> response1 = httpClient.send(request1, HttpResponse.BodyHandlers.ofString());
        JSONObject object2 = new JSONObject(response1.body());
        JSONObject object3 = object2.getJSONObject("lokasjon");
        JSONArray array = object3.getJSONArray("stedfestinger");
        JSONObject object4 = array.getJSONObject(0);
        System.out.println(object4.getString("kortform"));

        HttpRequest request2 = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create("https://apilesv3.utv.atlas.vegvesen.no/vegobjekter/96/?inkluder=alle&veglenkesekvens=" + object4.getString("kortform")))
                .setHeader("User-Agent", "Skiltinfo")
                .build();
        HttpResponse<String> response2 = httpClient.send(request2, HttpResponse.BodyHandlers.ofString());
        System.out.println("Link: " + "https://apilesv3.utv.atlas.vegvesen.no/vegobjekter/96/?inkluder=alle&veglenkesekvens=" + object4.getString("kortform"));
        JSONObject object5 = new JSONObject(response2.body());
        JSONArray array1 = object5.getJSONArray("objekter");
        System.out.println(array1.length());
        for(int index = 0; index<array1.length(); index++) {
            JSONObject object6 = array1.getJSONObject(index);
            JSONArray array2 = object6.getJSONArray("egenskaper");
            JSONObject object7 = array2.getJSONObject(2);
            if (object7.getInt("enum_id") == enum_id) {
                System.out.println("[" + index + "]" + object6);
            }
        }
    }

    /**
     * @param json JSON response from sendGet(), or any other JSON
     * @param key  key is which info you want, a link to the xml-file or the id of the object. href for link, id for id.
     * @throws JSONException for JSONObject.
     */
    void getLinkOrId(JSONObject json, String key) throws JSONException {

        try {
            System.out.println(json.getString(key));
        }catch (Exception e) {
        }
        try{
            System.out.println(json.getInt(key));

        }catch (Exception e){

        }

    }
}
