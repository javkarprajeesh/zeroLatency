<?php

	$mobile= $_POST["Mobile"];
	$subject="Zerolatency Get In Touch ";
	$userMessage="Mobile Number : ".$mobile;
	$Email="admin@zerolatencyvr.in";
	
	$toEmail = "info@zerolatencyvr.in";
//	$toEmail = "sfurqanafjdeveloper@gmail.com";

	$mailHeaders = "From: " . $FirstName . "<". $Email .">\r\n";
	if(mail($toEmail, $subject, $userMessage, $mailHeaders)) {
	   echo "success";
	}
	else
	{
	    echo "fail";
	}


?>