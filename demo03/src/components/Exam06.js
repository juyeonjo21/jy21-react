import { useState } from "react";

const Exam06 = () => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("남자");

    return (
        <>
            <h1>상태변수가 객체인 경우</h1>

            이름 <input type="text" value={name} onChange={e => setName(e.target.value)} /><br /><br />
            성별
            <select value={gender} onSelect={e => setGender(e.target.value)}>
                <option>남자</option>
                <option>여자</option>
            </select>
            <hr />
        </>
    );
};

export default Exam06;