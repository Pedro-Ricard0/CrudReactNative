import React from 'react';
import { View,Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { DatabaseConnection } from '../config/database';

const db = DatabaseConnection.getConnection();

const Excluir = ({ navigation }) =>{
    let [inputUserId, setInputUserId] = useState('');

    let deleteUser = () => {
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM  table_user where user_id=?',
            [inputUserId],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Sucesso',
                  'Usuário Excluído com Sucesso !',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('Inicial'),
                    },
                  ],
                  { cancelable: false }
                );
              } else {
                alert('Por favor entre com um código de usuário válido !');
              }
            }
          );
        });
      };


    return(
    <View style={styles.container}>
        <TextInput
            placeholder='Entre com o Código do Livro'
            placeholderTextColor={'#EA2027'}
            style={styles.input}
            onChangeText={ (inputUserId) => setInputUserId(inputUserId)}
       
        />
        <TouchableOpacity
            onPress={deleteUser}
        >
            <Text style={styles.saveButton}>Excluir Livro</Text>
        </TouchableOpacity>
    </View>)
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
        backgroundColor: '#EA2027',
        color: 'white',
        padding: 10,
    },
    input: {
        fontSize: 16,
        borderBottomColor: '#EA2027',
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 10,
        padding:15,
     
    },
    saveButton: {
        backgroundColor:'#EA2027',
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


export default Excluir