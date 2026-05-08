package  com.bookmanager.service;

import com.bookmanager.dto.BookDTO;
import com.bookmanager.model.Book;
import com.bookmanager.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {
    
    @Autowired
    private BookRepository bookRepository;

    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(BookDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<BookDTO> getBookById(Long id) {
        return bookRepository.findById(id)
                .map(BookDTO::new);
    }

    public BookDTO createBook(BookDTO bookDTO) {
        Book book = convertToEntity(bookDTO);
        Book savedBook = bookRepository.save(book);
        return new BookDTO(savedBook);
    }

    public Optional<BookDTO> updateBook(Long id, BookDTO bookDTO) {
        return bookRepository.findById(id)
                .map(existingBook -> {
                    updateBookEntity(existingBook, bookDTO);
                    Book savedBook = bookRepository.save(existingBook);
                    return new BookDTO(savedBook);
                });
    }

    public boolean deleteBook(Long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<BookDTO> searchBooks(String search, String statusFilter) {
        List<Book> books;
        
        if (search != null && !search.trim().isEmpty()) {
            if (statusFilter != null && !statusFilter.equals("all")) {
                Book.Status status = Book.Status.valueOf(statusFilter.toUpperCase());
                books = bookRepository.findByTitleOrAuthorContainingIgnoreCaseAndStatus(search, status);
            } else {
                books = bookRepository.findByTitleOrAuthorContainingIgnoreCase(search);
            }
        } else if (statusFilter != null && !statusFilter.equals("all")) {
            Book.Status status = Book.Status.valueOf(statusFilter.toUpperCase());
            books = bookRepository.findByStatus(status);
        } else {
            books = bookRepository.findAll();
        }
        
        return books.stream()
                .map(BookDTO::new)
                .collect(Collectors.toList());
    }

    private Book convertToEntity(BookDTO bookDTO) {
        Book book = new Book();
        updateBookEntity(book, bookDTO);
        return book;
    }

    private void updateBookEntity(Book book, BookDTO bookDTO) {
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setStatus(bookDTO.getStatus());
        book.setSource(bookDTO.getSource());
               book.setPrice(bookDTO.getPrice());
        book.setCurrency(bookDTO.getCurrency());
        book.setBorrowedFrom(bookDTO.getBorrowedFrom()); 
        book.setNotes(bookDTO.getNotes());
    }

	public Object getBookStats() {
		// TODO Auto-generated method stub
		return null;
	}
}
 