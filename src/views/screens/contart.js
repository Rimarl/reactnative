
/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Dimensions,TouchableOpacity ,  ScrollView , Image } from 'react-native';






const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Contrat =({route})=>
 {
  const currentDate = format(new Date(), 'dd/MM/yyyy');

 const  { nom, prenom,  wilaya, adresse ,   PI , numPI , ICCID, MSISDN , signature} = route.params;
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    setScrollPosition(y);
  };
  
const sendHtmlToBackend = async () => {
  try {
    const response = await axios.post('http://192.168.1.71:3001/api/pdf', {
      htmlContent: htmlContent,
    });
    const pdfPath = response.data.pdfPath;
    console.log('PDF file path:', pdfPath);
  } catch (error) {
    console.error('Error:', error);
  }
};
  


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={styles.pdfContainer}>
          <View style={styles.pdfHeader}>
            <Text style={styles.pdfTitle}>Contrat pdv</Text>
          </View>
          <View style={styles.pdfContent}>
          <View style={styles.pdfSection}>
  <View style={styles.inlineText}>
    <Text style={styles.smallText}>Date de remis : {currentDate} </Text>
    <Text style={styles.smallText}>Contrat de l'offre :<Text>M001111111</Text></Text>
  </View>
  
</View>

            <View style={styles.simTerminal}>
              <Text style={styles.smallText}>Carte sim/terminal</Text>
            </View>
         
            <View style={styles.pdfSection}>
                <View style={styles.inlineText}>
                  <Text style={styles.smallText}>MSISDN: 12345678900 </Text>
                  <Text style={styles.smallText}>Numero de SIM : {ICCID}</Text>
                </View>
                </View>
                
                
             
           
            <View style={styles.infoClient}>
              <Text style={styles.encadrerUnContenu}>Information client</Text>
              <View style={styles.adrWilayaC}>
                <View style={styles.nom}>
                  <Text style={styles.smallText}>Nom :<Text  style={styles.boldText}> {nom}</Text>  </Text>
                </View>
                <View style={styles.dn}>
                  <Text style={styles.smallText}>Date de naissance: <Text  style={styles.boldText}> {currentDate}</Text>  </Text>
                </View>
              
              </View>
              <View style={styles.prenomLieux}>
                <View style={styles.prenom}>
                  <Text style={styles.smallText}>Prenom : <Text  style={styles.boldText}> {prenom} </Text></Text>
                </View>
                <View style={styles.inputb}>
                  <Text style={styles.hhh}></Text>
                </View>
                <View style={styles.lieux}>
                  <Text style={styles.smallText}>Lieu de naissance:</Text>
                </View>
              </View>
              <View style={styles.adrWilayaC}>
                <View style={styles.adr}>
                  <Text style={styles.smallText}>Adresse <Text  style={styles.boldText}>{adresse} </Text> </Text>
                </View>
               
                <View style={styles.wilaya}>
                  <Text style={styles.smallText}>Wilaya:<Text  style={styles.boldText}> {wilaya} </Text> </Text>
                </View>
                
              </View>
              <View></View>
              <View style={styles.confirmation}>
                <Text>Confirmation:</Text>
              </View>
              <View style={styles.numContratEmail}>
                <View style={styles.numContrat}>
                  <Text style={styles.smallText}>N° contrat:</Text>
                </View>
                <View style={styles.email}>
                  <Text style={styles.smallText}>Email:</Text>
                </View>
              </View>
            </View>
            <View style={styles.pj}>
  <Text style={styles.encadrerUnContenu}>Piece jointe</Text>
  <View style={styles.rowContainer}>
    <View style={styles.typePI}>
      <Text style={styles.smallText}>Type PI: {PI} </Text>
    </View>
    <View style={styles.NUMPI}>
      <Text style={styles.smallText}>N° PI: {numPI}</Text>
    </View>
  </View>
  <View style={styles.rowContainer}>
    <View style={styles.date}>
      <Text style={styles.smallText}>Date</Text>
    </View>
    <View style={styles.date}>
      <Text style={styles.smallText}>A</Text>
    </View>
  </View>
</View>

            <View style={styles.infoClient}>
              <Text style={styles.encadrerUnContenu}>Mandataire / tuteur</Text>
              <View style={styles.nomDate}>
                <View style={styles.nom}>
                  <Text style={styles.smallText}>Nom: GFHGHJGYUKJ YGI </Text>
                </View>
                <View style={styles.dn}>
                  <Text style={styles.smallText}>Prenom: </Text>
                </View>
              </View>
              <View style={styles.prenomLieux}>
                <View style={styles.prenom}>
                  <Text style={styles.smallText}>Type PI: carte d'identite</Text>
                </View>
                <View style={styles.lieux}>
                  <Text style={styles.smallText}>N° PI: 12345678909876543212 </Text>
                </View>
              </View>
              <View style={styles.typeTerminalMi}>
                <View style={styles.date}>
                  <Text style={styles.smallText}>Date</Text>
                </View>
                <View style={styles.datea}>
                  <Text style={styles.smallText}>A</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.pdfFooter}>
            <View style={styles.signatureClient}>
              <View style={styles.label}>
                <Text style={styles.cadreClient}>Cadre Client</Text>
              </View>
              <Text style={styles.signature}>signature </Text> 
                 <Image
     resizeMode={"cover"}
     style={{ width: 70, height: 'auto', paddingBottom: 30 ,backgroundColor: 'white'}}
     source={{ uri: signature }}/>
            </View>
            <View style={styles.cachetPdf}>
              <Text style={styles.label1}>Cadre Agence</Text>
              <Text style={styles.cacher}>Cacher à signature</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={sendHtmlToBackend}  >
        <Text>Télécharger en PDF</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    width: windowWidth -30,
    height: windowHeight - 50,
    padding: 10,
    margin: 20,
    borderRadius: 10,
    
  },
  pdfHeader: {
    borderWidth: 1,
    borderColor: 'rgb(7, 208, 7)',
    padding: 15,
    backgroundColor: 'rgb(232, 247, 232)',
    borderRadius: 5,
    shadowColor: '#888888',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 2,
  },
  pdfTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  pdfContent: {
    marginTop: 20,
    
  },

  pdfSection: {
    
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  
  boldText: {
    fontWeight: 'bold',
  },
  simTerminal: {
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  caretSimTerminal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  msisdnNumSim: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputb: {
    width: '2%',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  sim: {
    flex: 2,
    textAlign: 'center',
    fontSize: 16,
  },
 
  typeTerminalMi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoClient: {
    marginBottom: 20,
  },
  encadrerUnContenu: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'rgb(239, 238, 238)',
    shadowColor: '#888888',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  nomDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // Add this line
  },
  prenomLieux: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  adrWilayaC: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // Add this line
  },
  
  confirmation: {
    marginBottom: 10,
  },
  numContratEmail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pj: {
    marginBottom: 20,
    
  },
  dn: {
    width: 150,
    flexShrink: 1,
  },
  
  nom :{
     // Adjust the flex basis value to allocate more space
  marginRight: 10,
  },
  adr: {
    flexBasis: '60%', // Adjust the flex basis value to allocate more space
    marginRight: 10, // Add margin to separate the elements
  },
  wilaya: {
    flexBasis: '30%', // Adjust the flex basis value to allocate more space
  },
  
  typeCarteNum: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeTerminalMi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoClient: {
    marginBottom: 20,
  },
  nomDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    
  },
  prenomLieux: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeTerminalMi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pdfFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  signatureClient: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
  },
  
  label: {
    marginBottom: 10,
  },
  cadreClient: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 2,
    backgroundColor: 'rgb(239, 238, 238)',
    shadowColor: '#888888',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  signature: {


    borderRadius: 10,
   
    shadowOpacity: 0.5,
    shadowRadius: 5,
   
  },
  cachetPdf: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    paddingBottom: 30,
  },
  label1: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 2,
    backgroundColor: 'rgb(239, 238, 238)',
    shadowColor: '#888888',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  cacher: {
  
    padding: 5,
  
   
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  inlineText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  }
  ,
  smallText: {
    fontSize: 10,
    
  },
  printButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
export default Contrat;*/
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Dimensions,TouchableOpacity ,  ScrollView , Image } from 'react-native';
import { format } from 'date-fns';
import { Platform, NativeModules } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { PDFDocument, PDFText , PDFStyleSheet} from 'react-native-pdf-lib';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { PermissionsAndroid, } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
//import html2pdf from 'html2pdf.js';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

async function requestAndroidPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'External Storage Write Permission',
        message: 'App needs access to Storage data',
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("permission is granted");
      return true;
    } else {
      console.log("permission denied");
      return false;
    }
  } catch (err) {
    console.error("requestAndroidPermission error:", err);
    return false;
  }
}

function Contrat ({route})
 {
  const currentDate = format(new Date(), 'dd/MM/yyyy');

 const  {nom, prenom, wilaya, adresse, ICCID , date, MSISDN ,signature} = route.params;
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    setScrollPosition(y);
  };
  
  const handlePrint = async () => {
    
    try{  const htmlContent = `
    <ScrollView style={styles.scrollView} onScroll={handleScroll} scrollEventThrottle={16}>
      <View style={styles.pdfContainer}>
        <View style={styles.pdfHeader}>
          <Text style={styles.pdfTitle}>Contrat pdv</Text>
        </View>
        <View style={styles.pdfContent}>
          <View style={styles.pdfSection}>
            <View style={styles.inlineText}>
              <Text style={styles.smallText}>Date de remis : ${currentDate}</Text>
              <Text style={styles.smallText}>Contrat de l'offre :<Text>M001111111</Text></Text>
            </View>
          </View>
          <View style={styles.simTerminal}>
            <Text style={styles.smallText}>Carte sim/terminal</Text>
          </View>
          <View style={styles.pdfSection}>
            <View style={styles.inlineText}>
              <Text style={styles.smallText}>MSISDN: 12345678900</Text>
              <Text style={styles.smallText}>Numero de SIM : </Text>
            </View>
          </View>
          <View style={styles.infoClient}>
            <Text style={styles.encadrerUnContenu}>Information client</Text>
            <View style={styles.adrWilayaC}>
              <View style={styles.nom}>
                <Text style={styles.smallText}>Nom :<Text  style={styles.boldText}> ${nom}</Text></Text>
              </View>
              <View style={styles.dn}>
                <Text style={styles.smallText}>Date de naissance: <Text  style={styles.boldText}> ${date}</Text></Text>
              </View>
            </View>
            <View style={styles.prenomLieux}>
              <View style={styles.prenom}>
                <Text style={styles.smallText}>Prenom : ${prenom}</Text>
              </View>
              <View style={styles.lieux}>
                <Text style={styles.smallText}>Lieux de naissance: <Text  style={styles.boldText}> ${wilaya}</Text></Text>
              </View>
            </View>
            <View style={styles.adr}>
              <Text style={styles.smallText}>Adresse : <Text  style={styles.boldText}> ${adresse}</Text></Text>
            </View>
            <View style={styles.PI}>
              <View style={styles.PIcontent}>
                <Text style={styles.smallText}>PI : <Text  style={styles.boldText}> </Text></Text>
              </View>
              <View style={styles.numPI}>
                <Text style={styles.smallText}>Numero de PI: <Text  style={styles.boldText}> </Text></Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.signatureContainer}>
        <Image style={styles.signature} source={{ uri: signature }} />

        </View>
      </View>
    </ScrollView>
  `;

 // const pdf = await html2pdf().set({ html: htmlContent }).toPdf().output(); 
 
    
 
  
    }catch(error){
      console.error('Erreur lors du téléchargement du PDF:', error);

    }
  
    
    
  };
  




  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={styles.pdfContainer}>
          <View style={styles.pdfHeader}>
            <Text style={styles.pdfTitle}>Contrat pdv</Text>
          </View>
          <View style={styles.pdfContent}>
          <View style={styles.pdfSection}>
  <View style={styles.inlineText}>
    <Text style={styles.smallText}>Date de remis : {currentDate} </Text>
    <Text style={styles.smallText}>Contrat de l'offre :<Text></Text></Text>
  </View>
  
</View>

            <View style={styles.simTerminal}>
              <Text style={styles.smallText}>Carte sim/terminal</Text>
            </View>
         
            <View style={styles.pdfSection}>
                <View style={styles.inlineText}>
                  <Text style={styles.smallText}>MSISDN: {MSISDN} </Text>
                  <Text style={styles.smallText}>Numero de SIM : {ICCID} </Text>
                </View>
                </View>
                
                
             
           
            <View style={styles.infoClient}>
              <Text style={styles.encadrerUnContenu}>Information client</Text>
              <View style={styles.adrWilayaC}>
                <View style={styles.nom}>
                  <Text style={styles.smallText}>Nom :<Text  style={styles.boldText}> {nom} </Text>  </Text>
                </View>
                <View style={styles.dn}>
                  <Text style={styles.smallText}>Date de naissance: <Text  style={styles.boldText}> {date.toDateString()} </Text>  </Text>
                </View>
              
              </View>
              <View style={styles.prenomLieux}>
                <View style={styles.prenom}>
                  <Text style={styles.smallText}>Prenom : <Text  style={styles.boldText}> {prenom} </Text></Text>
                </View>
                <View style={styles.inputb}>
                  <Text style={styles.hhh}></Text>
                </View>
                <View style={styles.lieux}>
                  <Text style={styles.smallText}>Lieu de naissance:</Text>
                </View>
              </View>
              <View style={styles.adrWilayaC}>
                <View style={styles.adr}>
                  <Text style={styles.smallText}>Adresse <Text  style={styles.boldText}>{adresse} </Text> </Text>
                </View>
               
                <View style={styles.wilaya}>
                  <Text style={styles.smallText}>Wilaya:<Text  style={styles.boldText}> {wilaya} </Text> </Text>
                </View>
                
              </View>
              <View></View>
              <View style={styles.confirmation}>
                <Text>Confirmation:</Text>
              </View>
              <View style={styles.numContratEmail}>
                <View style={styles.numContrat}>
                  <Text style={styles.smallText}>N° contrat:</Text>
                </View>
                <View style={styles.email}>
                  <Text style={styles.smallText}>Email:</Text>
                </View>
              </View>
            </View>
            <View style={styles.pj}>
  <Text style={styles.encadrerUnContenu}>Piece jointe</Text>
  <View style={styles.rowContainer}>
    <View style={styles.typePI}>
      <Text style={styles.smallText}>Type PI:  </Text>
    </View>
    <View style={styles.NUMPI}>
      <Text style={styles.smallText}>N° PI: </Text>
    </View>
  </View>
  <View style={styles.rowContainer}>
    <View style={styles.date}>
      <Text style={styles.smallText}>Date</Text>
    </View>
    <View style={styles.date}>
      <Text style={styles.smallText}>A</Text>
    </View>
  </View>
</View>

            <View style={styles.infoClient}>
              <Text style={styles.encadrerUnContenu}>Mandataire / tuteur</Text>
              <View style={styles.nomDate}>
                <View style={styles.nom}>
                  <Text style={styles.smallText}>Nom:  </Text>
                </View>
                <View style={styles.dn}>
                  <Text style={styles.smallText}>Prenom: </Text>
                </View>
              </View>
              <View style={styles.prenomLieux}>
                <View style={styles.prenom}>
                  <Text style={styles.smallText}>Type PI: </Text>
                </View>
                <View style={styles.lieux}>
                  <Text style={styles.smallText}>N° PI: </Text>
                </View>
              </View>
              <View style={styles.typeTerminalMi}>
                <View style={styles.date}>
                  <Text style={styles.smallText}>Date</Text>
                </View>
                <View style={styles.datea}>
                  <Text style={styles.smallText}>A</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.pdfFooter}>
            <View style={styles.signatureClient}>
              <View style={styles.label}>
                <Text style={styles.cadreClient}>Cadre Client</Text>
              </View>
              <Text style={styles.signature}>signature </Text> 
                 <Image
     resizeMode={"cover"}
     style={{ width: 70, height: 'auto', paddingBottom: 30 ,backgroundColor: 'white'}}
     source={{ uri: signature }}/>
            </View>
            <View style={styles.cachetPdf}>
              <Text style={styles.label1}>Cadre Agence</Text>
              <Text style={styles.cacher}>Cacher à signature</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handlePrint}  >
        <Text>Télécharger en PDF</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    width: windowWidth -30,
    height: windowHeight - 50,
    padding: 10,
    margin: 20,
    borderRadius: 10,
    
  },
  pdfHeader: {
    borderWidth: 1,
    borderColor: 'rgb(7, 208, 7)',
    padding: 15,
    backgroundColor: 'rgb(232, 247, 232)',
    borderRadius: 5,
    shadowColor: '#888888',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 2,
  },
  pdfTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  pdfContent: {
    marginTop: 20,
    
  },

  pdfSection: {
    
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  
  boldText: {
    fontWeight: 'bold',
  },
  simTerminal: {
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  caretSimTerminal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  msisdnNumSim: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputb: {
    width: '2%',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  sim: {
    flex: 2,
    textAlign: 'center',
    fontSize: 16,
  },
 
  typeTerminalMi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoClient: {
    marginBottom: 20,
  },
  encadrerUnContenu: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'rgb(239, 238, 238)',
    shadowColor: '#888888',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  nomDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // Add this line
  },
  prenomLieux: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  adrWilayaC: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // Add this line
  },
  
  confirmation: {
    marginBottom: 10,
  },
  numContratEmail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pj: {
    marginBottom: 20,
    
  },
  dn: {
    width: 150,
    flexShrink: 1,
  },
  
  nom :{
     // Adjust the flex basis value to allocate more space
  marginRight: 10,
  },
  adr: {
    flexBasis: '60%', // Adjust the flex basis value to allocate more space
    marginRight: 10, // Add margin to separate the elements
  },
  wilaya: {
    flexBasis: '30%', // Adjust the flex basis value to allocate more space
  },
  
  typeCarteNum: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeTerminalMi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoClient: {
    marginBottom: 20,
  },
  nomDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    
  },
  prenomLieux: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeTerminalMi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pdfFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  signatureClient: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
  },
  
  label: {
    marginBottom: 10,
  },
  cadreClient: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 2,
    backgroundColor: 'rgb(239, 238, 238)',
    shadowColor: '#888888',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  signature: {


    borderRadius: 10,
   
    shadowOpacity: 0.5,
    shadowRadius: 5,
   
  },
  cachetPdf: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    paddingBottom: 30,
  },
  label1: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 2,
    backgroundColor: 'rgb(239, 238, 238)',
    shadowColor: '#888888',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  cacher: {
  
    padding: 5,
  
   
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  inlineText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  }
  ,
  smallText: {
    fontSize: 10,
    
  },
  printButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default Contrat;