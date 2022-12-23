package mit.shelf.Controller;

import io.swagger.annotations.Api;
import mit.shelf.repository.BookRepository;
import mit.shelf.repository.LibUserRepository;
import mit.shelf.repository.UserRepository;
import mit.shelf.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Api(tags = {"API 정보를 제공하는 Controller"})
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
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
