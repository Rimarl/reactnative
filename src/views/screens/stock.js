/*import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList ,ScrollView} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
const StockPdv = ({ route }) => {
  const token = useSelector((state) => state.auth.token);
  const [produitsPdv, setProduitsPdv] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const pdv = useSelector((state) => state.auth.pdv);
  const msisdn =pdv.MSISDN;
  useEffect(() => {
    if (searchTerm) {
      getSearch();
    } else {
      // Récupérer tous les résultats si le champ de recherche est vide
      getStockPdv();
    }
  }, [searchTerm]);

  const getStockPdv = async () => {
    const response = await axios.get("http://192.168.43.55:3001/api/stock/stockPdv/"+msisdn, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProduitsPdv(response.data);
  };

  const getSearch = async () => {
    const response = await axios.get("http://192.168.43.55:3001/api/PDV/search/"+searchTerm+"/"+msisdn, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProduitsPdv(response.data);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.Produit.nomProduit}</Text>
      <Text>{item.num_serie}</Text>
    </View>
  );

  
  const formattedRows = produitsPdv.map((row) => ({
    id: row.num_serie,
    nomProduit: row.Produit.nomProduit,
    num_serie: row.num_serie,
  }));

  return (
<ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
    <View>
      <Text style={{  paddingBottom: 15,paddingTop: 15,fontSize: 20,
          fontWeight: 'bold', }}>Produits du PDV: {msisdn}</Text>
      <TextInput
        style={{ backgroundColor: 'lightgray', borderRadius: 5, padding: 7 ,width:120}}
        placeholder="Search..."
        value={searchTerm}
        onChangeText={handleSearchChange}
      />

<View style={styles.container}>
      <DataTable>
        <DataTable.Header style={styles.title}>
          <DataTable.Title >Nom du produit</DataTable.Title>
          <DataTable.Title>Numero de serie</DataTable.Title>
        </DataTable.Header>

        {formattedRows.map((row) => (
          <DataTable.Row key={row.id}>
            <DataTable.Cell>{row.nomProduit}</DataTable.Cell>
            <DataTable.Cell>{row.num_serie}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      
    </View>
  
    </View></ScrollView> 
  );
};
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    title:{backgroundColor :'#385737'},
  });
export default StockPdv;
*/
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, ScrollView ,Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { MaterialIcons  } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const StockPdv = ({ route }) => {
  const token = useSelector((state) => state.auth.token);
  const [produitsPdv, setProduitsPdv] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const pdv = useSelector((state) => state.auth.pdv);
  const msisdn = pdv.MSISDN;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (searchTerm) {
      getSearch();
    } else {
      // Récupérer tous les résultats si le champ de recherche est vide
      getStockPdv();
    }
  }, [searchTerm]);

  const getStockPdv = async () => {
    const response = await axios.get("http://192.168.1.9:3001/produit/Stockgeneralpdv/" + msisdn, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProduitsPdv(response.data);
  };

  const getSearch = async () => {
    const response = await axios.get("http://192.168.1.9:3001/produit/search" + searchTerm + "/" + msisdn, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProduitsPdv(response.data);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const formattedRows = produitsPdv.map((row) => ({
    id: row.num_serie,
    nomProduit: row.Produit.nomProduit,
    num_serie: row.num_serie,
  }));
  const itemsPerPage = 10;
  const totalItems = produitsPdv.length;
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const displayedItems = formattedRows.slice(firstItemIndex, lastItemIndex);


  return (
    <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
     
      <View>
      
        <View style={styles.bar}>
         <LinearGradient colors={['#6EAC40' , '#c3f2a0']} style={{ flex: 1, width: '100%'}} > 
        <Text style={{ paddingBottom: 15, paddingTop: 15, fontSize: 20, fontWeight: 'bold',textAlign: 'center', }}>Stock disponibles </Text>
         </LinearGradient>
        </View>
       
        <TextInput
          style={{ backgroundColor: 'lightgray', borderRadius: 15, padding: 8, width: 380,textAlign: 'center',marginLeft:15 }}
          placeholder="Rechercher ..."
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
          <MaterialIcons   name='search' style={{
        fontSize: 24,
        width: 25, height: 25,
        position: 'absolute',
        top: 87,
        left: 30,
        color:'#696969'
        }}></MaterialIcons  >
        <View style={styles.container}>
          <DataTable>
          <LinearGradient colors={['#6EAC40' , '#c3f2a0']} style={{ flex: 1, width: '100%',borderRadius: 10,}} > 
            <DataTable.Header style={styles.title}>
              <DataTable.Title textStyle={styles.text} style={{borderRightWidth: 0.5,borderRightColor: '#385737',}}>Nom du produit</DataTable.Title>
              <DataTable.Title textStyle={styles.text} style={{paddingLeft: 15,}} >ICCID</DataTable.Title>
            </DataTable.Header>
            </LinearGradient>

            {displayedItems.map((row) => (
          <DataTable.Row key={row.id} style={styles.rows}>
            <DataTable.Cell style={styles.cell}>{row.nomProduit}</DataTable.Cell>
            <DataTable.Cell style={{ paddingLeft: 15 }}>{row.num_serie}</DataTable.Cell>
          </DataTable.Row>
            ))}

         </DataTable>
        </View>
        </View>
        <View style={styles.pagination}>
          <Text style={styles.paginationText}>Page {currentPage}</Text>
          <View style={styles.paginationButtons}>
            <Button title="précédent" disabled={currentPage === 1} onPress={handlePrevPage} color="#A4A8AB"/>
            <Button
              title="Suivant"
              disabled={lastItemIndex >= totalItems}
              onPress={handleNextPage}
              color="#385737"
            />
          </View>
        </View>
       
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bar: { 
   // backgroundColor: '#6EAC40', 
    padding: 3, 
    //borderRadius: 6,
   // width: 450,
    marginBottom:15,
    //marginTop:5
  },
  text: { 
    textAlign: 'center', 
    fontWeight: 'bold' ,
    fontSize: 18
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  title: {
    
  //  backgroundColor: '#6EAC40',
    borderColor: '#385737',  
//borderWidth: 1,  
  },
  rows: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    //borderColor: '#385737',  
    //: 1,  
    borderBottomColor: '#385737', 
  },
  cell: {
    borderRightWidth: 0.5,
    borderRightColor: '#385737', 
  },
  pagination: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,

  },
  paginationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paginationButtons: {
    flexDirection: 'row',
  },
  tableTitle: {
    fontSize: 18, // Changer la taille du texte ici selon vos préférences
  },
});

export default StockPdv;
