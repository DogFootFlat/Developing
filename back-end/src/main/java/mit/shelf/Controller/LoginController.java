package mit.shelf.Controller;

import mit.shelf.domain.User;
import mit.shelf.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {
    @Autowired
    LoginRepository LoginRepository;

    @PostMapping(value = "/logins") public String logins(@RequestParam(value = "name") String name, @RequestParam(value = "pw") String pw, Model model) {
        String result1 = LoginRepository.compareByUserId(name);
        String result2 = LoginRepository.findByUserName(name);
        Long result3 = LoginRepository.findByUserId(name);
        if(pw.equals(result1)){
            model.addAttribute("loginGo", result2);
            model.addAttribute("loginGo2", result3);
            if(result2.equals("admin")){
                return "/start";
            }
            return "/client";
        }
        return "/login2";
    }
    @GetMapping(value = "/nameSharing") public String nameSharing(@RequestParam(value = "id") Long id, @RequestParam(value = "num") String num, Model model) {
        User result1 = LoginRepository.userNameIdSharing(id);
        model.addAttribute("loginGo", result1.getName());
        model.addAttribute("loginGo2", result1.getId());
        if (num.equals("1")){
            return "/myborrow";
        }
        else if (num.equals("2")) {
            return "/borrow";
        }
        return "/client";
    }




}
