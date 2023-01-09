package mit.shelf.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import mit.shelf.domain.Book;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FirebaseServiceImpl implements FirebaseService{

    @Override
    public String insertBook(Book book) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<DocumentReference> apiFuture =
                firestore.collection("book").add(book);
        return apiFuture.get().getId();
    }

    @Override
    public List<Book> getBookList() throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = firestore.collection("book").get();
        List<QueryDocumentSnapshot> documents = apiFuture.get().getDocuments();
        List<Book> bookList = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            bookList.add(document.toObject(Book.class));
//            System.out.println(document.getId() + " => " + document.toObject(Book.class));
        }
        return bookList;
    }

    @Override
    public Book getBookDetail(Long id) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();

        DocumentReference documentReference = firestore.collection("book").document(String.valueOf(id));

        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();

        DocumentSnapshot documentSnapshot = apiFuture.get();

        if(documentSnapshot.exists()) {
            return documentSnapshot.toObject(Book.class);
        } else {
            return null;
        }
    }

    @Override
    public String updateBook(Book book) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> apiFuture =
                firestore.collection("book").document(String.valueOf(book.getId())).set(book);
        return apiFuture.get().getUpdateTime().toString();
    }

    @Override
    public String deleteBook(Long id) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> apiFuture =
                firestore.collection("book").document(String.valueOf(id)).delete();
        return "Document id :" + id + " delete";
    }
}
