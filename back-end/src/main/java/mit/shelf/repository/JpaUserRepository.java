package mit.shelf.repository;

import mit.shelf.domain.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public class JpaUserRepository implements LibUserRepository{

    private final EntityManager em;
    public JpaUserRepository(EntityManager em) {
        this.em = em;
    }
    @Transactional
    public User save(User member) {
        System.out.println(member.getName());
        em.persist(member);
        return member;
    }

    public Optional<User> findById(Long id) {
        User member = em.find(User.class, id);
        return Optional.ofNullable(member);
    }

    @Override
    public Optional<User> findByUid(String uid) {
        List<User> result = em.createQuery("select m from Member m where m.uid = :uid", User.class)
                .setParameter("uid", uid)
                .getResultList();
        return result.stream().findAny();
    }
    @Override
    public Optional<User> findByUidU(String uid) {
        List<User> result = em.createQuery("select m from User m where m.uid = :uid", User.class)
                .setParameter("uid", uid)
                .getResultList();
        return result.stream().findAny();
    }
    public List<User> findAll() {
        return em.createQuery("select m from User m", User.class)
                .getResultList();
    }

    @Override
    public Boolean findByPw(Long id, String pw) {
        return true;
    }

    public List<User> findAllBorrow(String id) {
        return em.createQuery("select m from User m where m.id = :id", User.class)
                .setParameter("id", id)
                .getResultList();
    }

    public List<User> findByName(String name) {
        return em.createQuery("select m from User m where m.name = :name", User.class)
                .setParameter("name", name)
                .getResultList();
    }

    @Override
    public Optional<User> findByUUid(String uid) {
        List<User> result = em.createQuery("select m from User m where m.borrow1 = :uid or m.borrow2 = :uid or m.borrow3 = :uid", User.class)
                .setParameter("uid", uid)
                .getResultList();
        return result.stream().findAny();
    }

    @Override
    public Optional<User> findByPw(String pw) {
        List<User> result = em.createQuery("select m from User m where m.pw = :pw", User.class)
                .setParameter("pw", pw)
                .getResultList();
        return result.stream().findAny();
    }

    @Override
    public Optional<User> findByUserName(String name) {
        List<User> result = em.createQuery("select m from User m where m.name = :name", User.class)
                .setParameter("name", name)
                .getResultList();
        return result.stream().findAny();
    }
}
