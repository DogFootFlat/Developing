package mit.shelf.repository;

import mit.shelf.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<Member,String> {
    @Query(value = "SELECT uid FROM Member",nativeQuery = true)
    List<String> selectAllUid();

    @Query(value = "SELECT count(id) FROM Member;",nativeQuery = true)
    Integer countAll();
}
