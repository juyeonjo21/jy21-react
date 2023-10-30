import { useState } from "react";
import bbangImage from '../assets/images/bbang.jpg';

//function Exam03(){
    const Exam03 = ()=>{
        const [money, setMoney] = useState(0);

        return(
            <>
            <h1>문제 풀어라</h1>
            <img src={bbangImage} width={300} height={200}/>
            <h2>출금 금액 : {money} 원</h2>
            <button className="btn btn-outline-primary ms-2" onClick={()=>{setMoney(money +100000)}}>10만원</button>
            <button className="btn btn-outline-primary ms-2" onClick={()=>{setMoney(money +50000)}}>5만원</button>
            <button className="btn btn-outline-primary ms-2" onClick={()=>{setMoney(money +10000)}}>1만원</button>
            <button className="btn btn-outline-primary ms-2" onClick={()=>{setMoney(0)}}>초기화</button>
            <br/>
            <input type="range" min={0} max={10000000} step={10000} value={money} onChange={e=>setMoney(parseInt(e.target.value))}/>
            <hr/>
            </>
        );
    };

export default Exam03;