package mit.shelf.repository.book;

import mit.shelf.domain.BookRank;
import javax.persistence.EntityManager;

public class JpaBookRankRepository {

    private final EntityManager em;
    public JpaBookRankRepository(EntityManager em) {
        this.em = em;
    }
    public BookRank save(BookRank bookRank) {

        System.out.println(bookRank.getName());
        em.persist(bookRank);
        return bookRank;

    }

}
