CREATE DATABASE IF NOT EXISTS laptop_store
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE laptop_store;

-- ---------- users ----------
CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL DEFAULT 'user',            -- 'admin' | 'user'
  email_verified_at TIMESTAMP NULL,
  password VARCHAR(255) NOT NULL,
  remember_token VARCHAR(100) NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

-- ---------- laptops ----------
CREATE TABLE laptops (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255) NOT NULL,
  description TEXT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT UNSIGNED NOT NULL DEFAULT 0,
  image_url VARCHAR(255) NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

-- ---------- carts ----------
CREATE TABLE carts (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL UNIQUE,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  CONSTRAINT fk_carts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ---------- cart_items ----------
CREATE TABLE cart_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  cart_id BIGINT UNSIGNED NOT NULL,
  laptop_id BIGINT UNSIGNED NOT NULL,
  quantity INT UNSIGNED NOT NULL DEFAULT 1,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_items_laptop FOREIGN KEY (laptop_id) REFERENCES laptops(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_cart_laptop (cart_id, laptop_id)
);

-- ---------- orders ----------
CREATE TABLE orders (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',        -- pending|processing|completed|cancelled
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ---------- order_items ----------
CREATE TABLE order_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT UNSIGNED NOT NULL,
  laptop_id BIGINT UNSIGNED NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  price DECIMAL(10,2) NOT NULL,                         -- price at time of purchase
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_order_items_laptop FOREIGN KEY (laptop_id) REFERENCES laptops(id)
);

-- ---------- personal_access_tokens (Laravel Sanctum) ----------
CREATE TABLE personal_access_tokens (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tokenable_type VARCHAR(255) NOT NULL,
  tokenable_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  token VARCHAR(64) NOT NULL UNIQUE,
  abilities TEXT NULL,
  last_used_at TIMESTAMP NULL,
  expires_at TIMESTAMP NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  KEY idx_tokenable (tokenable_type, tokenable_id)
);


INSERT INTO users (name, email, role, password, created_at, updated_at) VALUES
  ('Admin', 'admin@example.com', 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW(), NOW()),
  ('John Doe', 'user@example.com', 'user', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW(), NOW());

INSERT INTO carts (user_id, created_at, updated_at)
  SELECT id, NOW(), NOW() FROM users;

INSERT INTO laptops (name, brand, description, price, stock, created_at, updated_at) VALUES
  ('MacBook Air M3', 'Apple', '13" M3 chip, 8GB RAM, 256GB SSD.', 1299.00, 15, NOW(), NOW()),
  ('MacBook Pro 14"', 'Apple', 'M3 Pro chip, 18GB RAM, 512GB SSD.', 1999.00, 8, NOW(), NOW()),
  ('XPS 13', 'Dell', 'Intel i7, 16GB RAM, 512GB SSD.', 1099.00, 20, NOW(), NOW()),
  ('ThinkPad X1 Carbon', 'Lenovo', 'Intel i7, 16GB RAM, 1TB SSD, business-grade.', 1450.00, 10, NOW(), NOW()),
  ('ROG Zephyrus G14', 'Asus', 'Ryzen 9, RTX 4060, 16GB RAM, gaming laptop.', 1699.00, 5, NOW(), NOW()),
  ('Pavilion 15', 'HP', 'Intel i5, 8GB RAM, 512GB SSD, everyday laptop.', 699.00, 25, NOW(), NOW());

