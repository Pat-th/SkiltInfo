import javax.ws.rs.core.UriBuilder;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.Properties;


public class CreateUri {

    Properties prop = new Properties();
    String propFileName = "config.properties";

    public InputStream getInputStream() throws IOException {
        InputStream inputStream;
        inputStream = getClass().getClassLoader().getResourceAsStream(propFileName);
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

    public URI getNVDB(double latMin, double lonMin, double latMax, double lonMax) throws IOException {
        getInputStream();
        String nvdburl = prop.getProperty("NVDBURL");
        UriBuilder uriBuilder = UriBuilder.fromUri(nvdburl);
        uriBuilder.queryParam("kartutsnitt", latMin,lonMin,latMax,lonMax);
        uriBuilder.queryParam("inkluder", "alle");
        uriBuilder.queryParam("srid", 6173);
        return uriBuilder.build();
    }
}
