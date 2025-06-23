import style from './ContextMenu.module.css';

const ContextMenu = ({position,setPosition,setData,rowData,setEditableData}) => {

  function handleDelete(){
    setData((prevData)=>
       prevData.filter((data)=>data.id!=rowData.id)
    );
    setPosition({})
  }

  function handleEdit(){
    setEditableData(rowData);
    setPosition({})
  }

  if(!position.left){
    return
  }
  return (
    
  
    <div className={style['context-menu']} style={{'left':position.left,'top':position.top}}>
      <div onClick={()=> handleEdit()}>Edit</div>
      <hr />
      <div onClick={()=> handleDelete()}>Delete</div>
    </div>
  )
}

export default ContextMenu
