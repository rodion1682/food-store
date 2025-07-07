<?php
	declare(strict_types=1);

	require_once __DIR__ . '/../helpers/allowOrigin.php';
	require_once __DIR__ . '/../config/connect.php';

	allowOrigin(['PUT', 'OPTIONS']);

	/* ─────────────────────── helpers ──────────────────────────── */
	function jsonExit(int $status, array $msg): void
	{
		header('Content-Type: application/json');
		http_response_code($status);
		echo json_encode($msg);
		exit;
	}

	/* ─────────────────────── CORS / method ────────────────────── */
	$method = $_SERVER['REQUEST_METHOD'];
	if ($method === 'OPTIONS') jsonExit(204, []);          
	if ($method !== 'PUT')     jsonExit(405, ['error' => 'Only PUT is allowed']);

	/* ─────────────────────── input + id ───────────────────────── */
	$body = json_decode(file_get_contents('php://input'), true) ?: [];
	if (!is_array($body))      jsonExit(400, ['error' => 'Invalid JSON']);

	session_start();
	$userId = $_SESSION['user_id'] ?? $body['id'] ?? null;
	if (!filter_var($userId, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]))
		jsonExit(401, ['error' => 'Missing or invalid id']);

	/* ─────────────────────── build update ─────────────────────── */
	$filters = [
		'email'     => FILTER_VALIDATE_EMAIL,
		'firstname' => FILTER_SANITIZE_SPECIAL_CHARS,
		'lastname'  => FILTER_SANITIZE_SPECIAL_CHARS,
		'username'  => FILTER_SANITIZE_SPECIAL_CHARS,
		'currency'  => FILTER_SANITIZE_SPECIAL_CHARS,
	];

	$cols  = [];
	$vals  = [];
	foreach ($filters as $col => $flt) {
		if (!isset($body[$col]) || $body[$col] === '') continue;
		$val = filter_var($body[$col], $flt);
		if ($val === false) jsonExit(400, ["error" => "Invalid $col"]);
		$cols[] = "$col = ?";
		$vals[] = $val;
	}
	if (!$cols) jsonExit(400, ['error' => 'No fields to update']);

	/* ─────────────────────── DB work ──────────────────────────── */
	try {
		/* update */
		$stmt = $connect->prepare(
			'UPDATE users SET ' . implode(', ', $cols) . ' WHERE id = ? LIMIT 1'
		);
		$vals[] = $userId;
		$stmt->bind_param(str_repeat('s', count($cols)) . 'i', ...$vals);
		$stmt->execute();
		$stmt->close();

		/* fetch updated row */
		$stmt = $connect->prepare(
			'SELECT id, email, firstname, lastname, username, currency FROM users WHERE id = ?'
		);
		$stmt->bind_param('i', $userId);
		$stmt->execute();
		$user = $stmt->get_result()->fetch_assoc();

		jsonExit(200, $user);

	} catch (Throwable $e) {
		jsonExit(500, ['error' => 'Server error']);
	} finally {
		$connect->close();
	}
?>