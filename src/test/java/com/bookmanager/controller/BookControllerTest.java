package com.bookmanager.controller;

import com.bookmanager.dto.BookDTO;
import com.bookmanager.model.Book;
import com.bookmanager.service.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BookController.class)
@WithMockUser
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private BookService bookService;

    private BookDTO sampleDTO;

    @BeforeEach
    void setUp() {
        sampleDTO = new BookDTO();
        sampleDTO.setId(1L);
        sampleDTO.setTitle("The Pragmatic Programmer");
        sampleDTO.setAuthor("David Thomas");
        sampleDTO.setStatus(Book.Status.READING);
        sampleDTO.setSource(Book.Source.PURCHASED);
        sampleDTO.setPrice(new BigDecimal("35.00"));
        sampleDTO.setCurrency("USD");
        sampleDTO.setGenre("Technology");
        sampleDTO.setCurrentPage(50);
        sampleDTO.setTotalPages(352);
    }

    @Test
    void getAllBooks_returns200() throws Exception {
        when(bookService.searchBooks(any(), any(), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(sampleDTO)));

        mockMvc.perform(get("/api/v1/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].title").value("The Pragmatic Programmer"))
                .andExpect(jsonPath("$.content[0].genre").value("Technology"));
    }

    @Test
    void getAllBooks_withInvalidSortBy_stillReturns200() throws Exception {
        when(bookService.searchBooks(any(), any(), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(sampleDTO)));

        // sortBy=DROP TABLE should be sanitized to createdAt
        mockMvc.perform(get("/api/v1/books?sortBy=DROP TABLE"))
                .andExpect(status().isOk());
    }

    @Test
    void getBookById_returns200_whenFound() throws Exception {
        when(bookService.getBookById(1L)).thenReturn(Optional.of(sampleDTO));

        mockMvc.perform(get("/api/v1/books/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.author").value("David Thomas"));
    }

    @Test
    void getBookById_returns404_whenNotFound() throws Exception {
        when(bookService.getBookById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/v1/books/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void createBook_returns201_withValidBody() throws Exception {
        when(bookService.createBook(any(BookDTO.class))).thenReturn(sampleDTO);

        mockMvc.perform(post("/api/v1/books")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("The Pragmatic Programmer"));
    }

    @Test
    void createBook_returns400_whenTitleBlank() throws Exception {
        sampleDTO.setTitle("");

        mockMvc.perform(post("/api/v1/books")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.details.title").exists());
    }

    @Test
    void patchStatus_returns200_whenFound() throws Exception {
        sampleDTO.setStatus(Book.Status.COMPLETED);
        when(bookService.updateStatus(1L, Book.Status.COMPLETED)).thenReturn(Optional.of(sampleDTO));

        mockMvc.perform(patch("/api/v1/books/1/status")
                        .with(csrf())
                        .param("status", "COMPLETED"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("COMPLETED"));
    }

    @Test
    void deleteBook_returns204_whenFound() throws Exception {
        when(bookService.deleteBook(1L)).thenReturn(true);

        mockMvc.perform(delete("/api/v1/books/1").with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    void deleteBook_returns404_whenNotFound() throws Exception {
        when(bookService.deleteBook(99L)).thenReturn(false);

        mockMvc.perform(delete("/api/v1/books/99").with(csrf()))
                .andExpect(status().isNotFound());
    }

    @Test
    void getStats_returns200() throws Exception {
        when(bookService.getBookStats()).thenReturn(Map.of(
                "total", 5L, "READING", 2L, "COMPLETED", 3L, "WISHLIST", 0L));

        mockMvc.perform(get("/api/v1/books/stats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.total").value(5));
    }
}
