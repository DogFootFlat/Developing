package mit.shelf.Controller;

import mit.shelf.domain.User;
import mit.shelf.repository.LoginRepository;
import mit.shelf.repository.UserCRUDRepository;
import mit.shelf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserInUpDelController {
    @Autowired
    LoginRepository LoginRepository;
    @Autowired
    UserCRUDRepository userCRUDRepository;
    @Autowired
    private UserService userService;


    @GetMapping(value = "/insert") public String userinsert(@RequestParam(value = "insertname") String name, @RequestParam(value = "insertpw") String pw) {
        User user = new User();
        user.setName(name);
        user.setPw(pw);
        userCRUDRepository.save(user);
        return "/main";
    }

    @GetMapping(value = "/update")
    public String userupdate(@RequestParam(value = "id") String id, @RequestParam(value = "updatename") String name, @RequestParam(value = "updatepw") String pw) {
        User user = userCRUDRepository.findUserById(Long.valueOf(id));
        user.setName(name);
        user.setPw(pw);
        userCRUDRepository.save(user);
        return "/start";
        /*if (userCRUDRepository.findById(Long.valueOf(id)).isEmpty()){
            return "입력한 회원번호가 존재하지 않습니다.";
        }
        else {
            userCRUDRepository.save(User.builder().id(Long.valueOf(id)).name(name).pw(pw).build());
            return "/start";
        }*/
    }

    @GetMapping(value = "/delete")
    public String userdelete(@RequestParam(value = "id") String id) {
        User user = userCRUDRepository.findUserById(Long.valueOf(id));
        userCRUDRepository.delete(user);
        return "/start";
        /*
        if (userCRUDRepository.findById(Long.valueOf(id)).isEmpty()){
            return "입력한 회원번호가 존재하지 않습니다.";
        }
        else {
            userCRUDRepository.delete(User.builder().id(Long.valueOf(id)).build());
            return "/start";
        }
        */
    }





}
