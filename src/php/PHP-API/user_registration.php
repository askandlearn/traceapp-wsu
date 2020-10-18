<?php
//To DO
//put API folder into xampp/htdocs
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