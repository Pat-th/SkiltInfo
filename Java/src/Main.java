public class Main {
    public static void main(String[] args) throws Exception {
        Signs signs = new Signs();
        Filters filters = new Filters();
        int objectId = 582987496;
        //signs.linkOnly(signs.sendGet(objectId));
        filters.getEgenskap(signs.sendGet(objectId), 0, "id");
        //signs.sendGet(objectId);
    }
}
