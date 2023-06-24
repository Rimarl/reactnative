import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TextInput, ScrollView, TouchableOpacity, Image, Button } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSelector } from "react-redux";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { LinearGradient } from 'expo-linear-gradient';

const VendreRecharge = (props) => {
  const pdv = useSelector((state) => state.auth.pdv);

  const [ICCID, setICCID] = useState('');
  const [IdRecharge, setIdRecharge] = useState([]);
  const [listeICCID, setListeICCID] = useState([]);
  const [Recharge, setRecharge] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [numero, setNumero] = useState('');
  const [scanner, setScanner] = useState(false);
  const [scannedData, setScannedData] = useState('');

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.1.9:3001/carte');
      if (response.ok) {
        const json = await response.json();
        console.log('Response:', response);
        console.log('JSON:', json);
        setRecharge(json);
      } else {
        throw new Error('Error fetching data');
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeRecharge = (value) => {
    setIdRecharge(value);
    console.log(IdRecharge);
  };

  const fetchRecharge = useCallback(async () => {
    try {
      const response = await fetch('http://192.168.1.9:3001/carte/detailCarte/'+IdRecharge);
      if (response.ok) {
        const json = await response.json();
        console.log('Response:', response);
        console.log('JSON:', json);
        setListeICCID(json);
        setIsDataAvailable(json.length > 0);
      } else {
        throw new Error('Error fetching data');
      }
    } catch (err) {
      console.error(err);
    }
  }, [IdRecharge]);

  useEffect(() => {
    fetchRecharge();
  }, [IdRecharge, fetchRecharge]);

  const handleChangeICCID = (value) => {
    if (value === "none") {
      setICCID("");
    } else {
      setICCID(value);
    }
    setScannedData(value);
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    setICCID(data);
    console.log('Type: ' + type + '\nData: ' + data)
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    )
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={askForCameraPermission} />
      </View>
    )
  }
  
  const handleSubmit = () => {
    if ( ICCID) {
      const formData = {
       
        ICCID,
       
      };

   
      fetch('http://192.168.1.9:3001/ClientRecharge/detail/clientRecharge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          
          
          ICCID,
        
         
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
          } else {
            // Traiter la réponse en cas d'échec
          }
        })
        .catch(error => console.error(error));

      

    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs du formulaire.');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={true} automaticallyAdjustKeyboardInsets={true}>
      <LinearGradient colors={['#ffffff' , '#6EAC40']} style={{ flex: 1, width: '100%',height:770,borderRadius: 8}} >
      <View style={styles.bar}>
        <Text style={{ paddingBottom: 10, paddingTop: 15, fontSize: 20, fontWeight: 'bold',textAlign: 'center', }}>Vendre une carte de recharge </Text>
        <Text style={{ paddingLeft: 15, paddingTop: 15, fontSize: 18,fontStyle: 'italic'  }}>Veuillez remplir le formulaire avant de poursuivre</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={IdRecharge || 'none'}
            onValueChange={handleChangeRecharge}
          >
            <Picker.Item label="Sélectionnez un type de Recharge" value="none" />
            {Recharge.map((item) => (
              <Picker.Item
                key={item.nomProduit}
                label={item.nomProduit}
                value={item.nomProduit}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.IccidPickerContainer}>
          <Picker
            selectedValue={ICCID}
            onValueChange={handleChangeICCID}
          >
            <Picker.Item label="Sélectionner un ICCID" value="none" />
            {scannedData !== '' && (
      <Picker.Item label={scannedData} value={scannedData} />
    )}
            {listeICCID.flatMap((item) => item.StockPDVs).map((sim) => (
              <Picker.Item
                key={sim?.num_serie}
                label={sim?.num_serie}
                value={sim?.num_serie}
                style={styles.pickerItem}
              />
            ))}
          </Picker>
          <TouchableOpacity
          style={styles.cameraIconContainer}
          onPress={() => { scanner ?  setScanner(false): setScanner(true)
          }}
            >
            <Icon name="camera" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        {scanner &&
   <>
        <View style={styles.scanContainer} >
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>
        </View>
  
        {scanned &&
        <>
         <View style={styles.ButtonContainer}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => setScanned(false)}
            >
              <Text style={styles.buttonTextScan}>Scanner encore?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setScanner(false)} 
            >
              <Text style={styles.buttonTextScan}>ok</Text>
            </TouchableOpacity>
            </View>
         </>}
         </>}

        <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            
            >
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
        
      </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputForm: {
    borderColor: 'gray',
    borderWidth: 1,
    height:55,
    borderRadius: 12,
    //marginTop: 20,
    padding: 8,
    marginVertical: 8,
    width: "100%",
  },
  container: {
      paddingTop:50,
   //   height:"100%",
    //  flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 16,
     // backgroundColor:'#6EAC40',
    },
    BigContainer: {
      paddingHorizontal: 16,
      height:900
    },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    borderColor: 'gray',
    height:55,
    borderRadius: 12,
    marginVertical: 8,
  },
  IccidPickerContainer: {
    width: '100%',
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    borderColor: 'gray',
    height:55,
    borderRadius: 12,
    marginVertical: 8,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#385737',
  },
  scanContainer:{alignItems: 'center'},
  cameraIconContainer: {
    position: 'absolute',
    right: 8,
    top: 15,
    zIndex: 1,
  },
  pickerItem: {
    fontSize: 16,
    height: 50,
    color: '#000',
    paddingHorizontal: 10,
    textAlignVertical: 'center',
  },
  submitButton: {
    height:55,
    marginTop: 15,
    marginBottom: 60,
    borderRadius: 24,
    backgroundColor: '#385737',
  },
  buttonText: {
    paddingTop : 15,
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextScan: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop:5,
    backgroundColor: '#385737',
    padding: 10,
    borderRadius: 5,
    width :130,
  },
});

export default VendreRecharge;