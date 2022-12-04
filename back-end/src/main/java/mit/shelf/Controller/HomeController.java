package mit.shelf.Controller;

import java.util.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import mit.shelf.domain.Member;
import mit.shelf.domain.User;
import mit.shelf.repository.LibUserRepository;
import mit.shelf.repository.MemberRepository;

import mit.shelf.repository.UserRepository;
import mit.shelf.repository.eBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping(value = "/main")
    public String main() {
        return "main";
    }

    @GetMapping(value = "/book/new")
    public String createForm() {
        return "books/createMemberForm";
    }

    @GetMapping(value = "/book/donateBook")
    public String donateBook() {
        return "books/donateBook";
    }

    @GetMapping(value = "/borrow")
    public String borrow() {
        return "borrow";
    }

    @GetMapping(value = "/myborrow")
    public String myborrow() {
        return "myborrow";
    }

    @GetMapping("/user")
    public String userHome() {
        return "userHome";
    }

    @GetMapping(value = "/client")
    public String client() {
        return "client";
    }

    @GetMapping(value = "/login")
    public String login(){
        return "/login";
    }

    @GetMapping(value = "/login2")
    public String login2(){
        return "/login2";
    }

    @GetMapping(value = "/admin")
    public String admin() {
        return "start";
    }

    @GetMapping(value = "/adminLogin")
    public String adminLogin(){
        return "/adminLogin";
    }

    @GetMapping(value = "/userinsert")
    public String userinsert(){
        return "/userinsert";
    }

    @GetMapping(value = "/userupdate")
    public String userupdate(){
        return "/userupdate";
    }

    @GetMapping(value = "/userdelete")
    public String userdelete(){
        return "/userdelete";
    }


}
