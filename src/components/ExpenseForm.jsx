import { useEffect, useState } from 'react';
import style from './ExpenseForm.module.css';
import useLocalStorage from '../Hooks/useLocalStorage';

const ExpenseForm = ({setData,editableData,setEditableData}) => {

  const [expense,setExpense] = useLocalStorage('expense',{
    title:'',
    Category:'',
    Amount:''
  })

  
 useEffect(()=>{
  
  if(Object.values(editableData).length){

        setExpense({
          title:editableData.title,
          Category:editableData.Category,
          Amount:editableData.Amount
        })
        
        
  }
 },[editableData])
  
 


  const [error,setError] = useState({
    title:'',
    Category:'',
    Amount:''
  })

  const validateConfig = {
    title:[
      {required:true,message:'Topic is required'},
      {minLength:5,message:'Title should be atleast 5 characters long'}
    ],

    Category:[
      {required:true,message:'Category is required'}
    ],

    Amount:[
      {required:true,message:'Amount is required'},
    ]
  }

  const validate = (formData)=>{
    const errorsData = {}
    Object.entries(formData).forEach(([key,value]) => {
    validateConfig[key].some((rule)=>{
      if(rule.required && !value){
        errorsData[key]= rule.message;
        return true

      }
      if(rule.minLength && value.length <5){
        errorsData[key]= rule.message;
        return true;
      }

    })
    });

    setError(errorsData)
    return errorsData
  }

  function handleChange(event){ 
    const {name,value} = event.target  
    setExpense((prevState)=> ({...prevState,[name]:value}))
  }

  function getFormData(){
    return {
      title:expense.title,
      Category:expense.Category,
      Amount:Number.parseInt(expense.Amount)
    }
  }

 
  function handleSubmit(event){
      event.preventDefault();
      const newData = getFormData();
      const result = validate(newData);
      
      if(Object.values(result).length) return

      if(Object.entries(editableData).length){
        setData((prevState)=>
        prevState.map((prevExpense)=>{
          if(prevExpense.id === editableData.id){
              return {...newData,id:editableData.id}
          }else{
            return prevExpense;
          }
        }))
        setEditableData({})
        setExpense({
              title:'',
              Category:'',
              Amount:''
            })
        return

      }

      setData((prevData)=>[
        ...prevData,
        {...newData,id:crypto.randomUUID()}
      ])     
      
      setExpense({
          title:'',
          Category:'',
          Amount:''
        })   
  }
    
  return (
    
    
    <form method='POST' onSubmit={(event)=>handleSubmit(event)} className={style['form-container']}>
        <div className={style["form-component"]}>
        <p className={style.label} htmlFor="title">Title</p>
        <input type="text" placeholder='Enter title' name="title" className={style["title"]} value={expense.title}  onChange={(event)=>handleChange(event)}  />
        <p className={style["error"]}>{error.title}</p>
        </div>
        <div className={style["form-component"]}>
          <p className={style.label} htmlFor="category">Category</p>
        <select name="Category" className={style["catogory"]} value={expense.Category}  
        onChange={(event)=>handleChange(event)} >
          <option value="">Select Category</option>
          <option value="Grocery">Grocery</option>
          <option value="Clothes">Clothes</option>
          <option value="Bills">Bills</option>
          <option value="Education">Education</option>
          <option value="medicine">Medicine</option>
        </select>
         <p className={style["error"]}>{error.Category}</p>
        </div>
        <div className={style["form-component"]}>
        <p className={style.label} htmlFor="amount">Amount</p>
        <input type="text" placeholder='Enter Amount' name="Amount" className={style["amount"]} value={expense.Amount}  onChange={(event)=>handleChange(event)}/>
         <p className={style["error"]}>{error.Amount}</p>
        </div>

        <div className={style["form-component"]}>
          <input type="submit"  value={editableData.id?'Save':'ADD'} />
        </div>
    </form>
   
  )
}

export default ExpenseForm
