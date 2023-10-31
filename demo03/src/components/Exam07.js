import { useState } from "react";

const Exam07=()=>{
  
    const [member, setMember] = useState({
        memberId : "",
        memberPw : "",
        memberPwRe : "Pw"
    });

    
    const changeInfo = e=>{
        setMember({
            ...member,
            [e.target.name] : e.target.value
        });
    };


    return(
        
        <>
            <h2>회원가입</h2>

            <h4>아이디</h4>
            <input name="memberId" onInput={changeInfo}/>

            <h4>비밀번호</h4>
            <input name="memberPw" onInput={changeInfo}/>

            <h4>비밀번호 확인</h4>
            <input name="memberPwRe" onInput={changeInfo}/>

        </>

);
};
export default Exam07;