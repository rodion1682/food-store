<?php
class ReviewController {
    public static function getReviewsByProductId($connect, $productId) {
      if (!$productId) {
         http_response_code(400);
         echo json_encode(['error' => 'Missing productId']);
         return;
      }
		try {
			$stmt = $connect->prepare(
            'SELECT 
               r.id,
               r.product_id,
               r.text,
               r.rating,
               r.created_at,
               u.id AS user_id,
               u.email AS user_email,
               u.username AS user_username,
               u.avatar AS user_avatar
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE r.product_id = ?'
         );

			if (!$stmt) {
				throw new Exception('Failed to prepare statement: ' . $connect->error);
			}

			$stmt->bind_param('i', $productId);

			if (!$stmt->execute()) {
					throw new Exception('Execution failed: ' . $stmt->error);
			}
			
			$result = $stmt->get_result();

			$reviews = [];
			while ($row = $result->fetch_assoc()) {
					$createdAt = (new DateTime($row['created_at']))->format('F j, Y');

					$reviews[] = [
						'id'         => $row['id'],
						'product_id' => $row['product_id'],
						'text'       => $row['text'],
						'rating'     => $row['rating'],
						'created_at' => $createdAt,
						'user'       => [
							'id'    => $row['user_id'],
							'email' => $row['user_email'],
							'username' => $row['user_username'],
                     'avatar'   => $row['user_avatar'],
						],
					];
			}

			if (empty($reviews)) {
				http_response_code(404);
				echo json_encode(['error' => 'No reviews found for this product']);
			} else {
				echo json_encode($reviews);
			}

			$stmt->close();

		} catch (Exception $e) {
			http_response_code(500);
			echo json_encode(['error' => 'Internal Server Error', 'details' => $e->getMessage()]);
		} finally {
			$connect->close();
		}
   }
   public static function addNewReview($connect, $text, $rating, $productId, $userId) {

		// 1. Insert the review
   	if (!$productId || !$userId || !$text || !$rating) {
         http_response_code(400);
         echo json_encode(['error' => 'Missing productId, userId, text or rating']);
         return;
      }
		try {
			$stmt = $connect->prepare(
				"INSERT INTO reviews (product_id, user_id, text, rating) VALUES (?, ?, ?, ?)"
			);
		

			if (!$stmt) {
				throw new Exception('Failed to prepare statement: ' . $connect->error);
			}

			$stmt->bind_param('iisi', $productId, $userId, $text, $rating);

			if (!$stmt->execute()) {
				throw new Exception('Execution failed: ' . $stmt->error);
			}
			
			//$insertedId = $stmt->insert_id;

			$stmt->close();

			//// 2. Fetch the inserted review with formatted date
			//$stmt = $connect->prepare(
			//	"SELECT id, product_id, user_id, text, rating, created_at FROM reviews WHERE id = ?"
			//);

			//if (!$stmt) {
			//	throw new Exception('Failed to prepare statement: ' . $connect->error);
			//}

			//$stmt->bind_param('i', $insertedId);

			//if (!$stmt->execute()) {
			//	throw new Exception('Failed to fetch inserted review: ' . $stmt->error);
			//}

			//$result = $stmt->get_result();
			//$review = $result->fetch_assoc();

			//if (!$review) {
			//	throw new Exception('Inserted review not found.');
			//}

			//// 3. Format created_at
			//$review['created_at'] = (new DateTime($review['created_at']))->format('F j, Y');

			//echo json_encode($review);

			//$stmt->close();

		} catch (Exception $e) {
			http_response_code(500);
			echo json_encode(['error' => 'Internal Server Error', 'details' => $e->getMessage()]);
		} finally {
			$connect->close();
		}
   }
}
?>