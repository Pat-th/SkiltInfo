import javax.ws.rs.core.UriBuilder;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.Properties;


public final class CreateUriUtil {
    private CreateUriUtil() {
    }

    private static Properties prop = new Properties();
    private static final String propFileName = "config.properties";
    private final static int SRID = 6173;

    private static InputStream getInputStream() throws IOException {
        InputStream inputStream;
        inputStream = CreateUriUtil.class.getClassLoader().getResourceAsStream(propFileName);
        if(inputStream != null){
            prop.load(inputStream);
        } else {
            throw new FileNotFoundException("property file " + propFileName + " not found");
        }
        return inputStream;
    }

    public URI getLocalhost(double lat, double lon, int sign_id) throws IOException {
        getInputStream();
        String localhost = prop.getProperty("LOCALHOST");
        UriBuilder uriBuilder = UriBuilder.fromUri(localhost);
        uriBuilder.queryParam("lat", lat);
        uriBuilder.queryParam("lon", lon);
        uriBuilder.queryParam("id", sign_id);
        return uriBuilder.build();
    }

    public static URI getNVDB(double west, double south, double east, double north) throws IOException {
        getInputStream();
        String nvdburl = prop.getProperty("NVDBURL");
        String box = String.format("%s,%s,%s,%s",west, south, east, north);
        UriBuilder uriBuilder = UriBuilder.fromUri(nvdburl);
        uriBuilder.queryParam("inkluder", "alle");
        uriBuilder.queryParam("kartutsnitt", box);
        uriBuilder.queryParam("srid", SRID);
        return uriBuilder.build();
    }
}
