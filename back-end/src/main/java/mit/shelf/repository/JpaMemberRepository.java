package mit.shelf.repository;

import mit.shelf.domain.Member;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaMemberRepository implements MemberRepository{

    private final EntityManager em;
    public JpaMemberRepository(EntityManager em) {
        this.em = em;
    }
    public Member save(Member member) {
        System.out.println(member.getName());
        em.persist(member);
        return member;
    }

    public Optional<Member> findById(Long id) {
        Member member = em.find(Member.class, id);
        return Optional.ofNullable(member);
    }

    public List<Member> findAll() {
        return em.createQuery("select m from Member m", Member.class)
                .getResultList();
    }

//    public List<Member> findAllReverse() {
//        return em.createQuery("select m from Member m order by m.uid desc", Member.class)
//                .getResultList();
//    }

    @Override
    public Optional<Member> findByUid(String uid) {
        List<Member> result = em.createQuery("select m from Member m where m.uid = :uid", Member.class)
                .setParameter("uid", uid)
                .getResultList();
        return result.stream().findAny();
    }

    @Override
    public void deleteById(Long uid) {
        em.createQuery("delete from Member m where m.uid = :uid", Member.class)
                .setParameter("uid", uid);
    }

    @Override
    public List<Member> findAllByBookFloor(int bookFloor) {
        return em.createQuery("select m from Member m where m.bookFloor = :bookFloor", Member.class)
                .setParameter("bookFloor", bookFloor)
                .getResultList();
    }

    @Override
    public List<Member> findByDonor(String donor) {
        List<Member> result = em.createQuery("select m from Member m where m.donor = :donor", Member.class)
                .setParameter("donor", donor)
                .getResultList();
        return result;
    }


//    @Override
//    public List<Member> findDonaters() {
//        List<Member> result = em.createQuery("select m from Member m", Member.class)
//                .getResultList();
//        return result;
//    }

    public List<Member> findByName(String name) {
        List<Member> result = em.createQuery("select m from Member m where m.name = :name", Member.class)
                .setParameter("name", name)
                .getResultList();
        return result;
    }
    @Override
    public Optional<Member> findBySmartUid(String smartUid) {
        List<Member> result = em.createQuery("select m from Member m where m.smartUid = :smartUid", Member.class)
                .setParameter("smartUid", smartUid)
                .getResultList();
        return result.stream().findAny();
    }

    public List<Member> findByWriter(String writer) {
        List<Member> result = em.createQuery("select m from Member m where m.writer = :writer", Member.class)
                .setParameter("writer", writer)
                .getResultList();
        return result;
    }

    public List<Member> findByCategory(String category) {
        List<Member> result = em.createQuery("select m from Member m where m.category = :category", Member.class)
                .setParameter("category", category)
                .getResultList();
        return result;
    }



}

