package mit.shelf.repository.book;

import mit.shelf.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface eBookRepository extends JpaRepository<Book,String> {
    @Query(value = "SELECT bookCmp FROM member",nativeQuery = true)

    List<String> selectAllErrorBook();

}
