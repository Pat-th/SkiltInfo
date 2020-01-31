import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

class Filters{
JSONObject[] keys;
    void getEgenskap(String json, int index, String key) throws JSONException {
        JSONObject o = new JSONObject(json);
        JSONArray array = o.getJSONArray("egenskaper");
        JSONObject object = array.getJSONObject(index);
        tryCatchBlock(object, key);
    }

    void getMetadata(String json, String title, String key, String key2) throws JSONException {
        JSONObject o = new JSONObject(json);
        JSONObject object = o.getJSONObject(title);
        tryCatchBlock(object, key);
        try {
            JSONObject object1 = object.getJSONObject(key);
            tryCatchBlock(object1, key2);
        } catch (Exception e){
        }
    }

    //String json, String title, int index, String key, String key2
    void getRelasjoner(String json) throws JSONException{
        JSONObject o = new JSONObject(json);
        JSONObject object = o.getJSONObject("relasjoner");
        JSONArray array = object.getJSONArray("foreldre");
        JSONObject object1 = array.getJSONObject(0);
        tryCatchBlock(object1, "listeid");
        try {
            JSONObject object4 = object1.getJSONObject("type");
            tryCatchBlock(object4, "id");
        } catch (Exception e){
        }
        try {
            JSONArray array2 = object1.getJSONArray("vegobjekter");
            System.out.println(array2);
        } catch (Exception e){

        }

    }

    private void tryCatchBlock(JSONObject o, String key) {
        try {
            if(o.getDouble(key) % 1 == 0){
                System.out.println(key + ": " + o.getInt(key));
            } else {
                System.out.println(key + ": " + o.getDouble(key));}
        } catch (Exception e) {
        }
        try{
            System.out.println(key + ": " + o.getString(key));
        } catch (Exception e){
        }

    }
}

