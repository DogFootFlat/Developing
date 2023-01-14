// import React from "react";
// import { post } from "axios";
// import { Link } from "react-router-dom";
// import mformcss from "../css/mform.module.css";

// class CreateMemberForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       bookName: "",
//       bookNumber: "",
//       borrower: "",
//     };
//     this.handleFormSubmit = this.handleFormSubmit.bind(this);
//     this.handleValueChange = this.handleValueChange.bind(this);
//     this.addCustomer = this.addCustomer.bind(this);
//   }

//   handleFormSubmit(e) {
//     e.preventDefault();
//     this.addCustomer().then((response) => {
//       console.log(response.data);
//     });
//   }

//   handleValueChange(e) {
//     let nextState = {};
//     nextState[e.target.name] = e.target.value;
//     this.setState(nextState);
//   }

//   addCustomer() {
//     const url = "http://localhost:8080/members/new";
//     const formData = new FormData();
//     formData.append("name", this.state.bookName);
//     formData.append("bookNum", this.state.bookNumber);
//     formData.append("borrower", this.state.borrower);
//     const config = {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "content-type": "multipart/form-data",
//       },
//     };
//     return post(url, formData, config);
//   }

//   render() {
//     document.body.style.backgroundImage = "none";
//     document.body.style.backgroundColor = "white";
//     return (
//       <div className="CreateMemberForm">
//         <div className={mformcss.container}>
//           <header className={mformcss.common}>
//             <div className={mformcss.subtitle}>
//               <h2>
//                 <Link to={"/"} style={{ color: "#FFF" }}>
//                   HOME
//                 </Link>
//               </h2>
//             </div>
//             <div className={mformcss.topnav}>
//               <ul>
//                 <li style={{ color: "#FFF" }}>&#10217;</li>
//                 <li>
//                   <Link to={"/mform"}>회원 가입</Link>
//                 </li>
//               </ul>
//             </div>
//           </header>
//           <form onSubmit={this.handleFormSubmit}>
//             <div className={mformcss.formGroup}>
//               <label for="name">도서 제목</label>
//               <input
//                 type="text"
//                 id="bookName"
//                 name="bookName"
//                 onChange={this.handleValueChange}
//                 placeholder="제목을 입력하세요"
//               />
//               <label for="bookNum">도서 번호</label>
//               <input
//                 type="text"
//                 id="bookNumber"
//                 name="bookNumber"
//                 onChange={this.handleValueChange}
//                 placeholder="번호를 입력하세요"
//               />
//               <label for="borrower">빌린 사람</label>
//               <input
//                 type="text"
//                 id="borrower"
//                 name="borrower"
//                 onChange={this.handleValueChange}
//                 placeholder="이름을 입력하세요"
//               />
//             </div>
//             <button type="submit">등록</button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default CreateMemberForm;
