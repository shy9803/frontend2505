import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // 1. 상태 변수 선언
  // const [변수명, 함수명] = useState('초기값');
  const [form, setForm] = useState({
    username: '', // 아이디를 저장하기 위한 변수
    password: '' // 패스워드를 저장하기 위한 변수
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  // 2. 입력시 발생되는 함수
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  // 3. 로그인 버튼 클릭시 실행되는 함수
  const handleSubmit = async e => { //비동기 통신
    e.preventDefault();
    // console.log(form.username, form.password);

    try { // 성공시 실행 내용
      const res = await axios.post('http://localhost:9070/login', form);
      
      // 사용자 인증이 끝나면 '토큰'을 발급한다.
      localStorage.setItem('token', res.data.token);

      alert('로그인 성공');
      navigate('/')

    } catch(err) { // 실패시 실행 내용
      // alert('로그인 실패');
      setError('로그인 실패 : 아이디와 패스워드를 다시 확인하세요.');
    }
  }

  return (
    <section className='login_form'>
      <h2>로그인 폼</h2>

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor='username'>아이디 : </label>
          <input type='text' id='username' name='username' placeholder='아이디' required onChange={handleChange} value={form.username} />
        </p>
        <p>
          <label htmlFor='password'>패스워드 : </label>
          <input type='password' id='password'  name='password' placeholder='패스워드' required onChange={handleChange} value={form.password} />
        </p>

        <p>
          <input type='submit' value='로그인' />
        </p>

        {error && <p style={{color: 'red'}}>{error}</p>}

        <p className='btn-group'>
          <Link to='/id_search'>아이디 찾기</Link>&#10072;
          <Link to='/pw_search'>비밀번호 찾기</Link>&#10072;
          <Link to='/register'>회원가입</Link>
        </p>

        {/* 카카오 API 로그인 */}

      <dl>
        <dt>로그인 구현 전체 구성</dt>
        <dd>프론트엔드(React) : 로그인 폼 작성, 로그인 버튼 클릭시 서버에 인증 요청</dd> {/* DB에 인증요청 */}
        <dd>백엔드(Node.js + Express) : 로그인 처리, JWT 토큰 발급</dd>
        {/* 백엔드 구축: Node.js(React 설치에 필수 + 백엔드 서버 구축), express : 프론트엔드가 보낸 데이터 통신을 위함  */}
        <dd>데이터베이스(MySQL) : DB 입/출력</dd>
        <dd>보안 : 비밀번호는 bcrypt로 암호화, JWT로 인증을 유지</dd>
      </dl>

      <pre>
        1. 데이터베이스 테이블 설계 (member, members) <br />
        CREATE TABLE users(
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )

        <br /><br />

        2. 데이터베이스에 회원정보 입력하기 (INSERT INTO) <br />
        INSERT INTO users VALUES(1, 'jeon', '1234', '2025-05-26');
        INSERT INTO users VALUES(2, 'jeon1', '1234', '2025-05-26');
        INSERT INTO users VALUES(3, 'jeon2', '1234', '2025-05-26');
        INSERT INTO users VALUES(4, 'jeon3', '1234', '2025-05-26');
        INSERT INTO users VALUES(5, 'jeon4', '1234', '2025-05-26');

        <br /><br />

        3. UI화면 설계 - 로그인 폼 구현
      </pre>

      </form>
    </section>
  );
}

export default Login;