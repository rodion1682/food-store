<?php
	require_once __DIR__ . '/../helpers/allowOrigin.php';
	
	allowOrigin($methods = ['POST', 'OPTIONS']);

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;                             
	}

	require_once __DIR__ . '/../config/connect.php';
	session_start();

	// Read values from JSON payload
	$input = json_decode(file_get_contents('php://input'), true);
	$email = $input['email'] ?? '';
	$password = $input['password'] ?? '';


	// Checks if $username and $password aren't empty
	if ($email === '' || $password === '') {
		http_response_code(400);
		echo json_encode(['error' => 'Email and password are required.']);
		exit;
	}

	// AUTH logic wrapped in try / catch
	try {

	// Prepared statement: fetch user by username
    $stmt = $connect->prepare(
        'SELECT id, email, password FROM users WHERE email = ?'
    );
    if (!$stmt) {
        throw new Exception($connect->error);
    }

    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // Username not found
    if ($result->num_rows === 0) {
        http_response_code(401);
        echo json_encode(['error' => 'Email not found.']);
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
