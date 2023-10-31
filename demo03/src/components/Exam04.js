import { useEffect, useState } from "react";

const Exam04 = () => {
    const [inputText, setInputText] = useState('');
    const [length, setLength] = useState(0);

    // state끼리 의존성이 생기는 경우가 있다
    //- content가변하면 length가 변해야 한다
    //- 수동이 아니라 자동으로 변하도록 설정할 수 있다
    //=> iseEffect 훅 사용

    //- useEffect(gkatn,[감지항목]);
    useEffect(() => {
        setLength(inputText.length);
    }, [inputText]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1">

                    <div className="row">
                        <div className="col">
                            <h1>네 번째 예제</h1>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col">
                            <h2>(Q) 주말에 뭐하세요?</h2>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col">
                            <textarea name="inputText" className="form-control" rows={6} value={inputText} onChange={e => setInputText(e.target.value)} />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col text-end">
                            {inputText.length}/1000
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Exam04;
