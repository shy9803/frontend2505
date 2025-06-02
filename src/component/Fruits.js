import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function Fruits(props) {
  // 1. 상태 변수 선언
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { setFruitsCount } = useContext(AlertContext);

  // 페이지 번호 저장을 위한 상태 변수 선언
  const [currentPage, setCurrentPage] = useState(1); // 초기값
  const itemsPerPage = 5; // 한 페이지에 보여지는 게시물 개수

  // 페이지 계산 공식 => 현재 게시물 수 56개 / 6개 = 11페이지
  const indexOfLast = currentPage * itemsPerPage;

  // 현재 페이지의 첫 인덱스 번호를 계산 => 10 - 5 = 5
  const indexOfFirst = indexOfLast - itemsPerPage;

  // data 배열 중 현재 페이지에 해당하는 부분만 자름
  // 예: data.slice(5, 10) -> data[5], data[6], data[7], data[8], data[9]만 화면에 표시
  const currentItems = data.slice(indexOfFirst, indexOfLast);
  
  // 전체 페이지 수 const totalPage = Math.ceil(13 / 5) = 3, 무조건 올림
  // 페이지 번호는 게시물이 13개 있는 경우 1,2,3까지 나오도록 한다.
  const totalPage = Math.ceil(data.length / itemsPerPage);

  // 페이지 번호 배열 (1~5 고정, 또는 totalPages까지 제한 가능)
  // const pageNumbers = Array.from({length: Math.min(totalPage, 5)}, (_, i) => i + 1);

  // 시작 번호와 끝 번호를 계산해야 한다.
  let startPage = Math.max(1, currentPage - 2);
  let lastPage = Math.min(totalPage, startPage + 4);
  
  // 페이지 번호 배열 (1~5를 동적으로 변환, 또는 totalPages까지 제한 가능)
  const pageNumbers = Array.from({length: lastPage - startPage + 1}, (_, i) => startPage + i);

  // 2. 상품 리스트 조회(출력)
  // 컴포넌트가 처음 렌더링될 때 useEffect에 의해 데이터를 실행되어 불러오고, 불러온 데이터를 state에 저장함. 이후 데이터가 로드되면 화면에 출력함
  const loadData = () => {
    // React 비동기 통신
    axios
    // DB에서 json 데이터를 불러온다.
    .get('http://localhost:9070/fruits')
    // 성공시 데이터를 변수에 저장
    .then(res => {
      setData(res.data);
      setFruitsCount(res.data.length);
    })
    // 실패시 에러 출력
    .catch(err => console.log(err));
  }

  // 리액트 훅인 useEffect를 사용하여 콤포넌트가 처음 마운트되었을 경우에만 loadData() 함수를 실행함.
  // 리액트의 생명주기 함수인 componentDidmount 함수와 같다고 보면 된다.
  useEffect(() => {loadData();});

  // 리스트 삭제
  const delData = (num) => {
    if(window.confirm('데이터를 삭제하시겠습니까?')) {
      axios
      .delete(`http://localhost:9070/fruits/${num}`)
      .then(() => {
        alert('삭제가 완료되었습니다.');
        loadData(); // 데이터 삭제 후 목록을 다시 갱신해야 한다.

        // 삭제 후 페이지 조정
        // 마지막 페이지에 1개만 남아있고 삭제하면, currentPage가 totalPage보다 커질 수 있다.
        // 이럴 때, 삭제 후 아래와 같이 페이지를 조정하는 것이 UX에 좋다.
        if((currentPage - 1) * itemsPerPage >= data.length -1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      })
      .catch(err => console.log(err));
    }
  }

  return (
    <section className='listpage fruits'>
      <h3>fruit DB 자료</h3>

      <div className='tableheight'>
        <table>
          <caption>fruit Database 자료</caption>
          <thead>
            <tr>
              <th>번호(num)</th>
              <th>과일(name)</th>
              <th>가격(price)</th>
              <th>색상(color)</th>
              <th>생산지(country)</th>
              <th>버튼</th>
            </tr>
          </thead>
          <tbody>
            {/* DB 데이터가 저장된 data 변수를 map 함수로 반복하여 출력을 한다. */}
            {currentItems.map(item => (
            // {data.map(item => (
            <tr key={item.num}>
              <td>{item.num}</td>
              <td>{item.name}</td>
              <td>{Number(item.price).toLocaleString()}</td>
              <td>{item.color}</td>
              <td>{item.country}</td>
              <td>
                <button type='button' onClick={() => {navigate(`/fruits/update/${item.num}`)}}>수정</button>
                <button type='button' onClick={() => {delData(item.num)}}>삭제</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* 페이지 번호가 출력되는 곳 */}
      <p className='pagination'>
        {/* 이전 버튼 들어가는 곳 */}
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>이전</button>
        )}

        {/* 페이지 번호(1,2,3,4,5)가 출력되는 곳 */}
        {pageNumbers.map(number => (
          <button key={number} style={{
            marginRight: '5px', 
            backgroundColor: currentPage === number ? '#d89f4a' : '#f0f0f0',
            color: currentPage === number ? '#fff' : '#000',
            padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px'
          }} onClick={() => setCurrentPage(number)}
          >{number}</button>
        ))}

        {/* 다음 버튼 들어가는 곳 */}
        {currentPage < totalPage && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>다음</button>
        )}
      </p>

      {/* 상품 등록 버튼 */}
      <p className='list_btn'>
        <button type='button' onClick={() => navigate('/fruits/create')}>상품등록</button>
      </p>
    </section>
  );
}

export default Fruits;