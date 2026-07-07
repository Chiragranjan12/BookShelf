package com.bookmanager.repository;

import com.bookmanager.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    Page<Book> findByTitleOrAuthorContainingIgnoreCase(@Param("search") String search, Pageable pageable);

    Page<Book> findByStatus(Book.Status status, Pageable pageable);

    @Query("SELECT b FROM Book b WHERE " +
           "(LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(b.author) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "b.status = :status")
    Page<Book> findByTitleOrAuthorContainingIgnoreCaseAndStatus(
        @Param("search") String search,
        @Param("status") Book.Status status,
        Pageable pageable);

    // Efficient stats — single DB query instead of loading all books
    @Query("SELECT b.status, COUNT(b) FROM Book b GROUP BY b.status")
    List<Object[]> countByStatus();
}
