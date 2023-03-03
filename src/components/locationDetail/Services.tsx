import * as React from "react";
/**
 * Component for About section
 * @param props
 * @returns HTML element
 */
var array: any = ["Promotions", "Pizza", "Starters", "Beverages", "Desserts"];

type services = {
  c_menuitems: any;
  title: any;
  Name:any;
};

export default function Storefacility(props: services) {
  const { c_menuitems, title,Name } = props;
  return (
    <>
    <div className="container-custom mx-auto">
    { c_menuitems ? <div className="sec-title">
        <h2>{title}</h2>
        </div> : ""}
      {c_menuitems ? (
        

        <div className="store-faci">
          <div className="boxes-row justify-center">
            {c_menuitems?.map((item: any, index: any) => {
              return (
                <>
                  <div className="boxes-fac">
                    {/* <div className="img-item"> */}
                   
                      <img className="bg-[#FFFFFF]" style={{width:"60%",height:"50%"}}src={item.url} alt=""/>
                  
                    {/* </div> */}
                    <h5>{item.menuTitle ? item.menuTitle : Name[index]}</h5>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
      </div>
    </>
  );
}
