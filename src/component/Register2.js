import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const Register2 = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    password2: '',
    tel: '',
    email: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  }

  const handleSubmit = async e => {
    e.preventDefault();

    // 비밀번호 일치 확인
    if(form.password !== form.password2) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await axios.post('https://port-0-backend-mbiobig1cd0dc4c0.sel4.cloudtype.app/register2', {
        username: form.username,
        password: form.password,
        tel: form.tel,
        email: form.email
      });

      setSuccess('회원가입이 완료되었습니다.');
      setForm({username: '', password: '', password2: '', tel: '', email: ''});

      // navigate('/login2');
    } catch(err) {
      setError('회원가입 실패 : 아이디가 이미 존재하거나 서버 오류입니다.');
    }
  }

  return (
    <section className='log2'>
      <h2>회원가입</h2>

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor='username'>아이디 : </label>
          <input type='text' name='username' id='username' placeholder='아이디 입력' value={form.username} onChange={handleChange} required />
        </p>
        <p>
          <label htmlFor='password'>패스워드 : </label>
          <input type='password' name='password' id='password' placeholder='패스워드 입력' value={form.password} onChange={handleChange} required />
        </p>
        <p>
          <label htmlFor='password2'>패스워드 확인 : </label>
          <input type='password' name='password2' id='password2' placeholder='패스워드 확인' value={form.password2} onChange={handleChange} required />
        </p>
        <p>
          <label htmlFor='tel'>연락처</label>
          <input type='tel' name='tel' id='tel' placeholder='연락처(000-0000-0000)' value={form.tel} onChange={handleChange} required />
        </p>
        <p>
          <label htmlFor='email'>이메일 주소</label>
          <input type='email' name='email' id='email' placeholder='이메일(id@naver.com)' value={form.email} onChange={handleChange} required />
        </p>

        <p>
          <input type='submit' value='회원가입' />
          <input type='reset' value='가입취소' />
        </p>

        {/* 에러 or 성공 문자 출력 */}
        {error && <p style={{color: 'red', background: 'white'}}>{error}</p>}
        {success && <p style={{color: 'green', background: 'white'}}>{success}</p>}
      </form>
    </section>
  );
}

export default Register2;
