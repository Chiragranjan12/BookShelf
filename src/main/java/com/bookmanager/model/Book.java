package com.bookmanager.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "books", indexes = {
    @Index(name = "idx_books_status", columnList = "status"),
    @Index(name = "idx_books_author", columnList = "author")
})
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Author is required")
    @Size(max = 255, message = "Author must not exceed 255 characters")
    @Column(nullable = false)
    private String author;

    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @NotNull(message = "Source is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Source source;

    @Size(max = 100)
    private String genre;

    @Size(max = 500)
    @Column(name = "cover_url")
    private String coverUrl;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Size(max = 10)
    @Column(columnDefinition = "VARCHAR(10) DEFAULT 'USD'")
    private String currency = "USD";

    @Size(max = 255)
    @Column(name = "borrowed_from")
    private String borrowedFrom;

    @Size(max = 2000)
    @Column(length = 2000)
    private String notes;

    @Min(0)
    @Column(name = "current_page", columnDefinition = "INT DEFAULT 0")
    private Integer currentPage = 0;

    @Min(1)
    @Column(name = "total_pages")
    private Integer totalPages;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public enum Status {
        WISHLIST, READING, COMPLETED
    }

    public enum Source {
        PURCHASED, BORROWED, GIFT
    }

    public Book() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public Source getSource() { return source; }
    public void setSource(Source source) { this.source = source; }

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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
