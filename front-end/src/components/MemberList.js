import React  from 'react';
import { Link } from 'react-router-dom';
import mlistcss from '../css/mlist.module.css';

function MemberList() {
	document.body.style.backgroundImage = 'none';
  document.body.style.backgroundColor = 'white';
  return (
	<div className="MamberList">
		<div className={mlistcss.container}>
			<header className={mlistcss.common}>
				<div className={mlistcss.subtitle}>
					  <h2><a href="http://localhost:8080/">HOME</a></h2>
				</div>
				<div className={mlistcss.topnav}>
					<ul>
						<li>&#10217;</li>
						<li><Link to={'/mlist'}>회원 목록</Link></li>
					</ul>
				</div>
			</header>
			<h2>엑셀파일로 업로드</h2>
			<form action="" method="POST" enctype="">
				<input type="file" name="file"/>
				<input type="submit" value="제출" />
			</form>

			<table>
				<thead>
				<tr>
					<th>#</th>
					<th>책제목</th>
					<th>책이 있는 층</th>
					<th>빌린 사람</th>
					<th>책 UID</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>가</td>
					<td>나</td>
					<td>다</td>
					<td>라</td>
					<td>마</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
  );
}

export default MemberList;
