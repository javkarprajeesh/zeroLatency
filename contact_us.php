<?php

	$name = $_POST["Name"];
	$email = $_POST["Email"];
	$message = $_POST["Message"];
	$location=$_POST["Location"];
	$subject="Zerolatency Enquiry Form";
	$userMessage="Location : ".$location."\n".$message;
	
	$toEmail = "info@zerolatencyvr.in";
// 	$toEmail = "khanahmed839@gmail.com";
	$mailHeaders = "From: " . $name . "<". $email .">\r\n";
	if(mail($toEmail, $subject, $userMessage, $mailHeaders)) {
	   echo "success";
	}
	else
	{
	    echo "fail";
	}


?>