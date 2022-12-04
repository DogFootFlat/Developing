package mit.shelf.repository;

import mit.shelf.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface eBookRepository extends JpaRepository<Member,String> {
    @Query(value = "SELECT bookCmp FROM member",nativeQuery = true)

    List<String> selectAllErrorBook();

}
