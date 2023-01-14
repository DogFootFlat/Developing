package mit.shelf.service;

import mit.shelf.domain.Book;
import mit.shelf.repository.BookRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Long join(Book book) {
        //validateDuplicateMember(book); //중복 회원 검증
        bookRepository.save(book);
        return book.getId();
    }

/*    private void validateDuplicateMember(Book member) {
        bookRepository.findByName(member.getName())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }*/

    public List<Book> findMembers() {
        return bookRepository.findAll();
    }

    public Optional<Book> findOne(Long memberId) {
        return bookRepository.findById(memberId);
    }
}
