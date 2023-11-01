import { useState } from "react";

const Exam10 = () => {
    const [product, setProduct] = useState([

        { itemNo: 1, itemName: "포켓몬스터빵", itemPrice: 500, itemType: "식품" },
        { itemNo: 2, itemName: "허니버터칩", itemPrice: 1300, itemType: "식품" },
        { itemNo: 3, itemName: "참이슬후레시", itemPrice: 2200, itemType: "주류" },
        { itemNo: 4, itemName: "카스", itemPrice: 2500, itemType: "주류" },
        { itemNo: 5, itemName: "테라", itemPrice: 1300, itemType: "주류" },
        { itemNo: 6, itemName: "켈리", itemPrice: 1400, itemType: "주류" },
        { itemNo: 7, itemName: "처음처럼", itemPrice: 2000, itemType: "주류" },
        { itemNo: 8, itemName: "오징어땅콩", itemPrice: 3500, itemType: "식품" },
        { itemNo: 9, itemName: "신라면", itemPrice: 1500, itemType: "식품" },
        { itemNo: 10, itemName: "하리보젤리", itemPrice: 5500, itemType: "식품" }
    ]);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="p-4 text-light bg-dark rounded" data-bs-theme="light">
                        <h1>객체 배열 예제</h1>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <table className="table" data-bs-theme="light">
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>상품명</th>
                                        <th>판매가</th>
                                        <th>분류</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.map((p, index) => (
                                        <tr key={p.itemNo}>
                                            <td>{index + 1}</td>
                                            <td>{p.itemName}</td>
                                            <td>{p.itemPrice}원</td>
                                            <td>{p.itemType}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
};
export default Exam10;