-- create table
CREATE TABLE products(id INT, name VARCHAR(64), description VARCHAR(128), stock INT, price INT, created_at TIMESTAMP);

CREATE TABLE products(id INT, name VARCHAR(64) NOT NULL, description VARCHAR(128), stock INT NOT NULL DEFAULT 0, price INT NOT NULL, created_at TIMESTAMP);

-- DROP /HAPUS TABLE
DROP TABLE products;


-- login
psql -U username -h localhost -p 5432

-- lihat database
\l

-- lihat seluruh table
\d atau \dt

-- lihat detail talbe
\d nama_table

-- untuk mangambil/melihat data di table
SELECT * FROM products;
SELECT name, description FROM products;

-- insert / tambah data
INSERT INTO products(id, name, description, stock, price)VALUES('baju', 'baju baru', '3', 3, 100000);
-- multiple
INSERT INTO products(id, name, description, stock, price)VALUES(4, 'celana', 'celana baru', 3, 100000),(5, 'sarung tangan', 'warna biru', 2, 15000); 

-- select + kondisi
SELECT * FROM products WHERE price > 10000 AND price < 50000;
-- select + sorting
SELECT * FROM products ORDER BY stock desc;

-- delete / hapus record / data
DELETE FROM products WHERE id = 4;


INSERT INTO category(id, name)VALUES(9, 'snack'), (10, 'katogri 10'), (11, 'kategori 11'), (12, 'katogri 12'), (11, 'kategori 13');