CREATE TABLE courses (
    id VARCHAR(10) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    instructor_name VARCHAR(100),
    duration INT, -- duration in hours
    start_date DATE,
    end_date DATE
);
