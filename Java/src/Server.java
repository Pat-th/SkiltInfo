import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

//https://stackoverflow.com/questions/28571086/java-simple-http-server-application-that-responds-in-json?fbclid=IwAR0eQm5OywnkrP3YrUlSdeU1kvpQ24oTOOkmO8YgYnaAU8uu5LvpLX1qCo0

public class Server {
    private static final String HOSTNAME = "localhost";
    private static final int PORT = 8080;
    private static final int BACKLOG = 1;

    private static final String HEADER_ALLOW = "Allow";
    private static final String HEADER_CONTENT_TYPE = "Content-Type";

    private static final Charset CHARSET = StandardCharsets.UTF_8;

    private static final int STATUS_OK = 200;
    private static final int STATUS_METHOD_NOT_ALLOWED = 405;

    private static final int NO_RESPONSE_LENGTH = -1;

    private static final String METHOD_GET = "GET";
    private static final String METHOD_OPTIONS = "OPTIONS";
    private static final String ALLOWED_METHODS = METHOD_GET + "," + METHOD_OPTIONS;

    public static void main(final String... args) throws IOException {
        Signs signs = new Signs();
        final HttpServer server = HttpServer.create(new InetSocketAddress(HOSTNAME, PORT), BACKLOG);
        System.out.println("Server online");
        server.createContext("/", he -> {
            try {
                final Headers headers = he.getResponseHeaders();
                final String requestMethod = he.getRequestMethod().toUpperCase();
                switch (requestMethod) {
                    case METHOD_GET:
                        final Map<String, List<String>> requestParameters = getRequestParameters(he.getRequestURI());
                        try {
                            StringBuilder sb = new StringBuilder();
                            sb.append(requestParameters.get("id"));
                            sb.deleteCharAt(0);
                            sb.deleteCharAt(sb.length() - 1);

                            StringBuilder sb1 = new StringBuilder();
                            sb1.append(requestParameters.get("lat"));
                            sb1.deleteCharAt(0);
                            sb1.deleteCharAt(sb1.length() - 1);

                            StringBuilder sb2 = new StringBuilder();
                            sb2.append(requestParameters.get("lon"));
                            sb2.deleteCharAt(0);
                            sb2.deleteCharAt(sb2.length() - 1);

                            int enum_id = Integer.parseInt(sb.toString());
                            double lat = Double.parseDouble(sb1.toString());
                            double lon = Double.parseDouble(sb2.toString());

                        System.out.println(enum_id + ", " + lat + ", " + lon + ".");
                        //localhost:8080/?lat=63.365330&lon=10.372574&id=7644
                            // localhost:8080/?lat=63.400854&lon=10.395050&id=7644
                        final String responseBody = signs.getSignsOfType(lat, lon, enum_id).toString();
                        headers.set(HEADER_CONTENT_TYPE, String.format("application/json; charset=%s", CHARSET));
                        final byte[] rawResponseBody = responseBody.getBytes(CHARSET);
                        he.sendResponseHeaders(STATUS_OK, rawResponseBody.length);
                        he.getResponseBody().write(rawResponseBody);
                        }
                        catch (Exception e){
                            System.out.println(e + "\n Invalid parameter, parameter has to be a number");
                        }

                        break;
                    case METHOD_OPTIONS:
                        headers.set(HEADER_ALLOW, ALLOWED_METHODS);
                        he.sendResponseHeaders(STATUS_OK, NO_RESPONSE_LENGTH);
                        break;
                    default:
                        headers.set(HEADER_ALLOW, ALLOWED_METHODS);
                        he.sendResponseHeaders(STATUS_METHOD_NOT_ALLOWED, NO_RESPONSE_LENGTH);
                        break;
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                he.close();
            }
        });
        server.start();
    }

    static Map<String, List<String>> getRequestParameters(final URI requestUri) {
        final Map<String, List<String>> requestParameters = new LinkedHashMap<>();
        final String requestQuery = requestUri.getRawQuery();
        if (requestQuery != null) {
            final String[] rawRequestParameters = requestQuery.split("[&;]", -1);
            for (final String rawRequestParameter : rawRequestParameters) {
                final String[] requestParameter = rawRequestParameter.split("=", 2);
                final String requestParameterName = decodeUrlComponent(requestParameter[0]);
                requestParameters.putIfAbsent(requestParameterName, new ArrayList<>());
                final String requestParameterValue = requestParameter.length > 1 ? decodeUrlComponent(requestParameter[1]) : null;
                requestParameters.get(requestParameterName).add(requestParameterValue);
            }
        }
        return requestParameters;
    }

    static String decodeUrlComponent(final String urlComponent) {
        try {
            return URLDecoder.decode(urlComponent, CHARSET.name());
        } catch (final UnsupportedEncodingException ex) {
            throw new InternalError(ex);
        }
    }
}