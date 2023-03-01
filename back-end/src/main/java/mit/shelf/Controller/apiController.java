package mit.shelf.Controller;

import io.swagger.annotations.Api;
import mit.shelf.repository.BookRepository;
import mit.shelf.repository.LibUserRepository;
import mit.shelf.repository.user.UserRepository;
import mit.shelf.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class apiController {

    @Autowired
    BookService bookService;

    @Autowired
    BookRepository bookRepository;

    @Autowired
    LibUserRepository libUserRepository;

    @Autowired
    UserRepository userRepository;

}
