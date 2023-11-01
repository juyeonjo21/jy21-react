import { useState } from "react";

const Exam09 = ()=>{
    //객체 배열 상태변수
    const [monsters,setMonsters] = useState([
    {no:1,name:"이상해씨",type:"풀"},
    {no:2,name:"파이리",type:"불"},
    {no:3,name:"꼬부기",type:"물"},
    {no:4,name:"피카츄",type:"전기"}
    ]);

    return(
        <>
        <h1>객체 배열의 상태변수</h1>

        {monsters.map((monster,index)=>(
            <div key={monster.no}>
                {index}
                -
                {monster.no}
                -
                {monster.name}
                -
                {monster.type}
            </div>
        ))}
        </>
    )
};
export default Exam09;