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
} from 'react-native';
import Header from '../components/Header-Component';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useAuth} from '../hooks/useAuth';
import {UserContext} from '../contexts/UserContext';
import {AuthContext} from '../contexts/AuthContext';
import { useScreens } from 'react-native-screens';
import DateTimePicker from '@react-native-community/datetimepicker';
import GenderMenu from '../components/DropdownGenderMenu';
import HealthGoals from '../components/HealthGoals';
import HeightPicker from '../components/HeightPicker';
import DropDownPicker from 'react-native-dropdown-picker';

const ProfileScreen = (props) => {
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
  const [isEditable, editEditable] = useState(false);
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
  }

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
  //        SAVE CHANGES
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const saveChanges = async () => {
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
  };


  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <KeyboardAvoidingScrollView>
        <Header openDrawer={props.navigation.openDrawer} />
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
          <Text style={styles.profileCategory}>Basic Info:</Text>
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
            <TextInput
              value={currentUser.birthdate}
              placeholder='mm/dd/yyyy (optional)'
              placeholderTextColor="#a1a2a6"
              editable={isEditable}
              style={styles.content}
              onChangeText={(birthdate) => setCurrentUser({...currentUser, birthdate: birthdate})}
              onEndEditing={(e) => checkBirthdate(e.nativeEvent.text)}
                />
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          <View style={{paddingBottom: 40}}/>
          <Text style={styles.profileCategory}>Additional Info:</Text>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>
          <Text style={styles.contentTitle}>Zip: </Text>
            <TextInput
              placeholder='Zip (optional)'
              placeholderTextColor="#a1a2a6"
              textContentType='postalCode'
               keyboardType='number-pad'
               maxLength={5}
              value={currentUser.zip}
              editable={isEditable}
              style={styles.content}
              onChangeText={(zip) => setCurrentUser({...currentUser, zip: zip})}
              onEndEditing={(e) => checkzip(e.nativeEvent.text)}/>
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
    
          <View style={{flexDirection: "row"}}>
            <Text style={styles.contentTitleGender}>Gender: </Text>
            <View style={{flex: 0.99}}/>
            <View style={{alignSelf: 'center'}}>
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
        
            </View>
          </View>
          <View style={styles.contentBorder} />
          <View style={{flexDirection: "row"}}>
          <Text style={styles.contentTitleGender}>Wellness Goals:</Text>
          <View style={{flex: 0.2}}/>
          <View style={{alignSelf: 'center'}}>
          <HealthGoals></HealthGoals>
          </View>
          </View>
          <View style={styles.contentBorder}/>
          <View style={{paddingVertical: 40}}></View>
          <Button
            title={changeText}
            color="#ff0000"
            style={styles.save}
            onPress={saveChanges}
          />
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
    backgroundColor: 'black',
  },
  avatar_text: {
    alignSelf: 'center',
    fontSize: 75,
    color: 'white',
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
  content: {
    fontSize: 17,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'black',
    //margin: 10,
   marginHorizontal: '10%',
    //marginVertical: 5,
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
    borderBottomWidth: 1
  }
});

export default ProfileScreen;
