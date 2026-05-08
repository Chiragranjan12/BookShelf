package  com.bookmanager.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Author is required")
    @Column(nullable = false)
    private String author;

    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    private Status status;

    @NotNull(message = "Source is required")
    @Enumerated(EnumType.STRING)
    private Source source;

       private BigDecimal price;
    
    private String currency;
    
    @Column(name = "borrowed_from")
    private String borrowedFrom; 
    
    private String notes;

    public enum Status {
        WISHLIST, READING, COMPLETED
    }

    public enum Source {
        PURCHASED, BORROWED
    }

    // Constructors
    public Book() {}

    public Book(String title, String author, Status status, Source source) {
        this.title = title;
        this.author = author;
        this.status = status;
        this.source = source;
    }

    // Getters and Setters
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

       public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getBorrowedFrom() { return borrowedFrom; } 
    public void setBorrowedFrom(String borrowedFrom) { this.borrowedFrom = borrowedFrom; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
 