import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function BooksUpdate() {
  const {num} = useParams(); // 받은 파라미터값
  const [form, setForm] = useState({
    num: '',
    name: '',
    area1: '',
    area2: '',
    area3: '',
    BOOK_CNT: '',
    owner_nm: '',
    tel_num: ''
  });

  const navigate = useNavigate();

  // 넘길 데이터 통신 성공/실패 출력
  useEffect(() => {
    axios
    .get(`http://localhost:9070/books/${num}`)
    .then(res => {
      console.log('서버 응답값 : ', res.data);
      setForm(res.data);
    })
    .catch(err => console.log('조회 오류 : ', err));
  }, [num]);

  // 양식 입력한 경우 저장
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  }

  // 수정하기 메뉴 클릭시 실행
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
    .put(`http://localhost:9070/books/update/${num}`, {
      name: form.name,
      area1: form.area1,
      area2: form.area2,
      area3: form.area3,
      BOOK_CNT: form.BOOK_CNT,
      owner_nm: form.owner_nm,
      tel_num: form.tel_num
    })
    .then(() => {
      alert('수정이 완료되었습니다.');
      navigate('/books');
    })
    .catch(err => console.log('수정 오류 : ', err));
  }

  return (
    <section className='listpage booksform'>
      <h3>books 상품 수정 페이지</h3>

      <form onSubmit={handleSubmit}>
        <legend>book_store Database 자료 수정</legend>
        <p>
          <label htmlFor='num'>번호</label>
          <input type='number' id='num' name='num' readOnly value={form.num} />
        </p>
        <p>
          <label htmlFor='name'>판매처</label>
          <input type='text' id='name' name='name' required onChange={handleChange} value={form.name} />
        </p>
        <p>
          <label htmlFor='area1'>지역1</label>
          <input type='text' id='area1' name='area1' required onChange={handleChange} value={form.area1} />
        </p>
        <p>
          <label htmlFor='area2'>지역2</label>
          <input type='text' id='area2' name='area2' required onChange={handleChange} value={form.area2} />
        </p>
        <p>
          <label htmlFor='area3'>지역3</label>
          <input type='text' id='area3' name='area3' required onChange={handleChange} value={form.area3} />
        </p>
        <p>
          <label htmlFor='BOOK_CNT'>책 가격</label>
          <input type='number' id='BOOK_CNT' name='BOOK_CNT' required onChange={handleChange} value={form.BOOK_CNT} />
        </p>
        <p>
          <label htmlFor='owner_nm'>주인</label>
          <input type='text' id='owner_nm' name='owner_nm' required onChange={handleChange} value={form.owner_nm} />
        </p>
        <p>
          <label htmlFor='tel_num'>전화번호</label>
          <input type='text' id='tel_num' name='tel_num' required onChange={handleChange} value={form.tel_num} />
        </p>

        <p className='list_btn'>
          <button type='submit'>수정</button>
        </p>
      </form>
    </section>
  );
}

export default BooksUpdate;