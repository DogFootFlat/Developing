package mit.shelf.Controller.Api;

import mit.shelf.Form.UserForm;
import mit.shelf.domain.User;
import mit.shelf.repository.LibUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    @Autowired
    LibUserRepository libUserRepository;

    @GetMapping(value = "/users")
    public List<User> UserList() {
        return libUserRepository.findAll(); }

    @PutMapping("/users/{id}")
    public Map<String, String> updateUser(UserForm form, @PathVariable Long id) {
        Optional<User> updateUser = libUserRepository.findById(id);
        updateUser.ifPresent(user -> {
            user.setName(form.getName());
            user.setUid(form.getUid());
            user.setPw(form.getPw());
            libUserRepository.save(user);
        });
        Map<String, String> list = new HashMap<>();
        list.put("result", "success");
        return list;
    }

    @PostMapping(value = "/users")
    public Map<String, String> createUser(UserForm form) {
        User member = new User();
        member.setName(form.getName());
        member.setPw(form.getPw());
        member.setUid(form.getUid());
        libUserRepository.save(member);
        Map<String, String> list = new HashMap<>();
        list.put("result", "success");
        return list;
    }
}
