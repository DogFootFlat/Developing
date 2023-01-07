package mit.shelf.repository.book;

import mit.shelf.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecommendRepository extends JpaRepository<Book, Long> {
    @Query(value = "SELECT * FROM member ORDER BY count desc ", nativeQuery = true)
    List<Book> recommendBook();
}
