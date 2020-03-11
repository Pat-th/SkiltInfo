import org.glassfish.jersey.internal.*;

import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpRoadSignDao httpRoadSignDao = new HttpRoadSignDao();
        CreateUri createUri = new CreateUri();
        int objectId = 85404247;
        double lat = 63.365330;
        double lon = 10.372574;
        int enum_id = 7644;
        double lat1 = 63.399991;
        double lon1 = 10.394581;
        double lat2 = 63.399868;
        double lon2 = 10.394550;
        double lat3 = 63.400034;
        double lon3 = 10.394115;
        double x = 269910.96;
        double y = 7034038.739;
        double lattie = 63.362083;
        double longie = 10.383740;
        //63.362083 10.383740
        //WGS2UTM wgs = new WGS2UTM(lattie, longie);
        //createUri.getNVDB(x-100, y-100, x+100, y+100);
        httpRoadSignDao.getBoundingBox(lattie, longie, enum_id);

    }
}
