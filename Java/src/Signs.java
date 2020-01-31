import org.json.JSONException;
import org.json.JSONObject;

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
        //JSONObject object = new JSONObject(response.body());
        //System.out.println(response.body());
        //System.out.println(object);

        return response.body();
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
