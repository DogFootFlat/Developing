package mit.shelf.repository;

import mit.shelf.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface bookLendingRepository extends JpaRepository<Member, String> {
    @Query(value = "SELECT * FROM member WHERE borrower = :name ", nativeQuery = true)
    List<Member>  findByBookLending(@Param("name") String name);



}
