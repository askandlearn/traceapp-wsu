import React, {useContext, useEffect, useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,TextInput,Button,KeyboardAvoidingView,Platform,Modal,} from 'react-native';
import Header from '../components/Header-Component';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useAuth} from '../hooks/useAuth';
import {UserContext} from '../contexts/UserContext';
import {AuthContext} from '../contexts/AuthContext';
import { useScreens } from 'react-native-screens';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsList from 'react-native-settings-list';





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
  const [showModalName, setShowModalName] = useState(false); //name (first + last)

  
  
  /*
  const [name, editName] = useState(() => {if (user.name) {return user.name;} else {return '';}});
  const [email, setEmail] = useState(() => {if (user.email) {return user.email;} else {return '';}});
  const [dob, editDOB] = useState(() => {if (user.birthdate) {return user.birthdate;} else {return '';}});
  const [zip, editZip] = useState(() => {if (user.zip) {return user.zip;} else {return '';}});
  const [height, editHeight] = useState(() => {if (user.height) {return user.height;} else {return '';}});
  const [weight, editWeight] = useState(() => {if (user.weight) {return user.weight;} else {return '';}});
  const [gender, editGender]  = useState(() => {if (user.gender) {return user.gender;} else {return '';}});
*/

  //Handle birthdate format change from the api
  // const [api_year, api_month, api_day] = user.birthdate.split('-');
  // const profileDate = (api_month + "/" + api_day + "/" + api_year);
  // user.birthdate = profileDate;  
  
  
  //Create instance of current user
  const [currentUser, setCurrentUser] = useState(user);


  //Create instance of state change variables
  const [changeText, setChangeText] = useState('Edit');
  const [isEditable, editEditable] = useState(true);
  const [showDate, setShowDate] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);


//Create validation variables; default value: false
  const [checkValidations, setCheckValidations] = useState({
    validFirstName: true,
    validLastName: true,
    validZipLength: true,
    validBirthdate: true,
  })



 
  //Initialize avatar with the user initials 
  /*
  const initialzeAvatarText = () => {
    
    if (user) {
    
      const [first, last] = user.name.split(' ');
      return first[0] + last[0];
    } else {
      return '';
    }
  };
  */

 const initialzeAvatarText = () =>{
   if(user.first_name && user.last_name){
     const first = user.first_name;
     const last = user.last_name;
     return first[0] + last[0];
   }
   else{
     return '';
   }
 }
  const [initials, setInitials] = useState(initialzeAvatarText());

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//       VALIDATE FIRST NAME
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const checkFirstName = (val) =>{
    //Check if name is valid
   if(val.trim().length > 0 && val.trim().length < 150){
     //Not empty, flag is true
     console.log('Name is valid')
     setCheckValidations({
       ...checkValidations,
       validFirstName: true,
     })

   }
   else{
     //Empty, flag is false
     console.log('Name is not valid');
     setCheckValidations({
       ...checkValidations,
       validFirstName: false,
     })
   }

    
  }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//       VALIDATE LAST NAME
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const checkLastName = (val) =>{
  //Check if name is valid
 if(val.trim().length > 0 && val.trim().length < 150){

   //Not empty, flag is true
   console.log('Name is valid')
   setCheckValidations({
     ...checkValidations,
     validLastName: true,
   })
 }
 else{
   //Empty, flag is false
   console.log('Name is not valid');
   setCheckValidations({
     ...checkValidations,
     validLastName: false,
   })
 }

  
} 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//       VALIDATE ZIP CODE
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const checkzip = (val) =>{
      //If no changes made to zip
      if(val === user.zip || val === ''){
        console.log('No changes made to zip')
        setCheckValidations({
          ...checkValidations,
          validZipLength: true
        });
      }
      //Changes have been made to zip
      else{
        //If the zip is not exactly 5 numbers
        if (val.length != 5){
          console.log('Invalid Zip length')
          setCheckValidations({
            ...checkValidations,
            validZipLength: false
          });
        }

         else{
           console.log('Zip has been updated')
           setCheckValidations({
             ...checkValidations,
              validZipLength: true
           });
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
    //Make sure the user entered exactly 10 characters
    if(val.trim().length === 10){

    //If no changes made to birthdate
    if(val === user.birthdate || val === ''){
      console.log('No changes made to birthdate')
      //Update validation flag
      setCheckValidations({
        ...checkValidations,
        validBirthdate: true
      });
    }
    //Changes have been made for birthdate
    else{
      //Make sure birthdate has been entered in the 
      //correct format: {mm/dd/yyy}

      //Use test the date against a regular expression for safety before spliting
      var validDate = /^((0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/](19|20)?[0-9]{2})*$/;

      if(validDate.test(val)){
        //If the date is in the valid format, continue testing
          //Update validation flag
             
      //Split date into three variables
      const [month, day, year] = val.split('/');

      //Make sure month, day, year are all defined and of the correct length
      if (year === undefined || month === undefined || day === undefined || year.length !== 4
         || month.length !== 2 || day.length !== 2 ) {
        console.log('Error: Birthdate entry is invalid.')
        //Update validation flag
          setCheckValidations({
            ...checkValidations,
           validBirthdate: false
          });
      }
      //Month, day, year are all defined and are the correct length
      else{
        //Convert month/day/year to an int and store it in a new variable
        let intYear = parseInt(year, 10);
        let intDay = parseInt(day, 10);
        let intMonth = parseInt(month, 10);

        //Create new date variable to handle age minimum
        let CurrentDate = new Date();
        let CurrentYear = CurrentDate.getFullYear();
        let intCurrentYear = parseInt(CurrentYear, 10);
        let validBirthYear = intCurrentYear-10; //Must be a minimum of 10 years old
        

      
        //If the month entered is invalid
        if(intMonth < 1 || intMonth > 12){
          console.log('Month entered is an invalid number')
          //Update validation flag
           setCheckValidations({
             ...checkValidations,
              validBirthdate: false
           });
        }
        //If the day entered is invalid
        else if(intDay <1 || intDay > 31){ 
          console.log('Day entered is an invalid number')
          //Update validation flag
           setCheckValidations({
            ...checkValidations,
            validBirthdate: false
        });
        }
        //If the year entered is invalid
        else if( intYear > validBirthYear || intYear < 1920){
          console.log('Year entered is invalid')
          //Update validation flag
           setCheckValidations({
              ...checkValidations,
              validBirthdate: false
           });
        }
        //Month/Day/Year is in the correct format
        else{
          //If the birth month is February, make sure the day is correct
          if(intMonth == 2){
            //Make sure february has a valid day
            if(((intYear % 4) == 0 && intDay > 29) || (intDay > 28) ){
              console.log('Day entered is invalid for the month')

              //Update validation flag
              setCheckValidations({
                ...checkValidations,
                validBirthdate: false
              });
            }
          }
          //If month is jan/mar/may/jul/aug/oct/dec and day > 31
          else if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 ||
            intMonth === 8 || intMonth == 10 || intMonth == 12) && intDay > 31){
              console.log('Day cannot be more than 31 for the month')
              //Update validation flag
              setCheckValidations({
                 ...checkValidations,
                 validBirthdate: false
              });
            }
            //Default months left are sept/april/june/november. Make sure day !> 30
            else if(intDay > 30){
              console.log('Day cannot be more than 30 for the month')
              //Update validation flag
             setCheckValidations({
               ...checkValidations,
              validBirthdate: false
        });
            }
            else{ //Birthday is valid!
              //Update validation flag
               setCheckValidations({
                 ...checkValidations,
                  validBirthdate: true
                });

              console.log('Birthdate has been updated')
              console.log(currentUser.birthdate)

            }
        }
      }

      }
      else{
        console.log('Error: cannot split birthdate string because it is not in the correct format')
        //Update validation flag
        setCheckValidations({
          ...checkValidations,
          validBirthdate: false
        });
      }
     

    }
  }
  else{
    console.log('Error: birthdate string must be exactly 10 characters')
    setCheckValidations({
      ...checkValidations,
      validBirthdate: false
    });
  }

}

  //console.log(user.firstName)
  //console.log(user.name)
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        Close Modal (name) [Via Submit]
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const changeModalViewName = () => {

    //If both first + last name are valid, allow submit
    if(checkValidations.validFirstName && checkValidations.validLastName){
      setShowModalName(false);
      saveChanges();
    }
    //If both are not valid, disable submit until valid
    else{
      setShowModalName(true);
    }

  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        Close Modal (zip) [Via Submit]
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const changeModalViewZip = () => {

    //If zip is valid, allow the user to submit changes
    if(checkValidations.validZipLength){
     setShowModal(false);
     saveChanges();
    }
    //If not valid, disable submit until valid
    else{
      setShowModal(true);
    }

  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        Close Modal (gender) [Via Submit]
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const changeModalViewGender = () => {
    setShowModalGender(false);
    saveChanges();

  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        Close Modal (bday) [Via Submit]
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const changeModalViewBirthdate = () => {

    //If the birthdate is valid, allow submit
    if(checkValidations.validBirthdate){
      setShowModalDate(false);
      saveChanges();
    }
    //If not valid, disable submit until valid
    else{
      setShowModalDate(true);
    }

  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        Close Modal (name) [via X]
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const closeModalName = () =>{

    //Discard any changes before closing
    currentUser.first_name = user.first_name;
    currentUser.last_name = user.last_name;

    //Close the modal
    setShowModalName(false);
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        Close Modal (bday) [via X]
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const closeModalBirthdate = () =>{
    
    //Discard any changes before closing
    currentUser.birthdate = user.birthdate;

    //Close the modal
    setShowModalDate(false);
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        Close Modal (zip) [via X]
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const closeModalZip = () =>{

    //Discard any changes before closing
    currentUser.zip = user.zip;

    //Close the modal
    setShowModal(false);
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        Close Modal (gender) [via X]
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const closeModalGender = () =>{

    //Discard any changes before closing
    currentUser.gender = user.gender;

    //Close modal
    setShowModalGender(false);
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         UPDATE STATE OF DRAWER (Gender ddp)
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const updateGenderDrawerState = (bool) =>{

     /*Accepts a boolean value passed from the 
    drop down picker that reflects the state
    of the drawer (open/closed) */

    setDrawerOpen(bool);



  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //        SAVE CHANGES
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const saveChanges = async () => {
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

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    USER INTERFACE
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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
            <Text style={styles.name}>{currentUser.username}</Text>
            {/* remove
            <TextInput    
              value={currentUser.username}
              editable={false}
              style={styles.name}/>
  */}
          </View>
          {/*       ~~~~~~  Add section title back later ~~~~~~
          <Text style={styles.profileCategory}>Basic Info:</Text>
            */}
            <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Name: </Text>
            <Modal
             animationType="slide"
             transparent={true}
             visible={showModalName}
             onRequestClose={() => {console.log('Closed name text input window');}}
           >
            <View style={styles.modalView}>
            <TouchableOpacity onPress={()=>closeModalName()}>
                <Icon name='close-box-outline' size={30} alignSelf="flex-start" ></Icon>
                </TouchableOpacity>
                <View style={styles.modalContent}>
            <Text style={styles.modalContentTitle}>Name:</Text>
             <Text style={styles.modalContentFLName}>First Name:</Text>
            <TextInput
              placeholder='Name'
              value={currentUser.first_name}
              editable={true}
              maxLength={150}
              style={styles.textInput}
              onChangeText={(first_name) => setCurrentUser({...currentUser, first_name: first_name})}
              onEndEditing={(e) => checkFirstName(e.nativeEvent.text)}/>
               {/* Insert validation prompt */}
               {checkValidations.validFirstName ? false : (
               <Animatable.View animation="fadeInLeft" duration={500}>
                 <Text style={styles.errorMessage}> Field cannot be empty </Text>
              </Animatable.View>)}
              {/* End of validation prompt */}

        <Text style={styles.modalContentFLName}>Last Name:</Text>
            <TextInput
              placeholder='Name'
              value={currentUser.last_name}
              editable={true}
              maxLength={150}
              style={styles.textInput}
              onChangeText={(last_name) => setCurrentUser({...currentUser, last_name: last_name})}
              onEndEditing={(e) => checkLastName(e.nativeEvent.text)}/>
               {/* Insert validation prompt */}
        {checkValidations.validLastName ? false : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>
              Field cannot be empty
            </Text>
          </Animatable.View>
        )}
        {/* End of validation prompt */}
              <View style={{paddingTop: 15}}/>
              <Text style={[styles.buttonContainer, {backgroundColor: (checkValidations.validFirstName && checkValidations.validLastName)  ? '#ff0000' : '#4c4c4c'}]}
              onPress={()=> {changeModalViewName()}}>Submit</Text>
              </View>
              </View>
              </Modal>
          <Text style={styles.content} onPress={()=> {setShowModalName(!showModalName)}}>{currentUser.first_name} {currentUser.last_name}</Text>
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}></TouchableOpacity>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Email: </Text>
          <Text style={styles.contentEmail}>{user.email}</Text>
            {/*     Remove TextInput for email because it should not be edited
            <TextInput
              value={user.email}
              editable={false}
              style={styles.content}/>
        */}
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
             <KeyboardAvoidingView style={styles.modalView}>
             <TouchableOpacity onPress={()=>closeModalBirthdate()}>
                <Icon name='close-box-outline' size={30} alignSelf="flex-start" ></Icon>
                </TouchableOpacity>
                <View style={styles.modalContent}>
             <Text style={styles.modalContentTitle}>Birthdate:</Text>
             <TextInput
              value={currentUser.birthdate}
              placeholder='mm/dd/yyyy (optional)'
              maxLength={10}
              placeholderTextColor="#a1a2a6"
              editable={true}
              style={styles.textInput}
              onChangeText={(birthdate) => setCurrentUser({...currentUser, birthdate: birthdate})}
              onEndEditing={(e) => checkBirthdate(e.nativeEvent.text)}
                />
              {/* Insert validation prompt */}
              {checkValidations.validBirthdate ? false : (
               <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMessage}>
                  Must use 'MM/DD/YYYY' format
                </Text>
             </Animatable.View>
             )}
             {/* End of validation prompt */}
              <View style={{paddingTop: 15}}/>
              <Text style={[styles.buttonContainer, {backgroundColor: checkValidations.validBirthdate  ? '#ff0000' : '#4c4c4c'}]}
              onPress={()=> {changeModalViewBirthdate()}}>Submit</Text>
              </View>
             </KeyboardAvoidingView>
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
              <TouchableOpacity onPress={()=>closeModalZip()}>
                <Icon name='close-box-outline' size={30} alignSelf="flex-start" ></Icon>
                </TouchableOpacity>
            <View style={styles.modalContent}>
              <Text style={styles.modalContentTitle}>Zip:</Text>
              <TextInput
              placeholder='Zip'
              placeholderTextColor="#a1a2a6"
              textContentType='postalCode'
               keyboardType='number-pad'
               maxLength={5}
              value={currentUser.zip}
              editable={true}
              style={styles.textInput}
              onChangeText={(zip) => setCurrentUser({...currentUser, zip: zip})}
              onEndEditing={(e) => checkzip(e.nativeEvent.text)}/>
               {/* Insert validation prompt */}
        {checkValidations.validZipLength ? false : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>
              Zip code must be 5 numbers
            </Text>
          </Animatable.View>
        )}
        {/* End of validation prompt */}
            <View style={{paddingTop: 15}}/>
              <Text style={[styles.buttonContainer, {backgroundColor: checkValidations.validZipLength  ? '#ff0000' : '#4c4c4c'}]}
              onPress={()=> {changeModalViewZip()}}>Submit</Text>
              </View>
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
            <TouchableOpacity onPress={()=>closeModalGender()}>
                <Icon name='close-box-outline' size={30} alignSelf="flex-start" ></Icon>
                </TouchableOpacity>
                <View style={styles.modalContent}>
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
          onOpen={()=>updateGenderDrawerState(true)}
          onClose={()=>updateGenderDrawerState(false)}
          onChangeItem={(item) => setCurrentUser({...currentUser, gender: item.value})}/>
              <View style={{paddingTop: drawerOpen ? 150 : 15}}/>
              <Text 
              style={styles.buttonContainerGender}
              onPress={()=> {changeModalViewGender()}}>Submit</Text>
               </View>
            </View>
          </Modal>
        <Text style={styles.content} onPress={()=> {setShowModalGender(!showModalGender)}}>{currentUser.gender}</Text>
          </View>
          <View style={styles.contentBorder} />
       
          {/*

            wellness goals not in the api schema

          <View style={{flexDirection: "row"}}>
          <Text style={styles.contentTitleGender}>Wellness Goals:</Text>
          <View style={{flex: 0.2}}/>
          <View style={{alignSelf: 'center'}}>
          <HealthGoals></HealthGoals>
          </View>
          </View>
          <View style={styles.contentBorder}/>
        */}
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

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              STYLE SHEET
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const styles = StyleSheet.create({
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
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 70,
    width: '60%',
    height: 100,
    resizeMode: 'stretch',
  },
  body: {
    //marginTop: 100,
    alignSelf: 'center',
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
  buttonContainer:{
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 15,
    paddingHorizontal: 80,
    borderRadius: 20,
    //backgroundColor: '#445092',
    //backgroundColor: '#ff0000',
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
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',

    //alignItems: 'center',
    //justifyContent: 'center',
    // ...Platform.select({
    //   ios: {paddingTop: 50},
    // }),
  },
  content:{
    fontSize: 17,
     alignSelf: 'center',
     textAlign: 'right',
     color: 'black',
    //marginHorizontal: '5%',
    //paddingLeft: 45,
    flex: 1,
   // backgroundColor: 'white',
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
  contentBorder: {
    borderBottomColor: 'gainsboro', 
    borderBottomWidth: 1,
    width: 350,
    //paddingHorizontal: .6
  },
  contentEmail:{
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
  errorMessage: {
    marginHorizontal: '10%',
    position: 'relative',
    color: 'red',
  },
  horizontal: {
    flexDirection: 'row',
    alignContent: 'center',
    marginHorizontal: 5
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
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60
    //padding: 10,
    //marginTop:50,
  },
  modalContentFLName:{
    //fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
    color: 'black',
    paddingBottom: 5,
    paddingTop: 25,
    //letterSpacing: 2.5,
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
  modalView:{
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
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
    marginTop: 50,
    marginBottom: 50,
    //height: '30%',
    
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    //paddingTop: 5,
    paddingBottom: 25,
    alignSelf: 'center',
    color:'black',
    fontStyle: 'italic',
  },
  profileCategory: {
    fontSize: 15,
    //fontWeight: 'bold',
    paddingBottom: 10,
    color: 'black',

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
  title: {
    alignSelf: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default connect(mapStateToProps, null) (ProfileScreen);
