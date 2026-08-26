CREATE TABLE IF NOT EXISTS challenges (
    id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL,
    reflection TEXT,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at DATE
);