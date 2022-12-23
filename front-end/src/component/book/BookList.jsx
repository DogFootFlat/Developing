import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../ApiService";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Typography } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import bookscss from "./css/books.module.css";

const BookList = (props) => {
  const [books, setBooks] = useState([]);
  const [fileName, setFileName] = useState([]);

  const fetchBooksHandler = useCallback(async () => {
    await ApiService.fetchBooks()
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log("fetchBooksHandler() Error!", err);
      });
  }, []);

  useEffect(() => {
    fetchBooksHandler();
  }, [fetchBooksHandler]);

  async function deleteBook(bookID) {
    ApiService.deleteBook(bookID)
      .then((res) => {
        console.log("Book Deleted Successfully.");
        setBooks(books.filter((book) => book.id !== bookID));
      })
      .catch((err) => {
        console.log("deleteBook() Error!", err);
      });
  }

  const onChangeHandler = (e) => {
    setFileName(e.target.value);
  };

  return (
    <>
      <Typography className={bookscss.typo} variant="h6">
        엑셀파일로 업로드
      </Typography>

      <form enctype="multipart/form-data">
        <div className={bookscss.filebox}>
          <label for="file">파일찾기</label>
          <input
            className={bookscss["upload-name"]}
            value={fileName}
            placeholder="첨부파일"
            style={{ padding: "0 7px" }}
          />
          <input
            id="file"
            type="file"
            onChange={onChangeHandler}
          />
          <Button
            className={bookscss.submit}
            type="submit"
            variant="contained"
            color="primary"
          >
            제출
          </Button>
        </div>
      </form>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">img</TableCell>
            <TableCell align="right">BookName</TableCell>
            <TableCell align="right">번호</TableCell>
            <TableCell align="right">borrower</TableCell>
            <TableCell align="right">비교</TableCell>
            <TableCell align="right">층</TableCell>
            <TableCell align="right">donor</TableCell>
            <TableCell align="right">장르</TableCell>
            <TableCell align="right">writer</TableCell>
            <TableCell align="right">count</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell component="th" scope="book">
                {book.id}
              </TableCell>
              <TableCell align="right">
                <img className={bookscss.img} src={book.img} alt="Book Img" />
              </TableCell>
              <TableCell align="right">{book.name}</TableCell>
              <TableCell align="right">{book.bookNum}</TableCell>
              <TableCell align="right">{book.borrower}</TableCell>
              <TableCell align="right">{book.bookCmp}</TableCell>
              <TableCell align="right">{book.bookFloor}</TableCell>
              <TableCell align="right">{book.donor}</TableCell>
              <TableCell align="right">{book.category}</TableCell>
              <TableCell align="right">{book.writer}</TableCell>
              <TableCell align="right">{book.count}</TableCell>
              <TableCell align="right">
                <Link to="/edit-book" state={{ id: book.id }}>
                  <CreateIcon />
                </Link>
              </TableCell>
              <TableCell
                align="right"
                className={bookscss.delicon}
                onClick={() => deleteBook(book.id)}
              >
                <DeleteIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default BookList;