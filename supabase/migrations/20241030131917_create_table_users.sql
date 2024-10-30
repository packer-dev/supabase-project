CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    role_id INT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);


INSERT INTO users (username, password, email, role_id)
VALUES
    ('user1', 'password1', 'user1@example.com', 1),
    ('user2', 'password2', 'user2@example.com', 2),
    ('user3', 'password3', 'user3@example.com', 3),
    ('user4', 'password4', 'user4@example.com', 4),
    ('user5', 'password5', 'user5@example.com', 2),
    ('user6', 'password6', 'user6@example.com', 2),
    ('user7', 'password7', 'user7@example.com', 3),
    ('user8', 'password8', 'user8@example.com', 4),
    ('user9', 'password9', 'user9@example.com', 1),
    ('user10', 'password10', 'user10@example.com', 2);