import React, { useState } from 'react';
import { View,Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { DatabaseConnection } from '../config/database';

const db = DatabaseConnection.getConnection();

const Atualizar = () =>{

    let [inputUserId, setInputUserId] = useState('');
    let [userData, setUserData] = useState({});
  
    let searchUser = () => {
      console.log(inputUserId);
      setUserData({});
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_user where user_id = ?',
          [inputUserId],
          (tx, results) => {
            var len = results.rows.length;
            console.log('len', len);
            if (len > 0) {
              setUserData(results.rows.item(0));
            } else {
              alert('Livro não encontrado !');
            }
          }
        );
      });
    };
  

    return(
        <View style={styles.container}>
            <Text style={styles.Titulo}>Filtro de Livro</Text>
            <TextInput 
                style={styles.input}
                placeholder='Entre com o código do Livro'
                placeholderTextColor={'#4a69bd'}
                onChangeText={ (inputUserId) => setInputUserId(inputUserId)}
                
            />
            <TouchableOpacity
                onPress={searchUser}
            >

                <Text style={styles.saveButton}>Buscar Livro</Text>
                

                </TouchableOpacity>
                <Text>Código: {userData.user_id}</Text>
                <Text>Nome do Livro: {userData.user_name}</Text>
                <Text>Tipo de genero do Livro: {userData.user_contact}</Text>
                <Text>Nome do Autor do Livro: {userData.user_address}</Text>
        </View>
    
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    Titulo:{
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 18,
        backgroundColor: '#4a69bd',
        color: 'white',
        padding: 10,
    },
    input: {
        fontSize: 16,
        borderBottomColor: '#4a69bd',
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 10,
        padding:15,
     
    },
    saveButton: {
        backgroundColor:'#4a69bd',
        color: 'white',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 20,
        paddingVertical: 15,
        paddingLeft: 60,
        paddingRight: 60,
        paddingHorizontal: 15,
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 20,
    },
})



export default Atualizar;