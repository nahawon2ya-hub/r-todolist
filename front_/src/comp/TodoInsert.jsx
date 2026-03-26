import React, { useState } from 'react'
import todoStore from '../store/TodoStore';

function TodoInsert() {
    const {save} = todoStore(); //프론트저장
    const [ip,setIp] = useState('');//input에 value를 넣으려면 무조건 useState를 써야함(수정에 용의함), ip에 input내용이 들어있음.

    function handleSubmit(e){
        e.preventDefault();
        if(!ip){
            alert('내용을 입력하세요.');
            return;
        }

        const today = new Date();
        const date = new Intl.DateTimeFormat('ko-KR',{
            year:'numeric',
            month:'2-digit',
            day:'2-digit',
            hour:'2-digit',
            minute:'2-digit',
            second:'2-digit'
        }).format(today).replace(/[가-힣]+/,'T').replaceAll(' ','');      

        save( {content:ip, date, isdone:false} ) //프론트저장
        //console.log( today.toISOString() );
        .then(()=>{
            setIp('');
            alert('저장완료');
        })
    }

    return (
        <div className='insert'>
            <form onSubmit={e=>handleSubmit(e)}>
                <input type="text" value={ip} onChange={e=>setIp(e.target.value)}/> {/* ip변수가 input에 작성한 내용을 가지고 있음. */}
                <button>추가</button>
            </form>
        </div>
    )
}

export default TodoInsert;