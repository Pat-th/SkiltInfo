import org.osgeo.proj4j.*;

/**
 * @author Tran, Quan
 */
public class WGS2UTM {
    /**
     * The Eastings value in UTM-33
     */
    double Easting;
    /**
     * the Northings value in UTM-33
     */
    double Northing;

    /**
     * Method to convert from WGS84 to UTM-33
     *
     * <p>
     *     Method uses the library proj4j. Method defines the two geodetical systems as Strings, and uses the library
     *     to convert the parameter values from WGS84 to UTM-33
     * </p>
     * @param lat latitude value of current position
     * @param lon longitude value of current position;
     *
     */
    WGS2UTM(double lat, double lon){
        CRSFactory factory = new CRSFactory();
        String wgs84 = "EPSG:4326";
        String utm33 = "EPSG:32633";
        CoordinateReferenceSystem fromCrs = factory.createFromName(wgs84);
        CoordinateReferenceSystem toCrs = factory.createFromName(utm33);

        BasicCoordinateTransform transform = new BasicCoordinateTransform(fromCrs, toCrs);

        ProjCoordinate fromCoord = new ProjCoordinate(lon, lat);
        ProjCoordinate toCoord = new ProjCoordinate();

        transform.transform(fromCoord, toCoord);
        setEasting(toCoord.x);
        setNorthing(toCoord.y);
    }

    /**
     * @param easting - positional value east/west in utm-33
     */
    public void setEasting(double easting) {
        Easting = easting;
    }

    /**
     * @param northing - positional value south/north in utm-33
     */
    public void setNorthing(double northing) {
        Northing = northing;
    }

    /**
     * @return double - positional value east/west in utm-33
     */
    public double getEasting() {
        return Easting;
    }

    /**
     *
     * @return double - positional value south/north in utm-33
     */
    public double getNorthing() {
        return Northing;
    }

}
