package mit.shelf.repository;

import mit.shelf.domain.Book;

import java.util.List;
import java.util.Optional;

public interface BookRepository {

    Book save(Book book);
    Optional<Book> findById(Long id);

    List<Book> findByDonor(String donor);

    List<Book> findByName(String name);
    List<Book> findAll();

//    List<Book> findAllReverse();

    Optional<Book> findByUid(String uid);

    List<Book> findByWriter(String writer);

    List<Book> findByCategory(String category);

    void deleteById(Long id);

    List<Book> findAllByBookFloor(int bookFloor);

    Optional<Book> findBySmartUid(String smartUid);

}
