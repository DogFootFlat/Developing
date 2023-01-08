package mit.shelf.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import mit.shelf.domain.Book;
import org.springframework.stereotype.Service;

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
    public Book getBookDetail(Long id) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();

        DocumentReference documentReference = firestore.collection("book").document(String.valueOf(id));

        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();

        DocumentSnapshot documentSnapshot = apiFuture.get();

        Book book = null;

        if(documentSnapshot.exists()) {
            book = documentSnapshot.toObject(Book.class);
            return book;
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
