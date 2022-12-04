package mit.shelf.repository;

import mit.shelf.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SpringDataJpaMemberRepository extends JpaRepository<Member,
        Long>, MemberRepository {

    List<Member> findByName(String name);

//    List<Member> findAllReverse();

    List<Member> findAllByBookFloor(int bookFloor);

    Optional<Member> findByUid(String uid);
    List<Member> findByWriter(String name);

    List<Member> findByCategory(String category);

    @Override
    default void deleteById(Long aLong) {

    }
}
