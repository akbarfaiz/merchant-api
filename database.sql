CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  date_of_birth TIMESTAMP,
  full_name VARCHAR,
  address VARCHAR,
  phone VARCHAR,
  email VARCHAR,
  active INT,
  password VARCHAR
);

CREATE TABLE City (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  longitude VARCHAR,
  latitude VARCHAR
);

CREATE TABLE Merchant (
  id SERIAL PRIMARY KEY,
  merchant_name VARCHAR,
  city_id INT REFERENCES City(id),
  address VARCHAR,
  phone VARCHAR,
  expired_date TIMESTAMP
);

CREATE TABLE Products (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  merchant_id INT REFERENCES Merchant(id),
  price INT
);

CREATE TABLE Order_Items (
  id SERIAL PRIMARY KEY,
  date TIMESTAMP,
  quantity INT,
  product_id INT REFERENCES Products(id),
  user_id INT REFERENCES Users(id)
);

CREATE TABLE Order_Status (
  order_id INT REFERENCES Order_Items(id),
  status_id INT
);

CREATE TABLE Master_Status (
  user_id INT REFERENCES Users(id),
  description VARCHAR
);