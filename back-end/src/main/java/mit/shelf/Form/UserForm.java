package mit.shelf.Form;

public class UserForm {

    private Long id;

    private String pw;

    private String name;

    private String donate;

    private String borrow1;
    private String borrow2;

    private String borrow3;

    private String uid;

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

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        this.pw = pw;
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

    public String getBorrow1() {
        return borrow1;
    }

    public void setBorrow1(String borrow1) {
        this.borrow1 = borrow1;
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
}
