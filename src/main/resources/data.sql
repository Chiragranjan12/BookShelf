INSERT INTO books (title, author, status, source, genre, price, currency, notes, current_page, total_pages) VALUES
('The Great Gatsby',        'F. Scott Fitzgerald', 'COMPLETED', 'PURCHASED', 'Fiction',     12.99, 'USD', 'Classic American literature',              0,   180),
('To Kill a Mockingbird',   'Harper Lee',          'READING',   'PURCHASED', 'Fiction',     14.50, 'USD', 'Powerful story about justice and morality', 87,  281),
('1984',                    'George Orwell',       'WISHLIST',  'PURCHASED', 'Fiction',     NULL,  'USD', 'Dystopian masterpiece',                    0,   328),
('Clean Code',              'Robert C. Martin',    'COMPLETED', 'PURCHASED', 'Technology',  35.00, 'USD', 'Essential reading for every developer',     0,   464),
('The Pragmatic Programmer','David Thomas',        'READING',   'PURCHASED', 'Technology',  40.00, 'USD', 'Timeless software craftsmanship advice',    120, 352),
('Pride and Prejudice',     'Jane Austen',         'COMPLETED', 'BORROWED',  'Fiction',     NULL,  'USD', 'Borrowed from library',                    0,   432),
('Atomic Habits',           'James Clear',         'WISHLIST',  'PURCHASED', 'Self-Help',   16.99, 'USD', 'Building good habits',                     0,   320);

UPDATE books SET borrowed_from = 'City Library' WHERE source = 'BORROWED';
