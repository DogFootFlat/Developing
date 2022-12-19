// import React, { useState, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom";
// import ApiService from "../../ApiService";

// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import CreateIcon from "@material-ui/icons/Create";
// import DeleteIcon from "@material-ui/icons/Delete";
// import bookscss from './css/books.module.css';

// const style = {
//   display: "flex",
//   justifyContent: "center",
//   fontSize: "24px",
// };

// function BookList() {
//   const [books, setBooks] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState('');

//   const fetchBooksHandler = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await ApiService.fetchBooks();
//       if (!response.ok) {
//         throw new Error('Something went wrong!');
//       }

//       const data = await response.data;
//       const loadedBooks = [];

//       for (const key in data) {
//         loadedBooks.push({
          
//         })
//       }
//     }
//   })

//   async function reloadBookList () {
//     const res = await ApiService.fetchBooks()
//     .catch((err) => {
//       console.log("reloadBookList() Error!", err);
//     });
//     setBooks(res.data);
//   };

//   async function deleteBook(bookID) {
//     const res = await ApiService.deleteBook(bookID) {
//       method: 'POST'
//     });
//     setMessage("Book Deleted Successfully.");
//     setBooks(books.filter((book) => book.id !== bookID));
//   };

//   const editBook = (ID) => {
//     window.localStorage.setItem("userID", ID);
//     this.props.history.push("/edit-user");
//   };

//   const addBook = () => {
//     window.localStorage.removeItem("userID");
//     this.props.history.push("/add-user");
//   };

//   return (
//     <>
//       <div className={bookscss.container}>
//         <header className={bookscss.common}>
//           <div className={bookscss.subtitle}>
//             <h2>
//               <a href="http://localhost:8081/">HOME</a>
//             </h2>
//           </div>
//           <div className={bookscss.topnav}>
//             <ul>
//               <li>&#10217;</li>
//               <li>
//                 <Link to={"/mlist"}>회원 목록</Link>
//               </li>
//             </ul>
//           </div>
//         </header>
//         <Typography variant="h2" style={style}>엑셀파일로 업로드</Typography>
//         <form action="" meTableCellod="POST" enctype="">
//           <input type="file" name="file" />
//           <input type="submit" value="제출" />
//         </form>

//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>#</TableCell>
//               <TableCell>책제목</TableCell>
//               <TableCell>책이 있는 층</TableCell>
//               <TableCell>빌린 사람</TableCell>
//               <TableCell>책 UID</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow>
//               <TableCell>가</TableCell>
//               <TableCell>나</TableCell>
//               <TableCell>다</TableCell>
//               <TableCell>라</TableCell>
//               <TableCell>마</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </div>
//     </>
//   );
// };

// export default BookList;
