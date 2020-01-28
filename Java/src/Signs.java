
import com.jayway.jsonpath.*;

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

    void sendGet(int objectId) throws Exception {

        Configuration conf = Configuration.builder()
                .options(Option.AS_PATH_LIST).build();
        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create("https://apilesv3.utv.atlas.vegvesen.no/vegobjekter/96/" + objectId + "/1"))
                .setHeader("User-Agent", "Skiltinfo")
                .build();


        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        //System.out.println(response.statusCode());
        //System.out.println(response.body());
        String json = response.body();
        List<String> info0 = JsonPath.read(json, "$..egenskaper[0].*");
        System.out.println(info0);
        /*String subtype1 = "$.egenskaper[0].";
        String info = JsonPath.read(json, subtype1+"navn");
        String info9 = JsonPath.read(json, subtype1+"id").toString();
        String info0 = JsonPath.read(json, "$.egenskaper[0].navn");
        List<String> info1 = JsonPath.read(json, "$..egenskaper[0]");
        List<String> info2 = JsonPath.read(json, "$..egenskaper[2].*");
        List<String> info3 = JsonPath.read(json, "$..egenskaper[3].*");
        String info8 = JsonPath.read(json, "$.href");

        String combine = info + ", " + info9;

        System.out.println(info);
        System.out.println(info9);
        System.out.println(info1);
        System.out.println(info8);*/
    }

}
