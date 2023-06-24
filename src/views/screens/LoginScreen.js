import React ,{ useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity ,ScrollView} from 'react-native';
import {  useTheme } from 'react-native-paper';
import { Formik } from 'formik';
import { Image } from 'react-native';
import { setLogin,setPdv  } from "../../../state/authSlice";
import { useDispatch , useSelector } from "react-redux";

import { Ionicons } from '@expo/vector-icons';
const LoginScreen = ({navigation}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (values,onSubmitProps) => {
    await login(values,onSubmitProps);
   
 }; 
 const handleTogglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

  const login = async (values, onSubmitProps) => {
    try{
   console.log(values)
    const response = await fetch('http://192.168.1.9:3001/login/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
 
    const loggedIn = await response.json();
    console.log(loggedIn);
    onSubmitProps.resetForm();
    if (loggedIn.success) {
      // Navigation to Home Screen
     dispatch(
        setLogin({
          pdv: loggedIn.pdv,
          token: loggedIn.token,
        }));
        dispatch(setPdv(loggedIn.pdv));
        navigation.navigate('Menuuu');
     
    console.log("gi"); 
    } else {
      alert("error");
    }}
  catch(error){
    console.log(error.message);
  }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
    <View style={styles.container}>
    <View style={styles.header}>
    <Image
  source={require('../../../assets/logo2.png')}
  style={{ height: 80, width: 300, resizeMode: 'cover',paddingBottom:100 }}
/>

      </View>
      <View style={[styles.formContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.heading, { color: '#385737' }]}>Bienvenue sur MOBILIS !</Text>
      <Formik
        initialValues={{ MSISDN: '', password: '' }}
        onSubmit={ handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              style={styles.inputForm}
              onChangeText={handleChange('MSISDN')}
              onBlur={handleBlur('MSISDN')}
              value={values.MSISDN}
              placeholder='MSISDN'
            />
       <TextInput
        style={styles.inputForm}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
        placeholder='Mot de passe'
        secureTextEntry={!showPassword}
        />
<View style={styles.passwordToggle}>
  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <Ionicons
      name={showPassword ? 'eye-off' : 'eye'}
      size={24}
      color="#777"
    />
  </TouchableOpacity>
</View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#F8F8F8",
    height:900,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#385737',
    backgroundColor: '#6EAC40',
    height:'28%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 80, // Coins arrondis en bas à gauche
    borderBottomRightRadius: 80, // Coins arrondis en bas à droite
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  formContainer: {
    position: 'absolute',
    top: '35%',
    width: '80%',
    height:360,
    borderRadius: 24,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
    
  },
  heading: {
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  submitButton: {
    height:60,
    marginTop: 27,
    marginBottom: 50,
    borderRadius: 24,
    backgroundColor: '#385737',
  },
  submitButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },

  inputForm: {
    borderColor: 'gray',
    borderWidth: 1,
    height:60,
    borderRadius: 12,
    marginTop: 20,
    padding: 8,
    marginVertical: 8,
    width: 200,
  },
  errorForm: {
    color: 'red',
    marginBottom: 8,
  },
  buttonText: {
    paddingTop : 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  passwordToggle: {
    position: 'absolute',
    top: 123,
    right: 10,
  },
  passwordToggleText: {
    color: '#385737',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
