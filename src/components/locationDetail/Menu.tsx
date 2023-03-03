import * as React from "react";

function Menu(props:any){
    // console.log(props.c_matalanMenu.c_matalanMenu)
    return(
        <>
      <div className="nav-section">
      <div className="container mx-auto">
        
        <ul className="primary-nav">
        {props.c_matalanMenu.c_matalanMenu.map((item:any,i:Number)=>{
             return(
                <>
                <a className="" href="#">
                <ul>
                <li className="-mb-px mr-1 w-full">
                {item.menuList}
                </li>
                </ul>
                </a>
                </>
             )
           })} 
            
       </ul>
       </div>
       </div>
        
        </>
    )
}

export default Menu