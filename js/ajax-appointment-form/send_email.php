<?php
	
	session_start();
	
	include_once('class.phpmail.php');
	
	$pm_app_form_name = sanitize_input($_POST['pm_app_form_name']);
	$pm_app_form_email = sanitize_input($_POST['pm_app_form_email']);
	$pm_app_form_phone = sanitize_input($_POST['pm_app_form_phone']);
	$pm_app_form_date = $_POST['pm_app_form_date'];
	$pm_app_form_time = sanitize_input($_POST['pm_app_form_time']);
	$pm_app_form_recipient = sanitize_input($_POST['pm_app_form_recipient']);
		
	if ( empty($pm_app_form_name) ){
		
		header('Content-type: application/json');
		echo json_encode(array('status' => 'name_error'));
		exit;
		
	} elseif( validate_email($pm_app_form_email) == false ){
		
		header('Content-type: application/json');
		echo json_encode(array('status' => 'email_error'));
		exit;
		
	} elseif( empty($pm_app_form_phone) ){
		
		header('Content-type: application/json');
		echo json_encode(array('status' => 'phone_error'));
		exit;
		
	} elseif( empty($pm_app_form_date) ){
		
		header('Content-type: application/json');
		echo json_encode(array('status' => 'date_error'));
		exit;
		
	} elseif( empty($pm_app_form_time) ){
		
		//print 'Please provide a short message for your inquiry.'; 
		//exit;
		
		header('Content-type: application/json');
		echo json_encode(array('status' => 'time_error'));
		exit;
	
	} else {
	
		//Send the report
		$mailer = PhpMail::getInstance();
				
		$subject = 'Appointment Form Inquiry';
				
		// To send HTML mail, the Content-type header must be set
		$headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		$headers .= 'From: donotreply@'. $_SERVER['SERVER_NAME'] .' <donotreply@'. $_SERVER['SERVER_NAME'] .'>' . "\r\n";
		
		$month = date("M", strtotime($pm_app_form_date));
	    $day = date("d", strtotime($pm_app_form_date));
		$year = date("Y", strtotime($pm_app_form_date));

		$body = ' 
				<html>
				<head>
				  <title>Appointment Form Inquiry</title>
				</head>
				<body>
				
				  <h3>**** THIS IS AN AUTOMATED MESSAGE. PLEASE DO NOT REPLY DIRECTLY TO THIS EMAIL ****</h3>	
				  
				  <p>Full Name: '.$pm_app_form_name.'</p>
				  <p>Email Address: '.$pm_app_form_email.'</p>
				  <p>Phone Number: '.$pm_app_form_phone.'</p>
				  <p>Date of appointment: '.$month.' / '.$day.' / '.$year.'</p>
				  <p>Time of appointment: '.$pm_app_form_time.'</p>
				  
				</body>
				</html>
				';
		
		$result = $mailer->sendMail($pm_app_form_recipient, $subject, $body, $headers);
		//$result = $mailer->sendMail('info@pulsarmedia.ca', $subject, $body, $headers);
		
		if( $result !== false ){
			
			//echo 'Your inquiry has been received, thank you.';
			
			header('Content-type: application/json');
			echo json_encode(array('status' => 'success')); // where $status is 'OK' or 'ERROR'
			exit;
			
		} else {
			
			//echo 'A system error occurred. Please try again later.';	
			
			header('Content-type: application/json');
			echo json_encode(array('status' => 'failed')); // where $status is 'OK' or 'ERROR'
			exit;
			
		}
		
	}//end of if		
	
	function sanitize_input($input) {
		
  		//Use filter_input to prevent HTML tags in yours forms - If you require HTML tags use htmlspecialchars() to safely preserve html tags in your forms
		$inputStripped = stripslashes( $input );
		
		//Only allow the following special characters
		$inputFinal = preg_replace("/[^a-zA-Z0-9-._@: ]+/", "", html_entity_decode($inputStripped, ENT_QUOTES));
		
		return trim($inputFinal);
	
	}//end of sanitize_title
	
	function validate_email($value){
			
		if( !empty($value) ) {
			
			if( !preg_match( "/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/", $value)) {
				
				return false;
				
			} else {
				
				return true;
				
			}
			
		} else {
			
			return false;
			
		}
		
	}//end of validate_email()
?>