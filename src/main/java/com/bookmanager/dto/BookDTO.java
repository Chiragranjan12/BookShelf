package  com.bookmanager.dto;

import com.bookmanager.model.Book;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class BookDTO {
    private Long id;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Author is required")
    private String author;
    
    @NotNull(message = "Status is required")
    private Book.Status status;
    
    @NotNull(message = "Source is required")
    private Book.Source source;
    
       private BigDecimal price;
    private String currency;
    private String borrowedFrom; 
    private String notes;

    // Constructors
    public BookDTO() {}

    public BookDTO(Book book) {
        this.id = book.getId();
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.status = book.getStatus();
        this.source = book.getSource();
               this.price = book.getPrice();
        this.currency = book.getCurrency();
        this.borrowedFrom = book.getBorrowedFrom(); 
        this.notes = book.getNotes();
    }

    // Getters and Setters
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

       public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getBorrowedFrom() { return borrowedFrom; } 
    public void setBorrowedFrom(String borrowedFrom) { this.borrowedFrom = borrowedFrom; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
 