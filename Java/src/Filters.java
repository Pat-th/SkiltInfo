import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.jayway.jsonpath.JsonPath;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.DecimalFormat;
import java.util.List;
public class Filters{

    void getEgenskap(String json, int index, String key) throws JSONException, JsonProcessingException {
        int resInt = 0;
        String resString = "";
        double resDouble;

        JSONObject object = new JSONObject(json);
        JSONArray array = object.getJSONArray("egenskaper");
        JSONObject object2 = array.getJSONObject(index);
        try {
            if(object2.getDouble(key) % 1 == 0){
                System.out.println(key + ": " + object2.getInt(key));
            } else {
            System.out.println(key + ": " + object2.getDouble(key));}
            System.out.println(key + ": " + object2.getString(key));
        } catch (Exception e) {
        }
    }


}

