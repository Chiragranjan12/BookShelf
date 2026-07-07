package com.bookmanager.service;

import com.bookmanager.dto.BookDTO;
import com.bookmanager.model.Book;
import com.bookmanager.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookService bookService;

    private Book sampleBook;
    private BookDTO sampleDTO;

    @BeforeEach
    void setUp() {
        sampleBook = new Book();
        sampleBook.setId(1L);
        sampleBook.setTitle("Clean Code");
        sampleBook.setAuthor("Robert C. Martin");
        sampleBook.setStatus(Book.Status.READING);
        sampleBook.setSource(Book.Source.PURCHASED);
        sampleBook.setPrice(new BigDecimal("29.99"));
        sampleBook.setCurrency("USD");
        sampleBook.setGenre("Technology");
        sampleBook.setCurrentPage(120);
        sampleBook.setTotalPages(464);

        sampleDTO = new BookDTO(sampleBook);
    }

    @Test
    void createBook_savesAndReturnsDTO() {
        when(bookRepository.save(any(Book.class))).thenReturn(sampleBook);

        BookDTO result = bookService.createBook(sampleDTO);

        assertThat(result.getTitle()).isEqualTo("Clean Code");
        assertThat(result.getGenre()).isEqualTo("Technology");
        verify(bookRepository, times(1)).save(any(Book.class));
    }

    @Test
    void createBook_computesReadingProgress() {
        when(bookRepository.save(any(Book.class))).thenReturn(sampleBook);

        BookDTO result = bookService.createBook(sampleDTO);

        // 120/464 = ~25.86% → rounds to 26
        assertThat(result.getReadingProgressPercent()).isEqualTo(26);
    }

    @Test
    void getBookById_returnsDTO_whenFound() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(sampleBook));

        Optional<BookDTO> result = bookService.getBookById(1L);

        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(1L);
        assertThat(result.get().getCurrentPage()).isEqualTo(120);
        assertThat(result.get().getTotalPages()).isEqualTo(464);
    }

    @Test
    void getBookById_returnsEmpty_whenNotFound() {
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        assertThat(bookService.getBookById(99L)).isEmpty();
    }

    @Test
    void updateBook_updatesFields_whenFound() {
        BookDTO updateDTO = new BookDTO();
        updateDTO.setTitle("Clean Code Updated");
        updateDTO.setAuthor("Robert C. Martin");
        updateDTO.setStatus(Book.Status.COMPLETED);
        updateDTO.setSource(Book.Source.PURCHASED);
        updateDTO.setGenre("Technology");

        Book updatedBook = new Book();
        updatedBook.setId(1L);
        updatedBook.setTitle("Clean Code Updated");
        updatedBook.setAuthor("Robert C. Martin");
        updatedBook.setStatus(Book.Status.COMPLETED);
        updatedBook.setSource(Book.Source.PURCHASED);

        when(bookRepository.findById(1L)).thenReturn(Optional.of(sampleBook));
        when(bookRepository.save(any(Book.class))).thenReturn(updatedBook);

        Optional<BookDTO> result = bookService.updateBook(1L, updateDTO);

        assertThat(result).isPresent();
        assertThat(result.get().getTitle()).isEqualTo("Clean Code Updated");
        assertThat(result.get().getStatus()).isEqualTo(Book.Status.COMPLETED);
    }

    @Test
    void updateBook_returnsEmpty_whenNotFound() {
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        assertThat(bookService.updateBook(99L, sampleDTO)).isEmpty();
        verify(bookRepository, never()).save(any());
    }

    @Test
    void updateStatus_changesStatusOnly() {
        Book completedBook = new Book();
        completedBook.setId(1L);
        completedBook.setTitle("Clean Code");
        completedBook.setAuthor("Robert C. Martin");
        completedBook.setStatus(Book.Status.COMPLETED);
        completedBook.setSource(Book.Source.PURCHASED);

        when(bookRepository.findById(1L)).thenReturn(Optional.of(sampleBook));
        when(bookRepository.save(any(Book.class))).thenReturn(completedBook);

        Optional<BookDTO> result = bookService.updateStatus(1L, Book.Status.COMPLETED);

        assertThat(result).isPresent();
        assertThat(result.get().getStatus()).isEqualTo(Book.Status.COMPLETED);
    }

    @Test
    void deleteBook_returnsTrue_whenExists() {
        when(bookRepository.existsById(1L)).thenReturn(true);

        assertThat(bookService.deleteBook(1L)).isTrue();
        verify(bookRepository).deleteById(1L);
    }

    @Test
    void deleteBook_returnsFalse_whenNotExists() {
        when(bookRepository.existsById(99L)).thenReturn(false);

        assertThat(bookService.deleteBook(99L)).isFalse();
        verify(bookRepository, never()).deleteById(any());
    }

    @Test
    void getBookStats_returnsCorrectCounts() {
        when(bookRepository.count()).thenReturn(3L);
        when(bookRepository.countByStatus()).thenReturn(List.of(
                new Object[]{Book.Status.READING, 1L},
                new Object[]{Book.Status.COMPLETED, 2L}
        ));

        Map<String, Long> stats = bookService.getBookStats();

        assertThat(stats.get("total")).isEqualTo(3L);
        assertThat(stats.get("READING")).isEqualTo(1L);
        assertThat(stats.get("COMPLETED")).isEqualTo(2L);
        assertThat(stats.get("WISHLIST")).isEqualTo(0L);
    }
}
