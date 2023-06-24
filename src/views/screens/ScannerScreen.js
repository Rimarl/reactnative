import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
const ScannerScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [numero, setNumero] = useState('');
    const [scanner,setScanner]= useState(false);

    const askForCameraPermission = () => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })()
    }
  
    // Request Camera Permission
    useEffect(() => {
      askForCameraPermission();
    }, []);
  
    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      setNumero(data); 
      console.log('Type: ' + type + '\nData: ' + data)
    };
  
    // Check permissions and return the screens
    if (hasPermission === null) {
      return (
        <View style={styles.container}>
          <Text>Requesting for camera permission</Text>
        </View>)
    }
    if (hasPermission === false) {
      return (
        <View style={styles.container}>
          <Text style={{ margin: 10 }}>No access to camera</Text>
          <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>)
    }
  
    // Return the View
    return (
      <View style={styles.container}>
        <TextInput
        style={styles.input}
        onChangeText={setNumero}
        value={numero}
        placeholder="Numéro"
      />
      <Button title="Scanner" onPress={() => setScanner(true)} />
        {scanner &&
        <>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>
        <Text style={styles.maintext}>{numero}</Text>
  
        {scanned &&
        <>
         <Button title={'Scan again?'} onPress={() => setScanned(false)} color='#385737' />
         <Button title={'ok'} onPress={() => setScanner(false)} color='#385737' />
         </>}
        </>}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    maintext: {
      fontSize: 16,
      margin: 20,
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: '#385737'
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 20,
        paddingHorizontal: 10,
      },
  });
  
  export default ScannerScreen;
  