import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  //1. 변수선언 상품명, 가격정보
  const {g_code} = useParams(); //받아온 code 파라미터값 변수
  const [form, setForm] = useState({
      g_code: '',
      g_name: '',
      g_cost: ''
    });

  const navigate = useNavigate();

  //2. 서버측에 넘길 데이터(g_code)를 통신해서 성공, 실패여부 출력
  useEffect(()=>{
    axios.get(`backend/goods/${g_code}`)
    //성공이면 출력
    .then(res=>{
      console.log('서버 응답값 : ', res.data);
      setForm(res.data);
    })
    //실패면 오류 메세지
    .catch(err=> console.log('조회 오류 : ', err));

    //console.log('값 잘 전달되는지 확인': g_code);

  },[g_code]);

  //사용자가 입력양식에 데이터를 입력했을 경우 상태 변수에 저장하기
  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  //수정하기 메뉴 클릭시 실행되는 함수
  const handleSubmit=(e)=>{  
    e.preventDefault();

    axios.put(`backend/goods/update/${g_code}`,{
      g_name:form.g_name, //상품명 저장
      g_cost:form.g_cost //상품가격 저장
    })
    .then(()=>{ //통신이 성공하면
      alert('상품정보가 수정 완료되었습니다.');
      navigate('/goods'); //goods페이지로 이동
    })//통신이 실패하면
    .catch(err=> console.log('수정 오류 : ',err));
  }

  return (
    <div className='listpage goodsform'>
      <h3>goods 상품수정 페이지 입니다.</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label for="g_code">코드번호 : </label>
          <input name="g_code" id="g_code" value={form.g_code} readOnly />
        </p>
        <p>
          <label for="g_name">상품명 : </label>
          <input name="g_name" id="g_name" onChange={handleChange} value={form.g_name} required />
        </p>
        <p>
          <label for="g_cost">가격정보 : </label>
          <input name="g_cost" id="g_cost" onChange={handleChange} type='number' value={form.g_cost} required />
        </p>
        
        <p className='list_btn'>
          <button type="submit">수정하기</button>
        </p>
      </form>
    </div>
  );
}

export default Update;
