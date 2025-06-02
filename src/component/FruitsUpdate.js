import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function FruitsUpdate(props) {
  const {num} = useParams();
  const [form, setForm] = useState({
      num:'',
      name: '',
      price: '',
      color: '',
      country: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
    .get(`http://localhost:9070/fruits/${num}`)
    .then(res => {
      console.log('서버 응답값 : ', res.data);
      setForm(res.data);
    })
    .catch(err => console.log('조회 오류 : ', err));
  }, [num]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
    .put(`http://localhost:9070/fruits/update/${num}`, {
      name: form.name,
      price: form.price,
      color: form.color,
      country: form.country
    })
    .then(() => {
      alert('수정이 완료되었습니다.');
      navigate('/fruits');
    })
    .catch(err => console.log('수정 오류 : ', err));
  }

  return (
    <section className='listpage fruitsform'>
      <h3>fruit DB 자료 수정</h3>

      <form onSubmit={handleSubmit}>
        <legend>fruit Database 자료 수정</legend>
        <p>
          <label htmlFor='num'>번호</label>
          <input type='number' name='num' value={form.num} id='num' onChange={handleChange} readOnly />
        </p>
        <p>
          <label htmlFor='name'>과일</label>
          <input type='text' name='name' value={form.name} id='name' onChange={handleChange} required />
        </p>
        <p>
          <label htmlFor='price'>가격</label>
          <input type='number' name='price' value={form.price} id='price' onChange={handleChange} required />
        </p>
        <p>
          <label htmlFor='color'>색상</label>
          <input type='text' name='color' value={form.color} id='color' onChange={handleChange} required />
        </p>
        <p>
          <label htmlFor='country'>원산지</label>
          <select id='country' name='country' value={form.country} onChange={handleChange} required>
            <option value=''>원산지를 선택하세요</option>
            <option value='대한민국'>대한민국</option>
            <option value='필리핀'>필리핀</option>
            <option value='중국'>중국</option>
            <option value='미국'>미국</option>
            <option value='일본'>일본</option>
            <option value='말레이시아'>말레이시아</option>
            <option value='마닐라'>마닐라</option>
            <option value='태국'>태국</option>
          </select>
        </p>

        <p className='list_btn'>
          <button type='submit'>수정</button>
        </p>
      </form>
    </section>
  );
}

export default FruitsUpdate;