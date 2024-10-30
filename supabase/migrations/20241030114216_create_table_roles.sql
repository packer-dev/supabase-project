CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

INSERT INTO roles (role_name, description)
VALUES
    ('superuser', 'Has all permissions'),
    ('admin', 'Can manage users and roles'),
    ('teacher', 'Can manage course content'),
    ('student', 'Can access and view course content');