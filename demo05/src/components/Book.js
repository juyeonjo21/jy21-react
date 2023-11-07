import { useEffect, useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { Modal } from "bootstrap";
import "./Book.css";

const Book = (props) => {
    const [bookList, setBookList] = useState([]);

    const loadBook = () => {
        axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/`,
            method: "get"
        })
            .then(response => {
                // console.log(response);
                setBookList(response.data);
            })
            .catch(err => { });
    }
    useEffect(() => {
        loadBook();
    }, []);


    const deleteBook = (book) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;


        //서버에 있는 도서 정보를 불러와서 state에 반영하는 코드
        axios({
            // url: "http://localhost:8080/book/"+book.bookId,
            url: `${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`, //jsp에서 못 씀
            method: "delete"
        })
            .then(response => {
                loadBook();
            })
            .catch(err => { });

    };

    //modal 관련된 처리
    const bsModal = useRef();
    const openModal = () => {
        const modal = new Modal(bsModal.current);
        modal.show();
    };

    const closeModal = () => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();

        clearBook();
    };

    //등록과 관련된 state
    const [book, setBook] = useState({
        bookTitle: "",
        bookAuthor: "",
        bookPublicationDate: "",
        bookPrice: "",
        bookPublisher: "",
        bookPageCount: "",
        bookGenre: "",
    });
    const changeBook = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    };

    const clearBook = () => {
        setBook({
         bookTitle: "", bookAuthor: "", bookPublicationDate: "",
            bookPrice: "", bookPublisher: "", bookPageCount: "", bookGenre: "",
        });
    };

    //axios로 서버에 등록 요청을 보낸 뒤 등록이 성공하면 목록을 갱신하도록 처리
    const saveBook = () => {
        //입력값 검사 후 차단 코드 추가

        axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/`,
            method: "post",
            data: book
        })
            .then(response => {//성공했다면
                loadBook();//목록을 갱신하고
                closeModal();//모달을 닫아라
            })
            .catch(err => { }); //실패시 콜백
    };

    //async 함수와 await 키워드를 사용한 간소화 작업이 가능
    //- 비동기 작업을 동기화된 코드로 작성할 수 있다
    // const saveBook = async()=>{
    //     const response = await axious({
    //         url:`${process.env.REST_API_URL}/book/`,
    //         method:"post",
    //         data:book
    //     });
    //     loadBook();//목록을 갱신하고
    //     closeModal();//모달을 닫아라
    // };



    const editBook = (target) => {
        setBook({ ...target });//깊은복사하고
        openModal();//모달을 열어라
    };

    //도서 수정 처리
    const updateBook = () => {
        //검사 후 차단 처리

        const { bookId, bookTitle, bookAuthor, bookPublicationDate,
            bookPrice, bookPublisher, bookPageCount, bookGenre } = book;

        axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/${bookId}`,
            method: "put",
            data: {
                bookTitle: bookTitle,
                bookAuthor: bookAuthor,
                bookPublicationDate: bookPublicationDate,
                bookPrice: bookPrice,
                bookPublisher: bookPublisher,
                bookPageCount: bookPageCount,
                bookGenre: bookGenre
            }
        })
            .then(response => {
                loadBook();
                closeModal();
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
            {/* 도서등록 버튼 */}
            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-success" onClick={openModal}>
                        <AiOutlinePlus />등록
                    </button>
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
                                            <LiaEdit className="text-warning ms-1" onClick={e => editBook(book)} />
                                            {/* 삭제버튼 */}
                                            <AiFillDelete className="text-danger ms-1" onClick={e => deleteBook(book)} />
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                <div className="modal fade" ref={bsModal}
                    tabindex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {book.bookId === undefined ? '추가' : `${book.bookId}번 도서 수정`}
                                </h5>
                                <button type="button" className="border-0 bg-transparent" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label">제목</label>
                                        <input type="text" name="bookTitle" className="form-control"
                                            value={book.bookTitle} onChange={changeBook} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label className="form-label">저자</label>
                                        <input type="text" name="bookAuthor" className="form-control"
                                            value={book.bookAuthor} onChange={changeBook} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label className="form-label">출간일</label>
                                        <input type="text" name="bookPublicationDate" className="form-control"
                                            value={book.bookPublicationDate} onChange={changeBook} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label className="form-label">판매가</label>
                                        <input type="text" name="bookPrice" className="form-control"
                                            value={book.bookPrice} onChange={changeBook} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label className="form-label">출판사</label>
                                        <input type="text" name="bookPublisher" className="form-control"
                                            value={book.bookPublisher} onChange={changeBook} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label">페이지수</label>
                                        <input type="text" name="bookPageCount" className="form-control"
                                            value={book.bookPageCount} onChange={changeBook} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label">장르</label>
                                        <input type="text" name="bookGenre" className="form-control"
                                            value={book.bookGenre} onChange={changeBook} />
                                    </div>
                                </div>


                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-dark" onClick={closeModal}>닫기</button>
                                {book.bookId === undefined ?
                                    <button className="btn btn-success" onClick={saveBook}>저장</button>
                                    :
                                    <button className="btn btn-success" onClick={updateBook}>수정</button>
                                }

                            </div>

                        </div>
                    </div>
                </div>
            
                </>
            );

};

export default Book;