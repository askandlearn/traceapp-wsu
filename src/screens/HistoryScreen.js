import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Linking, FlatList} from 'react-native';
import Header from '../components/Header-Component';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Axios from 'axios';
import { UserContext } from '../contexts/UserContext';



//data list
const Item = ({session}) => {
    const [date, time] = session.start_time.split('T');
    return (
    <View style={styles.card}>
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.SessionTitle}>Session ID: </Text>
            <Text style={styles.content}>{session.pk}</Text>
        </View>
       {/*} <Text style={styles.content}>Session ID: {session.pk}</Text> */}
       <View style={{flexDirection: 'row'}}>
            <Text style={styles.TitleContent}>Recorded: </Text>
            <Text style={styles.content}>{date} at {time}</Text>
        </View>
       {/*} <Text style={styles.content}>Recorded: {date} at {time}</Text> */}
       <View style={{flexDirection: 'row'}}>
            <Text style={styles.TitleContent}>Type: </Text>
            <Text style={styles.content}>{session.label}</Text>
        </View>
        {/* <Text style={styles.content}>Type: {session.label}</Text> */}
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.TitleContent}>Description: </Text>
            <Text style={styles.DescriptionContent}>{session.description}</Text>
        </View>
        {/* <Text style={styles.content}>Description: {session.description}</Text> */}
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.TitleContent}>Comments: </Text>
            <Text style={styles.content}>{session.comments}</Text>
        </View>
        {/* <Text style={styles.content}>Comments: {session.comments}</Text> */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.DataFileTitle}>Data file: </Text>
            <Text style={styles.DataFileContent} onPress={() => Linking.openURL(session.datafile)}>Link to data</Text>
        </View>
    </View>
)}


const HistoryScreen = (props) => {

    const user = useContext(UserContext);
    const [data, setData] = useState([]);

    //upon inital render
    useEffect(() => {
        const getData = async () => {
            const url = 'http://134.209.76.190:8000/api/Recording'
            const config = {
                headers: {'Authorization':`Token ${user.token}`},
                timeout: 2000   //two seconds timeout
            }
    
            const data = await Axios.get(url, config).then(res => res.data).catch(err => {
                console.log(err.code);
                console.log(err.message)
            })

            setData(data.results)
        }

        getData();
        // console.log(data[0].pk)
    },[])

    const renderItem = ({item}) => {
        // console.log()
        return <Item session={item}></Item>
    }

    return(
        <View style={{flex: 1}}>
            <Header openDrawer={props.navigation.openDrawer} />
            <Text style={styles.title}>Recording History</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={session => session.pk.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    title:{
        alignSelf: 'center',
        //marginHorizontal: '10%',
        marginVertical: 4,
        color: '#202020',
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 20,
        textAlign:'center'
    },
    card:{
        borderWidth: 2,
        margin: 5,
        borderRadius: 5,
        padding: 5,
        //backgroundColor: '#ff0000'
        backgroundColor: '#445092'
    },
    SessionTitle: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },
    TitleContent: {
        fontSize: 17,
        color: 'white',
        //fontWeight: 'bold'
    },
    DataFileTitle: {
        fontSize: 15,
        color: 'white',
        //fontWeight: 'bold',

    },
    content: {
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        //marginHorizontal: '10%',
        
    },
    DescriptionContent: {
        fontSize: 15,
        color: 'white',
        flex: 1,
       // flexWrap: 'wrap',
        //marginHorizontal: '10%',
    },
    DataFileContent: {
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
        alignSelf: 'center',
        borderBottomWidth: 1
    }
})

export default HistoryScreen;