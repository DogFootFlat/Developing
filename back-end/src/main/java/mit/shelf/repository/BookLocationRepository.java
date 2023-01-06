package mit.shelf.repository;

import mit.shelf.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface BookLocationRepository extends JpaRepository<Book,Long> {
    @Query(value = "select id from member where id = :id",nativeQuery = true)
    Long findBookLocation(@Param("id") Long id);

    @Query(value = "select * from member",nativeQuery = true)
    ArrayList<Book> findTotalBookLocation();
}
