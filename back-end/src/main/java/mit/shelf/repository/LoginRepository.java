package mit.shelf.repository;

import mit.shelf.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LoginRepository extends JpaRepository<User,String> {
    @Query(value = "SELECT pw FROM user WHERE name = :name ", nativeQuery = true)
    String compareByUserId(@Param("name") String name);

    @Query(value = "SELECT name FROM user WHERE name = :name ", nativeQuery = true)
    String findByUserName(@Param("name") String name);

    @Query(value = "SELECT id FROM user WHERE name = :name ", nativeQuery = true)
    Long findByUserId(@Param("name") String name);

    @Query(value = "SELECT * FROM user WHERE id = :id ", nativeQuery = true)
    User userNameIdSharing(@Param("id") Long id);


//    @Query(value = "SELECT id,name,pw FROM user WHERE id = :id ", nativeQuery = true)
//    List<User> findByUnum(@Param("id") Long id);

}
