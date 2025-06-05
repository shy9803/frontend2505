import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function Goods(props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { setGoodsCount } = useContext(AlertContext); // 상태 전역 변수

  // 0. 페이지 상태 변수 선언
  const [currentPage, setCurrentPage] = useState(1); // 초기값 1
  const itemsPerPage = 5; // 한 페이지에 보여지는 게시물 수

  //1. 상품 리스트 조회(출력)
  const loadData=()=>{
    //React비동기 통신
    axios
    //DB에서 json데이터를 불러온다.
    .get('https://backend:9070/goods')
    //성공시 데이터를 변수에 저장
    .then(res=>{
      setData(res.data);
      setGoodsCount(res.data.length);
    })
    //실패시 에러 출력
    .catch(err=>console.log(err))
  }

  useEffect(()=>{
    loadData();
  });

  //2. 상품 삭제
  const deleteData = (g_code) => { //전달받은 g_code값을 가지고  backend로 넘김
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios //서버에 DELETE 요청 전송
        .delete(`https://backend:9070/goods/${g_code}`)
        //성공일때 아래 내용 실행
        .then(() => {
          alert('삭제되었습니다.');
          loadData(); // 데이터 삭제 후 목록을 다시 갱신해야 한다.

        // 삭제 후 페이지 조정
        if((currentPage - 1) * itemsPerPage >= data.length -1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
        })
        //실패일때 에러 출력
        .catch(err => console.log(err));
    }
  };

  //3. 페이지네이션 계산    현재 게시물 수 50개 / 7 (= 7 ... 1) => 8페이지
  // 현재 페이지의 마지막 인덱스 번호 2*5=10 10번째 아이템까지 보여주겠다는 뜻
  const indexOfLast = currentPage * itemsPerPage;
  // 현재 페이지의 첫 인덱스 번호를 계산 10 - 5 =5, 5번째부터 9번째 아이템까지 보여준다 (slice는 끝 인덱스 미포함)
  const indexOfFirst = indexOfLast - itemsPerPage;
  // data 배열 중 현재 페이지에 해당하는 부분만 잘라낸다.
  // 예: data.slice(5, 10) -> data[5], data[6], data[7], data[8], data[9]만 화면에 표시.
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  // 전체 페이지 수 totalPage   totalPages = Math.ceil(13 / 5) = 3, 무조건 올림
  // 페이지 번호는 게시물이 13개 있는 경우 1,2,3까지 나오도록 한다.
  const totalPage = Math.ceil(data.length / itemsPerPage);

  // 시작, 끝 번호
  let startPage = Math.max(1, currentPage - 2);
  let lastPage = Math.min(totalPage, startPage + 4);

  // 4. 페이지 번호 배열 (1~5고정, 또는 totalPages까지 제한 가능)
  // const pageNumber = Array.from({length: Math.min(totalPage, 5)}, (_, i) => i + 1);
  const pageNumber = Array.from({length: lastPage - startPage + 1}, (_, i) => startPage + i);

  return (
    <section className='listpage goods'>
      <h2>Goods페이지</h2>
      <dl>
        <dt>기능 추가 사항</dt>
        <dd>1. create메뉴 : 새로운 페이지로 이동하여 자료 입력할 수 있도록 함.</dd>
        <dd>2. update메뉴 : 수정페이지로 이동하여 자료 수정할 수 있도록 함.</dd>
        <dd>3. delete메뉴 : 해당 id값에 일치하는 자료 삭제 요청(axios.delete)</dd>
        <dd>4. 삭제 후 목록 다시 불러오기(자동 갱신)</dd>
        <dd>5. 페이지네이션(Pagination)<br />
          페이지네이션(Pagination)은 웹이나 앱에서 많은 양의 데이터를 페이지 단위로 나눠서 보여주는 방식으로, 사용자가 콘텐츠를 쉽게 탐색하고 관리할 수 있도록 돕는 UI 디자인 기법이다.
          데이터가 많을 때 한 번에 모든 데이터를 보여주지 않고, 페이지별로 나누어 보여줌으로써 사용자 경험을 향상시키고 '서버의 부담'을 줄일 수 있다.
        </dd>
      </dl>

      <h4>페이지네이션의 주요 기능</h4>
      <ul>
        <li>데이터 분할: 많은 양의 데이터를 여러 페이지로 나누어 보여준다.</li>
        <li>페이지 이동: 페이지 번호 링크를 통해 사용자가 원하는 페이지를 볼 수 있다.</li>
        <li>현재 페이지 표시: 현재 사용자가 보고 있는 페이지를 강조 표시(굵게)하여 사용자가 현재 위치를 쉽게 파악할 수 있다.</li>
        <li>페이지간 이동: 이전 페이지, 다음 페이지 등으로 이동할 수 있는 링크 기능을 제공한다.</li>
        <li>페이지당 게시물 개수 조정: 사용자가 원하는 페이지당 항목 수를 선택할 수 있도록 옵션을 제공할 수 있다.</li>
        <li>페이지네이션은 사용자의 경험 향상, 서버 부담 감소, UI 디자인의 단순화 장점이 있다.</li>
      </ul>

      <div className='tableheight'>
        <table>
          <caption>Goods Data</caption>
          <thead>
            <tr>
              <th>g_code(코드번호)</th>
              <th>g_name(상품명)</th>
              <th>g_cost(상품가격)</th>
              <th>메뉴</th>
            </tr>
          </thead>
          <tbody>
            {
              currentItems.map(item=>(
              // data.map(item=>(
                <tr key={item.g_code}>
                  <td>{item.g_code}</td>
                  <td>{item.g_name}</td>
                  {/* 가격 정보에 천 단위 구분기호(,)를 추가 */}
                  <td>{Number(item.g_cost).toLocaleString()}</td>
                  <td>
                    <button onClick={() => navigate(`/goods/update/${item.g_code}`)}>수정</button>

                    &nbsp;
                    
                    <button onClick={()=>{deleteData(item.g_code)}}>삭제</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* 페이지 번호 나오게 */}
      <div className='pagination'>
        {currentPage > 1 && (
          <button type='button' onClick={() => setCurrentPage(currentPage - 1)}>이전</button>
        )}

        {/* 페이지 번호 */}
        {pageNumber.map(number => (
          <button key={number} 
          onClick={() => setCurrentPage(number)} 
          style={{
            backgroundColor: currentPage === number ? '#4caf50' : '#f0f0f0',
            color: currentPage === number ? '#fff' : '#000',
          }}>
            {number}
          </button>
        ))}

        {currentPage < totalPage && (
          <button type='button' onClick={() => setCurrentPage(currentPage + 1)}>다음</button>
        )}
      </div>

      <p className='list_btn'>
        {/* 클릭시 URL 주소에 http://localhost:3000/goods/create 나오게 하기 위함 */}
        <button onClick={() => navigate('/goods/create')}>상품 등록</button>
      </p>
    </section>
  );
}

export default Goods;
