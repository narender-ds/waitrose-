import * as React from "react";
import { Link } from "@yext/pages/components";
import OpenClose from "../commons/openClose";
export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};
type bannerData = {
  name: any;
  BackgroundImage: any;
  c_cTAForBanner: any;
  c_bannerSlogan: any;
  timezone: any;
  hours: any;
  // // text: any;
  // template: any;
};
// type Banner = {
//   name?: string;
//   address?: Address;
//   openTime?: string;
//   children?: React.ReactNode;
// };

const BannerSlide = (props: bannerData) => {

  const {
    name,
    BackgroundImage,
    c_cTAForBanner,
    c_bannerSlogan,
    timezone,
    hours,
  } = props;
  const conversionDetails_primaryCTA = {
    cid: "dc6937a6-345d-4c0f-b63f-79be3c29d7bc",
    cv: "3",
  };
  return (
    <>
      <div className="hero">
        {BackgroundImage?.map((item: any) => {
               return (
            <>
              <img className="hero-img" src={item.url} alt="banner" />
            </>
          );
        })}

        <div className="container text-center">
          <div className="banner-text banner-dark-bg justify-center text-center">
            <h1 className="">{name}</h1>
            <div className="openClosestatus detail-page closeing-div">
              <OpenClose timezone={timezone} hours={hours} />
            </div>
          </div>
          {/* <h1>{title}</h1> */}
          {/* <p>
            {c_bannerSlogan.bannerSlogan ? c_bannerSlogan.bannerSlogan : ""}
          </p> */}
          <p>
            {c_bannerSlogan.bannnerDesciption ? c_bannerSlogan.bannnerDesciption : ""}
          </p>
          {c_bannerSlogan ? (
            <>
              {c_cTAForBanner.label ? (
                <div className="button-bx direction-button">
                  <Link
                    rel="noopener noreferrer"
                    data-ya-track="cta_button"
                    eventName={c_cTAForBanner?.label}
                    conversionDetails={conversionDetails_primaryCTA}
                    href={"#"}
                    className="button"
                    target={
                      c_cTAForBanner.linkType == "PHONE"
                        ? "_self"
                        : c_cTAForBanner.linkType == "URL"
                        ? "_self"
                        : c_cTAForBanner.linkType == "OTHER"
                        ? "_blank"
                        : "_self"
                    }
                  >
                    {c_cTAForBanner.label}
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default BannerSlide;
