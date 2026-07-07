package com.bookmanager.dto;

import com.bookmanager.model.Book;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BookDTO {

    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 255)
    private String title;

    @NotBlank(message = "Author is required")
    @Size(max = 255)
    private String author;

    @NotNull(message = "Status is required")
    private Book.Status status;

    @NotNull(message = "Source is required")
    private Book.Source source;

    @Size(max = 100)
    private String genre;

    @Size(max = 500)
    private String coverUrl;

    private BigDecimal price;

    @Size(max = 10)
    private String currency;

    @Size(max = 255)
    private String borrowedFrom;

    @Size(max = 2000)
    private String notes;

    @Min(0)
    private Integer currentPage;

    @Min(1)
    private Integer totalPages;

    // computed — not stored
    private Integer readingProgressPercent;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public BookDTO() {}

    public BookDTO(Book book) {
        this.id = book.getId();
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.status = book.getStatus();
        this.source = book.getSource();
        this.genre = book.getGenre();
        this.coverUrl = book.getCoverUrl();
        this.price = book.getPrice();
        this.currency = book.getCurrency();
        this.borrowedFrom = book.getBorrowedFrom();
        this.notes = book.getNotes();
        this.currentPage = book.getCurrentPage();
        this.totalPages = book.getTotalPages();
        this.createdAt = book.getCreatedAt();
        this.updatedAt = book.getUpdatedAt();

        if (book.getTotalPages() != null && book.getTotalPages() > 0 && book.getCurrentPage() != null) {
            this.readingProgressPercent = (int) Math.round(
                    (book.getCurrentPage() * 100.0) / book.getTotalPages());
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public Book.Status getStatus() { return status; }
    public void setStatus(Book.Status status) { this.status = status; }

    public Book.Source getSource() { return source; }
    public void setSource(Book.Source source) { this.source = source; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public String getCoverUrl() { return coverUrl; }
    public void setCoverUrl(String coverUrl) { this.coverUrl = coverUrl; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getBorrowedFrom() { return borrowedFrom; }
    public void setBorrowedFrom(String borrowedFrom) { this.borrowedFrom = borrowedFrom; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Integer getCurrentPage() { return currentPage; }
    public void setCurrentPage(Integer currentPage) { this.currentPage = currentPage; }

    public Integer getTotalPages() { return totalPages; }
    public void setTotalPages(Integer totalPages) { this.totalPages = totalPages; }

    public Integer getReadingProgressPercent() { return readingProgressPercent; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
