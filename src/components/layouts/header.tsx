import * as React from "react";
import Cta from "../commons/cta";

type DataOfProps = {
  c_headerNav: any;
  c_bookASlotCta: any;
  c_headerMain: any;
  c_myTrolleyCta: any;
  // c_bookASlotCta: any;
};

const Header = (props: DataOfProps) => {
  const { c_headerNav, c_bookASlotCta, c_headerMain, c_myTrolleyCta } = props;


  return (
    <>
      <div className="inline-block w-full  text-#777">
        <div className="container px-6 pt-6">
          <nav className="py-6 flex items-center justify-between">
            {c_headerNav.headerExploreTtile}
            <div className="flex gap-x-10 text-lg font-semibold">
              {" "}
              {c_headerNav.headerNavigationLinks.map((itemLabels: any) => {
                return (
                  <>
                    <a href="#" className="anchor">{itemLabels.label}</a>
                  </>
                );
              })}
            </div>
            <div className="space-x-5">
              <a href="#" className="anchor"> {c_headerNav.headerMyAccount.label}</a>
              <a href="#" className="anchor">{c_headerNav.headerHelp.label}</a>
              <a href="#" className="anchor"> {c_headerNav.headerMyWaitrose.label}</a>
              <a href="#" className="anchor"> {c_headerNav.findABranch.label}</a>
              {/* <Cta buttonText="Order Pickup" href="#" style="primary-cta"></Cta>
            <button
              buttonText="Start My Order"
              href="https://www.papajohns.com.mx/menu"
              style="primary-cta"
            >"sdgsdgg"</button> */}
            </div>
          </nav>

          <div className="headerMainDiv py-3">
            <div className="flex justify-between items-center">
              <img className="h-10" src={c_headerMain.headerLogo.url} alt="" />
            </div>
            <div className="">
              <a href="#" className="border border-[#6A8B2B] py-2 px-4 mr-3">
                {" "}
                {c_bookASlotCta.label}
              </a>
              <a href="#" className="border border-[#6A8B2B] py-2 px-4">
                {" "}
                {c_myTrolleyCta.label}
              </a>
            </div>
          </div>
          <div className="py-[6px] flex items-center">
            <div className="btnforheader">
              <a href="#" className="">{c_headerMain.headerBrowseCta.label}</a>
            </div>
            <div className="border-[black] h-10 ml-5">
              <input className="searchforHeader" placeholder="Search" />
            </div>
            <div className="flex gap-14 right-5 absolute">
              {c_headerMain.headerLabels.map((item: any) => {
                return (
                  <>
                  <a href="#" className="anchor">
                    <ul className="flex gap-12">
                      <li>{item.label}</li>
                    </ul>
                    </a>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
