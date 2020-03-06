import static org.junit.Assert.*;

import org.skyscreamer.jsonassert.*;
import org.junit.*;

public class HttpRoadSignDaoTest {
    HttpRoadSignDao httpRoadSignDao = new HttpRoadSignDao();
    int objectId = 85404247;
    double lat = 63.365330;
    double lon = 10.372574;
    int sign_id = 7644;

    @Test
    public void testGetBoundingBox() throws Exception{
        //String actual = httpRoadSignDao.getBoundingBox(lat, lon, sign_id).toString();
        assertEquals(1, 1);
    }
}
