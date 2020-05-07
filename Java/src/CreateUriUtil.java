import javax.ws.rs.core.UriBuilder;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.Properties;


/**
 * @author Tran, Quan
 */
public final class CreateUriUtil {
    private CreateUriUtil() {
    }

    private static Properties prop = new Properties();
    private static final String propFileName = "config.properties";
    private final static int SRID = 6173;

    /**
     * Method to read from config.properties
     * @throws IOException - throws an exception if file not found and out input problems.
     */
    private static void getInputStream() throws IOException {
        InputStream inputStream;
        inputStream = CreateUriUtil.class.getClassLoader().getResourceAsStream(propFileName);
        if(inputStream != null){
            prop.load(inputStream);
        } else {
            throw new FileNotFoundException("property file " + propFileName + " not found");
        }
    }

    /**
     * Method generates the URI that is going to be used.
     * @param boundingBox - String that defines a bounding box in NVDB
     * @param signId - which kind of signs (yield, stop etc) the user wants to find
     * @return URI - the URI to be sent to NVDB
     * @throws IOException - throws exception from getInputStream
     */

    public static URI getNVDB(String boundingBox, int signId) throws IOException {
        getInputStream();
        String nvdburl = prop.getProperty("NVDBURL");
        UriBuilder uriBuilder = UriBuilder.fromUri(nvdburl);
        uriBuilder.queryParam("inkluder", "alle");
        uriBuilder.queryParam("kartutsnitt", boundingBox);
        uriBuilder.queryParam("egenskap", "5530="+signId);
        uriBuilder.queryParam("srid", SRID);
        return uriBuilder.build();
    }
}
