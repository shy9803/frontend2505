import React, { useState, useContext } from 'react'; // React Hooks 상태변수
import axios from 'axios'; // 서버 측과 통신을 위해
import { AlertContext } from '../AlertContext';

const Question = () => {
  // 1. 상태 변수 선언
  // const [변수명, 함수명] = useState({
  //  변수1:'값', 변수2:'값', 변수3:'값', 변수4:'값'
  // });
  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    email: '',
    txtbox: ''
  });

  const { setQuestionCount } = useContext(AlertContext);

  // 2. 입력 양식에 사용자가 입력시 함수 호출
  const handleChange = (e) => {
    const{name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  }

  // 3. 입력 완료 or 전송하기 or send 버튼 클릭시 실행되는 함수
  // 서버 측에 post 방식으로 데이터를 넘기기 위한 내용
  const handleSubmit = async e => {
    e.preventDefault();
    try{ // 데이터 전송 성공시
      await axios.post('https://port-0-backend-mbiobig1cd0dc4c0.sel4.cloudtype.app/question', formData);
      alert('질문이 등록되었습니다.');
      setQuestionCount(count => count + 1); // 숫자 증가

      // 데이터 보내고 나면 변수값 초기화
      setFormData({name: '', tel: '', email: '', txtbox: ''});
    }
    catch{ // 데이터 전송 실패시
      alert('오류가 발생되었습니다.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className='quest_form_out'>
      <section className='question'>
        <h2>정성을 다해 답변을 해드리겠습니다</h2>

        <div className='qform'>
          <div className='left_form'>
            <p>
              <label htmlFor='name'>성함</label>
              <input type='text' name='name' id='name' placeholder='성함을 입력해주세요' value={formData.name} onChange={handleChange} required />
            </p>
            <p>
              <label htmlFor='tel'>전화번호</label>
              <input type='text' name='tel' id='tel' placeholder='전화번호를 입력해주세요' value={formData.tel} onChange={handleChange} required />
            </p>
            <p>
              <label htmlFor='email'>이메일</label>
              <input type='email' name='email' id='email' placeholder='이메일을 입력해주세요' value={formData.email} onChange={handleChange} required />
            </p>
          </div>
          <div className='right_form'>
            <label htmlFor='txtbox'>내용</label>
            <textarea rows='10' cols='50' name='txtbox' id='txtbox' placeholder='내용을 입력해주세요 (최대 300자)' value={formData.txtbox} onChange={handleChange} required 
            maxLength={300} // 300자 제한 추가
            ></textarea>
          </div>
        </div>

        <div className='chkbox'>
          <input type='checkbox' required id='agree' />
          <label htmlFor='agree'>개인정보처리 방침에 동의합니다.</label>
        </div>
      </section>

      <div className='sendbtn'>
        <input type='submit' value='보내기' />
      </div>
    </form>
  );
}

export default Question;
