
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.jayway.jsonpath.*;
import org.json.JSONObject;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.SQLOutput;
import java.util.List;
import java.util.Map;

import static com.jayway.jsonpath.Criteria.where;
import static com.jayway.jsonpath.JsonPath.using;

class Signs {


    private final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .build();

    String sendGet(int objectId) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create("https://apilesv3.utv.atlas.vegvesen.no/vegobjekter/96/" + objectId + "/1"))
                .setHeader("User-Agent", "Skiltinfo")
                .build();


        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        response.uri();
        //System.out.println(response.body());

        return response.body();
    }

    void linkOnly(String json){
        String link = JsonPath.read(json, "$.href");
        System.out.println(link);
    }

}
