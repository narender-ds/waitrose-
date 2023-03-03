import * as React from "react";
import Cta from "../commons/cta";
import Hours from "../commons/hours";
import woodtexture from "../../images/wood-texture.jpg";
import mapimage from "../../images/red-map.svg";
import Phonesvg from "../../images/phone.svg";
import timesvg from "../../images/watch-icn.svg";
import Address from "../commons/Address";
import GetDirection from "../commons/GetDirection";
import { StaticData } from "../../../sites-global/staticData";
import Holidayhours from "./Holdayhours";
import Model from "./Model";
import CustomMap from "./CustomMap";
import OpenClose from "../commons/openClose";

const Contact = (props: any) => {
  const {
    timezone,
    address,
    phone,
    latitude,
    longitude,
    hours,
    c_specific_day,
    additionalHoursText,
    yextDisplayCoordinate,
    c_storeInfoHeading,
    c_getDirectionsCTAText,
  } = props;
  return (
    <>
      <div className="address-main-sec">
        <h4 className="box-title">
          {c_storeInfoHeading ? c_storeInfoHeading : "Store Details"}
        </h4>

        <div className="icon-row content-col">
          <div className="icon">
            {" "}
            <img
              className=" "
              src={mapimage}
              width="20"
              height="20"
              alt="mapimage"
            />
          </div>
          <div className="  address-text notHighlight">
            {address.line1}
            <div>{address.line2 && <div>{address.line2}</div>}</div>
            <div>{address.city}</div>
            <div>{address.postalCode}</div>
          </div>
        </div>

        {phone ? (
          <div className="icon-row">
             <a id="address" className=" location-phn" href={`tel:${phone}`}>
            <div className="icon">
              {" "}
              <img
                className=" "
                src={Phonesvg}
                width="22"
                height="22"
                alt="phonesvg"
              />
            </div>
            <div className="content-col">{phone}</div>
            </a>
          </div>
        ) : (
          ""
        )}
        <div className="icon-row">
          <div className="icon">
            {" "}
            <img
              className=" "
              src={timesvg}
              width="20"
              height="20"
              alt=""
            />{" "}
          </div>
          <div className=" address-text notHighlight mr-20">
            <OpenClose timezone={timezone} hours={hours} />
          </div>
        </div>
        <ul className="">
          <li className="button-bx direction-button">
            <GetDirection
              buttonText={
                c_getDirectionsCTAText
                  ? c_getDirectionsCTAText
                  : StaticData.getDirection
              }
              address={address}
              latitude={latitude}
              longitude={longitude}
            />
          </li>
        </ul>

        <div className="map-sec">
          <CustomMap prop={yextDisplayCoordinate} />
        </div>
      </div>

      {hours && typeof hours.monday != "undefined" ? (
        <div className="hours">
          <div className="hours-sec">
            <h4 className="box-title">{props.title}</h4>
            <div className="hours-div mb-5 md:mb-1 flex flex-col">
              {hours.holidayHours && !hours.reopenDate ? (
                <>
                  {/* <Model
                    name="Holiday hours"
                    holidayHours={hours.holidayHours}
                    c_specific_day={c_specific_day}
                  /> */}
                </>
              ) : (
                ""
              )}
              {hours && (
                <Hours
                  title={"Holiday hours"}
                  additionalHoursText={additionalHoursText}
                  hours={hours}
                                />
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Contact;
