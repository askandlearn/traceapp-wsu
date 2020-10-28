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
    //Request is coming from profile page
    $email = $obj['email'];
    $city = $obj['city'];
    $state = $obj['state'];
    $zip = $obj['zip'];
    $height = $obj['height'];
    $weight = $obj['weight'];
    


    //Select user from table with matching info
    $UpdateQuery = "UPDATE users SET city='$city',state='$state',zip='$zip',height='$height',weight='$weight' WHERE email='$email';";

    if(mysqli_query($con,$UpdateQuery)){
        $MSG = 'Update successful!';
        $json = json_encode($MSG);
        echo $json;
    }
    else{
        echo 'Error updating';
    }
    
    //final return
    // $row = array();
    
    //if a row is not 1 then query unsuccessful, else query is successful
    // if(mysqli_num_rows($result) != 1){
    //     $err = '204';
    //     array_push($row, $err);
    //     $row = json_encode($row);
    //     echo $row;
    // }
    // else{
    //     //success code 200 OK
    //     $success = '200';
    //     $row = mysqli_fetch_row($result);
    //     //replace [0] with status code of 200 OK
    //     $row[0] = '200';
    //     $row = json_encode($row);
    //     echo $row;
    // }
		
}


mysqli_close($con);
?> 
