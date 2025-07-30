<?php
	require_once __DIR__ . '/../controllers/ProductController.php';
	require_once __DIR__ . '/../controllers/ReviewController.php';
	require_once __DIR__ . '/../controllers/AuthController.php';
	require_once __DIR__ . '/../controllers/ProfileController.php';

	class Router {
		public static function handle($connect) {
			$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
			$method = $_SERVER['REQUEST_METHOD'];
			$query = $_GET;
			
			// Get product details by it's id
			if ($uri === '/api/products/getById' && $method === 'GET') {
					$productId = $query['productId'] ?? null;
					ProductController::getProductById($connect, $productId);
					return;
			}

			// Get product details reviews
			if ($uri === '/api/products/getProductRatingSummary' && $method === 'GET') {
					$productId = $query['productId'] ?? null;
					ProductController::getProductRatingSummary($connect, $productId);
					return;
			}

			// Login by username and passowrd
			if ($uri === '/api/auth/login' && $method === 'POST') {

				$input = json_decode(file_get_contents('php://input'), true);
				$email 	 = trim($input['email'] ?? '');
				$password = trim($input['password'] ?? '');

				AuthController::login($connect, $email, $password);

				return;
			}

			// Signup
			if ($uri === '/api/auth/signup' && $method === 'POST') {
				$firstname = $_POST['firstname'] ?? '';
				$lastname  = $_POST['lastname'] ?? '';
				$email     = $_POST['email'] ?? '';
				$username  = $_POST['username'] ?? '';
				$password  = $_POST['password'] ?? '';
				$currency  = $_POST['currency'] ?? 'EURO';

				AuthController::signup($connect, $firstname, $lastname, $username, $email, $password, $currency);

				return;
			}

			// Get profile data
			if ($uri === '/api/profile/getProfileData' && $method === 'GET') {
				$userId = $_GET['userId'] ?? '';

				ProfileController::getProfileData($connect, $userId);

				return;
			}

			// Update profile data
			if ($uri === '/api/profile/updateProfileData' && $method === 'POST') {
				$id        = $_POST['id'] ?? '';
				$firstname = $_POST['firstname'] ?? '';
				$lastname  = $_POST['lastname'] ?? '';
				$username  = $_POST['username'] ?? '';
				$email     = $_POST['email'] ?? '';
				$currency  = $_POST['currency'] ?? '';
				$avatar    = $_POST['avatar'] ?? null;
				$file      = $_FILES['updatedAvatarFile'] ?? null;

				ProfileController::updateProfileData($connect, $id, $firstname, $lastname, $username, $email, $currency,$avatar, $file);

				return;
			}
		
			// Get product reviews by product id
			if ($uri === '/api/reviews/getReviewsByProductId' && $method === 'GET') {
				$productId = $query['productId'] ?? null;

				ReviewController::getReviewsByProductId($connect, $productId);

				return;
			}

			// Add new review
			if ($uri === '/api/review/addNewReview' && $method === 'POST') {
				$body = json_decode(file_get_contents('php://input'), true);

				$text      = $body['text'] ?? '';
				$rating    = $body['rating'] ?? '';
				$productId = $body['product_id'] ?? '';
				$userId    = $body['user_id'] ?? '';

				ReviewController::addNewReview($connect, $text, $rating, $productId, $userId);

				return;
			}

			http_response_code(404);
			echo json_encode(['error' => 'Not Found']);
		}
	}
?>