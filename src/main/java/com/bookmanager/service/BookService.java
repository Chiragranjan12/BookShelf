package com.bookmanager.service;

import com.bookmanager.dto.BookDTO;
import com.bookmanager.model.Book;
import com.bookmanager.repository.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class BookService {

    private static final Logger log = LoggerFactory.getLogger(BookService.class);

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(BookDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<BookDTO> getBookById(Long id) {
        return bookRepository.findById(id).map(BookDTO::new);
    }

    public Page<BookDTO> searchBooks(String search, String statusFilter, Pageable pageable) {
        Book.Status status = parseStatus(statusFilter);
        boolean hasSearch = search != null && !search.trim().isEmpty();

        if (hasSearch && status != null) {
            return bookRepository
                    .findByTitleOrAuthorContainingIgnoreCaseAndStatus(search, status, pageable)
                    .map(BookDTO::new);
        }
        if (hasSearch) {
            return bookRepository
                    .findByTitleOrAuthorContainingIgnoreCase(search, pageable)
                    .map(BookDTO::new);
        }
        if (status != null) {
            return bookRepository.findByStatus(status, pageable).map(BookDTO::new);
        }
        return bookRepository.findAll(pageable).map(BookDTO::new);
    }

    private Book.Status parseStatus(String statusFilter) {
        if (statusFilter == null || statusFilter.isBlank() || statusFilter.equalsIgnoreCase("all")) {
            return null;
        }
        try {
            return Book.Status.valueOf(statusFilter.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status value: '" + statusFilter + "'. Allowed: WISHLIST, READING, COMPLETED");
        }
    }

    @Transactional
    public BookDTO createBook(BookDTO bookDTO) {
        Book saved = bookRepository.save(toEntity(bookDTO));
        log.info("Created book id={} title={}", saved.getId(), saved.getTitle());
        return new BookDTO(saved);
    }

    @Transactional
    public Optional<BookDTO> updateBook(Long id, BookDTO bookDTO) {
        return bookRepository.findById(id).map(existing -> {
            applyUpdate(existing, bookDTO);
            Book saved = bookRepository.save(existing);
            log.info("Updated book id={}", saved.getId());
            return new BookDTO(saved);
        });
    }

    @Transactional
    public Optional<BookDTO> updateStatus(Long id, Book.Status status) {
        return bookRepository.findById(id).map(existing -> {
            existing.setStatus(status);
            Book saved = bookRepository.save(existing);
            log.info("Status updated book id={} status={}", id, status);
            return new BookDTO(saved);
        });
    }

    @Transactional
    public boolean deleteBook(Long id) {
        if (!bookRepository.existsById(id)) return false;
        bookRepository.deleteById(id);
        log.info("Deleted book id={}", id);
        return true;
    }

    public Map<String, Long> getBookStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", bookRepository.count());
        stats.put("WISHLIST", 0L);
        stats.put("READING", 0L);
        stats.put("COMPLETED", 0L);
        bookRepository.countByStatus().forEach(row -> stats.put(row[0].toString(), (Long) row[1]));
        return stats;
    }

    private Book toEntity(BookDTO dto) {
        Book book = new Book();
        applyUpdate(book, dto);
        return book;
    }

    private void applyUpdate(Book book, BookDTO dto) {
        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setStatus(dto.getStatus());
        book.setSource(dto.getSource());
        book.setGenre(dto.getGenre());
        book.setCoverUrl(dto.getCoverUrl());
        book.setPrice(dto.getPrice());
        book.setCurrency(dto.getCurrency() != null ? dto.getCurrency() : "USD");
        book.setBorrowedFrom(dto.getBorrowedFrom());
        book.setNotes(dto.getNotes());
        book.setCurrentPage(dto.getCurrentPage() != null ? dto.getCurrentPage() : 0);
        book.setTotalPages(dto.getTotalPages());
    }
}
