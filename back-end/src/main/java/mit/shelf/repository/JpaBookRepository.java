package mit.shelf.repository;

import mit.shelf.domain.Book;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaBookRepository implements BookRepository {

    private final EntityManager em;
    public JpaBookRepository(EntityManager em) {
        this.em = em;
    }
    public Book save(Book book) {
        System.out.println(book.getName());
        em.persist(book);
        return book;
    }

    public Optional<Book> findById(Long id) {
        Book book = em.find(Book.class, id);
        return Optional.ofNullable(book);
    }

    public List<Book> findAll() {
        return em.createQuery("select m from Book m", Book.class)
                .getResultList();
    }

//    public List<Book> findAllReverse() {
//        return em.createQuery("select m from Book m order by m.uid desc", Book.class)
//                .getResultList();
//    }

    @Override
    public Optional<Book> findByUid(String uid) {
        List<Book> result = em.createQuery("select m from Book m where m.uid = :uid", Book.class)
                .setParameter("uid", uid)
                .getResultList();
        return result.stream().findAny();
    }

    @Override
    public void deleteById(Long uid) {
        em.createQuery("delete from Book m where m.uid = :uid", Book.class)
                .setParameter("uid", uid);
    }

    @Override
    public List<Book> findAllByBookFloor(int bookFloor) {
        return em.createQuery("select m from Book m where m.bookFloor = :bookFloor", Book.class)
                .setParameter("bookFloor", bookFloor)
                .getResultList();
    }

    @Override
    public List<Book> findByDonor(String donor) {
        List<Book> result = em.createQuery("select m from Book m where m.donor = :donor", Book.class)
                .setParameter("donor", donor)
                .getResultList();
        return result;
    }


//    @Override
//    public List<Book> findDonaters() {
//        List<Book> result = em.createQuery("select m from Book m", Book.class)
//                .getResultList();
//        return result;
//    }

    public List<Book> findByName(String name) {
        List<Book> result = em.createQuery("select m from Book m where m.name = :name", Book.class)
                .setParameter("name", name)
                .getResultList();
        return result;
    }
    @Override
    public Optional<Book> findBySmartUid(String smartUid) {
        List<Book> result = em.createQuery("select m from Book m where m.smartUid = :smartUid", Book.class)
                .setParameter("smartUid", smartUid)
                .getResultList();
        return result.stream().findAny();
    }

    public List<Book> findByWriter(String writer) {
        List<Book> result = em.createQuery("select m from Book m where m.writer = :writer", Book.class)
                .setParameter("writer", writer)
                .getResultList();
        return result;
    }

    public List<Book> findByCategory(String category) {
        List<Book> result = em.createQuery("select m from Book m where m.category = :category", Book.class)
                .setParameter("category", category)
                .getResultList();
        return result;
    }



}

