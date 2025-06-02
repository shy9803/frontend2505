import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AlertProvider, AlertContext } from './AlertContext';
import React from 'react';

import './css/App.css';
// Components Menu
import Main from './component/Main';
import Goods from './component/Goods';
import Books from './component/Books';
import Fruits from './component/Fruits';
import Question from './component/Question';
import Login from './component/Login';
import Login2 from './component/Login2';
// Goods
import Create from './component/Create';
import Update from './component/Update';
// Books
import BooksUpdate from './component/BooksUpdate';
import BooksCreate from './component/BooksCreate';
// Fruits
import FruitsUpdate from './component/FruitsUpdate';
import FruitsCreate from './component/FruitsCreate';
// 회원가입
import Register from './component/Register';
import Register2 from './component/Register2';

// CSS
import './css/ListPage.css';
import './css/ListPageColor.css';
import './css/Question.css';
import './css/Login.css';
import './css/Register.css';
import './css/Log2.css';

function AppContent() {
  const { questionCount, goodsCount, booksCount, fruitsCount } = React.useContext(AlertContext);

  return (
    <>
      <BrowserRouter> {/* 브라우저의 라우터 범위를 설정 */}
        <header>
          <h1>Frontend 세팅 - React + MySQL(메인페이지)</h1>
          {/* 
            localhost:3000 === index.html
            localhost:9070/goods 
          */}
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/goods'>Goods {goodsCount > 0 && (
                // <span style={{display: 'inline-block',marginLeft: 6,background: 'red',color: 'white',borderRadius: '50%',width: '22px',height: '22px',fontSize: '14px',textAlign: 'center',lineHeight: '22px',fontWeight: 'bold'}}>
                <span className='num_count'>{goodsCount}</span>
              )}</Link></li>
              <li><Link to='/books'>Books {booksCount > 0 && (
                <span className='num_count'>{booksCount}</span>
              )}</Link></li>
              <li><Link to='/fruits'>Fruits {fruitsCount > 0 && (
                <span className='num_count'>{fruitsCount}</span>
              )}</Link></li>
              <li><Link to='/question'>Question {questionCount > 0 && (
                <span className='num_count'>
                  {questionCount}
                </span>
                )}</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/login2'>Login2</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path='/' element={<Main />} />
            {/* goods */}
            <Route path='/goods' element={<Goods />} />
            <Route path='/goods/update/:g_code' element={<Update />} />
            <Route path='/goods/create' element={<Create />} />
            {/* book_store */}
            <Route path='/books' element={<Books />} />
            <Route path='/books/update/:num' element={<BooksUpdate />} />
            <Route path='/books/create' element={<BooksCreate />} />
            {/* fruits */}
            <Route path='/fruits' element={<Fruits />} />
            <Route path='/fruits/update/:num' element={<FruitsUpdate />} />
            <Route path='/fruits/create' element={<FruitsCreate />} />
            {/* Question */}
            <Route path='/question' element={<Question />} />
            {/* Login, Register (회원가입) */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login2' element={<Login2 />} />
            <Route path='/register2' element={<Register2 />} />
          </Routes>
        </main>
        
        <footer>
          <address>Copyright&copy;2025 Backend&Frontend All Rights Reserved.</address>
        </footer>
      </BrowserRouter>
    </>
  );
}

function App() {
  return (
    <AlertProvider>
      <AppContent />
    </AlertProvider>
  );
}

export default App;
