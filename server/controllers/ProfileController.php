<?php
	class ProfileController {
		public static function getProfileData($connect, $userId) {
			if (empty($userId)) {
			http_response_code(400);
			echo json_encode(['error' => 'Missing or invalid user ID.']);
			exit;
		}
			
			try {
				$stmt = $connect->prepare(
					'SELECT id, username, firstname, lastname, email, avatar, currency
					FROM users
					WHERE id = ?
					LIMIT 1'
				);	

				$stmt->bind_param('i', $userId);
				if (!$stmt->execute()) {
					throw new Exception('Execution failed: ' . $stmt->error);
				}
				$result = $stmt->get_result();
				$user   = $result->fetch_assoc();

				if (!$user) {
					http_response_code(404);
					echo json_encode(['error' => 'User not found.']);
					exit;
				}

				echo json_encode($user);
				$stmt->close();

			} catch (Exception $e) {
				http_response_code(500);
				echo json_encode(['error' => 'Internal Server Error', 'details' => $e->getMessage()]);
			} finally {
				$connect->close();
			}
		}
		public static function updateProfileData($connect, $id, $firstname, $lastname, $username, $email, $currency, $avatar, $file) {
			try { 
				if (!$id) {
					http_response_code(400);
					echo json_encode(['error' => 'User ID is required.']);
					exit;
				}

				// Get old avatar
				$selectStmt = $connect->prepare("SELECT avatar FROM users WHERE id = ?");
				$selectStmt->bind_param('i', $id);
				$selectStmt->execute();
				$result = $selectStmt->get_result();
				$oldUser = $result->fetch_assoc();
				$oldAvatar = $oldUser['avatar'] ?? null;
				$selectStmt->close();

				// Default to old avatar if new avatar isn't provided
				$newAvatarPath = $avatar ?: $oldAvatar;

				// If a new file is provided
				if (!empty($file) && $file['error'] === UPLOAD_ERR_OK) {
					$tmpPath = $file['tmp_name'];
					$fileName = basename($file['name']);
					$ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
					$allowed = ['jpg', 'jpeg', 'png', 'gif'];

					if (!in_array($ext, $allowed)) {
						http_response_code(400);
						echo json_encode(['error' => 'Unsupported file type.']);
						exit;
					}

					$uploadDir = __DIR__ . '/../uploads/avatars/';
					if (!is_dir($uploadDir)) {
						mkdir($uploadDir, 0755, true);
					}

					$newFileName = $username . '_' . time() . '.' . $ext;
					$destPath = $uploadDir . $newFileName;

					if (!move_uploaded_file($tmpPath, $destPath)) {
						http_response_code(500);
						echo json_encode(['error' => 'Failed to upload avatar.']);
						exit;
					}

					// Delete old avatar file only if it exists and is a file
					if ($oldAvatar) {
						$oldFilePath = __DIR__ . '/../uploads/avatars/' . basename(parse_url($oldAvatar, PHP_URL_PATH));
						if (file_exists($oldFilePath)) {
								@unlink($oldFilePath);
						}
					}

					// Build full URL to new avatar
					$host = $_SERVER['HTTP_HOST'];
					$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
					$newAvatarPath = "$protocol://$host/uploads/avatars/$newFileName";
				}


				// Update user
				$stmt = $connect->prepare("
					UPDATE users 
					SET firstname = ?, lastname = ?, username = ?, email = ?, currency = ?, avatar = ? 
					WHERE id = ?
				");

				if (!$stmt) {
					throw new Exception("Prepare failed: " . $connect->error);
				}

				$stmt->bind_param(
					'ssssssi',
					$firstname,
					$lastname,
					$username,
					$email,
					$currency,
					$newAvatarPath,
					$id
				);

				if (!$stmt->execute()) {
					throw new Exception("Execute failed: " . $stmt->error);
				}

				$stmt->close();

				http_response_code(200);
				echo json_encode([
					'id' => $id,
					'firstname' => $firstname,
					'lastname' => $lastname,
					'username' => $username,
					'email' => $email,
					'currency' => $currency,
					'avatar' => $newAvatarPath,
				]);

			} catch (Exception $e) {
				http_response_code(500);
				echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
			} finally {
				$connect->close();
			}
		}
	}	
?>