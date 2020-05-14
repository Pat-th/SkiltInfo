import com.github.tomakehurst.wiremock.junit.WireMockRule;
import org.junit.Rule;
import org.junit.Test;


import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.io.InputStreamReader;
import java.io.BufferedReader;

import org.json.*;
import org.skyscreamer.jsonassert.JSONAssert;

import static org.junit.Assert.*;
import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class ServerTest {
    private final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .build();
    HttpRoadSignDao dao = new HttpRoadSignDao();
    double lat = 63.365330;
    double lon = 10.372574;
    int sign_id = 7644;

    @Rule
    public WireMockRule wireMockRule = new WireMockRule(8080);


    @Test
    public void testGetRequest() throws Exception {
        URI uri = new URI("http","", "localhost",8080, "/", "lat=63.400854&lon=10.395050&id=7644", "");
        InputStream input = getClass().getResourceAsStream("SingleSign.json");
        InputStreamReader isReader = new InputStreamReader(input);
        BufferedReader reader = new BufferedReader(isReader);
        StringBuffer sb = new StringBuffer();
        String str;
        while((str = reader.readLine()) != null){
            sb.append(str);
        }
        JSONObject obj = new JSONObject(sb.toString());
        String responseBody = obj.toString();


        stubFor(get(urlEqualTo("/?lat=63.400854&lon=10.395050&id=7644"))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody(responseBody)));

        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(uri)
                .setHeader("User-Agent", "Skiltinfo")
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        assertEquals(response.statusCode(), 200);
        assertEquals(response.body(), responseBody);
    }

    @Test
    public void testDecodeUrlComponent(){
        String actual = Server.decodeUrlComponent("localhost:8080/?lat=63.400854&lon=10.395050&id=7644");
        String result = "localhost:8080/?lat=63.400854&lon=10.395050&id=7644";

        assertEquals(result, actual);
    }

    @Test
    public void testGetRequestParameters() throws URISyntaxException {
        URI uri = new URI("http","", "localhost",8080, "/", "lat=63.400854&lon=10.395050&id=7644", "");
        String actual = Server.getRequestParameters(uri).toString();
        String result = "{lon=10.395050, id=7644, lat=63.400854}";
        Map<String, String> requestParameters = Server.getRequestParameters(uri);
        String idActual = requestParameters.get("id");
        String latActual = requestParameters.get("lat");
        String lonActual = requestParameters.get("lon");
        assertEquals("7644", idActual);
        assertEquals("63.400854", latActual);
        assertEquals("10.395050", lonActual);
        assertEquals(result, actual);
    }


}
