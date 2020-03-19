import org.osgeo.proj4j.*;
public class WGS2UTM {
    double Easting;
    double Northing;

    /**
     *
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

    public void setEasting(double easting) {
        Easting = easting;
    }

    public void setNorthing(double northing) {
        Northing = northing;
    }

    public double getEasting() {
        return Easting;
    }

    public double getNorthing() {
        return Northing;
    }

}
