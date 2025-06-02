import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login2 = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:9070/login', form);

      localStorage.setItem('token', res.data.token);

      alert('로그인 성공');

      navigate('/');
    } catch(err) {
      setError('로그인 실패 : 아이디나 패스워드를 다시 확인하세요.');
    }
  }

  return (
    <section className='log2'>
      <h2>로그인</h2>

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor='username'>아이디 : </label>
          <input type='text' name='username' id='username' placeholder='아이디 입력' onChange={handleChange} value={form.username} required />
        </p>
        <p>
          <label htmlFor='password'>패스워드 : </label>
          <input type='password' name='password' id='password' placeholder='패스워드 입력' onChange={handleChange} value={form.password} required />
        </p>

        {error && <p style={{color: 'red'}}>{error}</p>}

        <p>
          <input type='submit' value='로그인' />
        </p>

        <p className='log_mnu'>
          {/* 아이디 찾기 | 비번 찾기 |  */}
          <Link to='/id_search2'>아이디 찾기</Link>
          <Link to='/pw_search2'>비번 찾기</Link>
          <Link to='/register2'>회원가입</Link>
        </p>

        <h3>간편가입</h3>
        <ul>
          <li>
            {/* 카카오 로그인(아이콘으로) */}
            <Link to='https://daum.net' title='다음'>
              <img src={`${process.env.PUBLIC_URL}/images/kakao_login.png`} alt='카카오 로그인'></img>
            </Link>
            </li>
          <li>
            {/* 네이버 로그인(아이콘으로) */}
            <Link to='https://naver.com' title='네이버'>
              <img src={`${process.env.PUBLIC_URL}/images/naver_login.png`} alt='네이버 로그인'></img>
            </Link>
            </li>
          <li>
            {/* 구글 로그인(아이콘으로) */}
            <Link to='https://google.com' title='구글'>
              <img src={`${process.env.PUBLIC_URL}/images/google_login.png`} alt='구글 로그인'></img>
            </Link>
            </li>
        </ul>
      </form>

      <div className='log2_info'>
        <p>카카오 로그인 버튼 url : https://developers.kakao.com/tool/resource/login</p>
        <p>네이버 로그인 버튼 url : https://developers.naver.com/docs/login/bi/bi.md</p>

        <h3>프론트엔드(React)에서 처리</h3>
        <ul>
          <li>로그인 폼을 작성하고 '회원가입' 클릭하면 회원가입 페이지로 이동하기</li>
          <li>회원가입시 '아이디(username)', '비밀번호(password)', '전화번호(tel)', '이메일(email)'를 입력하여 회원가입을 할 수 있도록 한다.</li>
          <li>사용자가 '아이디', '패스워드'를 입력하여 '로그인' 버튼 클릭시 서버측에 '인증 요청'</li>
        </ul>

        <h3>백엔드(Node.js + Express)에서 처리</h3>
        <ul>
          <li>사용자가 입력한 id, pw를 POST 방식으로 받아 DB조회하여 일치하는지 여부에 따라 로그인 처리를 하고, JWT 토큰을 발급함</li>
          <li>데이터베이스(MySQL) : 사용자 정보를 저장</li>
          <li>보안 : 비밀번호는 bcrypt로 암호화, JWT로 인증을 유지함</li>
        </ul>

        <h3>용어 설명</h3>
        <ul>
          <li>express : 웹 서버 프레임워크</li>
          <li>cors : 크로스 도메인 요청을 허용</li>
          <li>mysql : MySQL 데이터베이스 연결을 위한 라이브러리 (npm i mysql)</li>
          <li>bcrypt : 사용자가 입력한 패스워드를 해시(hash) 처리 (npm i bcrypt)</li>
          <li>jsonwebtoken : JWT 토큰 생성 및 검증 (npm i jsonwebtoken)</li>
          <li>app : Express 앱 객체 생성</li>
          <li>port : 서버가 열릴 포트 번호(통화하기 위한 상대방의 전화번호와 같다)</li>
          <li>SECRET KEY : JWT 서명 시 사용할 비밀 키</li>
          <li>express.json() : JSON 형식의 요청 본문을 파싱</li>
          <li>cors() : CORS 정책 허용</li>
          <li>bcrypt.compare : 입력한 비밀번호와 DB 비밀번호 비교할 때</li>
        </ul>

        <h3>DB에 입력할 SQL 쿼리문</h3>
        <pre>
          CREATE TABLE users2 (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            tel VARCHAR(255) NOT NULL,
            datetime timestamp NOT nULL DEFAULT current_timestamp()
          );
        </pre>
      </div>
    </section>
  );
}

export default Login2;