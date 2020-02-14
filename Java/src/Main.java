 import org.json.JSONObject;

 import java.util.Collection;
 import java.util.HashMap;
 import java.util.List;


 public class Main {
    public static void main(String[] args) throws Throwable {
        Signs signs = new Signs();
        Filters filters = new Filters();
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
        //JSONObject json = new JSONObject(signs.getJSONObject(objectId));
        //signs.getListOfSigns(signs.getVeglenkesekvens(signs.getRoad(lat, lon)));
        //signs.getSignsOfType(lat, lon, enum_id);
        //System.out.println(signs.getRoad(lat3, lon3));
        //System.out.println(signs.getRoad(63.399900, 10.393645));
        signs.getSignsOfType(lat2, lon2, enum_id);


        /*
        String[] keys = {"id", "navn", "egenskapstype"};
        for (String i : keys){
            filters.getEgenskap(json, 0, i);
        }

        filters.getMetadata(json, "metadata", "type", "id", "");
        signs.getLinkOrId(json, "href");
        */
        //signs.getLinkOrId(json, "href");
        //signs.getLinkOrId(json, "id");

        /*
        filters.getEgenskap(json, 0, "id");
        filters.getEgenskap(json, 0, "navn");
        filters.getEgenskap(json, 0, "egenskapstype");*/
        //filters.getEgenskap(json, 1, "innhold", "navn");
        //filters.getMetadata(json, "lokasjon", "kommuner", "0");
        //System.out.println(json);
        //filters.getRelasjoner(json);
    }
}
