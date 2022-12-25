package mit.shelf.Controller.Api;

import mit.shelf.Form.MemberForm;
import mit.shelf.domain.Book;
import mit.shelf.repository.BookRepository;
import mit.shelf.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.json.simple.JSONObject;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BookApiController {

    @Autowired
    BookService bookService;

    @Autowired
    BookRepository bookRepository;

    JSONObject result = new JSONObject();

    @GetMapping(value = "/books")
    public List<Book> bookList() {
        return bookService.findMembers();
    }

    @GetMapping(value = "/books/{id}")
    public Optional<Book> book(@PathVariable Long id) {
        return bookRepository.findById(id);
    }

    @PutMapping("/books/{id}")
    public JSONObject edit(MemberForm form, @PathVariable Long id) {
        Optional<Book> Book = bookRepository.findById(id);
        Book.ifPresent(book -> {
            book.setName(form.getName());
            book.setBookNum(form.getBookNum());
            book.setBorrower(form.getBorrower());
            book.setUid(form.getUid());
            book.setRUid(form.getSmartUid());
            book.setDonor(form.getDonor());
            book.setBookFloor(form.getBookFloor());
            book.setBookCmp(form.getBookCmp());
            book.setCategory(form.getCategory());
            book.setImg(form.getImg());
            book.setWriter(form.getWriter());
            book.setCount(form.getCount());
            bookRepository.save(book);
        });
        result.put("result", "success");
        return result;
    }

    @PostMapping(value = "/books")
    public JSONObject create(MemberForm form) {
        Book book = new Book();
        book.setName(form.getName());
        book.setBookNum(form.getBookNum());
        book.setBorrower(form.getBorrower());
        book.setUid(form.getUid());
        book.setRUid(form.getSmartUid());
        book.setDonor(form.getDonor());
        book.setBookFloor(form.getBookFloor());
        book.setBookCmp(form.getBookCmp());
        book.setCategory(form.getCategory());
        book.setImg(form.getImg());
        book.setWriter(form.getWriter());
        book.setCount(form.getCount());

        bookService.join(book);
        result.put("result", "success");
        return result;
    }

    @DeleteMapping(value = "/books/{id}")
    public JSONObject deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
        result.put("result", "success");
        return result;
    }
}
