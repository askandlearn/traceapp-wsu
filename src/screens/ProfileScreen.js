import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import Header from '../components/Header-Component';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useAuth} from '../hooks/useAuth';
import {UserContext} from '../contexts/UserContext';
import {AuthContext} from '../contexts/AuthContext';
import { useScreens } from 'react-native-screens';
import DropDownPicker from 'react-native-dropdown-picker';

import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import { usePrevious } from '../hooks/usePrevious';


//redux states to props
function mapStateToProps(state){
  return{
    isConnected : state.BLE['isConnected'],
  };
}

const ProfileScreen = (props) => {

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


  /*
    props that should be passed when calling this screen
    name:
    DOB:
    zip:
    Password(?):
    */

  //avatar text
  //UserContext only has one value: user
  const user = useContext(UserContext);
  const {update} = useContext(AuthContext);

  //Load in logout function from AuthContext
  const {logout} = useContext(AuthContext);

  //Handle state of modal visability
  const [showModal, setShowModal] = useState(false); //zip
  const [showModalDate, setShowModalDate] = useState(false); //birthdate
  const [showModalGender, setShowModalGender] = useState(false); //gender



  /*
  const [name, editName] = useState(() => {if (user.name) {return user.name;} else {return '';}});
  const [email, setEmail] = useState(() => {if (user.email) {return user.email;} else {return '';}});
  const [dob, editDOB] = useState(() => {if (user.birthdate) {return user.birthdate;} else {return '';}});
  const [zip, editZip] = useState(() => {if (user.zip) {return user.zip;} else {return '';}});
  const [height, editHeight] = useState(() => {if (user.height) {return user.height;} else {return '';}});
  const [weight, editWeight] = useState(() => {if (user.weight) {return user.weight;} else {return '';}});
  const [gender, editGender]  = useState(() => {if (user.gender) {return user.gender;} else {return '';}});
*/
//Create instance of current user
  const [currentUser, setCurrentUser] = useState(user)

  //Create instance of state change variables
  const [changeText, setChangeText] = useState('Edit');
  const [isEditable, editEditable] = useState(true);
  const [showDate, setShowDate] = useState(false);


//Create validation variables; default value: false
  const [checkValidations, setCheckValidations] = useState({

    diffzip: false,
    diffHeight: false,
    diffWeight: false,
    diffBirthdate: false,
  })

 
  //Initialize avatar with the user initials 
  const initialzeAvatarText = () => {
    if (user) {
      const [first, last] = user.name.split(' ');
      return first[0] + last[0];
    } else {
      return '';
    }
  };
  const [initials, setInitials] = useState(initialzeAvatarText());


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//       VALIDATE ZIP CODE
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const checkzip = (val) =>{
      //If no changes made to zip
      if(val === user.zip || val === ''){
        console.log('No changes made to zip')
      }
      //Changes have been made to zip
      else{
        //If the zip is not exactly 5 numbers
        if (val.length != 5){
          console.log('Invalid Zip length')
      }
      //Zip length is valid, update successful
      else{
        console.log('Zip has been updated')
      }

      }
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        VALIDATE HEIGHT
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const checkHeight = (val) =>{
    //If no changes made to height
    if(val === user.height || val === ''){
      console.log('No changes made to height')
    }
    //Changes have been made to height
    else{
      console.log('Height has been updated')
      /*
      editHeight(val);
      setCheckValidations({
        ...checkValidations,
        diffHeight: true
      }); */

    }
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        VALIDATE WEIGHT
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const checkWeight = (val) =>{
    //If no changes made to weight
    if(val === user.weight || val===''){
      console.log('No changes made to weight')
    }
    //Changes have been made to weight
    else{
      console.log('Weight has been updated')
      /*
      editWeight(val);
      setCheckValidations({
        ...checkValidations,
        diffWeight: true
      }); */
    }
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        VALIDATE BIRTHDATE
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const checkBirthdate = (val) =>{
    //If no changes made to birthdate
    if(val === user.birthdate || val === ''){
      console.log('No changes made to birthdate')
    }
    //Changes have been made for birthdate
    else{
      //Make sure birthdate has been entered in the 
      //correct format: {mm/dd/yyy}

      //Split date into three variables
      const [month, day, year] = val.split('/');

    

      //Make sure month, day, year are all defined and of the correct length
      if (year === undefined || month === undefined || day === undefined || year.length < 4 ||
        year.length > 4 || month.length !== 2 || day.length !== 2 ) {
        console.log('Error: Birthdate entry is invalid.')
      }
      //Month, day, year are all defined and are the correct length
      else{

          //Convert month/day/year to an int and store it in a new variable
      let intYear = parseInt(year, 10);
      let intDay = parseInt(day, 10);
      let intMonth = parseInt(month, 10);
      

      console.log('INT CONVERTED YEAR')
      console.log(intYear)
        //If the month entered is invalid
        if(intMonth < 1 || intMonth > 12){
          console.log('Month entered is an invalid number')
        }
        //If the day entered is invalid
        else if(intDay <1 || intDay > 31){ 
          console.log('Day entered is an invalid number')
        }
        //If the year entered is invalid
        else if( intYear > 2020 || intYear < 1920){
          console.log('Year entered is invalid')
        }
        //Month/Day/Year is in the correct format
        else{
          //If the birth month is February, make sure the day is correct
          if(intMonth == 2){
            //Make sure february has a valid day
            if(((intYear % 4) == 0 && intDay > 29) || (intDay > 28) ){
              console.log('Day entered is invalid for the month')
            }
          }
          //If month is jan/mar/may/jul/aug/oct/dec and day > 31
          else if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 ||
            intMonth === 8 || intMonth == 10 || intMonth == 12) && intDay > 31){
              console.log('Day cannot be more than 31 for the month')
            }
            //Default months left are sept/april/june/november. Make sure day !> 30
            else if(intDay > 30){
              console.log('Day cannot be more than 30 for the month')
            }
            else{ //Birthday is valid!
              console.log('Birthdate has been updated')
              console.log(currentUser.birthdate)

            }
        }
      }


    }
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        Close Modal (zip)
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const changeModalViewZip = () => {
    setShowModal(false);
    saveChanges();

  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        Close Modal (gender)
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const changeModalViewGender = () => {
    setShowModalGender(false);
    saveChanges();

  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        Close Modal (bday)
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const changeModalViewBirthdate = () => {
    setShowModalDate(false);
    saveChanges();

  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        SAVE CHANGES
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const saveChanges = async () => {
    console.log(currentUser)
    console.log('Calling update')
    try{
      await update(currentUser);
    }
    catch(err){
      console.log('Error in saveChanges():',err.message)
    }

    /*
    console.log(currentUser)

    if (isEditable) {
      //POST Request to Update DB
      console.log('Calling update')
      try{
        await update(currentUser);
      }
      catch(err){
        console.log('Error in saveChanges():',err.message)
      }

      setChangeText('Edit');
      editEditable(false);
    } else {
      setChangeText('Save');
      editEditable(true);
    }
    */
  };


  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Header openDrawer={props.navigation.openDrawer} />
      <KeyboardAvoidingScrollView>
        <View style={styles.header} />
        <View style={styles.avatar}>
          <Text style={styles.avatar_text}>{initials}</Text>
        </View>
        <View style={styles.body}>
          <View style={[styles.horizontal, styles.name]}>
            <TextInput    
              value={currentUser.name}
              editable={false}
              style={styles.name}/>
          </View>
          {/*       ~~~~~~  Add section title back later ~~~~~~
          <Text style={styles.profileCategory}>Basic Info:</Text>
            */}
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Email: </Text>
            <TextInput
              value={user.email}
              editable={false}
              style={styles.content}/>
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Date of Birth: </Text>
            <Modal
             animationType="slide"
             transparent={true}
             visible={showModalDate}
             onRequestClose={() => {console.log('Closed birthdate text input window');}}
          >
             <View style={styles.modalView}>
             <Text style={styles.modalContentTitle}>Birthdate:</Text>
             <TextInput
              value={currentUser.birthdate}
              placeholder='mm/dd/yyyy (optional)'
              placeholderTextColor="#a1a2a6"
              editable={isEditable}
              style={styles.textInput}
              onChangeText={(birthdate) => setCurrentUser({...currentUser, birthdate: birthdate})}
              onEndEditing={(e) => checkBirthdate(e.nativeEvent.text)}
                />
              <View style={{paddingTop: 15}}/>
              <Text style={styles.buttonContainer}
              onPress={()=> {changeModalViewBirthdate()}}>Submit</Text>
             </View>
          </Modal>
          <Text style={styles.content} onPress={()=> {setShowModalDate(!showModalDate)}}>{currentUser.birthdate}</Text>
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          {/*  ~~~~~~~~  Add section title and padding back later ~~~~~~~~~
          <View style={{paddingBottom: 40}}/>
          <Text style={styles.profileCategory}>Additional Info:</Text>
          <View style={styles.contentBorder} />
          */}
          <TouchableOpacity style={styles.horizontal}>
            
          <Text style={styles.contentTitle}>Zip: </Text>
          <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {console.log('Closed zip text input window');}}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalContentTitle}>Zip:</Text>
              <TextInput
              placeholder='Zip'
              placeholderTextColor="#a1a2a6"
              textContentType='postalCode'
               keyboardType='number-pad'
               maxLength={5}
              value={currentUser.zip}
              editable={isEditable}
              style={styles.textInput}
              onChangeText={(zip) => setCurrentUser({...currentUser, zip: zip})}
              onEndEditing={(e) => checkzip(e.nativeEvent.text)}/>
              <View style={{paddingTop: 15}}/>
              <Text style={styles.buttonContainer}
              onPress={()=> {changeModalViewZip()}}>Submit</Text>
            </View>
          </Modal>
        <Text style={styles.content} onPress={()=> {setShowModal(!showModal)}}>{currentUser.zip}</Text>
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          


            {/*
            City/State to be removed??
            
            
            <Text style={styles.contentTitle}>City: </Text>
            <TextInput
              placeholder='City (optional)'
              placeholderTextColor="#a1a2a6"
              textContentType='addressCity'
              style={styles.content}
              />
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>State: </Text>
            <TextInput
              placeholder='State (optional)'
              placeholderTextColor="#a1a2a6"
              textContentType='addressState'
              style={styles.content}/>
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>
          */}

          {/* Height/Weight are not in the api schema


          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Height (cm): </Text>
            <TextInput
              placeholder='Height (optional)'
              placeholderTextColor="#a1a2a6"
              value={currentUser.height}
              editable={isEditable}
              style={styles.content}
              onChangeText={(height) => setCurrentUser({...currentUser, height: height})}/>
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Weight (lbs): </Text>
            <TextInput
              placeholder='Weight (optional)'
              placeholderTextColor="#a1a2a6"  
              value={currentUser.weight}
              editable={isEditable}
              style={styles.content}
              onChangeText={(weight) => setCurrentUser({...currentUser, weight: weight})}/>
          </TouchableOpacity>
        */}
          <View style={styles.contentBorder}/>
          <View style={styles.horizontal}>
            <Text style={styles.contentTitleGender}>Gender: </Text>
            <Modal
          animationType="slide"
          transparent={true}
          visible={showModalGender}
          onRequestClose={() => {console.log('Closed gender text input window');}}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalContentTitle}>Gender:</Text>
              <DropDownPicker
                items={[
                    {label: 'Male', value: 'M'},
                    {label: 'Female', value: 'F'},
                    {label: 'Other', value: 'O'},
                    {label: 'Decline to Answer', value: 'NA'},
                ]}
                defaultValue={currentUser.gender}
                containerStyle={{height: 30, width: 220}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) =>
            setCurrentUser({...currentUser, gender: item.value})
          }/>
              <View style={{paddingTop: 150}}/>
              <Text 
              style={styles.buttonContainerGender}
              onPress={()=> {changeModalViewGender()}}>Submit</Text>
               
            </View>
          </Modal>
        <Text style={styles.content} onPress={()=> {setShowModalGender(!showModalGender)}}>{currentUser.gender}</Text>

          </View>
          <View style={styles.contentBorder} />
          <View style={{paddingVertical: 40}}></View>
          {/*}
          <Button
            title="Update"
            color="#ff0000"
            style={styles.save}
            onPress={saveChanges}
          />
      */}
        </View>
      </KeyboardAvoidingScrollView>
      <View style={{marginTop: 20}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {paddingTop: 50},
    }),
  },
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 70,
    width: '60%',
    height: 100,
    resizeMode: 'stretch',
  },
  inputFields: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 10,
    fontWeight: 'bold',
    opacity: 0.4,
    borderRadius: 3,
  },
  title: {
    alignSelf: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    //alignSelf: 'center',
    //width: '60%',
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ff0000',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  header: {
    //backgroundColor: '#ff0000',
    //height: 200
  },
  avatar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 100 / 2,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    // position: 'absolute',
    marginTop: 25,
    backgroundColor: '#242852',
  },
  avatar_text: {
    alignSelf: 'center',
    fontSize: 75,
    color: 'white',
    textShadowColor: '#656885',
    textShadowRadius: 50,
  },
  body: {
    //marginTop: 100,
    alignSelf: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    padding: 20,
    alignSelf: 'center',
    color:'black',
    fontStyle: 'italic',
  },
  contentBirthdate: {
    fontSize: 17,
    alignSelf: 'center',
    textAlign: 'right',
    color: 'black',
    //margin: 10,
   marginHorizontal: '10%',
    //marginVertical: 5,
    flex: 1,
  },
  content:{
    fontSize: 17,
     alignSelf: 'center',
     textAlign: 'right',
     color: 'black',
    //marginHorizontal: '5%',
    //paddingLeft: 45,
    flex: 1,
  },
  contentTitle: {
    margin: 10,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  contentTitleGender: {
    margin: 10,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'left',

  },
  horizontal: {
    flexDirection: 'row',
    alignContent: 'center',
    marginHorizontal: 5
  },
  save: {
    //come back to style the save button
    //marginTop: 10,
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ff0000',
  },
  profileCategory: {
    fontSize: 15,
    //fontWeight: 'bold',
    paddingBottom: 10,
    color: 'black',

  },
  contentBorder: {
    borderBottomColor: 'gainsboro', 
    borderBottomWidth: 1,
    width: 350,
    //paddingHorizontal: .6
  },
  modalView:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    //paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'gainsboro',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 65,
    marginTop: 170,
    marginBottom: 100,
    //height: '30%',
    
  },
  modalContentTitle:{
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: 'black',
    paddingBottom: 20,
    paddingTop: 5,
    letterSpacing: 2.5,
  },
  textInput: {
    marginHorizontal: '10%',
    marginVertical: 5,
    width: '80%',
    height: 50,
    padding: 13,
    fontWeight: 'bold',
    borderColor: 'rgba(0, 0, 0, .4)',
    borderWidth: 1,
    color: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: '#000000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderRadius: 20,
  },
  buttonContainer:{
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 10,
    paddingHorizontal: 80,
    borderRadius: 20,
    //backgroundColor: '#445092',
    backgroundColor: '#ff0000',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainerGender:{
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 10,
    paddingHorizontal: 80,
    borderRadius: 20,
   // backgroundColor: '#445092',
    backgroundColor: '#ff0000',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    color: 'white',
    fontWeight: 'bold',
   
  },

});

export default connect(mapStateToProps, null) (ProfileScreen);
