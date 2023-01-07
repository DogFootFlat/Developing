import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ApiService from "../../ApiService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import bookscss from "./css/books.module.css";

const BookList = () => {
  const navigate = useNavigate();
  
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState([]);

  const fetchBooksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.fetchBooks();
      if (response.status < 200 || response.status > 299) {
        throw new Error("Something went wrong!");
      }
      const data = await response.data;
      setBooks(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchBooksHandler();
  }, [fetchBooksHandler]);

  const deleteBookHandler = async (bookID) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.deleteBook(bookID);
      if (response.status < 200 || response.status > 299) {
        throw new Error("Something went wrong!");
      }
      setBooks(books.filter((book) => book.id !== bookID));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const moveToEditBookHandler = (bookId) => {
    navigate("/edit-book", {
      state: {
        id: bookId,
      },
    });
  };

  const onChangeHandler = (e) => {
    setFileName(e.target.value);
  };

  let content = <h5>현재 도서 목록이 비어있습니다.</h5>;
  if (books.length > 0) {
    content = (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={bookscss.idCell}>ID</TableCell>
            <TableCell align="center">이미지</TableCell>
            <TableCell>도서명</TableCell>
            <TableCell>도서번호</TableCell>
            <TableCell>빌린 사람</TableCell>
            <TableCell>비교 결과</TableCell>
            <TableCell>도서 위치</TableCell>
            <TableCell>기부자</TableCell>
            <TableCell>장르</TableCell>
            <TableCell>작가</TableCell>
            <TableCell>도서 수</TableCell>
            <TableCell align="center">편집</TableCell>
            <TableCell align="center">삭제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell
                className={bookscss.idCell}
                component="th"
                scope="book"
              >
                {book.id}
              </TableCell>
              <TableCell>
                <img className={bookscss.img} src={book.img} alt="Book Img" />
              </TableCell>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.bookNum}</TableCell>
              <TableCell>{book.borrower}</TableCell>
              <TableCell>{book.bookCmp}</TableCell>
              <TableCell>{book.bookFloor}</TableCell>
              <TableCell>{book.donor}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.writer}</TableCell>
              <TableCell>{book.count}</TableCell>
              <TableCell className={bookscss.iconCell}>
                <CreateIcon
                  className={bookscss.hover}
                  onClick={() => moveToEditBookHandler(book.id)}
                />
              </TableCell>
              <TableCell className={bookscss.iconCell}>
                <DeleteIcon
                  className={bookscss.hover}
                  onClick={() => deleteBookHandler(book.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  if (error) {
    content = (
      <div>
        <p>{error}</p>
      </div>
    );
  }
  if (isLoading) {
    content = (
      <div style={{ marginTop: "10em" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Typography className={bookscss.typo} variant="h6">
        엑셀파일로 업로드
      </Typography>

      <form encType="multipart/form-data">
        <div className={bookscss.filebox}>
          <label htmlFor="file">파일찾기</label>
          <input
            className={bookscss["upload-name"]}
            value={fileName}
            placeholder="첨부파일"
            style={{ padding: "0 7px" }}
            onChange={onChangeHandler}
          />
          <input id="file" type="file" onChange={onChangeHandler} />
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
      {content}
    </>
  );
};

export default BookList;
