package mit.shelf.Controller;

import io.swagger.annotations.Api;
import mit.shelf.Form.MemberForm;
import mit.shelf.Form.UserForm;
import mit.shelf.domain.Member;
import mit.shelf.domain.User;
import mit.shelf.repository.LibUserRepository;
import mit.shelf.repository.MemberRepository;
import mit.shelf.repository.UserRepository;
import mit.shelf.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Api(tags = {"API 정보를 제공하는 Controller"})
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class apiController {

    @Autowired
    MemberService memberService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    LibUserRepository libUserRepository;

    @Autowired
    UserRepository userRepository;

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

    @GetMapping(value = "/books")
    public List<Member> BookList() {
        return memberService.findMembers();
    }

    @PutMapping("/books/edit")
    public String updateBook(MemberForm form) {
        Optional<Member> updateUser = memberRepository.findById(form.getId());
        updateUser.ifPresent(book -> {
            book.setName(form.getName());
            book.setBookNum(form.getBookNum());
            book.setBorrower(form.getBorrower());
            book.setUid(form.getUid());
            book.setBookFloor(form.getBookFloor());
            book.setBookCmp(form.getBookCmp());
            memberRepository.save(book);
        });
        return "redirect:/";
    }
}
