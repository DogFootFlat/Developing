package mit.shelf.repository;

import mit.shelf.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SpringDataJpaBookRepository extends JpaRepository<Book,
        Long>, BookRepository {

    List<Book> findByName(String name);

//    List<Book> findAllReverse();

    List<Book> findAllByBookFloor(int bookFloor);

    Optional<Book> findByUid(String uid);
    List<Book> findByWriter(String name);

    List<Book> findByCategory(String category);

    @Override
    default void deleteById(Long aLong) {

    }
}
