package  com.bookmanager.controller;

import com.bookmanager.dto.BookDTO;
import com.bookmanager.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public ResponseEntity<List<BookDTO>> getAllBooks(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status) {
        List<BookDTO> books = bookService.searchBooks(search, status);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id)
                .map(book -> ResponseEntity.ok(book))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BookDTO> createBook(@Valid @RequestBody BookDTO bookDTO) {
        BookDTO createdBook = bookService.createBook(bookDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable Long id, 
                                             @Valid @RequestBody BookDTO bookDTO) {
        return bookService.updateBook(id, bookDTO)
                .map(book -> ResponseEntity.ok(book))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        if (bookService.deleteBook(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getBookStats() {
        List<BookDTO> allBooks = bookService.getAllBooks();
        
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", (long) allBooks.size());
        stats.put("reading", allBooks.stream()
                .filter(book -> book.getStatus().toString().equals("READING"))
                .count());
        stats.put("completed", allBooks.stream()
                .filter(book -> book.getStatus().toString().equals("COMPLETED"))
                .count());
        stats.put("wishlist", allBooks.stream()
                .filter(book -> book.getStatus().toString().equals("WISHLIST"))
                .count());
        
        return ResponseEntity.ok(stats);
    }
}
 