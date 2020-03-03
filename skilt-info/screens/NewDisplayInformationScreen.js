import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    ActivityIndicator,
    ShadowPropTypesIOS,
    AsyncStorage
} from 'react-native';
import ItemInfo from "../components/DisplayInfo/ItemInfo";
import * as Filter from "./DisplayInformationScreen";

const NewDisplayInformationScreen = props => {
    const [info, setInfo] = useState([]);
    const [error, setError] = useState(false);


    async function fetchData(){
        const result = props.navigation.state.params.result;
        await read(result);
        console.log("IMAGE!!!: " + props.navigation.state.params.image.uri);
    }

    const read = async result => {
        let fetch = await AsyncStorage.getItem('standard');
        let storage = await AsyncStorage.getItem(fetch);
        let parse = await JSON.parse(storage);
        console.log(fetch);
        console.log(parse);
        setInfo([]);
        if(parse.metadata === true){
            addItem("id", result.id);
            addItem("Link", result.href);
            addItem("Navn", result.metadata.type.navn);
            addItem("Id for Skiltplate", result.metadata.type.id);
            addItem("Start Dato", result.metadata.startdato);
            addItem("Sist Modifisert", result.metadata.sist_modifisert);
        } if(parse.geometri === true){
            addItem("wkt", result.geometri.wkt);
            addItem("srid", result.geometri.srid);
            addItem("Egengeometri", result.geometri.egengeometri)
        } if(parse.lokasjon === true){
            addItem("Kommune", result.lokasjon.kommuner[0]);
            addItem("Fylker", result.lokasjon.fylker[0]);
/*
            addItem("Vegsystem id", result.lokasjon.vegsystemreferanser.vegsystem.id);
            addItem("Vegsystem versjon", result.lokasjon.vegsystemreferanser.vegsystem.versjon);
            addItem("Vegsystem vegkategori", result.lokasjon.vegsystemreferanser.vegsystem.vegkategori);
            addItem("Vegsystem fase", result.lokasjon.vegsystemreferanser.vegsystem.fase);
            addItem("Vegsystem nummer", result.lokasjon.vegsystemreferanser.vegsystem.nummer);
            addItem("Kortform", result.lokasjon.vegsystemreferanser.kortform);*/
/*
            addItem("Strekning id", result.lokasjon.vegsystemreferanser.strekning.id);
            addItem("Strekning versjon", result.lokasjon.vegsystemreferanser.strekning.versjon);
            addItem("Strekning strekning", result.lokasjon.vegsystemreferanser.strekning.strekning);
            addItem("Strekning delstrekning", result.lokasjon.vegsystemreferanser.strekning.delstrekning);
            addItem("Strekning arm", result.lokasjon.vegsystemreferanser.strekning.arm);
            addItem("Strekning adskilte_løp", result.lokasjon.vegsystemreferanser.strekning.adskilte_løp);
            addItem("Strekning trafikantgruppe", result.lokasjon.vegsystemreferanser.strekning.trafikantgruppe);
            addItem("Strekning meter", result.lokasjon.vegsystemreferanser.strekning.meter);
            addItem("Strekning retning", result.lokasjon.vegsystemreferanser.strekning.retning);
*/
            addItem("Stedfesting type", result.lokasjon.stedfestinger[0].type);
            addItem("Stedfesting veglenkesekvensid", result.lokasjon.stedfestinger[0].veglenkesekvensid);
            addItem("Stedfesting relativposisjon", result.lokasjon.stedfestinger[0].relativPosisjon);
            addItem("Stedfesting kortform", result.lokasjon.stedfestinger[0].kortform);
            addItem("Stedfesting retning", result.lokasjon.stedfestinger[0].retning);
            addItem("Stedfesting sideposisjon", result.lokasjon.stedfestinger[0].sideposisjon);
        } if(parse.relasjoner === true){
            addItem("Forelder listeid", result.relasjoner.foreldre[0].listeid);
            addItem("Forelder id", result.relasjoner.foreldre[0].id);
            addItem("Forelder type", result.relasjoner.foreldre[0].type.navn);
            addItem("Forelder type id", result.relasjoner.foreldre[0].type.id);
            addItem("Forelder objektid", result.relasjoner.foreldre[0].vegobjekter[0]);
        } if(parse.egenskaper.PunktTilKnytning === true){
            for(let i in result.egenskaper){
                if(result.egenskaper[i].id === 100096){
                    addItem("navn", result.egenskaper[i].navn);
                    addItem("egenskapstype", result.egenskaper[i].egenskapstype);
                    addItem("datatype", result.egenskaper[i].datatype);
                    addItem("stedfestingstype", result.egenskaper[i].stedfestingstype);
                    addItem("veglenkesekvensid", result.egenskaper[i].veglenkesekvensid);
                    addItem("relativPosisjon", result.egenskaper[i].relativPosisjon);
                    addItem("retning", result.egenskaper[i].retning);
                    addItem("sideposisjon", result.egenskaper[i].sideposisjon);
                }
            }
        } if(parse.egenskaper.AnsiktssideRettetMot === true) {
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 1894){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    addItem('enum_id', result.egenskaper[i].enum_id);
                    break;
                }
            }
        } if(parse.egenskaper.Skiltnummer === true) {
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 5530){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    addItem('enum_id', result.egenskaper[i].enum_id);
                    break;
                }
            }
        } if(parse.egenskaper.Oppsettingsdato === true) {
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 2108){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);

                    break;
                }
            }
        } if(parse.egenskaper.GeometriPunkt === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 4795){
                    addItem("navn", result.egenskaper[i].navn);
                    addItem("egenskapstype", result.egenskaper[i].egenskapstype);
                    addItem("id", result.egenskaper[i].id);
                    addItem("verdi", result.egenskaper[i].verdi);

                    addItem("medium",  result.egenskaper[i].medium);
                    addItem("medium_nvdb", result.egenskaper[i].medium_nvdb);
                    addItem("lengde", result.egenskaper[i].lengde);
                    addItem("høydereferanse", result.egenskaper[i].høydereferanse);

                    addItem("Kvalitet målemetode", result.egenskaper[i].kvalitet.målemetode);
                    addItem("Kvalitet nøyaktighet",  result.egenskaper[i].kvalitet.nøyaktighet);
                    addItem("Kvalitet synbarhet", result.egenskaper[i].kvalitet.synbarhet);
                    addItem("Kvalitet målemetodeHøyde", result.egenskaper[i].kvalitet.målemetodeHøyde);
                    addItem("Kvalitet nøyaktighetHøyde", result.egenskaper[i].kvalitet.nøyaktighetHøyde);
                    addItem("Kvalitet maksimaltAvvik", result.egenskaper[i].kvalitet.maksimaltAvvik);
                }
            }
        } if(parse.egenskaper.Tekst === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 1910){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    addItem('enum_id', result.egenskaper[i].enum_id);
                    break;
                }
            }
        } if(parse.egenskaper.Plasseringskode === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 5128){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    addItem('enum_id', result.egenskaper[i].enum_id);
                    break;
                }
            }
        } if(parse.egenskaper.ToSidigPlateMedUlikeMotiv === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 9484){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    addItem('enum_id', result.egenskaper[i].enum_id);
                    break;
                }
            }
        } if(parse.egenskaper.Storrelse === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 1970){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    addItem('enum_id', result.egenskaper[i].enum_id);
                    break;
                }
            }
        } if(parse.egenskaper.Hoyde === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 1588){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(parse.egenskaper.Bredde === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 1328){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(parse.egenskaper.Skiltform === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 1892){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    addItem('enum_id', result.egenskaper[i].enum_id);
                    break;
                }
            }
        } if(parse.egenskaper.TekstOgSymbolhoyde === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 1912){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    addItem('enum_id', result.egenskaper[i].enum_id);
                    break;
                }
            }
        } if(parse.egenskaper.Farge === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 1294){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    addItem('enum_id', result.egenskaper[i].enum_id);
                    break;
                }
            }
        } if(parse.egenskaper.Belysning === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 1879){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    addItem('enum_id', result.egenskaper[i].enum_id);
                    break;
                }
            }
        } if(parse.egenskaper.Folieklasse === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 1921){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    addItem('enum_id', result.egenskaper[i].enum_id);
                    break;
                }
            }
        } if(parse.egenskaper.Klappskilt === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 8828){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    addItem('enum_id', result.egenskaper[i].enum_id);
                    break;
                }
            }
        } if(parse.egenskaper.Vedtaksnummer === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 1890){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(parse.egenskaper.SkiftetDato === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 2107){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(parse.egenskaper.Arkivnummer === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 9154){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(parse.egenskaper.Eier === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 11826){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    addItem('enum_id', result.egenskaper[i].enum_id);
                    break;
                }
            }
        } if(parse.egenskaper.Vedlikeholdsansvarlig === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 8064){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    addItem('enum_id', result.egenskaper[i].enum_id);
                    break;
                }
            }
        }
    };

    const createSimpleView = result => {
        if(typeof result === "undefined"){
            setError(true);
        }else{
            addItem("ID", result.id);
            addItem("Direkte Link", result.href);
            addItem("Start Dato", result.metadata.startdato);
            addItem("Sist Modifisert", result.metadata.sist_modifisert);
        }
    }

    const addItem = (id, value) => {
        setInfo(item => [
          ...item,
          { id: id, value: value }]);
      }

    useEffect(() => {
        fetchData();
    }, [])

    if(error){
        return(
            <View style={styles.errorContainer}>
                <Text>Vi fant desverre ingen passende skilt på denne strekningen</Text>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.topView}>
                <View style={styles.imageView}>
                    <Image style={styles.imageStyle} source={{uri: props.navigation.state.params.image.uri}}></Image>
                </View>
                <View style={styles.buttonView}>

                </View>
            </View>
            <View style={styles.bottomView}>
                <FlatList style={styles.list1}
                keyExtractor={(item, index) => index.toString()}
                data={info}
                renderItem={itemData => <ItemInfo id={itemData.item.id + ":"} value={itemData.item.value}/>} 
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      topView: {
          backgroundColor: "yellow",
          flex: 1,
          flexDirection: "row"
      },
      imageView: {
          backgroundColor: "#fff",
          flex: 1,
      },
      imageStyle: {
          flex: 1,
          borderRadius: 10,
          width: undefined, 
          height: undefined,
      },
      buttonView: {
          backgroundColor: "#fff",
          flex: 1
      },
      bottomView: {
          flex: 1,
          margin: 10
      }
});

export default NewDisplayInformationScreen;