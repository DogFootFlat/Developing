package mit.shelf.repository;

import mit.shelf.domain.BookRank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpringDataJpaBookRankRepository extends JpaRepository<BookRank,
        Long>, BookRankRepository {

    List<BookRank> findByName(String name);

}
