import React from "react";


export type Link=
{
    id: number;
    text: string;
   
}

const Links: React.FC<{ links: Link[], setTab:(id:number)=>void }> = ({ links,setTab }) => {
  const [selectedTab, setSelectedTab] = React.useState(1);
  return (
    <ul className="justify-content-start nav nav-tabs">
      {links?.map(({ id,  text }) => (
          <li className={"nav-item" } key={"li_" + id}>
              <a  className={"nav-link "+(id==selectedTab?" active" :"")} onClick={()=>{setSelectedTab(id); setTab(id)}}>{text}</a> 
          </li>

        ))}
    </ul>
  );
  
};

export default Links;
