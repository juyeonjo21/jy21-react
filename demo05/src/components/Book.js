import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";
import axios from "axios";

import "./Book.css";

const Book = (props) => {
    const [bookList, setBookList] = useState([]);

    const loadDeleteBook = () => {
        axios({
            url: "http://localhost:8080/book/",
            method: "get"
        })
            .then(response => {
                // console.log(response);
                setBookList(response.data);
            })
            .catch(err => { });
    }
    useEffect(() => {
        loadDeleteBook();
    }, []);


    const deleteBook = (book) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;


        //서버에 있는 도서 정보를 불러와서 state에 반영하는 코드
        axios({
            // url: "http://localhost:8080/book/"+book.bookId,
            url: `http://localhost:8080/book/${book.bookId}`, //jsp에서 못 씀
            method: "delete"
        })
            .then(response => {
                loadDeleteBook();
            })
            .catch(err => { });

     };
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
                                            <AiFillDelete className="text-danger ms-1" onClick={deleteBook} />
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