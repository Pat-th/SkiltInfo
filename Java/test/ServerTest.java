import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.junit.Test;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class ServerTest {

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
        String result = "{lat=[63.400854], lon=[10.395050], id=[7644]}";
        Map<String, List<String>> requestParameters = Server.getRequestParameters(uri);
        String idActual = requestParameters.get("id").toString();
        String latActual = requestParameters.get("lat").toString();
        String lonActual = requestParameters.get("lon").toString();
        assertEquals("[7644]", idActual);
        assertEquals("[63.400854]", latActual);
        assertEquals("[10.395050]", lonActual);
        assertEquals(result, actual);
    }


}
