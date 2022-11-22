import React from 'react';
import { View,Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import { DatabaseConnection } from '../config/database';

const db = DatabaseConnection.getConnection();

const Atualizar = ({ navigation }) => {
       
    let [inputUserId, setInputUserId] = useState('');
    let [userName, setUserName] = useState('');
    let [userContact, setUserContact] = useState('');
    let [userAddress, setUserAddress] = useState('');
  
    let updateAllStates = (name, contact, address) => {
      setUserName(name);
      setUserContact(contact);
      setUserAddress(address);
    };
  
    let searchUser = () => {
      console.log(inputUserId);
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_user where user_id = ?',
          [inputUserId],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              let res = results.rows.item(0);
              updateAllStates(
                res.user_name,
                res.user_contact,
                res.user_address
              );
            } else {
              alert('Usuário não encontrado!');
              updateAllStates('', '', '');
            }
          }
        );
      });
    };
    let updateUser = () => {
      console.log(inputUserId, userName, userContact, userAddress);
  
      if (!inputUserId) {
        alert('Por Favor informe o Código!');
        return;
      }
      if (!userName) {
        alert('Por favor informe o Nome do Livro !');
        return;
      }
      if (!userContact) {
        alert('Por Favor informe o Genero do Livro !');
        return;
      }
      if (!userAddress) {
        alert('Por Favor informe o Nome do Autor do livro!');
        return;
      }
  
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
          [userName, userContact, userAddress, inputUserId],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Sucesso',
                'LIVRO
 atualizado com sucesso !!',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Inicial'),
                  },
                ],
                { cancelable: false }
              );
            } else alert('Erro ao atualizar o usuário');
          }
        );
      });
    };


    return(
        <View style={styles.container}>
             
            <Text style={styles.Titulo}>Atualizar Livro</Text>
            <TextInput 
                placeholderTextColor={'#0c2461'}
                style={styles.input}
                placeholder='Entre com o Codigo do Livro'
                onChangeText={   (inputUserId) => setInputUserId(inputUserId)}
            />

            <TouchableOpacity 
                onPress={searchUser}
            >
                <Text 
                style={styles.saveButton}
                >Buscar Livro</Text>

            </TouchableOpacity>
            <TextInput 
                placeholderTextColor={'#0c2461'}
                style={styles.input}

                placeholder='Entre com o Nome do Livro'
                onChangeText={
                    (userName) => setUserName(userName)}

            />
            <TextInput 
                placeholderTextColor={'#0c2461'}
                style={styles.input}
                value={'' + userContact}
                placeholder='Entre com o Genêro do Livro'
                onChangeText={
                    (userContact) => setUserContact(userContact)
                }
            />
            <TextInput 
                value={userAddress}
                placeholderTextColor={'#0c2461'}
                style={styles.input}
                placeholder='Entre com o Nome do Autor do Livro'
                onChangeText={(userAddress) => setUserAddress(userAddress)}
            />
            <TouchableOpacity
                onPress={updateUser}
            >
                <Text style={styles.saveButton}>Atualizar Livro</Text>
            </TouchableOpacity>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    Titulo:{
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 18,
        backgroundColor: '#0c2461',
        color: 'white',
        padding: 10,
    },
    input: {
        fontSize: 16,
        borderBottomColor: '#0c2461',
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 10,
        padding:15,
     
    },
    saveButton: {
        backgroundColor:'#0c2461',
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
