// import React from "react";
// import { post } from "axios";
// import { Link } from "react-router-dom";
// import donatecss from "../css/donate.module.css";
// import donateB from "../img/bookS.png";

// class BookDonate extends React.Component {
//   //document.body.style.backgroundImage = 'none';
//   //document.body.style.backgroundColor = 'white';

//   constructor(props) {
//     super(props);
//     this.state = {
//       bookName: "",
//       bonor: "",
//     };
//     this.handleFormSubmit = this.handleFormSubmit.bind(this);
//     this.handleValueChange = this.handleValueChange.bind(this);
//     this.addCustomer = this.addCustomer.bind(this);
//   }

//   handleFormSubmit(e) {
//     e.preventDefault();
//     this.addCustomer().then((response) => {
//       console.log(response.data);
//       if (response.data === "success") {
//         alert("도서 입력 성공");
//         var bookNameV = document.getElementById("bookName");
//         bookNameV.value = "";
//         var bonorV = document.getElementById("bonor");
//         bonorV.value = "";
//       }
//     });
//   }

//   handleValueChange(e) {
//     let nextState = {};
//     nextState[e.target.name] = e.target.value;
//     this.setState(nextState);
//   }

//   addCustomer() {
//     const url = "http://localhost:8080/book/donate";
//     const formData = new FormData();
//     formData.append("name", this.state.bookName);
//     formData.append("bonor", this.state.bonor);
//     const config = {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "content-type": "multipart/form-data",
//       },
//     };
//     return post(url, formData, config);
//   }

//   render() {
//     return (
//       <div className="CreateMemberForm">
//         <div className={donatecss.container}>
//           <header className={donatecss.common}>
//             <div className={donatecss.subtitle}>
//               <h2>
//                 <a href="http://localhost:8080/">HOME</a>
//               </h2>
//             </div>
//             <div className={donatecss.topnav}>
//               <ul>
//                 <li style={{ color: "#FFF" }}>&#10217;</li>
//                 <li>
//                   <Link to={"/mform"}>도서 기부</Link>
//                 </li>
//               </ul>
//             </div>
//           </header>
//           <img src={donateB} alt="도서 기부 기준" />
//           <form onSubmit={this.handleFormSubmit}>
//             <div className={donatecss.formGroup}>
//               <label for="name">도서 제목</label>
//               <input
//                 type="text"
//                 id="bookName"
//                 name="bookName"
//                 onChange={this.handleValueChange}
//                 placeholder="책 제목"
//               />
//               <label for="bonor">성함</label>
//               <input
//                 type="text"
//                 id="bonor"
//                 name="bonor"
//                 onChange={this.handleValueChange}
//                 placeholder="기부 하시는 분 성함"
//               />
//             </div>
//             <button type="submit">등록</button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default BookDonate;
