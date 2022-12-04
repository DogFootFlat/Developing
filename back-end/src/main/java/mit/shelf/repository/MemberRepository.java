package mit.shelf.repository;

import mit.shelf.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {

    Member save(Member member);
    Optional<Member> findById(Long id);

    List<Member> findByDonor(String donor);

    List<Member> findByName(String name);
    List<Member> findAll();

//    List<Member> findAllReverse();

    Optional<Member> findByUid(String uid);

    List<Member> findByWriter(String writer);

    List<Member> findByCategory(String category);

    void deleteById(Long uid);

    List<Member> findAllByBookFloor(int bookFloor);

    Optional<Member> findBySmartUid(String smartUid);

}
