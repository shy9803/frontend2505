import { createContext, useState } from 'react';

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  // Question
  const [questionCount, setQuestionCount] = useState(0);
  // Goods
  const [goodsCount, setGoodsCount] = useState(0);
  // Books
  const [booksCount, setBooksCount] = useState(0);
  // Fruits
  const [fruitsCount, setFruitsCount] = useState(0);

  return (
    <AlertContext.Provider value={{ 
      questionCount, setQuestionCount,
      goodsCount, setGoodsCount,
      booksCount, setBooksCount,
      fruitsCount, setFruitsCount
    }}>
      {children}
    </AlertContext.Provider>
  );
}