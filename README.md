Create table in db by name user<br/>
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  salary DECIMAL(10, 2),
  address TEXT,
  startDate DATE,
  time TIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
