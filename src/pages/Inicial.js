import React, { useEffect } from 'react';
import { View , Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

const  Inicial = ({ navigation }) => {
  
 
    return(
        <SafeAreaView>
            <TouchableOpacity 
                style={styles.btCadastro}
                onPress={() => navigation.navigate('Cadastro')}
            >
                <Text style={styles.txtButton}>Cadastrar Livro</Text>

            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.btAtualizar}
                onPress={() => navigation.navigate('Atualizar')}   
            >
                <Text style={styles.txtButton}
            >Atualizar Livro</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.btVisualizar}
                onPress={() => navigation.navigate('Visualizar')}
            >
                <Text style={styles.txtButton}>Visualizar Livro</Text>

            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.btVisualizarTodos}
                onPress={() => navigation.navigate('Visualizar Todos')}
            >
                <Text style={styles.txtButton}>Visualizar Todos</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.btExcluir}
                onPress={() => navigation.navigate('Excluir')}
            >
                <Text style={styles.txtButton}>Excluir Livro</Text>
            
            </TouchableOpacity>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    btCadastro: {
        alignSelf: 'center',
        paddingLeft:75,
        paddingRight: 75,
        paddingBottom: 20,
        paddingTop: 20,
        marginTop: 20,
        marginLeft:35,
        marginRight: 35,
        borderRadius: 5,    
        backgroundColor: '#0a3d62'
    },
    btAtualizar: {
        backgroundColor: '#0c2461',
        alignSelf: 'center',
        paddingLeft:75,
        paddingRight: 75,
        paddingBottom: 20,
        paddingTop: 20,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 5,  
    },
    btVisualizar : {
        backgroundColor: '#4a69bd',
        alignSelf: 'center',
        paddingLeft:75,
        paddingRight: 75,
        paddingBottom: 20,
        paddingTop: 20,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 5,  
    },
    btVisualizarTodos: {
        backgroundColor: '#3c6382',
        alignSelf: 'center',
        paddingLeft:75,
        paddingRight: 75,
        paddingBottom: 20,
        paddingTop: 20,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 5,  
    },
    btExcluir: {
        backgroundColor: '#EA2027',
        alignSelf: 'center',
        paddingLeft:75,
        paddingRight: 75,
        paddingBottom: 20,
        paddingTop: 20,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 5,  

    },
    txtButton: {
        color: 'white',
        fontSize: 16,

        
    }
})


export default Inicial;