<?php
//To DO
//Edit lines 47 and 64 and change users to whatever you called the table

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
        //Populate User name from JSON $obj array and store into $name
        $first_name = $obj['firstName'];
        $last_name = $obj['lastName'];
        // $name = $obj['name'];

        //Store the date of birth
        $dob = $obj['date'];

        //Populate User email from JSON $obj array and store into $email
        $email = $obj['email'];


        //Populate Password from JSON $obj array and store into $password
        $password = $obj['password'];

        //Check if email already exists using query
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
            $Sql_Query = "insert into users (first,last,dob,email,password) values ('$first_name','$last_name','$dob','$email','$password')";
            // $Sql_Query = "insert into user_details (name,email,password) values ('$name','$email','$password')";

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
        //Populate User email from JSON $obj array and store into $email
        $email = $obj['email'];
        //Populate Password from JSON $obj array and store into $password
        $password = $obj['password'];

        $CheckSQL = "SELECT * FROM users WHERE email='$email' AND password='$password'";

        $result = mysqli_query($con,$CheckSQL);

        $row = mysqli_num_rows($result);

        if($row != 1){
            $err = 'Login failed!';
            $json = json_encode($err);
            echo $json;
        }
        else{
            $success = 'Login successful!';
            $json = json_encode($success);
            echo $json;
        }
    }
}


mysqli_close($con);
?>