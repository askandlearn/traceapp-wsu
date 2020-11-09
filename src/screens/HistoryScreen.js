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
        <Text style={styles.content}>Session ID: {session.pk}</Text>
        <Text style={styles.content}>Recorded: {date} at {time}</Text>
        <Text style={styles.content}>Type: {session.label}</Text>
        <Text style={styles.content}>Description: {session.description}</Text>
        <Text style={styles.content}>Comments: {session.comments}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.content}>Data file: </Text>
            <Text style={[styles.content, {color: 'blue', borderBottomWidth: 1}]} onPress={() => Linking.openURL(session.datafile)}>Link to data</Text>
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
        paddingBottom: 10,
        textAlign:'center'
    },
    card:{
        borderWidth: 2,
        margin: 5,
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#ff0000'
    },
    content: {
        fontSize: 15,
        color: 'white'
    }
})

export default HistoryScreen;