<?php

	session_start();
	require_once __DIR__ . '/config/connect.php';  

	header("Content-Type: application/json");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Allow-Headers: Content-Type");

	require_once 'config/connect.php';

	$products = mysqli_query($connect, "SELECT * FROM `products`");
	$products = mysqli_fetch_all($products, MYSQLI_ASSOC);
	echo json_encode($products);

		
	$connect->close();

?>