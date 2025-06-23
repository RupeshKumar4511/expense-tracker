import ExpenseForm from "./components/ExpenseForm"
import ExpenseTable from "./components/ExpenseTable"
import Header from "./components/Header"
import style  from './App.module.css';
import { useState } from "react";
import useLocalStorage from "./Hooks/useLocalStorage";
function App() {
  
  const [data,setData]= useLocalStorage('expenses',[]);
  
  const [editableData,setEditableData] = useLocalStorage('editExpense',{});
  
  return (
    <>
      <Header></Header>
      <div className={style["expense-container"]}>
      <ExpenseForm setData={setData} editableData={editableData} setEditableData={setEditableData}/>
      <ExpenseTable data={data} setData={setData} setEditableData={setEditableData}/>
      </div>
    </>
  )
}

export default App
