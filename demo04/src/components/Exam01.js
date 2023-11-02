import { Modal } from "bootstrap/dist/js/bootstrap.esm";
import { useState, useEffect, useRef } from "react";
const Exam01 = () => {
    const [todoList, setTodoList] = useState([
        { no: 1, title: "학원가기", type: "공부" },
        { no: 2, title: "영어단어외우기", type: "공부" },
        { no: 3, title: "헬스장가기", type: "운동" },
        { no: 4, title: "친구만나기", type: "일상" },
    ]);
    const [backup, setBackup] = useState([]);
    const [data, setData] = useState({
        title: "",
        type: ""
    });

    const bsModal = useRef();

    const changeData = e => {
        const newData = {
            ...data,
            [e.target.name]: e.target.value
        };
        setData(newData);
    };

    //백업으로 복제(1회)
    useEffect(() => {
        setBackup(todoList.map(list => {
            const newTodoList = { ...list };
            return newTodoList;
        }));
    }, []);

    //수정
    const changeToEdit = (target) => {
        //console.log(target);

        const newTodoList = todoList.map(list => {
            if (list.no === target.no) {
                return {
                    ...list,
                    edit: true
                };
            }
            return list;
        });

        setTodoList(newTodoList);
    };

    //데이터 변경
    const changeList = (target, e) => {
        const newTodoList = todoList.map(list => {
            if (list.no === target.no) {//같은 번호를 발견한다면
                return {
                    ...list,//나머지 정보는 그대로 두고
                    [e.target.title]: e.target.value
                }
            }
            return list;
        });
        setTodoList(newTodoList);
    };

    //취소
    const cancelList = (target) => {

        //backup에서 target의 번호에 해당하는 객체를 찾는다 (filter)
        const findResult = backup.filter(list => list.no === target.no);
        //console.log(findResult[0]);

        //아이템 변경
        const newTodoList = todoList.map(list => {
            if (list.no === target.no) {//target과 같은 번호의 상품만큼은
                return {
                    ...findResult[0],//다른건 백업데이터로 두고
                    edit: false//edit를 false로 바꿔라
                };
            }
            return list;//나머진 현상유지
        });

        setTodoList(newTodoList);
    };
    const saveList = (target) => {

        //백업 데이터 중 target과 번호가 같은 데이터를 갱신
        const newBackup = backup.map(list => {
            if (list.no === target.no) {//target과 같은 번호의 상품만큼은
                return {
                    ...target,//변경된 데이터로 저장하고
                    edit: false//edit를 false로 바꿔라
                };
            }
            return list;//나머진 현상유지
        });
        setBackup(newBackup);

        //변경
        const newTodoList = todoList.map(list => {
            if (list.no === target.no) {//target과 같은 번호의 상품만큼은
                return {
                    ...list,//다른건 그대로 둬도
                    edit: false//edit를 false로 바꿔라
                };
            }
            return list;//나머진 현상유지
        });

        setTodoList(newTodoList);
    };

    //삭제
    const deleteList = (target) => {
        // 삭제
        const newTodoList = todoList.filter(list => list.no !== target.no);
        setTodoList(newTodoList);

        //백업 삭제
        const newBackup = backup.filter(list => list.no !== target.no);
        setBackup(newBackup);
    };

    const addList = e => {

        const no = todoList.length == 0 ? 1 : todoList[todoList.length - 1].no + 1;

        //내용 추가
        //    const newItems = items.concat({...data});
        const newTodoList = [
            ...todoList,
            {
                ...data,
                edit: false,
                no: no
            }
        ];
        setTodoList(newTodoList);

        //백업 추가
        const newBackup = [
            ...backup,
            {
                ...data,
                edit: false,
                no: no
            }
        ];
        setBackup(newBackup);

        //입력창 초기화
        setData({
            no: "",
            type: ""
        });

        //모달 닫기
        closeModal();
    };

    //모달창 취소 버튼
    const cancelAddList= () => {
        //입력창 초기화
        setData({
            no: "",
            type: ""
        });

        //모달 닫기
        closeModal();
    };

    //모달 여는 함수
    const openModal = () => {
        var modal = new Modal(bsModal.current);//React style
        modal.show();
    };

    //모달 닫는 함수
    const closeModal = () => {
        var modal = Modal.getInstance(bsModal.current);//React style
        modal.hide();
    };




    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1">

                    <div className="p-4 text-light bg-dark rounded mt-2">
                        <h1>일정 관리 프로그램</h1>
                    </div>

                    <div className="row mt-4 text-end">
                        <div className="col">
                            <button type="button" className="btn btn-info"
                                onClick={openModal}>
                                신규등록
                            </button>
                        </div>
                    </div>



                    <div className="row mt-4">
                        <div className="col">
                            <table class="table table-hover" data-bs-theme="light">
                                <thead>
                                    <tr class="table-dark text-center">
                                        <th>번호</th>
                                        <th>제목</th>
                                        <th>분류</th>
                                        <th>ETC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todoList.map((list, index) => (
                                        list.edit ? (
                                            <tr key={list.no} className="table text-center">
                                                <td>{list.no}</td>
                                                <td>
                                                    <input className="form-control" type="text" name="title" value={list.title} onChange={e => changeList(list, e)} />
                                                </td>
                                                <td>
                                                    <input className="form-control" type="text" name="type" value={list.type} onChange={e => changeList(list, e)} />
                                                </td>
                                                <td>
                                                    <button className="btn btn-sm btn-dark"
                                                        onClick={e => cancelList(list)}>취소</button>
                                                    <button className="btn btn-sm btn-success ms-1"
                                                        onClick={e => saveList(list)}>완료</button>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr key={list.no} className="table-success text-center">
                                                <td>{list.no}</td>
                                                <td>{list.title}</td>
                                                <td>{list.type}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-success"
                                                        onClick={e => changeToEdit(list)}>수정</button>
                                                    <button className="btn btn-sm btn-outline-danger ms-1"
                                                        onClick={e => deleteList(list)}>삭제</button>
                                                </td>
                                            </tr>

                                        )

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" ref={bsModal} id="exampleModal"
                tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row mt-4">
                                <div className="col">
                                    <label className="form-label">제목</label>
                                    <input className="form-control" name="title" value={data.title} onChange={changeData} />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label className="form-label">분류</label>
                                    <input className="form-control" name="type" value={data.type} onChange={changeData} />
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            {/* 자동 취소 -추가하면 자동으로 닫힘 */}
                            {/* <button type="button" className="btn btn-dark" data-dismiss="modal">취소</button> */}
                            {/* 수동으로 원하는 로직을 추가하여 닫히게 하는 버튼 */}
                            <button type="button" className="btn btn-secondary"
                                onClick={cancelAddList}>취소</button>
                            <button type="button" className="btn btn-primary ms-2"
                                onClick={addList}>추가</button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default Exam01;