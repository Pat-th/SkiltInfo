import org.osgeo.proj4j.*;
public class WGS2UTM {
    double Easting;
    double Northing;
    WGS2UTM(double Lat, double Lon){
        CRSFactory factory = new CRSFactory();
        CoordinateReferenceSystem fromCrs = factory.createFromName("EPSG:4326");
        CoordinateReferenceSystem toCrs = factory.createFromName("EPSG:32633");

        BasicCoordinateTransform transform = new BasicCoordinateTransform(fromCrs, toCrs);

        //Note that it is Lon, Lat and not lat, lon, since it's x,y coordinates
        ProjCoordinate fromCoord = new ProjCoordinate(Lon, Lat);
        ProjCoordinate toCoord = new ProjCoordinate();

        //Transforms the fromCoords from wgs84 to utm33, and writes them into toCoord.
        //Sets the easting and northing values to toCoord x and y respectively.
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
