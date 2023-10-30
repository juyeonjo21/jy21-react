import { useState } from "react";

const Exam04 = ()=>{
    const [inputText, setInputText] = useState('');

    const maxLength = 1000;

const onTextareaHandler = (e) => {
    const text = e.target.value;

if (text.length <= maxLength) {
    setInputText(text);
  }
};
    return(
        <>
        <h1>10/30 과제풀기</h1>
        <hr/>
        <h3>(Q) 주말에 뭐하세요?</h3>
        <textarea className="form-input w-50" rows={10} value={inputText} onChange={onTextareaHandler}/>
        <br/>
        <p>
            <span>{inputText.length}</span>
            <span>/1000 byte</span>
        </p>
        </>
    );
};

export default Exam04;
