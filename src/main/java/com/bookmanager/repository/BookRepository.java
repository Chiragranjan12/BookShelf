package  com.bookmanager.repository;

import com.bookmanager.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    
    @Query("SELECT b FROM Book b WHERE " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(b.author) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Book> findByTitleOrAuthorContainingIgnoreCase(@Param("search") String search);
    
    List<Book> findByStatus(Book.Status status);
    
    @Query("SELECT b FROM Book b WHERE " +
           "(LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(b.author) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "b.status = :status")
    List<Book> findByTitleOrAuthorContainingIgnoreCaseAndStatus(
        @Param("search") String search, 
        @Param("status") Book.Status status);
}
 