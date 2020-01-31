import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

class Filters{
JSONObject[] keys;
    void getEgenskap(JSONObject json, int index, String key) throws JSONException {

        JSONArray array = json.getJSONArray("egenskaper");
        JSONObject object = array.getJSONObject(index);
        tryCatchBlock(object, key);
    }

    void getMetadata(JSONObject json, String title, String key, String key2, String key3) throws JSONException {
        JSONObject object = json.getJSONObject(title);
        tryCatchBlock(object, key);
        try {
            JSONObject object1 = object.getJSONObject(key);
            tryCatchBlock(object1, key2);
            try{
                JSONObject object2 = object1.getJSONObject(key2);
                tryCatchBlock(object2, key3);
            }catch (Exception e){
            }
        } catch (Exception e){
        }
    }

    //String json, String title, int index, String key, String key2
    void getRelasjoner(JSONObject json, String title, String key, String key2) throws JSONException{
        JSONObject object = json.getJSONObject(title);
        JSONArray array = object.getJSONArray(key);
        JSONObject object1 = array.getJSONObject(0);
        tryCatchBlock(object, key2);

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

