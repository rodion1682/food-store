<?php

	// Allow React dev-server call it
	$allowedOrigin = 'http://localhost:3000';
	header("Access-Control-Allow-Origin: $allowedOrigin");

	header('Access-Control-Allow-Credentials: true'); // allow cookies / sessions
	header('Access-Control-Allow-Methods: POST, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type');
	header('Content-Type: application/json'); // every response is JSON

	// Handle pre-flight OPTIONS request quickly
	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		http_response_code(200);
		exit;
	}

	// Only allow POST for real requests
	if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
		http_response_code(405);        // Method Not Allowed
		echo json_encode(['error' => 'Only POST is allowed.']);
		exit;
	}

	// Starts PHP session
	session_start();
	require_once __DIR__ . '/../config/connect.php';  

	// Read values from JSON payload
	$input = json_decode(file_get_contents('php://input'), true);
	$username = $input['username'] ?? '';
	$password = $input['password'] ?? '';

	// Checks if $username and $password aren't empty
	if ($username === '' || $password === '') {
		http_response_code(400);
		echo json_encode(['error' => 'Username and password are required.']);
		exit;
	}

	// AUTH logic wrapped in try / catch
	try {

	// Prepared statement: fetch user by username
    $stmt = $connect->prepare(
        'SELECT id, username, password FROM users WHERE username = ?'
    );
    if (!$stmt) {
        throw new Exception($connect->error);
    }

    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();

    // Username not found
    if ($result->num_rows === 0) {
        http_response_code(401);
        echo json_encode(['error' => 'Username not found.']);
        exit;
    }

    $user = $result->fetch_assoc();

    // Password mismatch (plain-text compare for dev only!)
	//  if (!password_verify($password, $user['password']))
    if ($password !== $user['password']) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid Password.']);
        exit;
    }

    unset($user['password']);
    $_SESSION['user_id'] = $user['id'];

    echo json_encode($user); // 200 OK

	// Server-Side failure handeling
	} catch (Exception $e) {
		http_response_code(500);
		echo json_encode(['error' => 'Server error.']);

	// Colose DB connection
	} finally {
		$connect->close();
	}
?>
