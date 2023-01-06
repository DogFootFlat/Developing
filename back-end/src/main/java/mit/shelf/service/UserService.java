package mit.shelf.service;

import mit.shelf.domain.User;
import mit.shelf.repository.LoginRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class UserService {
    private final LoginRepository loginRepository;

    public UserService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public User insert(User user) {
        return loginRepository.save(user);
    }

    public User update(User user) {
        return loginRepository.save(user);
    }

}
