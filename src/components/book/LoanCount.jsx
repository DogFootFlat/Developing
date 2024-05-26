import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ApiService from "../../ApiService";
import AuthContext from "../../store/auth-context";
import Card from "../basic/Card";
import LoanFilter from "./LoanFilter";
import LoanChart from "./LoanChart";
import LoanList from "./LoanList";
import Loading from "../basic/Loading";
import { Typography } from "@mui/material";
import loancountcss from "./css/loancount.module.css";

const LoanCount = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredCategory, setFilteredCategory] = useState("all");
  const filterChangeHandler = (selectedCategory) => {
    setFilteredCategory(selectedCategory);
  }

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
    ctx.setCurrentPage("loan-count");
  }, [fetchBooksHandler]);

  const filteredBooks = books;
  if (filteredCategory !== "all") {
    filteredBooks = books.filter((book) => {
      return book.category === filteredCategory;
    });
  }

  let content = <h5>현재 도서 목록이 비어있습니다.</h5>;
  if (books.length > 0) {
    content = (
      <Card className={loancountcss.chart}>
        <LoanFilter
          selected={filteredCategory}
          onChangeFilter={filterChangeHandler}
        />
        <LoanChart books={filteredBooks} />
        <LoanList items={filteredBooks} />
      </Card>
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
    content = <Loading />;
  }

  return (
    <>
      <section>
        <Typography className={loancountcss.typo} variant="h6">
          도서 대여 통계
        </Typography>
      </section>
      {content}
    </>
  );
};

export default LoanCount;
