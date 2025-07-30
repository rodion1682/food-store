<?php
	session_start();
	header("Content-Type: application/json");

	require_once __DIR__ . '/helpers/allowOrigin.php';

	allowOrigin(); 

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		http_response_code(204);
		exit;
	}

	require_once __DIR__ . '/config/connect.php';
	require_once __DIR__ . '/router/Router.php';

	Router::handle($connect);
?>