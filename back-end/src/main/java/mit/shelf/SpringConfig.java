package mit.shelf;

import mit.shelf.repository.BookRepository;
import mit.shelf.service.BookService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    private final BookRepository bookRepository;
    public SpringConfig(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Bean
    public BookService memberService() {
        return new BookService(bookRepository);
    }

}
