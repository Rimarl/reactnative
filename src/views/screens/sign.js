import React, { useRef ,useState} from 'react';
import { StyleSheet, View,TouchableOpacity ,ScrollView,Image,SafeAreaView} from 'react-native';
import { Button, Text,TextInput } from 'react-native-paper';
import SignatureScreen from 'react-native-signature-canvas'

const Sign = ( {navigation, route }) => {
  const [signature, setSign] = useState(null);
  const ref = useRef();
  const {nom, prenom, wilaya, adresse , ICCID , date , MSISDN } = route.params;
  const handleOK = (signature) => {
    console.log(signature);
    setSign(signature); // Callback from Component props
  };

  const handleClear = () => {
    console.log("clear success !");
  };

  const handleEmpty = () => {
    console.log("Empty");
  };


  return (
    <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
    <SafeAreaView style={styles.container}>
    <Text style={[styles.heading, { color: '#385737' }]}>Signer ci-dessous </Text>

    <SignatureScreen
      ref={ref}
      onOK={handleOK}
      onEmpty={handleEmpty}
      onClear={handleClear}
      confirmText="Aperçu"
      clearText='Supprimer'
      webStyle={style}
      textProps={{ text: "Personnaliser le texte", style: { color: "red" } }}
      />
 
      <Text style={[styles.heading, { color: '#385737' }]}>Aperçu de la signature</Text>
      
    

    <Image
     resizeMode={"cover"}
     style={{ width: 300, height: 173, paddingBottom: 30 ,backgroundColor: '#385737',borderRadius: 12,}}
     source={{ uri: signature }}/>
      <View style={{ marginTop: 5,}}>
     <TouchableOpacity
              style={styles.submitButton}
              onPress={() => navigation.navigate('ContratScreen', { nom, prenom , wilaya, adresse, ICCID, date,   MSISDN, signature})} 
            >
              <Text style={styles.buttonText}>Générer Contrat</Text>
            </TouchableOpacity>
            </View>
       </SafeAreaView>
    </ScrollView>
  );
}; 
const style = `.m-signature-pad--footer
.button {
  background-color: #385737;
  color: #FFF;
  width: 100px;
}`;
const styles = StyleSheet.create({
  preview: {
    width: 335,
    height: 114,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  previewText: {
    color: "green",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "green",
    width: 120,
    textAlign: "center",
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 710,
    paddingTop: 50,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
    },
    textSign: {
      color: '#385737',
      fontWeight: 'bold',
      paddingVertical: 5,
    },
    text: {
      color: '#fff',
      fontWeight: '900',
    },
    textInput: {
      paddingVertical: 10,
      textAlign: 'center'
    },
    setButton: {
      backgroundColor: '#385737',
      textAlign: 'center',
      fontWeight: '900',
      color: '#fff',
      marginHorizontal: 10,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    heading: {
        fontWeight: '500',
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
      },
      submitButton: {
        justifyContent: 'center',
        width:150,
        height:35,
        marginTop: 0,
        marginBottom: 5,
        borderRadius: 24,
        backgroundColor: '#385737',
      //  alignSelf: 'flex-end',
      //flexGrow:1
       
      },
      buttonText: {
        padding : 5,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
      },
  });
export default Sign;
 