import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../../ApiService";
import { TextField, Button, Typography, Select, MenuItem } from "@material-ui/core";

const EditBook = (props) => {
  const [books, setBooks] = useState({
    id: "",
    uid: null,
    smartUid: null,
    name: "",
    bookNum : "",
    borrower: "",
    bookCmp: null,
    bookFloor: "",
    donor: "",
    category: "",
    writer: "",
    count: "",
    img: "",
  });

  const fetchBookByIDHandler = useCallback(async () => {
    await ApiService.fetchBookByID()
    ApiService.fetchBookByID(window.localStorage.getItem("bookID"))
      .then((res) => {
        let book = res.data;
        this.setState({
          id: book.id,
          uid: book.uid,
          smartUid: book.smartUid,
          name: book.name,
          bookNum : book.bookNum,
          borrower: book.borrower,
          bookCmp: book.bookCmp,
          bookFloor: book.bookFloor,
          donor: book.donor,
          category: book.category,
          writer: book.writer,
          count: book.count,
          img: book.img,
        });
      })
      .catch((err) => {
        console.log("loadBook() 에러", err);
      });
  });

  useEffect(() => {
    loadBook();
  }, [loadBook]);

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  saveBook = (e) => {
    e.preventDefault();

    let book = {
      name: this.state.name,
      bookNum : this.state.bookNum,
      borrower: this.state.borrower,
      bookFloor: this.state.bookFloor,
      donor: this.state.donor,
      category: this.state.category,
      writer: this.state.writer,
      count: this.state.count,
      img: this.state.img,
    };

    ApiService.editBook(book)
      .then((res) => {
        console.log(book.name + "의 정보가 수정되었습니다.");
        this.props.history.push("/books");
      })
      .catch((err) => {
        console.log("saveBook() 에러", err);
      });
  };

  render() {
    return (
      <div>
        <Typography variant="h6" style={style}>
          도서 편집
        </Typography>

        <form>
          <TextField
            type="text"
            placeholder="Edit your book Title"
            name="name"
            readOnly={true}
            fullWidth
            margin="normal"
            value={this.state.name}
            onChange={this.onChange}
          />
          
          <TextField
            type="number"
            placeholder="Edit your book Number"
            name="bookNum"
            fullWidth
            margin="normal"
            value={this.state.bookNum}
            onChange={this.onChange}
          />

          <TextField
            type="text"
            placeholder="Edit your book borrower"
            name="borrower"
            fullWidth
            margin="normal"
            value={this.state.borrower}
            onChange={this.onChange}
          />

          <TextField
            type="number"
            placeholder="Edit your book Floor"
            name="bookFloor"
            fullWidth
            margin="normal"
            value={this.state.bookFloor}
            onChange={this.onChange}
          />

          <TextField
            type="text"
            placeholder="Edit your book donor name"
            name="donor"
            fullWidth
            margin="normal"
            value={this.state.donor}
            onChange={this.onChange}
          />

          <TextField
            type="text"
            placeholder="Edit your book category"
            name="category"
            fullWidth
            margin="normal"
            value={this.state.category}
            onChange={this.onChange}
          />

          <TextField
            type="text"
            placeholder="Edit your book writer"
            name="writer"
            fullWidth
            margin="normal"
            value={this.state.writer}
            onChange={this.onChange}
          />

          <TextField
            type="number"
            placeholder="Edit your book volume"
            name="count"
            fullWidth
            margin="normal"
            value={this.state.count}
            onChange={this.onChange}
          />

          <TextField
            type="text"
            placeholder="Edit your book img"
            name="img"
            fullWidth
            margin="normal"
            value={this.state.img}
            onChange={this.onChange}
          />

          <Select
            name="img"
            fullWidth
            margin="normal"
            value={this.state.img}
            onChange={this.onChange}
          >
            <MenuItem value={`https://placeimg.com/480/480/any`}>Any</MenuItem>
            <MenuItem value={`https://placeimg.com/480/480/animals`}>Animals</MenuItem>
            <MenuItem value={`https://placeimg.com/480/480/arch`}>Architecture</MenuItem>
            <MenuItem value={`https://placeimg.com/480/480/nature`}>Nature</MenuItem>
            <MenuItem value={`https://placeimg.com/480/480/people`}>People</MenuItem>
            <MenuItem value={`https://placeimg.com/480/480/tech`}>Tech</MenuItem>
          </Select>
          

          <Button variant="contained" color="primary" onClick={this.saveBook}>
            저장
          </Button>
        </form>
      </div>
    );
  }
}

const style = {
  display: "flex",
  justifyContent: "center",
};

export default EditBook;
