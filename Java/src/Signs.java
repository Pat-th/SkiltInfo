import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;


class Signs {

    private final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .build();

    /**
     *
      * @param objectId the ID of the "Skiltplate" that you want information about
     * @return returns the JSONObject as a String.
     * @throws IOException e
     * @throws InterruptedException e
     */
    public String getJSONObject(int objectId) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create("https://apilesv3.utv.atlas.vegvesen.no/vegobjekter/96/" + objectId + "/1"))
                .setHeader("User-Agent", "Skiltinfo")
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    public String getRoad(double lat, double lon) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create("https://apilesv3.utv.atlas.vegvesen.no/posisjon?lat=" + lat + "&lon=" + lon))
                .setHeader("User-Agent", "Skiltinfo")
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        return response.body();
    }
    /**
     * Used to get a list/multiple json-objects that match the parameters
     * @param lat latitude-value of the sign/where the picture is taken
     * @param lon longitude-value of the sign/where the picture is taken
     * @param enum_id the unique id that says what kind of sign it is
     * @return list of jsons of signs that match the parameters
     * @throws Exception an Exception for JSON and HTTP request
     */

    public List<JSONObject> getSignsOfType(double lat, double lon, int enum_id) throws Exception {
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

        //System.out.println(object1.getInt("id"));

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
        //System.out.println(object4.getString("kortform"));

        HttpRequest request2 = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create("https://apilesv3.utv.atlas.vegvesen.no/vegobjekter/96/?inkluder=alle&veglenkesekvens=" + object4.getString("kortform")))
                .setHeader("User-Agent", "Skiltinfo")
                .build();
        HttpResponse<String> response2 = httpClient.send(request2, HttpResponse.BodyHandlers.ofString());
        //System.out.println("Link: " + "https://apilesv3.utv.atlas.vegvesen.no/vegobjekter/96/?inkluder=alle&veglenkesekvens=" + object4.getString("kortform"));
        JSONObject object5 = new JSONObject(response2.body());
        JSONArray array1 = object5.getJSONArray("objekter");
        //System.out.println(array1.length());

        List<JSONObject> list = new ArrayList<>();
        for (int index = 0; index < array1.length(); index++) {
            JSONObject object6 = array1.getJSONObject(index);
            JSONArray array2 = object6.getJSONArray("egenskaper");
            for(int index1 = 0; index1 <array2.length(); index1++){
                JSONObject object7 = array2.getJSONObject(index1);
                    if (object7.has("enum_id") && object7.getInt("enum_id") == enum_id && object7.getString("navn").equals("Skiltnummer")) {
                        list.add(object6);
                        break;
                    }
            }

        }
        for(JSONObject i : list)
            System.out.println(i);
        System.out.println(list.size() + " skilt av denne typen eksisterer på veisekvensen");

        return list;
    }

    /**
     * Used to get a link or id from a specific object
     * @param json JSON response from sendGet(), or any other JSON
     * @param key  key is which info you want, a link to the xml-file or the id of the object. href for link, id for id.
     * @throws JSONException for JSONObject.
     * @return returns the key
     */
    public String getLinkOrId(JSONObject json, String key) throws JSONException {

        try {
            System.out.println(json.getString(key));
        }catch (Exception e) {
            e.printStackTrace();
        }
        try{
            System.out.println(json.getInt(key));

        }catch (Exception e){
            e.printStackTrace();
        }
        return json.get(key).toString();
    }
}
