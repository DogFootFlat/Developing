package mit.shelf.Controller;

import mit.shelf.Form.UserForm;
import mit.shelf.domain.User;
import mit.shelf.repository.LibUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
public class UserController {

    @Autowired
    LibUserRepository libUserRepository;

    @GetMapping(value = "/users") public String list(Model model) {
        List<User> users = libUserRepository.findAll();
        model.addAttribute("users", users);
        return "users/userList"; }



    @RequestMapping(value = "/user/LoginSBC/{name}/{pw}", method = RequestMethod.GET)
    @ResponseBody() // JSON
    public Map<String, String> loginSBC(@PathVariable String name,@PathVariable String pw) {
        Optional<User> userN = libUserRepository.findByUserName(name);
        Optional<User> userP = libUserRepository.findByPw(pw);
        Map<String, String> list = new HashMap<>();

        if (userN.isPresent() && userP.isPresent()) {
            User userName = userN.get();
            User userPw = userP.get();
            if (userName.getUid().equals(userPw.getUid())) {
                list.put("result", userName.getUid());
            } else {
                list.put("result", "pwError");
            }
        }
        else if (userN.isPresent() && !(userP.isPresent())) {
            list.put("result", "pwError");
        }
        else {
            list.put("result", "noMember");
        }
        return list;
    }


    @GetMapping(value = "/member/name/{name}")
    @ResponseBody() // JSON
    public String saveUser(@PathVariable String name) {
        User user = new User();
        user.setName(name);
        libUserRepository.save(user);

        return user.getName();
    }

//    @PostMapping(value = "/user/login")
//    public String nweUser(UserForm form, HttpServletRequest request) {
//        Boolean loginSuccess = libUserRepository.findByPw(form.getId(),form.getPw());
//
//        return "redirect:/";
//    }

    @GetMapping(value = "/users/{uid}") public String bookRendList(@PathVariable String uid,Model model) {
        Optional<User> users = libUserRepository.findByUidU(uid);
        model.addAttribute("users", users);
        return "users/userRendList"; }



    @RequestMapping(value = "/user/borrow/{uid}", method = RequestMethod.GET)
    @ResponseBody() // JSON
    public Map<String, String> borrowBook(@PathVariable String uid) {
        Optional<User> members = libUserRepository.findByUidU(uid);
        Map<String, String> list = new HashMap<>();

        if (members.isPresent()) {
            User  user = members.get();
            list.put("borrow1", user.getBorrow1());
            list.put("borrow2", user.getBorrow2());
            list.put("borrow3", user.getBorrow3());

        } else {
            list.put("result", "error");
        }
        return list;
    }


    @PostMapping(value = "/users/new")
    public String createUser(UserForm form) {
        User member = new User();
        member.setName(form.getName());
        member.setPw(form.getPw());
        member.setUid(form.getUid());
        libUserRepository.save(member);
        return "redirect:/user";
    }

    @GetMapping(value = "/users/new") public String createUserForm() {
        return "users/createUserForm";
    }

    @RequestMapping(value = "/user/edit", method = RequestMethod.GET)
    public String updateUserForm(@RequestParam("id") Long id, Model model) {
        Optional<User> user = libUserRepository.findById(id);
        user.ifPresent(selectUser -> {
            model.addAttribute("user", user);
        });
        return "users/editUserForm";
    }

    @PostMapping("/user/edit")
    public String updateUser(UserForm form) {

        Optional<User> updateUser = libUserRepository.findById(form.getId());
        updateUser.ifPresent(user -> {
            user.setName(form.getName());
            user.setUid(form.getUid());
            user.setPw(form.getPw());
            libUserRepository.save(user);
        });
        return "redirect:/";
    }

/*    @RequestMapping(value = "/book/delete", method = RequestMethod.GET)
    public String deleteBook(@RequestParam("uid") Long uid) {
        libUserRepository.deleteById(uid);
        return "/members/memberList";
    }*/
}
