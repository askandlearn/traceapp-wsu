import React, {useEffect, useState, useContext} from 'react';
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
    "789.048,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.049,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.050,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.051,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.052,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.054,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.055,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.056,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.057,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.058,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.059,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.060,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.061,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.062,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.063,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.064,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.065,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.066,35,1702,1005,147,44093,-8,0,26,-1,915.0",
    "789.066,35,1702,1005,147,44093,-8,0,26,-1,9152.0",
    "789.066,35,1702,1005,147,44073,-8,0,26,-1,915.0",
    "789.066,35,1702,1005,147,44093,-8,0,26,-1,9121.0",
    "789.066,35,1702,21005,147,44093,-8,0,26,-1,915.0",
    "Hello world",
    "Hello worjlskdjf",
    "AKJSdlka",
    "jasldalkds",
    "alskjdlkasjdlkasjdlksajd",
    "lakjsdlkajslkdli",
    "oioio",
    "qwhkj",
    "a","b","d"
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

    const renderBody = ({item}) => {
        return(
            <ScrollView>
                <Text style={styles.bodyText}>{item}</Text>
            </ScrollView>
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
                data={body}
                renderItem={renderBody}
                keyExtractor={item => item}
            />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    header: {
        borderBottomColor: 'black',
        borderWidth: 0,
    },
    metric: {
        margin: 0,
        padding: 2,
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