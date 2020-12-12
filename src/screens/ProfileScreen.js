import React, {useContext, useEffect, useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput,KeyboardAvoidingView,Platform,Modal,} from 'react-native';
import Header from '../components/Header-Component';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {UserContext} from '../contexts/UserContext';
import {AuthContext} from '../contexts/AuthContext';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import { usePrevious } from '../hooks/usePrevious';


//Initialize the icon
Icon.loadFont();


//redux states to props
function mapStateToProps(state){
  return{
    isConnected : state.BLE['isConnected'],
  };
}



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           PROFILE (Account) SCREEN
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
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

 
  //UserContext only has one value: user
  const user = useContext(UserContext);
  const {update} = useContext(AuthContext);

  //Handle state of modal visability
  const [showModal, setShowModal] = useState(false); //zip
  const [showModalDate, setShowModalDate] = useState(false); //birthdate
  const [showModalGender, setShowModalGender] = useState(false); //gender
  const [showModalName, setShowModalName] = useState(false); //name (first + last)

  
  
  //Create instance of current user
  const [currentUser, setCurrentUser] = useState(user);


  //Create instance of state change variables
  const [drawerOpen, setDrawerOpen] = useState(false);


//Create validation variables; default value: false
  const [checkValidations, setCheckValidations] = useState({
    validFirstName: true,
    validLastName: true,
    validZipLength: true,
    validBirthdate: true,
  })

  //Find the user's initials for the avatar
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
  const [initials] = useState(initialzeAvatarText());

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//       VALIDATE FIRST NAME
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const checkFirstName = (val) =>{
    //Check if name is valid
   if(val.trim().length > 0 && val.trim().length < 150){
     //Not empty, 

     //Not empty, now make sure valid characters are used 
   //Use regular expression to test the string only contains alphabetical characters
   var validFirst = /^[a-zA-Z]+$/;

   if(validFirst.test(val)){
     //If valid, flag is true
     console.log('Name is valid')
     setCheckValidations({
       ...checkValidations,
       validFirstName: true,
     })
   }
   else{
     //Non-alphabetical characters used, flag is false
     console.log('Name is not valid');
     setCheckValidations({
       ...checkValidations,
       validFirstName: false,
     })
   }
     

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
  //Check if name length is valid
 if(val.trim().length > 0 && val.trim().length < 150){

   //Not empty, now make sure valid characters are used 
   //Use regular expression to test the string only contains alphabetical characters
   var validLast = /^[a-zA-Z]+$/;

   if(validLast.test(val)){
       //If valid, flag is true
   console.log('Name is valid')
   setCheckValidations({
     ...checkValidations,
     validLastName: true,
   })
   }
   else{
     //The name provided contains non-alphabetical characters
     //Flag must be set to false
     console.log('Name is not valid');
     setCheckValidations({
       ...checkValidations,
       validLastName: false,
     })
   }

 
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
  //        VALIDATE BIRTHDATE
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const checkBirthdate = (val) =>{
    console.log(val);
    
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
      //correct format: {mm/dd/yyyy}

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
    if(currentUser.zip.length == 5){
     setShowModal(false);
     saveChanges();
    }
    //If not valid, disable submit until valid
    else{
      alert("Please enter a 5 digit zip code")
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
        alert("Invalid date entered \n\n Birthdate should be in \nmm/dd/yyyy format")
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

  };
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    USER INTERFACE
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Header openDrawer={props.navigation.openDrawer} />

      {/*       AVATAR AND USERNAME       */}
        <View style={styles.header} />
        <View style={styles.avatar}>
          <Text style={styles.avatar_text}>{initials}</Text>
        </View>
        <View style={styles.body}>
          <View style={[styles.horizontal, styles.name]}>
            <Text style={styles.name} >{currentUser.username}</Text>
          </View>
            <KeyboardAvoidingScrollView style={styles.bodyMain}>
            <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>



      {/*       NAME (FIRST + LAST)       */}
            <Text style={styles.contentTitle}>Name: </Text>
            <Modal
             animationType="slide"
             transparent={true}
             visible={showModalName}
             onRequestClose={() => {console.log('Closed name text input window');}}
           >
              <View style={styles.centeredView}>
              <View style={styles.exit}>
            <TouchableOpacity onPress={()=>closeModalName()}>
                <Icon name='close-box-outline' size={30} alignSelf="flex-start" style={{padding:20}}></Icon>
            </TouchableOpacity>
            <View style={styles.modalView}>
            <View style={{justifyContent:'center'}}>
                <View style={styles.modalContent}>
            <Text style={styles.modalContentTitle}>Name:</Text>

      {/*       FIRST NAME      */}
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
                 <Text style={styles.errorMessage}>  First name entered is invalid  </Text>
              </Animatable.View>)}
              {/* End of validation prompt */}

      {/*       LAST NAME       */}
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
                  Last name entered is invalid 
                </Text>
              </Animatable.View>
              )}
              {/* End of validation prompt */}
              <View style={{paddingTop: 15}}/>
              <TouchableOpacity style={[styles.button, {backgroundColor: (checkValidations.validFirstName && checkValidations.validLastName)  ? '#ff0000' : '#4c4c4c'}]}
              onPress={()=> {changeModalViewName()}}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
              </View>
              </View>
              </View>
              </View>
              </View>
              </Modal>
          <Text style={styles.content} onPress={()=> {setShowModalName(!showModalName)}}>{currentUser.first_name} {currentUser.last_name}</Text>
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}></TouchableOpacity>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>





      {/*      EMAIL      */}
            <Text style={styles.contentTitle}>Email: </Text>
          <Text style={styles.contentEmail}>{user.email}</Text>
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>




      {/*      BIRTHDATE      */}
            <Text style={styles.contentTitle}>Date of Birth: </Text>
            <Modal
             animationType="slide"
             transparent={true}
             visible={showModalDate}
             onRequestClose={() => {console.log('Closed birthdate text input window');}}
            >
            <View style={styles.centeredView}>
              <View style={styles.exit}>
              <TouchableOpacity onPress={()=>closeModalBirthdate()}>
                <Icon name='close-box-outline' size={30} alignSelf='flex-start' style={{padding:20}}></Icon>
              </TouchableOpacity>
              
             <KeyboardAvoidingView style={styles.modalView}>
             
                <View style={{justifyContent:'center'}}>
                <View style={styles.modalBirthdate}>
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
                    Date entered is invalid
                  </Text>
               </Animatable.View>
               )}
               {/* End of validation prompt */}
              <View style={{paddingTop: 15}}/>
              <TouchableOpacity style={[styles.button, {backgroundColor: checkValidations.validBirthdate  ? '#ff0000' : '#4c4c4c'}]}
              onPress={()=> {changeModalViewBirthdate()}}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
              </View>
              </View>
             </KeyboardAvoidingView>
             </View>
             </View>
          </Modal>
          <Text style={styles.content} onPress={()=> {setShowModalDate(!showModalDate)}}>{currentUser.birthdate}</Text>
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>
            


      {/*       ZIP CODE      */}
          <Text style={styles.contentTitle}>Zip: </Text>
          <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {console.log('Closed zip text input window');}}
          >
            <View style={styles.centeredView}>
            <View style={styles.exit}>
              <TouchableOpacity onPress={()=>closeModalZip()}>
                <Icon name='close-box-outline' size={30} alignSelf="flex-start" style={{padding:20}}></Icon>
                </TouchableOpacity>
            <View style={styles.modalView}>
              <View style={styles.modalBirthdate}>
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
            {/* {checkValidations.validZipLength ? false : (
            <Animatable.View animation="fadeInLeft" duration={500}>
             <Text style={styles.errorMessage}>
               Zip code entered is invalid
              </Text>
            </Animatable.View>
            )}*/}
              {/* End of validation prompt */}
            <View style={{paddingTop: 15}}/>
              <TouchableOpacity style={[styles.button, {backgroundColor:'#ff0000'}]}
              onPress={()=> {changeModalViewZip()}}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
              </View>
              </View>
            </View>
            </View>
          </Modal>
        <Text style={styles.content} onPress={()=> {setShowModal(!showModal)}}>{currentUser.zip}</Text>
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          <View style={styles.contentBorder}/>
          <View style={styles.horizontal}>



      {/*       GENDER       */}
            <Text style={styles.contentTitleGender}>Gender: </Text>
            <Modal
              animationType="slide"
              transparent={true}
              visible={showModalGender}
              onRequestClose={() => {console.log('Closed gender text input window');}}
              >
              <View style={styles.centeredView}>
                <View style={styles.exit}>
                <TouchableOpacity onPress={()=>closeModalGender()}>
                    <Icon name='close-box-outline' size={30} alignSelf="flex-start" style={{padding:20}}></Icon>
                    </TouchableOpacity>
                    <View style={styles.modalView}>
                    <View style={styles.modalBirthdate}>
                  <Text style={styles.modalContentTitle}>Gender:</Text>
                  <DropDownPicker
                    items={[
                        {label: 'Male', value: 'M'},
                        {label: 'Female', value: 'F'},
                        {label: 'Other', value: 'O'},
                        {label: 'Prefer not to answer', value: 'NA'},
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
                  <TouchableOpacity 
                  style={styles.button}
                  onPress={()=> {changeModalViewGender()}}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
                  </View>
                  </View>
                </View>
            </View>    
          </Modal>
        <Text style={styles.content} onPress={()=> {setShowModalGender(!showModalGender)}}>{currentUser.gender}</Text>
          </View>
          <View style={styles.contentBorder} />
          </KeyboardAvoidingScrollView>
          <View style={{paddingVertical: 40}}></View>
        </View>
      <View style={{marginTop: 20}} />
    </View>
  );
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              STYLE SHEET
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const styles = StyleSheet.create({
  bodyMain:{
    marginTop:50
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 100 / 2,
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
    marginTop: 100,
    backgroundColor: '#242852',
    shadowColor: '#000000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar_text: {
    alignSelf: 'center',
    fontSize: 75,
    color: 'white',
    backgroundColor: '#242852',
  },
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 30,
    width: '60%',
    height: 100,
    resizeMode: 'stretch',
  },
  body: {
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: '3%',
    paddingVertical: 10,
    paddingHorizontal:15,
    borderRadius: 20,
    backgroundColor: '#ff2222',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width:'60%'
  },
  buttonContainer:{
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: '3%',
    paddingVertical: 10,
    paddingHorizontal:15,
    borderRadius: 20,
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
  },
  content:{
    fontSize: 17,
     alignSelf: 'center',
     textAlign: 'right',
     color: 'black',
    flex: 1,
  },
  contentBirthdate: {
    fontSize: 17,
    alignSelf: 'center',
    textAlign: 'right',
    color: 'black',
   marginHorizontal: '10%',
    flex: 1,
    
  },
  contentBorder: {
    borderBottomColor: 'gainsboro', 
    borderBottomWidth: 1,
    width: 350,
    paddingVertical:5
  },
  contentEmail:{
    fontSize: 17,
     alignSelf: 'center',
     textAlign: 'right',
     color: 'black',
    
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
    marginHorizontal: 5,
    
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
  },
  modalBirthdate:{
    justifyContent: 'center',
    alignItems: 'center',
   paddingTop:50
  },
  modalContentFLName:{
    fontSize: 15,
    textAlign: 'left',
    color: 'black',
    paddingBottom: 5,
    paddingTop: 25,
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
    paddingHorizontal: 35,  
    justifyContent:'center'
  },
  exit:{
    height:'55%',
    width:'75%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
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
    margin: 20,
  },
  centeredView: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '10%',
  },

  name: {
    fontSize: 30,
    fontWeight: '600',
    paddingBottom: 25,
    alignSelf: 'center',
    color:'black',
    fontStyle: 'italic',
    textTransform:'capitalize',
    marginTop:10,
  },
  profileCategory: {
    fontSize: 15,
    paddingBottom: 10,
    color: 'black',
  },
  save: {

    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ff0000',
  },
 
  textInput: {
    width: '90%',
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 13,
    fontWeight: 'bold',
    borderColor: 'rgba(0, 0, 0, .4)',
    borderWidth: 1,
    color: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 1,
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
