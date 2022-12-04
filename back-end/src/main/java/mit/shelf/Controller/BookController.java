package mit.shelf.Controller;

import mit.shelf.Form.MemberForm;
import mit.shelf.domain.Member;
import mit.shelf.repository.LibUserRepository;
import mit.shelf.repository.MemberRepository;
import mit.shelf.repository.UserRepository;
import mit.shelf.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@Controller
public class BookController {

    @Autowired
    MemberService memberService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    LibUserRepository libUserRepository;

    @Autowired
    UserRepository userRepository;

    //같은 함수 존재
    @GetMapping(value = "/books") public String list(Model model) {
        List<Member> members = memberService.findMembers();
        model.addAttribute("members", members);
        return "books/bookList"; }

    @GetMapping(value = "/books/list")
    public String listCheck(Model model) {
        List<Member> members = memberRepository.findAll();
        model.addAttribute("members", members);
        return "books/bookList";
    }

    @GetMapping(value = "/books/errorBookList")
    public String errorBook(Model model){
        List<Member> members = memberService.findMembers();
        Collections.reverse(members);
        model.addAttribute("members", members);

        return "books/eBook";
    }

    @PostMapping(value = "/book/new")
    public String create(MemberForm form) {
        Member member = new Member();
        member.setName(form.getName());
        member.setBookNum(form.getBookNum());
        member.setBorrower(form.getBorrower());
        member.setUid(form.getUid());
        member.setBookFloor(form.getBookFloor());
        member.setBookCmp(form.getBookCmp());
        memberService.join(member);
        return "redirect:/";
    }



    @GetMapping(value = "/books/cmpReset")
    public String bookCmpReset() {
        List<Member> members = memberRepository.findAll();
        for (int i = 0; i < members.size(); i++) {
            Member member = members.get(i);
            member.setBookCmp(0L);
            memberRepository.save(member);
        }
        return "redirect:/";
    }

    @RequestMapping(value = "/book/edit", method = RequestMethod.GET)
    public String bookEdit(@RequestParam("id") Long id, Model model) {
        Optional<Member> member = memberRepository.findById(id);
        member.ifPresent(selectUser -> {
            model.addAttribute("member", member);
        });
        return "books/editBookForm";
    }

    //required 붙여서 무조건 값있도록
    @PostMapping("/book/edit")
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

    @RequestMapping(value = "/ebook/{uid}", method = RequestMethod.GET)
    public String findErrorBook(@PathVariable String uid) {
        return "";
    }

    @RequestMapping(value = "/book/delete", method = RequestMethod.GET)
    public String deleteBook(@RequestParam("uid") Long uid) {
        memberRepository.deleteById(uid);
        return "books/bookList";
    }

    @GetMapping(value = "/donater")
    public String donater(Model model){
        List<Member> members = memberRepository.findByDonor("test");
        model.addAttribute("members", members);

        return "members/eBook";
    }
}
