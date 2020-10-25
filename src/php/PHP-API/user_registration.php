<?php
//************************
// FILE FOR UPDATED TABLE
//************************


//import config files
include 'dbconfig.php';

//Create the connection
$con = mysqli_connect($hostname,$hostuser,$hostpass,$databasename);

$method = $_SERVER['REQUEST_METHOD'];




//Getting the received JSON into $json variable

$json = file_get_contents('php://input');


//Decode the received JSON and store into $obj variable
$obj = json_decode($json,true);

if($method == 'POST'){
	$type = $obj['type'];
	
	if($type == 'signup'){
		//Request is coming for sing up page
        //Register user to users table if email is unique
        $firstName = $obj['firstName'];
		$lastName = $obj['lastName'];
		$birthdate = $obj['birthdate'];
		$email = $obj['email'];
		//use hashed password
		$password = $obj['password'];
		
		//check if email already exists using query
        $CheckSQL = "SELECT * FROM users WHERE email='$email'";

        //Executing SQL query
        $check = mysqli_fetch_array(mysqli_query($con,$CheckSQL));
		
		if(isset($check)){
			 $EmailExistMSG = 'Email already exists. Please try again!';

            //Convert the message into JSON format
            $EmailExistsJson = json_encode($EmailExistMSG);

            //Echo the message
            echo $EmailExistsJson;
		}
		else{

            //Create SQL query and insert the record into MYSQL database table
            $Sql_Query = "insert into users (email, password, firstName, lastName, birthdate) values ('$email', '$password', '$firstName', '$lastName', '$birthdate')";

            if(mysqli_query($con,$Sql_Query)){
                //If the record inserted successfully then show success message
                $MSG = 'User Registered Successfully!';

                //Convert message into JSON format
                $json = json_encode($MSG);

                echo $json;
            }
            else{
                echo 'Error in registration. Try again.';
            }
        }
	}
	else{
		//Request is coming from login page
		//Handle user login
		//Get user login credentials
		$email = $obj['$email'];
		$password = $obj ['$password'];
		
		//Select user from table with matching info
		$CheckSQL = "SELECT * FROM users WHERE email='$email' AND password='$password'";

        $result = mysqli_query($con,$CheckSQL);
        
        //final return
        $row = array();
		
        //if a row is not 1 then query unsuccessful, else query is successful
        if(mysqli_num_rows($result) != 1){
            $err = '204';
            array_push($row, $err);
            $row = json_encode($row);
            echo $row;
        }
        else{
            //success code 200 OK
            $success = '200';
            $row = mysqli_fetch_row($result);
            //replace [0] with status code of 200 OK
            $row[0] = '200';
            $row = json_encode($row);
            echo $row;
        }
		
	}
}


mysqli_close($con);
?> 
