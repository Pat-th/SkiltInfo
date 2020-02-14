import static org.junit.Assert.*;

import org.skyscreamer.jsonassert.*;
import org.json.JSONObject;
import org.junit.*;
public class SignsTest {
    Signs signs = new Signs();
    int objectId = 85404247;
    double lat = 63.365330;
    double lon = 10.372574;
    int enum_id = 7644;
    @Test
    public void testGetJSONObject() throws  Throwable {
        String actual = signs.getJSONObject(objectId);
        String result = "{\"id\":85404247,\"href\":\"https://apilesv3.utv.atlas.vegvesen.no/vegobjekter/96/85404247/1\",\"metadata\":{\"type\":{\"id\":96,\"navn\":\"Skiltplate\"},\"versjon\":1,\"startdato\":\"2005-07-11\",\"sist_modifisert\":\"2019-10-19T09:08:21\"},\"egenskaper\":[{\"id\":100096,\"navn\":\"PunktTilknytning\",\"egenskapstype\":\"Stedfesting\",\"datatype\":\"GeomPunkt\",\"stedfestingstype\":\"Punkt\",\"veglenkesekvensid\":72810,\"relativPosisjon\":0.76192474,\"retning\":\"MED\",\"sideposisjon\":\"V\",\"kjørefelt\":[]},{\"id\":221127,\"navn\":\"Assosierte Tilstand/skade FU, punkt\",\"egenskapstype\":\"Liste\",\"datatype\":\"Liste\",\"innhold\":[{\"id\":201127,\"navn\":\"Assosiert Tilstand/skade FU, punkt\",\"egenskapstype\":\"Assosiasjon\",\"datatype\":\"Assosiasjon\",\"verdi\":85404246}]},{\"id\":220472,\"navn\":\"Assosierte Tilstand/skade, skiltplate\",\"egenskapstype\":\"Liste\",\"datatype\":\"Liste\",\"innhold\":[{\"id\":200472,\"navn\":\"Assosiert Tilstand/skade, skiltplate\",\"egenskapstype\":\"Assosiasjon\",\"datatype\":\"Assosiasjon\",\"verdi\":85404245}]},{\"id\":4795,\"navn\":\"Geometri, punkt\",\"egenskapstype\":\"Geometri\",\"datatype\":\"GeomPunkt\",\"verdi\":\"POINT (269069.11742641 7035130.15559049)\",\"kvalitet\":{\"målemetode\":82,\"nøyaktighet\":100,\"synbarhet\":99,\"målemetodeHøyde\":-1,\"nøyaktighetHøyde\":0,\"maksimaltAvvik\":-1},\"medium\":\"T\",\"medium_nvdb\":0,\"lengde\":-1.0,\"høydereferanse\":9999},{\"id\":1921,\"navn\":\"Folieklasse\",\"egenskapstype\":\"Tekstenum\",\"datatype\":\"FlerverdiAttributt, Tekst\",\"verdi\":\"Klasse 1\",\"enum_id\":2848},{\"id\":5128,\"navn\":\"Plasseringskode\",\"egenskapstype\":\"Heltall\",\"datatype\":\"Tall\",\"verdi\":10},{\"id\":1879,\"navn\":\"Belysning\",\"egenskapstype\":\"Tekstenum\",\"datatype\":\"FlerverdiAttributt, Tekst\",\"verdi\":\"Ingen\",\"enum_id\":3476},{\"id\":5530,\"navn\":\"Skiltnummer\",\"egenskapstype\":\"Tekstenum\",\"datatype\":\"FlerverdiAttributt, Tekst\",\"verdi\":\"206 - Forkjørsveg\",\"enum_id\":7644},{\"id\":1892,\"navn\":\"Skiltform\",\"egenskapstype\":\"Tekstenum\",\"datatype\":\"FlerverdiAttributt, Tekst\",\"verdi\":\"Plan\",\"enum_id\":2853},{\"id\":1894,\"navn\":\"Ansiktsside, rettet mot\",\"egenskapstype\":\"Tekstenum\",\"datatype\":\"FlerverdiAttributt, Tekst\",\"verdi\":\"Trafikk mot metreringsretning\",\"enum_id\":2717},{\"id\":1970,\"navn\":\"Størrelse\",\"egenskapstype\":\"Tekstenum\",\"datatype\":\"FlerverdiAttributt, Tekst\",\"verdi\":\"Middels\",\"enum_id\":2626},{\"id\":2108,\"navn\":\"Oppsettingsdato\",\"egenskapstype\":\"Dato\",\"datatype\":\"Dato\",\"verdi\":\"1900-01-01\"},{\"id\":8828,\"navn\":\"Klappskilt\",\"egenskapstype\":\"Tekstenum\",\"datatype\":\"FlerverdiAttributt, Tekst\",\"verdi\":\"Nei\",\"enum_id\":11739}],\"geometri\":{\"wkt\":\"POINT (269069.11742641 7035130.15559049)\",\"srid\":6173,\"egengeometri\":true},\"lokasjon\":{\"kommuner\":[5001],\"fylker\":[50],\"kontraktsområder\":[],\"riksvegruter\":[],\"vegsystemreferanser\":[{\"vegsystem\":{\"id\":1002318233,\"versjon\":1,\"vegkategori\":\"E\",\"fase\":\"V\",\"nummer\":6},\"strekning\":{\"id\":-1,\"versjon\":-1,\"strekning\":75,\"delstrekning\":1,\"arm\":false,\"adskilte_løp\":\"Nei\",\"trafikantgruppe\":\"K\",\"meter\":38.92,\"retning\":\"MED\"},\"kortform\":\"EV6 S75D1 m39\"}],\"stedfestinger\":[{\"type\":\"Punkt\",\"veglenkesekvensid\":72810,\"relativPosisjon\":0.76192474,\"kortform\":\"0.76192474@72810\",\"kjørefelt\":[],\"sideposisjon\":\"V\",\"retning\":\"MED\"}],\"geometri\":{\"wkt\":\"POINT Z(269080.924 7035128.103 136.69)\",\"srid\":6173}},\"relasjoner\":{\"foreldre\":[{\"listeid\":220004,\"id\":200004,\"type\":{\"id\":95,\"navn\":\"Skiltpunkt\"},\"vegobjekter\":[85404250]}],\"barn\":[{\"listeid\":220472,\"id\":200472,\"type\":{\"id\":438,\"navn\":\"Tilstand/skade, skiltplate\"},\"vegobjekter\":[85404245]},{\"listeid\":221127,\"id\":201127,\"type\":{\"id\":762,\"navn\":\"Tilstand/skade FU, punkt\"},\"vegobjekter\":[85404246]}]}}";

        JSONAssert.assertEquals(result, actual, false);
        JSONAssert.assertEquals("{\"id\":85404247, \"href\":\"https://apilesv3.utv.atlas.vegvesen.no/vegobjekter/96/85404247/1\"}", actual, false);
    }
    @Test
    public void testGetLinkOrId() throws Exception {
        String actual = signs.getJSONObject(objectId);
        JSONObject json = new JSONObject(actual);

        String actual1 = signs.getLinkOrId(json, "href");
        String actual2 = signs.getLinkOrId(json, "id");

        String link = "https://apilesv3.utv.atlas.vegvesen.no/vegobjekter/96/85404247/1";
        String id = "85404247";

        assertEquals(link, actual1);
        assertEquals(id, actual2);
    }

    @Test
    public void testGetSignsOfType() throws Exception{
        String actual3 = signs.getSignsOfType(lat, lon, enum_id).toString();
        String result1 = "[{\"metadata\":{\"sist_modifisert\":\"2019-05-29T15:04:14\",\"startdato\":\"2015-01-29\",\"type\":{\"navn\":\"Skiltplate\",\"id\":96},\"versjon\":1},\"egenskaper\":[{\"stedfestingstype\":\"Punkt\",\"relativPosisjon\":0.34869771,\"retning\":\"MED\",\"datatype\":\"GeomPunkt\",\"veglenkesekvensid\":42733,\"navn\":\"PunktTilknytning\",\"id\":100096,\"kjørefelt\":[],\"egenskapstype\":\"Stedfesting\",\"sideposisjon\":\"V\"}, {\"datatype\":\"GeomPunkt\",\"verdi\":\"POINT (268589.3395961828 7034499.434868706)\",\"navn\":\"Geometri, punkt\",\"medium_nvdb\":0,\"id\":4795,\"medium\":\"T\",\"egenskapstype\":\"Geometri\",\"lengde\":-1,\"høydereferanse\":0},{\"datatype\":\"FlerverdiAttributt, Tekst\",\"verdi\":\"206 - Forkjørsveg\",\"enum_id\":7644,\"navn\":\"Skiltnummer\",\"id\":5530,\"egenskapstype\":\"Tekstenum\"},{\"datatype\":\"FlerverdiAttributt, Tekst\",\"verdi\":\"Trafikk mot metreringsretning\",\"enum_id\":2717,\"navn\":\"Ansiktsside, rettet mot\",\"id\":1894,\"egenskapstype\":\"Tekstenum\"}],\"geometri\":{\"wkt\":\"POINT Z(268596.264 7034496.751 138.727)\",\"egengeometri\":false,\"srid\":6173},\"lokasjon\":{\"kommuner\":[5001],\"fylker\":[50],\"stedfestinger\":[{\"relativPosisjon\":0.34869771,\"retning\":\"MED\",\"kortform\":\"0.34869771@42733\",\"veglenkesekvensid\":42733,\"kjørefelt\":[],\"type\":\"Punkt\",\"sideposisjon\":\"V\"}],\"kontraktsområder\":[],\"geometri\":{\"wkt\":\"POINT Z(268596.264 7034496.751 138.727)\",\"srid\":6173},\"riksvegruter\":[],\"vegsystemreferanser\":[{\"strekning\":{\"trafikantgruppe\":\"K\",\"retning\":\"MED\",\"strekning\":2,\"meter\":417.135,\"delstrekning\":1,\"id\":-1,\"versjon\":-1,\"adskilte_løp\":\"Nei\",\"arm\":false},\"kortform\":\"KV8117 S2D1 m417\",\"vegsystem\":{\"fase\":\"V\",\"vegkategori\":\"K\",\"id\":1003332875,\"versjon\":1,\"nummer\":8117}}]},\"vegsegmenter\":[{\"relativPosisjon\":0.34869771,\"kommune\":5001,\"vegsystemreferanse\":{\"kortform\":\"KV8117\",\"vegsystem\":{\"fase\":\"V\",\"vegkategori\":\"K\",\"id\":1003332875,\"versjon\":1,\"nummer\":8117}},\"typeVeg_sosi\":\"kanalisertVeg\",\"fylke\":50,\"startdato\":\"2015-01-29\",\"veglenkesekvensid\":42733,\"typeVeg\":\"Kanalisert veg\",\"geometri\":{\"wkt\":\"POINT Z(268596.264 7034496.751 138.727)\",\"srid\":6173},\"veglenkeType\":\"HOVED\",\"sluttdato\":\"2019-11-07\",\"detaljnivå\":\"Vegtrase\"},{\"relativPosisjon\":0.34869771,\"kommune\":5001,\"vegsystemreferanse\":{\"strekning\":{\"trafikantgruppe\":\"K\",\"retning\":\"MED\",\"strekning\":2,\"meter\":417.135,\"delstrekning\":1,\"id\":-1,\"versjon\":-1,\"adskilte_løp\":\"Nei\",\"arm\":false},\"kortform\":\"KV8117 S2D1 m417\",\"vegsystem\":{\"fase\":\"V\",\"vegkategori\":\"K\",\"id\":1003332875,\"versjon\":1,\"nummer\":8117}},\"typeVeg_sosi\":\"kanalisertVeg\",\"fylke\":50,\"startdato\":\"2019-11-07\",\"veglenkesekvensid\":42733,\"typeVeg\":\"Kanalisert veg\",\"geometri\":{\"wkt\":\"POINT Z(268596.264 7034496.751 138.727)\",\"srid\":6173},\"veglenkeType\":\"HOVED\",\"detaljnivå\":\"Vegtrase\"}],\"id\":582987486,\"href\":\"https://apilesv3.utv.atlas.vegvesen.no/vegobjekter/96/582987486/1\",\"relasjoner\":{\"foreldre\":[{\"vegobjekter\":[582987484],\"listeid\":220004,\"id\":200004,\"type\":{\"navn\":\"Skiltpunkt\",\"id\":95}}]}}, {\"metadata\":{\"sist_modifisert\":\"2018-05-30T14:57:31\",\"startdato\":\"2015-01-29\",\"type\":{\"navn\":\"Skiltplate\",\"id\":96},\"versjon\":1},\"egenskaper\":[{\"stedfestingstype\":\"Punkt\",\"relativPosisjon\":0.44238529,\"retning\":\"MED\",\"datatype\":\"GeomPunkt\",\"veglenkesekvensid\":42733,\"navn\":\"PunktTilknytning\",\"id\":100096,\"kjørefelt\":[],\"egenskapstype\":\"Stedfesting\",\"sideposisjon\":\"H\"},{\"datatype\":\"GeomPunkt\",\"verdi\":\"POINT Z(268658.001740709 7034588.85811962 134.743273452678)\",\"kvalitet\":{\"målemetode\":82,\"nøyaktighetHøyde\":0,\"nøyaktighet\":112,\"maksimaltAvvik\":-1,\"målemetodeHøyde\":-1,\"synbarhet\":99},\"navn\":\"Geometri, punkt\",\"medium_nvdb\":0,\"id\":4795,\"medium\":\"T\",\"egenskapstype\":\"Geometri\",\"lengde\":-1,\"høydereferanse\":0},{\"datatype\":\"FlerverdiAttributt, Tekst\",\"verdi\":\"206 - Forkjørsveg\",\"enum_id\":7644,\"navn\":\"Skiltnummer\",\"id\":5530,\"egenskapstype\":\"Tekstenum\"},{\"datatype\":\"FlerverdiAttributt, Tekst\",\"verdi\":\"Trafikk i metreringsretning\",\"enum_id\":2714,\"navn\":\"Ansiktsside, rettet mot\",\"id\":1894,\"egenskapstype\":\"Tekstenum\"}],\"geometri\":{\"wkt\":\"POINT Z(268649.648 7034595.014 134.741)\",\"egengeometri\":false,\"srid\":6173},\"lokasjon\":{\"kommuner\":[5001],\"fylker\":[50],\"stedfestinger\":[{\"relativPosisjon\":0.44238529,\"retning\":\"MED\",\"kortform\":\"0.44238529@42733\",\"veglenkesekvensid\":42733,\"kjørefelt\":[],\"type\":\"Punkt\",\"sideposisjon\":\"H\"}],\"kontraktsområder\":[],\"geometri\":{\"wkt\":\"POINT Z(268649.648 7034595.014 134.741)\",\"srid\":6173},\"riksvegruter\":[],\"vegsystemreferanser\":[{\"strekning\":{\"trafikantgruppe\":\"K\",\"retning\":\"MED\",\"strekning\":2,\"meter\":529.213,\"delstrekning\":1,\"id\":-1,\"versjon\":-1,\"adskilte_løp\":\"Nei\",\"arm\":false},\"kortform\":\"KV8117 S2D1 m529\",\"vegsystem\":{\"fase\":\"V\",\"vegkategori\":\"K\",\"id\":1003332875,\"versjon\":1,\"nummer\":8117}}]},\"vegsegmenter\":[{\"relativPosisjon\":0.44238529,\"kommune\":5001,\"vegsystemreferanse\":{\"kortform\":\"KV8117\",\"vegsystem\":{\"fase\":\"V\",\"vegkategori\":\"K\",\"id\":1003332875,\"versjon\":1,\"nummer\":8117}},\"typeVeg_sosi\":\"kanalisertVeg\",\"fylke\":50,\"startdato\":\"2015-01-29\",\"veglenkesekvensid\":42733,\"typeVeg\":\"Kanalisert veg\",\"geometri\":{\"wkt\":\"POINT Z(268649.648 7034595.014 134.741)\",\"srid\":6173},\"veglenkeType\":\"HOVED\",\"sluttdato\":\"2019-11-07\",\"detaljnivå\":\"Vegtrase\"},{\"relativPosisjon\":0.44238529,\"kommune\":5001,\"vegsystemreferanse\":{\"strekning\":{\"trafikantgruppe\":\"K\",\"retning\":\"MED\",\"strekning\":2,\"meter\":529.213,\"delstrekning\":1,\"id\":-1,\"versjon\":-1,\"adskilte_løp\":\"Nei\",\"arm\":false},\"kortform\":\"KV8117 S2D1 m529\",\"vegsystem\":{\"fase\":\"V\",\"vegkategori\":\"K\",\"id\":1003332875,\"versjon\":1,\"nummer\":8117}},\"typeVeg_sosi\":\"kanalisertVeg\",\"fylke\":50,\"startdato\":\"2019-11-07\",\"veglenkesekvensid\":42733,\"typeVeg\":\"Kanalisert veg\",\"geometri\":{\"wkt\":\"POINT Z(268649.648 7034595.014 134.741)\",\"srid\":6173},\"veglenkeType\":\"HOVED\",\"detaljnivå\":\"Vegtrase\"}],\"id\":582987497,\"href\":\"https://apilesv3.utv.atlas.vegvesen.no/vegobjekter/96/582987497/1\",\"relasjoner\":{\"foreldre\":[{\"vegobjekter\":[582987495],\"listeid\":220004,\"id\":200004,\"type\":{\"navn\":\"Skiltpunkt\",\"id\":95}}]}}, {\"metadata\":{\"sist_modifisert\":\"2018-08-28T11:07:43\",\"startdato\":\"2016-01-06\",\"type\":{\"navn\":\"Skiltplate\",\"id\":96},\"versjon\":1},\"egenskaper\":[{\"stedfestingstype\":\"Punkt\",\"relativPosisjon\":0.94152047,\"retning\":\"MED\",\"datatype\":\"GeomPunkt\",\"veglenkesekvensid\":42733,\"navn\":\"PunktTilknytning\",\"id\":100096,\"kjørefelt\":[],\"egenskapstype\":\"Stedfesting\",\"sideposisjon\":\"V\"},{\"datatype\":\"GeomPunkt\",\"verdi\":\"POINT Z(268922.779299794 7035111.34176416 130.25648748649)\",\"kvalitet\":{\"målemetode\":82,\"nøyaktighetHøyde\":0,\"nøyaktighet\":136,\"maksimaltAvvik\":-1,\"målemetodeHøyde\":-1,\"synbarhet\":99},\"navn\":\"Geometri, punkt\",\"medium_nvdb\":0,\"id\":4795,\"medium\":\"T\",\"egenskapstype\":\"Geometri\",\"lengde\":-1,\"høydereferanse\":9999},{\"datatype\":\"FlerverdiAttributt, Tekst\",\"verdi\":\"206 - Forkjørsveg\",\"enum_id\":7644,\"navn\":\"Skiltnummer\",\"id\":5530,\"egenskapstype\":\"Tekstenum\"},{\"datatype\":\"FlerverdiAttributt, Tekst\",\"verdi\":\"Trafikk mot metreringsretning\",\"enum_id\":2717,\"navn\":\"Ansiktsside, rettet mot\",\"id\":1894,\"egenskapstype\":\"Tekstenum\"}],\"geometri\":{\"wkt\":\"POINT Z(268929.13 7035110.112 129.391)\",\"egengeometri\":false,\"srid\":6173},\"lokasjon\":{\"kommuner\":[5001],\"fylker\":[50],\"stedfestinger\":[{\"relativPosisjon\":0.94152047,\"retning\":\"MED\",\"kortform\":\"0.94152047@42733\",\"veglenkesekvensid\":42733,\"kjørefelt\":[],\"type\":\"Punkt\",\"sideposisjon\":\"V\"}],\"kontraktsområder\":[],\"geometri\":{\"wkt\":\"POINT Z(268929.13 7035110.112 129.391)\",\"srid\":6173},\"riksvegruter\":[],\"vegsystemreferanser\":[{\"strekning\":{\"trafikantgruppe\":\"K\",\"retning\":\"MED\",\"strekning\":2,\"meter\":1126.325,\"delstrekning\":1,\"id\":-1,\"versjon\":-1,\"adskilte_løp\":\"Nei\",\"arm\":false},\"kortform\":\"KV8117 S2D1 m1126\",\"vegsystem\":{\"fase\":\"V\",\"vegkategori\":\"K\",\"id\":1003332875,\"versjon\":1,\"nummer\":8117}}]},\"vegsegmenter\":[{\"relativPosisjon\":0.94152047,\"kommune\":5001,\"vegsystemreferanse\":{\"kortform\":\"KV8117\",\"vegsystem\":{\"fase\":\"V\",\"vegkategori\":\"K\",\"id\":1003332875,\"versjon\":1,\"nummer\":8117}},\"typeVeg_sosi\":\"kanalisertVeg\",\"fylke\":50,\"startdato\":\"2016-01-06\",\"veglenkesekvensid\":42733,\"typeVeg\":\"Kanalisert veg\",\"geometri\":{\"wkt\":\"POINT Z(268929.13 7035110.112 129.391)\",\"srid\":6173},\"veglenkeType\":\"HOVED\",\"sluttdato\":\"2019-11-07\",\"detaljnivå\":\"Vegtrase\"},{\"relativPosisjon\":0.94152047,\"kommune\":5001,\"vegsystemreferanse\":{\"strekning\":{\"trafikantgruppe\":\"K\",\"retning\":\"MED\",\"strekning\":2,\"meter\":1126.325,\"delstrekning\":1,\"id\":-1,\"versjon\":-1,\"adskilte_løp\":\"Nei\",\"arm\":false},\"kortform\":\"KV8117 S2D1 m1126\",\"vegsystem\":{\"fase\":\"V\",\"vegkategori\":\"K\",\"id\":1003332875,\"versjon\":1,\"nummer\":8117}},\"typeVeg_sosi\":\"kanalisertVeg\",\"fylke\":50,\"startdato\":\"2019-11-07\",\"veglenkesekvensid\":42733,\"typeVeg\":\"Kanalisert veg\",\"geometri\":{\"wkt\":\"POINT Z(268929.13 7035110.112 129.391)\",\"srid\":6173},\"veglenkeType\":\"HOVED\",\"detaljnivå\":\"Vegtrase\"}],\"id\":657432334,\"href\":\"https://apilesv3.utv.atlas.vegvesen.no/vegobjekter/96/657432334/1\",\"relasjoner\":{\"foreldre\":[{\"vegobjekter\":[657432333],\"listeid\":220004,\"id\":200004,\"type\":{\"navn\":\"Skiltpunkt\",\"id\":95}}]}}]";
        JSONAssert.assertEquals(result1, actual3, false);
    }
}
