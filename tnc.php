<?php

	$FirstName = $_POST["FirstName"];
	$LastName = $_POST["LastName"];
	$Adhar_Passport = $_POST["Adhar_Passport"];
	$Dob=$_POST["Dob"];
	$Contact=$_POST["Contact"];
	$Email=$_POST["Email"];
	$COneName=$_POST["COneName"];
	$COneAdhar_Passport=$_POST["COneAdhar_Passport"];
	$COneDob=$_POST["COneDob"];
	$CTwoName=$_POST["CTwoName"];
	$CTwoAdhar_Passport=$_POST["CTwoAdhar_Passport"];
	$CTwoDob=$_POST["CTwoDob"];
	$subject="Zerolatency Waiver and Consent";
	$userMessage="First Name : ".$FirstName."\n"."Last Name : ".$LastName."\n"."Aadhar / Passport : ".$Adhar_Passport."\n"."Date Of Birth : ".$Dob."\n"."Contact : ".$Contact."\n"."Email : ".$Email."\n"."Full Name (Child 1) : ".$COneName."\n"."Aadhar card / Passport (Child 1): ".$COneAdhar_Passport."\n"."Date of Birth (Child 1) : ".$COneDob."\n"."Full Name (Child 2) : ".$CTwoName."\n"."Aadhar card / Passport (Child 2) : ".$CTwoAdhar_Passport."\n"."Date of Birth (Child 2) : ".$CTwoDob."\n";
	
 	$toEmail = "info@zerolatencyvr.in";
// 	$toEmail = "khanahmed839@gmail.com";
	$mailHeaders = "From: " . $FirstName . "<". $Email .">\r\n";
	if(mail($toEmail, $subject, $userMessage, $mailHeaders)) {
	   echo "success";
	}
	else
	{
	    echo "fail";
	}


?>