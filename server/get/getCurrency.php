<?php
	declare(strict_types=1);

	require_once __DIR__ . '/../helpers/allowOrigin.php';
	require_once __DIR__ . '/../config/connect.php';

	allowOrigin(['GET', 'OPTIONS']);

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    	http_response_code(204);
   	exit;                             
	}

	if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); 
    echo json_encode(['error' => 'Only GET is allowed']);
    exit;
	}

	try {
		$result = $connect->query('SELECT currency FROM currency');
		$rows   = $result->fetch_all(MYSQLI_ASSOC);
		$currencies = array_column($rows, 'currency'); 

		echo json_encode($currencies);    

	} catch (Throwable $e) {
		http_response_code(500);
		echo json_encode(['error' => 'Server error']);
	} finally {
		$connect->close();
	}
?>
