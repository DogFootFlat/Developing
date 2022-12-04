package mit.shelf.Form;

public class MemberForm {
    private Long id;
    private String name;
    private String uid;

    private String smartUid;
    private int bookNum;

    private String writer;

    private String category;

    //한권만 대출 가능
    private String borrower;
    private int bookFloor;
    private Long bookCmp;
    private String bonor;

    private Long count;

    private String img;

    public String getSmartUid() {
        return smartUid;
    }

    public void setSmartUid(String smartUid) {
        this.smartUid = smartUid;
    }

    public String getBonor() {
        return bonor;
    }

    public void setBonor(String bonor) {
        this.bonor = bonor;
    }

    public Long getBookCmp() {
        return bookCmp;
    }

    public void setBookCmp(Long bookCmp) {
        this.bookCmp = bookCmp;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {this.category = category;}

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }


    public int getBookFloor() {
        return bookFloor;
    }

    public void setBookFloor(int bookFloor) {
        this.bookFloor = bookFloor;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public int getBookNum() {
        return bookNum;
    }

    public void setBookNum(int bookNum) {
        this.bookNum = bookNum;
    }

    public String getBorrower() {
        return borrower;
    }

    public void setBorrower(String borrower) {
        this.borrower = borrower;
    }


    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
