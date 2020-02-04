 import org.json.JSONObject;

 import java.util.Collection;
 import java.util.HashMap;
 import java.util.List;


 public class Main {
    public static void main(String[] args) throws Exception {
        Signs signs = new Signs();
        Filters filters = new Filters();
        int objectId = 85404247;
        double lat = 63.365330;
        double lon = 10.372574;
        int enum_id = 7644;
        //JSONObject json = new JSONObject(signs.getJSONObject(objectId));
        //signs.getListOfSigns(signs.getVeglenkesekvens(signs.getRoad(lat, lon)));
        signs.getSignsOfType(lat, lon, enum_id);


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
