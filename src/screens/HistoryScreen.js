import React, {useEffect, useState, useContext, useCallback} from 'react';
import {View, Text, StyleSheet, Linking, FlatList, Platform, RefreshControl} from 'react-native';
import Header from '../components/Header-Component';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { Loading } from '../components/Loading-Component';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import { usePrevious } from '../hooks/usePrevious';


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


//redux states to props
function mapStateToProps(state){
    return{
      isConnected : state.BLE['isConnected'],
    };
}


const HistoryScreen = (props) => {

  //Toast for when the device disconnects
  const {isConnected} = props
  const prev = usePrevious(isConnected)
  
  useEffect(() => {
    function showToast(){
      if(prev === true && isConnected === false){
        Toast.showWithGravity('Device has disconnected. Attempting to reconnect...', Toast.LONG, Toast.BOTTOM);
      }
    }

    showToast()
  }, [isConnected])
  //End Toast


    const user = useContext(UserContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = useCallback(() => {
        setRefreshing(true)
    })


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
            setRefreshing(false)
        }
        catch(err){
            setLoading(false);
            setRefreshing(false);
            alert('Error getting recordings')
            console.log(err.message)
        }
    }

    //upon inital render
    useEffect(() => {  
        const fetch = async () => {
            await getData()
        }  
        fetch();
        // console.log(data[0].pk)
    },[refreshing]) //anytime screen is pulled down

    const renderItem = ({item}) => {
        // console.log()
        return <Item session={item}></Item>
    }


    return(
        <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
            <Header openDrawer={props.navigation.openDrawer} />
            <Text style={styles.title}>Recording History</Text>
            <FlatList style={styles.bodyMain}
                // ListHeaderComponent={
                    
                //     <View>
                //         <Text style={styles.title}>Recording History</Text>
                //     </View>
                // }
                data={data}
                renderItem={renderItem}
                keyExtractor={session => session.pk.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
            />
           <KeyboardAvoidingScrollView >
            <Loading loading={loading}/>
            </KeyboardAvoidingScrollView>
        </View>
    )
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              STYLE SHEET
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const styles = StyleSheet.create({
    bodyMain:{
        marginTop:25,
      },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignContent:'center',
      },
      title: {
        alignSelf: 'center',
        color: '#242852',
        fontWeight: 'bold',
        fontSize: 32,
        marginTop:25,
        paddingTop:65,
        shadowColor: '#000000',
        shadowOffset: {width: .5, height: 1},
        shadowOpacity: 0,
        shadowRadius: 1,
        elevation: 1,
        ...Platform.select({
          ios: {
            fontFamily: 
            'AppleSDGothicNeo-Bold'
          },
        }),
      },
    card:{
        borderWidth: 2,
        margin: 5,
        borderRadius: 5,
        padding: 5, 
        borderColor: '#000030',
        shadowColor: 'red',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 4,

    },
    SessionTitle: {
        fontSize: 15,
        color: 'black',
    },
    TitleContent: {
        fontSize: 17,
        color: 'black',
    },
    DataFileTitle: {
        fontSize: 15,
        color: 'black',
    },
    content: {
        fontSize: 17,
        color: 'black',
        textAlign: 'center',
        alignSelf: 'center',
    },
    DescriptionContent: {
        fontSize: 17,
        color: 'black',
        flex: 1,
    },
    DataFileContent: {
        fontSize: 15,
        color: '#2127c4',
        textAlign: 'center',
        alignSelf: 'center',
        borderBottomWidth: 1
    }
})

export default connect(mapStateToProps, null) (HistoryScreen);