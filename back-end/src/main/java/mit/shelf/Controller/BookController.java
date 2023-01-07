package mit.shelf.Controller;

import mit.shelf.Form.MemberForm;
import mit.shelf.domain.Book;
import mit.shelf.repository.LibUserRepository;
import mit.shelf.repository.BookRepository;
import mit.shelf.repository.user.UserRepository;
import mit.shelf.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@Controller
public class BookController {

    @Autowired
    BookService bookService;

    @Autowired
    BookRepository bookRepository;

    @Autowired
    LibUserRepository libUserRepository;

    @Autowired
    UserRepository userRepository;

    //같은 함수 존재
    @GetMapping(value = "/books") public String list(Model model) {
        List<Book> books = bookService.findMembers();
        model.addAttribute("members", books);
        return "books/bookList"; }

    @GetMapping(value = "/books/list")
    public String listCheck(Model model) {
        List<Book> books = bookRepository.findAll();
        model.addAttribute("members", books);
        return "books/bookList";
    }

    @GetMapping(value = "/books/errorBookList")
    public String errorBook(Model model){
        List<Book> books = bookService.findMembers();
        Collections.reverse(books);
        model.addAttribute("members", books);

        return "books/eBook";
    }

    @PostMapping(value = "/book/new")
    public String create(MemberForm form) {
        Book book = new Book();
        book.setName(form.getName());
        book.setBookNum(form.getBookNum());
        book.setBorrower(form.getBorrower());
        book.setUid(form.getUid());
        book.setBookFloor(form.getBookFloor());
        book.setBookCmp(form.getBookCmp());
        bookService.join(book);
        return "redirect:/";
    }

    @GetMapping(value = "/books/cmpReset")
    public String bookCmpReset() {
        List<Book> books = bookRepository.findAll();
        for (int i = 0; i < books.size(); i++) {
            Book book = books.get(i);
            book.setBookCmp(0L);
            bookRepository.save(book);
        }
        return "redirect:/";
    }

    @RequestMapping(value = "/book/edit", method = RequestMethod.GET)
    public String bookEdit(@RequestParam("id") Long id, Model model) {
        Optional<Book> member = bookRepository.findById(id);
        member.ifPresent(selectUser -> {
            model.addAttribute("member", member);
        });
        return "books/editBookForm";
    }

    //required 붙여서 무조건 값있도록
    @PostMapping("/book/edit")
    public String updateBook(MemberForm form) {
        Optional<Book> updateUser = bookRepository.findById(form.getId());
        updateUser.ifPresent(book -> {
            book.setName(form.getName());
            book.setBookNum(form.getBookNum());
            book.setBorrower(form.getBorrower());
            book.setUid(form.getUid());
            book.setBookFloor(form.getBookFloor());
            book.setBookCmp(form.getBookCmp());
            bookRepository.save(book);
        });
        return "redirect:/";
    }

    @RequestMapping(value = "/ebook/{uid}", method = RequestMethod.GET)
    public String findErrorBook(@PathVariable String uid) {
        return "";
    }

    @RequestMapping(value = "/book/delete", method = RequestMethod.GET)
    public String deleteBook(@RequestParam("uid") Long uid) {
        bookRepository.deleteById(uid);
        return "books/bookList";
    }

    @GetMapping(value = "/donater")
    public String donater(Model model){
        List<Book> books = bookRepository.findByDonor("test");
        model.addAttribute("members", books);

        return "books/eBook";
    }
}
