<?php
	class ProductController {
		public static function getProductById($connect, $id) {
			if (!$id) {
				http_response_code(400);
				echo json_encode(['error' => 'Missing productId']);
				return;
			}

			try {
				// 1. Fetch product data
				$stmt = $connect->prepare(
				'SELECT id, title, subtitle, image_1,
							created_by, created_at, views,
							product_categories, sale, price, sale_price
					FROM products
					WHERE id = ?
					LIMIT 1'
				);

				if (!$stmt) {
					throw new Exception('Failed to prepare statement: ' . $connect->error);
				}
				$stmt->bind_param('i', $id);
				if (!$stmt->execute()) {
					throw new Exception('Execution failed: ' . $stmt->error);
				}
				$result = $stmt->get_result();
				$product = $result->fetch_assoc();

				if (!$product) {
					http_response_code(404);
					echo json_encode(['error' => 'Product not found']);
					exit;
				}

				$product['product_categories'] = json_decode($product['product_categories'], true);

				// 2. Fetch product rating (average + total)
				$ratingStmt = $connect->prepare(
					'SELECT COUNT(*) as count, AVG(rating) as average
					FROM reviews
					WHERE product_id = ?'
				);
				if (!$ratingStmt) {
					throw new Exception('Failed to prepare rating statement: ' . $connect->error);
				}
				$ratingStmt->bind_param('i', $id);
				if (!$ratingStmt->execute()) {
					throw new Exception('Execution failed: ' . $ratingStmt->error);
				}
				$ratingResult = $ratingStmt->get_result();
				$ratingData = $ratingResult->fetch_assoc();

				// Attach rating info to product
				$product['product_rating_total'] = (int) $ratingData['count'];
				$product['product_rating_average'] = $ratingData['average'] !== null
					? round((float) $ratingData['average'], 2)
					: null;

				echo json_encode($product);

				$stmt->close();
				$ratingStmt->close();

			} catch (Exception $e) {
				http_response_code(500);
				echo json_encode(['error' => 'Internal Server Error', 'details' => $e->getMessage()]);
			} finally {
				$connect->close();
			}
		}
		//public static function getProductRatingSummary($connect, $productId) {
		//	if (!$productId) {
		//		http_response_code(400);
		//		echo json_encode(['error' => 'Missing productId']);
		//		return;
		//	}

		//	try {
		//		$stmt = $connect->prepare(
		//			'SELECT COUNT(*) as total, AVG(rating) as average
		//			FROM reviews
		//			WHERE product_id = ?'
		//		);

		//		if (!$stmt) {
		//			throw new Exception('Failed to prepare statement: ' . $connect->error);
		//		}

		//		$stmt->bind_param('i', $productId);

		//		if (!$stmt->execute()) {
		//			throw new Exception('Execution failed: ' . $stmt->error);
		//		}

		//		$result = $stmt->get_result();
		//		$data = $result->fetch_assoc();
		//		$response = [
		//			'product_rating_total' => (int) $data['total'],
		//			'product_rating_average' => $data['average'] !== null
		//				? round((float) $data['average'], 2)
		//				: null
		//		];

		//		echo json_encode($response);

		//		$stmt->close();

		//	} catch (Exception $e) {
		//		http_response_code(500);
		//		echo json_encode(['error' => 'Internal Server Error', 'details' => $e->getMessage()]);
		//	} finally {
		//		$connect->close();
		//	}
		//}
	}	
?>