import * as React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
type Data = {
  photos: any;
  PhotoGallarytitle: any;
};
const PhotoSlider = (props: Data) => {
  const { photos, PhotoGallarytitle, height, width } = props;
  const photo =
    photos &&
    photos.map((element: any) => (
      <SplideSlide>
        <img className="Photogalleryimg" height="" width="" src={element.image.url} alt=""/>
      </SplideSlide>
    ));

  return (
    <>
      {photo ? (
        <>
          <div className="container-custom mx-auto">
            <div className="sec-title">
              <h2>{PhotoGallarytitle} </h2>
            </div>
            <div className="Photogallery">{photo}</div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default PhotoSlider;
