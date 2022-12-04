package mit.shelf.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uid;

    private String pw;

    private String name;

    private String donate;

    @ColumnDefault("'X'")
    private String borrow1;
    @ColumnDefault("'X'")
    private String borrow2;
    @ColumnDefault("'X'")
    private String borrow3;

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDonate() {
        return donate;
    }

    public void setDonate(String donate) {
        this.donate = donate;
    }

    public String getBorrow2() {
        return borrow2;
    }

    public void setBorrow2(String borrow2) {
        this.borrow2 = borrow2;
    }

    public String getBorrow3() {
        return borrow3;
    }

    public void setBorrow3(String borrow3) {
        this.borrow3 = borrow3;
    }

    public String getBorrow1() {
        return borrow1;
    }

    public void setBorrow1(String borrow) {
        this.borrow1 = borrow;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        this.pw = pw;
    }
}
