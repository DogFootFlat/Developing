package mit.shelf.repository;

import mit.shelf.domain.Member;
import mit.shelf.domain.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface LibUserRepository {

    User save(User member);
    Optional<User> findById(Long id);
    List<User> findByName(String name);
    List<User> findAll();
    Optional<User> findByUid(String uid);

    Boolean findByPw(Long id, String pw);

    Optional<User> findByUUid(String uid);

    Optional<User> findByPw(String pw);

    Optional<User> findByUserName(String name);

    Optional<User> findByUidU(String uid);
}
