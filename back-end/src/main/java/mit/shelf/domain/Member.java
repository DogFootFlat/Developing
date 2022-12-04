package mit.shelf.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@Entity
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uid;

    private String smartUid;

    private String name;

    private int bookNum;

    //한권만 대출 가능
    private String borrower;

    @ColumnDefault("0")
    private Long bookCmp;

    @ColumnDefault("1")
    private int bookFloor;

    @ColumnDefault("'X'")
    private String donor;

    private String category;

    private String writer;

    private Long count;

    private String img;

    public String getSmartUid() {
        return smartUid;
    }

    public void setRUid(String SmartUid) {
        this.smartUid = smartUid;
    }

    public String getDonor() {
        return donor;
    }

    public void setDonor(String donor) {
        this.donor = donor;
    }

    @PrePersist
    public void prePersist(){
        this.bookCmp = this.bookCmp == null ? 0 : this.bookCmp;
        this.bookFloor = this.bookFloor == 0 ? 1 : this.bookFloor;
        this.donor = this.donor == null ? String.valueOf('x') : this.donor;
    }

    public Long getBookCmp() {
        return bookCmp;
    }

    public void setBookCmp(Long bookCmp) {
        this.bookCmp = bookCmp;
    }

    public int getBookNum() {
        return this.bookNum;
    }

    public void setBookNum(int bookNum) {
        this.bookNum = bookNum;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBorrower() {
        return borrower;
    }

    public void setBorrower(String borrower) {
        this.borrower = borrower;
    }

    public int getBookFloor() {
        return bookFloor;
    }

    public void setBookFloor(int bookFloor) {
        this.bookFloor = bookFloor;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

    public void setImg(String img) {this.img = img;}

}
