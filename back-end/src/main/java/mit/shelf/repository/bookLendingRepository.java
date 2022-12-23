package mit.shelf.repository;

import mit.shelf.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface bookLendingRepository extends JpaRepository<Book, String> {
    @Query(value = "SELECT * FROM member WHERE borrower = :name ", nativeQuery = true)
    List<Book>  findByBookLending(@Param("name") String name);



}
