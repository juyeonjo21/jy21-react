import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { LiaEdit } from "react-icons/lia";
import axios from "axios";

import "./Book.css";

const Book = (props) => {
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        //서버에 있는 도서 정보를 불러와서 state에 반영하는 코드
        axios({
            url: "http://localhost:8080/book/",
            method: "get"
        })
            .then(response => {
                // console.log(response);
                setBookList(response.data);
            })
            .catch(err => {
                window.alert("통신 오류 발생");
            });
    }, []);
    return (
        <>
            <div className="row">
                <div className="col">
                    <h1>도서 관리 화면</h1>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="pc-only">No.</th>
                                <th>도서명</th>
                                <th className="pc-only">저자</th>
                                <th>출간일</th>
                                <th className="pc-only">판매가</th>
                                <th>출판사</th>
                                <th>페이지수</th>
                                <th>장르</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map((book, index) => (
                                <tr key={book.bookId}>
                                    <td className="pc-only">{book.bookId}</td>
                                    <td className="pc-only">{book.bookTitle}</td>
                                    <td className="pc-only">{book.bookAuthor}</td>
                                    <td>{book.bookPublicationDate}</td>
                                    <td className="pc-only">{book.bookPrice}</td>
                                    <td>{book.bookPublisher}</td>
                                    <td>{book.bookPageCount}</td>
                                    <td>{book.bookGenre}</td>
                                    <td>
                                        {/* 아이콘 자리 */}
                                        {/* 수정버튼 */}
                                        <LiaEdit className="text-warning ms-1" />
                                        {/* 삭제버튼 */}
                                        <FaXmark className="text-danger ms-1" />
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>

    );

};

export default Book;