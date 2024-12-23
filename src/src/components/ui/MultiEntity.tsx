import React from "react";
import { v4 as uuid } from "uuid";



const MultiEntity: React.FC<{ entityData: any, schema:any}> = ({ entityData,schema }) => {
 
  const [editRowId,setEditRowId]=React.useState('');
  const [data,setData]=React.useState(entityData);


  function iconClick(name:any, id:any) 
  {
    if(name=='add')
    {  
      var newRow=data.find((d:any)=>d.id==999999);
      if(newRow)
      {
        newRow.id=uuid();
      }  
      data.push({id:999999});
      setData(data);
      setEditRowId(newRow.id);
   }
   else if(name=='delete')
   {
      if(window.confirm("Are you sure, you want to delete record?"))
      {
        setData(data.filter((d:any)=>d.id!=id));
      }
   }
  } 

  function setField(name:any, value:any) 
  {
    var editRow=data.find((d:any)=>d.id==editRowId);
    if(editRow)
    {
      editRow[name]=value;
    }
  } 

  function getDataItem(name: string, type: string,width:string, id:string) {
         switch(type)
          {
            case 'string':
              return <input type="textbox" style={{width:width, margin:'0.5rem'}}  onChange={(e)=>{setField(name,e.target.value)}} ></input>
           
            case 'icon': 
            return <img src={`/icon/${name}.svg`}  style={{padding:'0.3rem'}} onClick={()=>iconClick(name, id)} ></img> 
            case 'date' :   
            return <input type="date" style={{width:width, margin:'0.5rem'}} onChange={(e)=>{setField(name,e.target.value)} }></input>

            default :
              return <input type="textbox" style={{width:width, margin:'0.5rem'}}  ></input>

          }
    
  }

  function isAddMode(id:any)
  {
    return id==999999;
  }

  return (
    <div>
      <table>
        <thead key="thead">
          <tr>{schema.map((c:any)=>{return <th style={{width:c.width }}>{c.displayName}</th>})}</tr>
        </thead>
        <tbody key="tbody">
          {data.map((d:any)=>{return <tr  className={d.id==editRowId?'addRow':''} >{schema.map((c:any)=>
            {return <td style={{width:c.width}} className={c.type=='icon'?'pl-0':''} >
              {((isAddMode(d.id) && c.name=='add') || (c.type!='icon' && d.id==editRowId) || (d.id!=999999 && c.name=='delete'))? getDataItem(c.name,c.type,c.width,d.id): d[c.name]}
              </td>})}</tr>})}
        </tbody>
      </table>
    </div>
  );
};

export default MultiEntity;
