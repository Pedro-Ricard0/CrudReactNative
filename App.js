import React, { useState, useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from '@firebase/app'
import Cadastro from "./src/pages/Cadastro"
import Inicial from './src/pages/Inicial';
import Atualizar from './src/pages/Atualizar';
import Visualizar from './src/pages/Visualizar';
import VisualizarTodos from './src/pages/VisualizarTodos';
import Excluir from './src/pages/Excluir';
import { DatabaseConnection } from './src/config/database';

const db =DatabaseConnection.getConnection();

const Stack = createNativeStackNavigator();


function App( {}) {

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Inicial"
          component={Inicial}
          options={{
            title: 'Registro de Livros',
            headerStyle:{
              backgroundColor: '#0a3d62',
            },
            headerTintColor: '#fff',
            headerTitleStyle:{
              fontWeight:'bold',
              fontSize: 25,
            }
          }}
        />
        <Stack.Screen 

        name="Cadastro"
        component={Cadastro}
        options={{
          title: 'Cadastrar Livro',
          headerStyle: {
            backgroundColor: '#0a3d62',
          },
          headerTintColor: '#fff',
          headerTitleStyle:{
            fontWeight: 'bold',
          }
        }}
        />
        <Stack.Screen
          name="Atualizar"
          component={Atualizar}
          options={{
            title: 'Atualizar Livro',
            headerStyle: {
              backgroundColor: '#0c2461',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen 
          name="Visualizar"
          component={Visualizar}
          options={{
            title: 'Visualizar Livro',
            headerStyle:{
              backgroundColor: '#4a69bd',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }

          }}
        />
        <Stack.Screen 
          name="Visualizar Todos"
          component={VisualizarTodos}
          options={{
            title: 'Visualizar Todos os Livros',
            headerStyle:{
              backgroundColor: '#3c6382',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }

          }}
        />
        <Stack.Screen 
          name="Excluir"
          component={Excluir}
          options={{
            title: 'Excluir',
            headerStyle:{
              backgroundColor: '#EA2027',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }

          }}
        />
        
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default App;