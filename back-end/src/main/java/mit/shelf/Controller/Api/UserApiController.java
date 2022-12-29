package mit.shelf.Controller.Api;

import mit.shelf.Form.UserForm;
import mit.shelf.domain.User;
import mit.shelf.repository.LibUserRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserApiController {

    @Autowired
    LibUserRepository libUserRepository;

    JSONObject result = new JSONObject();

    @GetMapping(value = "/users")
    public List<User> UserList() {
        return libUserRepository.findAll(); }

    @GetMapping(value = "/users/{id}")
    public Optional<User> findUser(@PathVariable Long id) {
        return libUserRepository.findById(id);
    }

    @PutMapping("/users/{id}")
    public Map<String, String> editUser(UserForm form, @PathVariable Long id) {
        Optional<User> User = libUserRepository.findById(id);
        User.ifPresent(user -> {
            user.setName(form.getName());
            user.setPw(form.getPw());
            user.setUid(form.getUid());
            user.setDonate(form.getDonate());
            user.setBorrow1(form.getBorrow1());
            user.setBorrow2(form.getBorrow2());
            user.setBorrow3(form.getBorrow3());
            libUserRepository.save(user);
        });
        result.put("result", "success");
        return result;
    }

    @PostMapping(value = "/users")
    public Map<String, String> createUser(UserForm form) {
        User user = new User();
        user.setName(form.getName());
        user.setPw(form.getPw());
        user.setUid(form.getUid());
        user.setDonate(form.getDonate());
        user.setBorrow1(form.getBorrow1());
        user.setBorrow2(form.getBorrow2());
        user.setBorrow3(form.getBorrow3());
        libUserRepository.save(user);
        result.put("result", "success");
        return result;
    }

    @DeleteMapping(value = "/users/{id}")
    public JSONObject deleteUser(@PathVariable Long id) {
        libUserRepository.deleteById(id);
        result.put("result", "success");
        return result;
    }
}
