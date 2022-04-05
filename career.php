<?php 


	$name = $_POST["Name"];
	$phone = $_POST["Phone"];
	$email = $_POST["Email"];
	$location=$_POST["Location"];
	$message = $_POST["Message"];
	$subject="Zerolatency Career Form";
	$userMessage="Name : ".$name."\n"."Phone : ".$phone."\n"."Email : ".$email."\n"."Location : ".$location."\n"."Message : ".$message."\n";
	
 	$toEmail = "info@zerolatencyvr.in";
//	$toEmail = "sfurqanafjdeveloper@gmail.com";
	

	//header 
	$headers = "MIME-Version: 1.0\r\n"; // Defining the MIME version 
	$headers .= "From: " . $name . "<". $email .">\r\n"; // Sender Email 
// 	$headers .= "Content-Type: multipart/mixed;\r\n"; // Defining Content-Type 
// 	$headers .= "boundary = $boundary\r\n"; //Defining the Boundary 
		
	
	 
	if(mail($toEmail, $subject, $userMessage, $headers)) {
	   echo "success";
	}
	else
	{
	    echo "fail";
	}


?>