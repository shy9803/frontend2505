import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BooksCreate() {
  const [form, setForm] = useState({
    name: '',
    area1: '',
    area2: '',
    area3: '',
    BOOK_CNT: '',
    owner_nm: '',
    tel_num: ''
  });

  // 주소 관리
  const navigate = useNavigate();

  // 입력하면 함수 호출
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
    .post('http://localhost:9070/books', form)
    .then(() => {
      alert('상품이 등록되었습니다.');
      navigate('/books');
    })
    .catch(err => console.log(err));
  }

  return (
    <section className='listpage booksform'>
      <h3>books 상품 등록</h3>

      <form onSubmit={handleSubmit}>
        <legend>book_store Database 자료 등록</legend>
        <p>
          <label htmlFor='name'>판매처</label>
          <input type='text' id='name' name='name' required onChange={handleChange} value={form.name} placeholder='예) YES24' />
        </p>
        <p>
          <label htmlFor='area1'>지역1</label>
          <input type='text' id='area1' name='area1' required onChange={handleChange} value={form.area1} placeholder='예) 서울, 경기' />
        </p>
        <p>
          <label htmlFor='area2'>지역2</label>
          <input type='text' id='area2' name='area2' required onChange={handleChange} value={form.area2} placeholder='예) 종로, 수원' />
        </p>
        <p>
          <label htmlFor='area3'>지역3</label>
          <input type='text' id='area3' name='area3' required onChange={handleChange} value={form.area3} placeholder='예) 국일관' />
        </p>
        <p>
          <label htmlFor='BOOK_CNT'>책 가격</label>
          <input type='number' id='BOOK_CNT' name='BOOK_CNT' required onChange={handleChange} value={form.BOOK_CNT} placeholder='예) 숫자만 입력해주세요' />
        </p>
        <p>
          <label htmlFor='owner_nm'>주인</label>
          <input type='text' id='owner_nm' name='owner_nm' required onChange={handleChange} value={form.owner_nm} placeholder='예) 홍길동' />
        </p>
        <p>
          <label htmlFor='tel_num'>번호</label>
          <input type='text' id='tel_num' name='tel_num' required onChange={handleChange} value={form.tel_num} placeholder='예) 000-0000-0000' />
        </p>

        <p className='list_btn'>
          <button type='submit'>등록</button>
        </p>
      </form>
    </section>
  );
}

export default BooksCreate;