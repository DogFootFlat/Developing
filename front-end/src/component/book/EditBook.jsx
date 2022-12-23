import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../ApiService";
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";

const EditBook = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [books, setBooks] = useState({
    id: "",
    uid: null,
    smartUid: null,
    name: "",
    bookNum: "",
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
    await ApiService.fetchBookByID(location.state.id)
      .then((res) => {
        let book = res.data;
        setBooks({
          id: book.id,
          uid: book.uid,
          smartUid: book.smartUid,
          name: book.name,
          bookNum: book.bookNum,
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
        console.log("fetchBookByIDHandler() Error!", err);
      });
  }, []);

  useEffect(() => {
    fetchBookByIDHandler();
  }, [fetchBookByIDHandler, location]);

  const onChangeHandler = (e) => {
    setBooks({
      [e.target.name]: e.target.value,
    });
    console.log(books[e.target.name]);
  };

  const editBookHandler = (e) => {
    e.preventDefault();

    let book = {
      id: books.id,
      uid: books.uid,
      smartUid: books.smartUid,
      name: books.name,
      bookNum: books.bookNum,
      borrower: books.borrower,
      bookCmp: books.bookCmp,
      bookFloor: books.bookFloor,
      donor: books.donor,
      category: books.category,
      writer: books.writer,
      count: books.count,
      img: books.img,
    };
    console.log(books.id);

    ApiService.editBook(book)
      .then((res) => {
        console.log(book.name + "의 정보가 수정되었습니다.");
        navigate("/books");
      })
      .catch((err) => {
        console.log("editBookHandler() Error!", err);
      });
  };

  return (
    <>
      <Typography variant="h6" style={style}>
        도서 편집
      </Typography>

      <form>
        <TextField
          type="number"
          placeholder="Edit your book ID"
          name="id"
          fullWidth
          margin="normal"
          value={books.id}
          onChange={onChangeHandler}
        />

        <TextField
          type="text"
          placeholder="Edit your book's RFID value"
          name="uid"
          readOnly={true}
          fullWidth
          margin="normal"
          value={books.uid}
          onChange={onChangeHandler}
        />

        <TextField
          type="text"
          placeholder="Edit your book's RFID value for robot"
          name="smartUid"
          readOnly={true}
          fullWidth
          margin="normal"
          value={books.smartUid}
          onChange={onChangeHandler}
        />

        <TextField
          type="text"
          placeholder="Edit your book Title"
          name="name"
          readOnly={true}
          fullWidth
          margin="normal"
          value={books.name}
          onChange={onChangeHandler}
        />

        <TextField
          type="number"
          placeholder="Edit your book Number"
          name="bookNum"
          fullWidth
          margin="normal"
          value={books.bookNum}
          onChange={onChangeHandler}
        />

        <TextField
          type="text"
          placeholder="Edit your book borrower"
          name="borrower"
          fullWidth
          margin="normal"
          value={books.borrower}
          onChange={onChangeHandler}
        />

        <TextField
          type="number"
          placeholder="Edit your book compare result"
          name="bookCmp"
          fullWidth
          margin="normal"
          value={books.bookCmp}
          onChange={onChangeHandler}
        />

        <TextField
          type="number"
          placeholder="Edit your book Floor"
          name="bookFloor"
          fullWidth
          margin="normal"
          value={books.bookFloor}
          onChange={onChangeHandler}
        />

        <TextField
          type="text"
          placeholder="Edit your book donor name"
          name="donor"
          fullWidth
          margin="normal"
          value={books.donor}
          onChange={onChangeHandler}
        />

        <TextField
          type="text"
          placeholder="Edit your book category"
          name="category"
          fullWidth
          margin="normal"
          value={books.category}
          onChange={onChangeHandler}
        />

        <TextField
          type="text"
          placeholder="Edit your book writer"
          name="writer"
          fullWidth
          margin="normal"
          value={books.writer}
          onChange={onChangeHandler}
        />

        <TextField
          type="number"
          placeholder="Edit your book volume"
          name="count"
          fullWidth
          margin="normal"
          value={books.count}
          onChange={onChangeHandler}
        />

        <TextField
          type="text"
          placeholder="Edit your book img"
          name="img"
          fullWidth
          margin="normal"
          value={books.img}
          onChange={onChangeHandler}
        />

        <Select
          name="img"
          fullWidth
          margin="normal"
          value={books.img}
          onChange={onChangeHandler}
        >
          <MenuItem value={`https://placeimg.com/480/480/any`}>Any</MenuItem>
          <MenuItem value={`https://placeimg.com/480/480/animals`}>
            Animals
          </MenuItem>
          <MenuItem value={`https://placeimg.com/480/480/arch`}>
            Architecture
          </MenuItem>
          <MenuItem value={`https://placeimg.com/480/480/nature`}>
            Nature
          </MenuItem>
          <MenuItem value={`https://placeimg.com/480/480/people`}>
            People
          </MenuItem>
          <MenuItem value={`https://placeimg.com/480/480/tech`}>Tech</MenuItem>
        </Select>

        <Button variant="contained" color="primary" onClick={editBookHandler}>
          저장
        </Button>
      </form>
    </>
  );
};

const style = {
  display: "flex",
  justifyContent: "center",
};

export default EditBook;
