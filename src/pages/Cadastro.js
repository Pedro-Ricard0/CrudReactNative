import React, { useState } from 'react';
import { View,Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { DatabaseConnection} from '../config/database'

const db = DatabaseConnection.getConnection();

const Cadastro = ( {navigation} ) =>{

    let [userName, setUserName] = useState('');
    let [userContact, setUserContact] = useState('');
    let [userAddress, setUserAddress] = useState('');
  
    let register_user = () => {
      console.log(userName, userContact, userAddress);
  
      if (!userName) {
        alert('Por favor preencha o nome do Livro !');
        return;
      }
      if (!userContact) {
        alert('Por favor preencha o Genero do livro');
        return;
      }
      if (!userAddress) {
        alert('Por favor preencha o endereço !');
        return;
      }
  
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
          [userName, userContact, userAddress],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Sucesso',
                'Livro Registrado com Sucesso !!!',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Inicial'),
                  },
                ],
                { cancelable: false }
              );
            } else alert('Erro ao tentar Registrar o Livro !!!');
          }
        );
      });
    };
  
    return(
        <View style={styles.container}>
            <KeyboardAvoidingView
            
            >

            </KeyboardAvoidingView>
            <Text 
            style={styles.Titulo}
            >Inclua seu novo livro</Text>

            <TextInput 
                placeholderTextColor={'#0a3d62'}
                style={styles.input}
                placeholder='Nome do Livro'
                onChangeText={(userName) => setUserName(userName)}
                
            />

            <TextInput
                placeholderTextColor={'#0a3d62'}
                style={styles.input}
                placeholder='Genêro'
                onChangeText={(userContact) => setUserContact(userContact)}
            />

             <TextInput
                placeholderTextColor={'#0a3d62'}
                style={styles.input}
                placeholder='Autor'
                onChangeText={(userAddress) => setUserAddress(userAddress)}
            />
            
            <TouchableOpacity
                onPress={register_user}
                
            >
                <Text style={styles.saveButton}
                    
                >Cadastrar</Text>
            </TouchableOpacity>


            
        </View>
    );
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
        backgroundColor: '#0a3d62',
        color: 'white',
        padding: 10,
    },
    input: {
        fontSize: 16,
        borderBottomColor: '#0a3d62',
        borderBottomWidth: 2,
        marginTop: 20,
        marginBottom: 20,
        padding:15,
     
    },
    saveButton: {
        backgroundColor: '#0a3d62',
        color: 'white',
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 20,
        paddingVertical: 25,
        paddingHorizontal: 25,
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 20,
    },
    cancelButton: {
        backgroundColor: '#0a3d62',
        color: 'white',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        paddingVertical: 25,
        paddingHorizontal: 25,
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 20,
      }
})

export default Cadastro;