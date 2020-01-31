import org.json.JSONObject;


public class Main {
    public static void main(String[] args) throws Exception {
        Signs signs = new Signs();
        Filters filters = new Filters();
        int objectId = 85404247;
        String[] keys = {"id", "navn", "egenskapstype"};
        for (String i : keys){
            filters.getEgenskap(signs.getJSONObject(objectId), 0, i);
        }
       // JSONObject json = signs.getJSONObject(objectId);
        //signs.getLinkOrId(json, "href");
        //signs.getLinkOrId(json, "id");

        /*
        filters.getEgenskap(json, 0, "id");
        filters.getEgenskap(json, 0, "navn");
        filters.getEgenskap(json, 0, "egenskapstype");*/
        //filters.getEgenskap(json, 1, "innhold", "navn");
        //filters.getMetadata(json, "lokasjon", "kommuner", "0");
        // System.out.println(json);
        //filters.getRelasjoner(json);
    }
}
