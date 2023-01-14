package mit.shelf.repository.book;

/*
public class MemoryMemberRepository implements BookRepository {
    private static Map<Long, Book> store = new HashMap<>();
    private static long sequence = 0L;

    @Override
    public Book save(Book member) {
        member.setId(++sequence);
        store.put(member.getId(), member);
        return member;
    }

    @Override
    public Optional<Book> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public List<Book> findAll() {
        return new ArrayList<>(store.values());
    }

    @Override
    public Optional<Book> findByName(String name) {
        return store.values().stream()
                .filter(member -> member.getName().equals(name)).findAny();
    }

    public void clearStore() {
        store.clear();
    }
}*/
