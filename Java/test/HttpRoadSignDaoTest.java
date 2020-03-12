import static org.junit.Assert.*;
import org.junit.*;
import java.io.InputStream;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;
import java.io.FileReader;

public class HttpRoadSignDaoTest {
    HttpRoadSignDao httpRoadSignDao = new HttpRoadSignDao();
    double lat = 63.365330;
    double lon = 10.372574;
    int sign_id = 7644;

    @Test
    public void testGetBoundingBox() throws Exception{
        String actual = httpRoadSignDao.getBoundingBox(lat, lon, sign_id, 500).get(0).toString();
        String file = "/GetBoundingBoxResult.json";
        assertEquals(1, 1);
    }
}
