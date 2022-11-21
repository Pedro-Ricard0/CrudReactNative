import React, { useState, useEffect} from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { DatabaseConnection } from '../config/database';

const db = DatabaseConnection.getConnection();

const VisualizarTodos = () => {
    let [flatListItems, setFlatListItems] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM table_user',
            [],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
              setFlatListItems(temp);
            }
          );
        });
      }, []);
    
      let listItemView = (item) => {
        return (
          <View
            key={item.user_id}
            style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
            <Text style={styles.textheader}>Código</Text>
            <Text style={styles.textbottom}>{item.user_id}</Text>
    
            <Text style={styles.textheader}>Nome</Text>
            <Text style={styles.textbottom}>{item.user_name}</Text>
    
            <Text style={styles.textheader}>Contato</Text>
            <Text style={styles.textbottom}>{item.user_contact}</Text>
    
            <Text style={styles.textheader}>Endereço</Text>
            <Text style={styles.textbottom}>{item.user_address}</Text>
    
    
          </View>
        );
      };

      return(
        <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
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
        backgroundColor: '#3c6382',
        color: 'white',
        padding: 10,
    },
    input: {
        fontSize: 16,
        borderBottomColor: '#3c6382',
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 10,
        padding:15,
     
    },
    saveButton: {
        backgroundColor:'#3c6382',
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


export default VisualizarTodos;