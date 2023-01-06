import { Link } from 'react-router-dom'

export default function Headertest() {
  return (
    <div className="header">
      <h1>
        <Link to="/">토익 영단어(고급)</Link>
      </h1>
      <div className="menu">
        <a href="frontend/src/components/Headertest#" className="link">
          단어 추가
        </a>
        <a href="frontend/src/components/Headertest#" className="link">
          Day 추가
        </a>
      </div>
    </div>
  )
}