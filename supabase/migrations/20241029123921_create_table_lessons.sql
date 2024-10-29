CREATE TABLE Lessons (
    id VARCHAR(10) PRIMARY KEY,
    module_id VARCHAR(10),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    duration INT, -- duration in minutes
    resources TEXT, -- could include URLs or resource types like 'Video, PDF'
    FOREIGN KEY (module_id) REFERENCES modules(id)
);
