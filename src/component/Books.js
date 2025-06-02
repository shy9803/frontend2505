import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function Books(props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const {setBooksCount} = useContext(AlertContext);

  // 페이지네이션 생성
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 화면표시 게시물 수
  
  // 페이지 계산
  const indexOfLast = currentPage * itemsPerPage; // 현재 페이지 마지막 번호 (예. 1*5, 2페이지*5)
  const indexOfFirst = indexOfLast - itemsPerPage; // 현재 페이지 첫 인덱스 번호

  const currentItems = data.slice(indexOfFirst, indexOfLast); // 현재 페이지 해당부분 만큼만.

  const totalPage = Math.ceil(data.length / itemsPerPage); // 전체 페이지 수(올림 계산)

  let startPage = Math.max(1, currentPage -2); // 시작 번호
  let lastPage = Math.min(totalPage, startPage + 4); // 마지막 번호

  const pageNumbers = Array.from({length: lastPage - startPage + 1}, (_, i) => startPage + i); // 페이지 번호 배열, 동적

  // 리스트 조회
  const loadData = () => {
    axios
    .get('http://localhost:9070/books')
    .then(res => {
      setData(res.data);
      setBooksCount(res.data.length);
    }) //성공시
    .catch(err => console.log(err)); //실패시
  }
  useEffect(() => {loadData();});

  // 리스트 삭제
  const delData = (num) => {
    if(window.confirm('데이터를 삭제하시겠습니까?')) {
      axios
      .delete(`http://localhost:9070/books/${num}`)
      .then(() => {
        alert('삭제가 완료되었습니다.');
        loadData();

        // 삭제 후 페이지 조정
        if((currentPage - 1) * itemsPerPage >= data.length -1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      })
      .catch(err => console.log(err));
    }
  }

  return (
    <section className='listpage books'>
      <h3>교보문고 DB 입력/출력/삭제/수정</h3>
      <p>MySQL DB에 있는 자료를 출력하고, 자료 입력, 삭제, 수정하기를 실습 응용한다.</p>

      <div className='tableheight'>
        <table>
          <caption>book_store Database 자료</caption>
          <thead>
            <tr>
              <th>번호(num)</th>
              <th>판매처(name)</th>
              <th>지역1(area1)</th>
              <th>지역2(area2)</th>
              <th>지역3(area3)</th>
              <th>가격(BOOK_CNT)</th>
              <th>주인(owner_nm)</th>
              <th>전화번호(tel_num)</th>
              <th>버튼</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map(item => ( */}
            {currentItems.map(item => (
              <tr key={item.num}>
                <td>{item.num}</td>
                <td>{item.name}</td>
                <td>{item.area1}</td>
                <td>{item.area2}</td>
                <td>{item.area3}</td>
                <td>{Number(item.BOOK_CNT).toLocaleString()}</td>
                <td>{item.owner_nm}</td>
                <td>{item.tel_num}</td>
                <td>
                  <button type='button' onClick={() => navigate(`/books/update/${item.num}`)}>수정</button>

                  <button type='button' onClick={() => {delData(item.num)}}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지 네이션 */}
      <p className='pagination'>
        {currentPage > 1 && (
          <button type='button' onClick={() => setCurrentPage(currentPage - 1)}>이전</button>
        )}

        {pageNumbers.map(number => (
          <button type='button' key={number} onClick={() => setCurrentPage(number)} style={{
            backgroundColor: currentPage === number ? '#24245e' : '#f0f0f0',
            color: currentPage === number ? '#fff' : '#000'
          }}>{number}</button>
        ))}

        {currentPage < totalPage && (
          <button type='button' onClick={() => setCurrentPage(currentPage + 1)}>다음</button>
        )}
      </p>
      
      <p className='list_btn'>
        <button type='button' onClick={() => navigate('/books/create')}>등록</button>
      </p>
    </section>
  );
}

export default Books;