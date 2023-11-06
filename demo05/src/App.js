import { NavLink, Routes, Route } from "react-router-dom";
import Pocketmon from "./components/Pocketmon";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Book from "./components/Book";

function App() {
  return (
    <div className="container-fluid">
      {/* 상단 메뉴 영역 */}
      <Menu/>
      {/* <div>
        <NavLink to="/">홈</NavLink>
        <NavLink to="/pocketmon">포켓몬스터</NavLink>
        <NavLink to="/book">도서</NavLink>
      </div> */}

      {/* 본문 영역 */}
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/pocketmon" element={<Pocketmon/>}></Route>
          <Route path="/book" element={<Book/>}></Route>
        </Routes>
      </div>

    </div>
  );
}

export default App;