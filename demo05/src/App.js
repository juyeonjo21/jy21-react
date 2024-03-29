import { NavLink, Routes, Route } from "react-router-dom";
import Pocketmon from "./components/Pocketmon";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Book from "./components/Book";
import BookInfinite from "./components/BookInfinite";

function App() {
  return (
    <div className="container-fluid my-5 py-5">
      {/* 상단 메뉴 영역 */}
      <Menu/>
      {/* <div>
        <NavLink to="/">홈</NavLink>
        <NavLink to="/pocketmon">포켓몬스터</NavLink>
        <NavLink to="/book">도서</NavLink>
      </div> */}

      {/* 본문 영역 */}
      <div className="row">
        <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/pocketmon" element={<Pocketmon/>}></Route>
          <Route path="/book" element={<Book/>}></Route>
          <Route path="/book2" element={<BookInfinite/>}></Route>
        </Routes>
        </div>
      </div>

    </div>
  );
}

export default App;