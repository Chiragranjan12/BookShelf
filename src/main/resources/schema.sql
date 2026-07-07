CREATE TABLE IF NOT EXISTS books (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    title         VARCHAR(255)  NOT NULL,
    author        VARCHAR(255)  NOT NULL,
    status        VARCHAR(50)   NOT NULL,
    source        VARCHAR(50)   NOT NULL,
    genre         VARCHAR(100),
    cover_url     VARCHAR(500),
    price         DECIMAL(10, 2),
    currency      VARCHAR(10)   DEFAULT 'USD',
    borrowed_from VARCHAR(255),
    notes         VARCHAR(2000),
    current_page  INT           DEFAULT 0,
    total_pages   INT,
    created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_books_status ON books(status);
CREATE INDEX IF NOT EXISTS idx_books_author ON books(author);
