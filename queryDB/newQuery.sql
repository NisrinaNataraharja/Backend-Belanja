CREATE TABLE products(
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(64) NOT NULL,
    description VARCHAR(128) NULL,
    stock INT DEFAULT 0,
    price INT DEFAULT 0,
    id_category INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);

INSERT INTO products (name, description, id_category)VALUES('mie goreng', 'rasa kari ayam', 1),('mie rebus', 'rasa soto', 1),('jus mangga', 'dingin', 2),('jus apel', 'dingin', 2),('jus jeruk', 'dingin', 2),('bakso bakar', 'pedas', 3);

CREATE TABLE category(
    id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(64) NOT NULL
);


INSERT INTO category(name)VALUES('makan'),('minuman'),('snack'),('permen');


SELECT products.*, category.name AS name_category FROM products INNER JOIN category ON products.id_category = category.id;