<?php
	require_once __DIR__ . '/helpers/allowOrigin.php';
	allowOrigin(['GET', 'OPTIONS']);
	
	require_once __DIR__ . '/config/connect.php';
	session_start();

	$email = $_GET['email'] ?? '';

	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		http_response_code(400);
		echo json_encode(['error' => 'Missing or invalid e-mail address.']);
		exit;
	}

	$stmt = $connect->prepare(
    'SELECT id, username, firstname, lastname, email, avatar, currency
     FROM users
     WHERE email = ?
     LIMIT 1'
	);	

	$stmt->bind_param('s', $email);
	$stmt->execute();
	$result = $stmt->get_result();
	$user   = $result->fetch_assoc();

	if (!$user) {
		http_response_code(404);
		 echo json_encode(['error' => 'User not found.']);
		exit;
	}

	echo json_encode($user);

	$stmt->close();
	$connect->close();

?>