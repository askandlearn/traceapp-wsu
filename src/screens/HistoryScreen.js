import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Linking, FlatList, Platform, ScrollView} from 'react-native';
import Header from '../components/Header-Component';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Loading } from '../components/Loading-Component';



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
    const [loading, setLoading] = useState(true);

    //upon inital render
    useEffect(() => {
        const getData = async () => {
            try{
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
                setLoading(false)
            }
            catch(err){
                setLoading(false);
                alert('Error getting recordings')
                console.log(err.message)
            }
        }

    
        getData();

        // console.log(data[0].pk)
    },[])

    const renderItem = ({item}) => {
        // console.log()
        return <Item session={item}></Item>
    }

    return(
        <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
            <FlatList 
                ListHeaderComponent={
                    <View>
                        <Header openDrawer={props.navigation.openDrawer} />
                        <Text style={styles.title}>Recording History</Text>
                    </View>
                }
                data={data}
                renderItem={renderItem}
                keyExtractor={session => session.pk.toString()}
            />
            <Loading loading={loading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignContent:'center',
    
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
        //backgroundColor: '#242852'
        //backgroundColor: '#445092'
        backgroundColor: '#dddddd',
        borderColor: '#242852'
    },
    SessionTitle: {
        fontSize: 15,
        color: 'black',
       // fontWeight: 'bold'
    },
    TitleContent: {
        fontSize: 17,
        color: 'black',
        //fontWeight: 'bold'
    },
    DataFileTitle: {
        fontSize: 15,
        color: 'black',
        //fontWeight: 'bold',

    },
    content: {
        fontSize: 17,
        color: 'black',
        textAlign: 'center',
        alignSelf: 'center',
        //marginHorizontal: '10%',
        
    },
    DescriptionContent: {
        fontSize: 17,
        color: 'black',
        flex: 1,
       // flexWrap: 'wrap',
        //marginHorizontal: '10%',
    },
    DataFileContent: {
        fontSize: 15,
        color: '#2127c4',
        textAlign: 'center',
        alignSelf: 'center',
        borderBottomWidth: 1
    }
})

export default HistoryScreen;