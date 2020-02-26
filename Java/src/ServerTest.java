import org.junit.Assert;
import org.junit.Test;


import java.net.URI;
import java.net.URISyntaxException;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class ServerTest {

    @Test
    public void testDecodeUrlComponent(){
        String actual = Server.decodeUrlComponent("localhost:8080/?lat=63.400854&lon=10.395050&id=7644");
        String result = "localhost:8080/?lat=63.400854&lon=10.395050&id=7644";

        Assert.assertEquals(result, actual);
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
        Assert.assertEquals("7644", idActual);
        Assert.assertEquals("63.400854", latActual);
        Assert.assertEquals("10.395050", lonActual);
        Assert.assertEquals(result, actual);
    }


}
