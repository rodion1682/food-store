<?php

function allowOrigin(
    array|string $methods = ['GET', 'POST', 'OPTIONS'],
    array        $allowed = ['http://localhost:3000']
): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';         

    if ($origin && (empty($allowed) || in_array($origin, $allowed, true))) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Credentials: true');
    }

    if (is_array($methods)) {
        $methods = implode(', ', $methods);
    }
    header("Access-Control-Allow-Methods: $methods");

    if (!empty($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header(
            'Access-Control-Allow-Headers: ' .
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']
        );
    } else {
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }

    header('Access-Control-Max-Age: 1800');  

}
?>


