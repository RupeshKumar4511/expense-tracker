import style from './ExpenseTable.module.css';
import useFilter from '../Hooks/useFilter'
import { useState } from 'react';
import ContextMenu from './ContextMenu';
const ExpenseTable = ({ data,setData,setEditableData }) => {


    const [filteredData, setQuery] = useFilter(data, (data) => data.Category);
    const [rowData,setRowData]= useState({});
    const [position, setPosition] = useState({})
    const [sortCallback,setSortCallback]= useState(()=>()=>{})

    function sortAmount(order){
        if(order==='ascending'){
           setSortCallback(()=>(a,b)=> a.Amount-b.Amount)
        }else{
            setSortCallback(()=>(a,b)=>b.Amount-a.Amount)
        }
    }

     function sortTitle(order){
       if(order==='ascending'){
           setSortCallback(()=>(a,b)=> a.title.localeCompare(b.title))
        }else{
            setSortCallback(()=>(a,b)=> b.title.localeCompare(a.title))
        }
    }


    return (
        <>
          <ContextMenu position={position} setPosition={setPosition} setData={setData} rowData={rowData} setEditableData={setEditableData} />  

            <div onClick={()=>{if(position.left){
                 setPosition({})
            }}}>
                <table className={style['expense-table']}>
                    <tbody>
                        <tr>
                            <th>Title <i className="fa-solid fa-arrow-up" onClick={()=>sortTitle("ascending")} title='Ascending'></i> <i className="fa-solid fa-arrow-down" onClick={()=>sortTitle("descending")} 
                            title='Descending'></i></th>
                            <th>
                                <select name="category" className={style["catogory"]} onChange={(event) => setQuery(event.target.value.toLowerCase())}>
                                    <option value="">All</option>
                                    <option value="Grocery">Grocery</option>
                                    <option value="Clothes">Clothes</option>
                                    <option value="Bills">Bills</option>
                                    <option value="Education">Education</option>
                                    <option value="Medicine">Medicine</option>
                                </select>
                            </th>
                            <th>Amount <i className="fa-solid fa-arrow-up" onClick={()=>sortAmount("ascending")} title='Ascending'></i> <i className="fa-solid fa-arrow-down" onClick={()=>sortAmount("descending")} title='Descending'></i></th>
                        </tr>

                        {

                            filteredData.sort(sortCallback).map((item) =>
                                <tr key={item.id} onContextMenu={(event) => {
                                    event.preventDefault();
                                    setPosition({
                                        left: event.clientX+4,
                                        top: event.clientY-4,

                                        
                                    });
                                    setRowData(
                                        {
                                            id:item.id,
                                            title:item.title,
                                            Category:item.Category,
                                            Amount:item.Amount
                                         
                                        }

                                    )
                                }}>
                                    <td>{item.title}</td>
                                    <td>{item.Category}</td>
                                    <td>&#8377;{item.Amount}</td>
                                </tr>)

                        }
                        <tr>
                            <th>Total</th>
                            <th onClick={()=>setSortCallback(()=>()=>{})} className={style['clear-sort']}>Clear Sort</th>
                            <th>
                                &#8377;{
                                    filteredData.reduce((accumulator, item) => accumulator + item.Amount, 0)
                                }
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>

        
        </>
    )
}

export default ExpenseTable
