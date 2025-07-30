<?php
	class AuthController {
   	public static function login($connect, $email, $password) {
			// Basic input validation
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

			} catch (Exception $e) {
				http_response_code(500);
				echo json_encode(['error' => 'Server error.']);

			} finally {
			$connect->close();
		}

	}
	public static function signup($connect, $firstname, $lastname, $username, $email, $password, $currency) {
		// Basic input validation
		if ($firstname === '' || $lastname === '' || $username === '' || $email === '' || $password === '') {
			http_response_code(400);
			echo json_encode(['error' => 'All fields are required.']);
			exit;
		}

		try {
			// Check for existing email or username
			$checkStmt = $connect->prepare("SELECT id FROM users WHERE email = ? OR username = ?");
			$checkStmt->bind_param('ss', $email, $username);
			$checkStmt->execute();
			$result = $checkStmt->get_result();

			if ($result->num_rows > 0) {
				http_response_code(409);
				echo json_encode(['error' => 'User with this email or username already exists.']);
				exit;
			}

			// Handle avatar file if uploaded
			$avatarPath = null;
			if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
				$tmpName = $_FILES['avatar']['tmp_name'];
				$originalName = $_FILES['avatar']['name'];
				$imageExt = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

				if (!in_array($imageExt, ['jpg', 'jpeg', 'png'])) {
					http_response_code(400);
					echo json_encode(['error' => 'Unsupported avatar image type.']);
					exit;
				}

				$filename = $username . '_' . time() . '.' . $imageExt;
				$uploadDir = __DIR__ . '/../uploads/avatars/';
				if (!is_dir($uploadDir)) {
					mkdir($uploadDir, 0755, true);
				}
				//$avatarPath = 'uploads/avatars/' . $filename;
				$host = $_SERVER['HTTP_HOST'];
				$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";

				$avatarPath = "$protocol://$host/uploads/avatars/$filename";

				if (!move_uploaded_file($tmpName, $uploadDir . $filename)) {
					http_response_code(500);
					echo json_encode(['error' => 'Failed to save uploaded image.']);
					exit;
				}
			}

			// Hash the password securely
			$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

			// Insert new user
			$stmt = $connect->prepare(
				"INSERT INTO users (firstname, lastname, username, email, password, avatar, currency)
				VALUES (?, ?, ?, ?, ?, ?, ?)"
			);
			$stmt->bind_param('sssssss', $firstname, $lastname, $username, $email, $hashedPassword, $avatarPath, $currency);

			if (!$stmt->execute()) {
				throw new Exception("Insert failed: " . $stmt->error);
			}

			$userId = $connect->insert_id;

			// Respond with user data
			$user = [
				'id' => $userId,
				'username' => $username,
				'email' => $email,
				'avatar' => $avatarPath,
			];

			http_response_code(201);
			echo json_encode($user);

		} catch (Exception $e) {
			http_response_code(500);
			echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
		} finally {
			$connect->close();
		}
	}
}
?>