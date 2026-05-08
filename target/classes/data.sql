INSERT  INTO books (title, author, status, source, price, notes) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'COMPLETED', 'PURCHASED', 12.99, 'Classic American literature'),
('To Kill a Mockingbird', 'Harper Lee', 'READING', 'PURCHASED', 14.50, 'Powerful story about justice and morality'),
('1984', 'George Orwell', 'WISHLIST', 'PURCHASED', NULL, 'Dystopian masterpiece'),
('Pride and Prejudice', 'Jane Austen', 'COMPLETED', 'BORROWED', NULL, 'Borrowed from library'),
('The Catcher in the Rye', 'J.D. Salinger', 'READING', 'PURCHASED', 13.25, 'Coming-of-age story');

UPDATE books SET borrowed_from = 'City Library' WHERE source = 'BORROWED';
 