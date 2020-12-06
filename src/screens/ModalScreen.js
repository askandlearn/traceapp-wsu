import React, {useEffect, useState, useContext, useLayoutEffect} from 'react';
import {View, Text, Button, ScrollView, StyleSheet, FlatList} from 'react-native';

//require module
var RNFS = require('react-native-fs');

const headers = [
    "Time",
    "HR",
    "IBI",
    "PAMP",
    "DAMP",
    "PPG",
    "DIF",
    "DIG",
    "ST",
    "AccX"
]

const data = [
    "789.047,35,1702,1005,147,44093,-8,0,26,-1,915.0",
]

const ModalScreen = ({ navigation, route }) => {
    const {file} = route.params;
    const [content,setContent] = useState('')
    const [body, setBody] = useState(data)

    var path = RNFS.DocumentDirectoryPath + '/' + file;

    const read = () => {
        //read the file
        console.log('PATHFILE:',path)
        RNFS.readFile(path).then(res => {
          console.log("FILE READ SUCCESSFULLY")
          setContent(res)
        }).catch(err => {
          console.log(err.message,err.code)
        })
    }
    const parseContent = () => {
        const arr = content.split('\n')
        console.log(arr)
    }

    useEffect(() => {
        // read();
        console.log(route.params.file)
        return () => {
        }
    }, [])


    const renderHeader = ({item}) => {
        return (
            <Text style={styles.metric}>{item}, </Text>
        )
    }

    const renderBody = (prop) => {
        return(
             <Text style={styles.bodyText}>{prop.item}</Text>
        )
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <FlatList
                contentContainerStyle={{flexDirection: 'row'}}
                data={headers}
                renderItem={renderHeader}
                keyExtractor={item => item}
            />
        </View>
        <View style={styles.body}>
            <FlatList
                data={data}
                renderItem={renderBody}
                keyExtractor={item => item}
            />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header: {
        borderBottomColor: 'black',
        borderWidth: 0,
    },
    metric: {
        margin: 0,
        padding: 2,
        fontWeight: 'bold',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '100%'
        // borderColor: 'red',
        // borderWidth: 1
    },
    body: {
        borderWidth: 0,
        borderColor: 'black',
        height: '100%'
    },
    bodyText: {
        padding: 2
    }
})

export default ModalScreen;