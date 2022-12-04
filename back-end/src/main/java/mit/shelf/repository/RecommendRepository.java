package mit.shelf.repository;

import mit.shelf.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecommendRepository extends JpaRepository<Member, Long> {
    @Query(value = "SELECT * FROM member ORDER BY count desc ", nativeQuery = true)
    List<Member> recommendBook();
}
