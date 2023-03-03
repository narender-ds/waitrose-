// import * as React from "react";
// import gallerybg from "../../images/bg-service.jpg"

// const PhotoGallery = (props: any) => {

//    const photos = props.photos.map((element:any) => {
//     const {height,url, width}=element;
//     return (<div className="image-frame">
//       <img   height={height}
//       src={url} // use normal <img> attributes as props
//         width={width}
//         className="image  "
//        alt="photogallery"
//       >
//       </img>
//     </div>)
// });

//   return (
//     <>

//       <div className="space-y-5 container mx-auto">
//      <div className="gallery-bg"> <img className=" " src={gallerybg} width="38" height="35" alt="gallerybg"/></div>
//         <div className="text-xl font-semibold text-center">
//          <h1 className="text-red-eb pt-8"> Photos</h1>
//           </div>
//         <div className="photos-row">
//             {photos}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PhotoGallery;

import * as React from "react";

const PhotoGallery = (props: any) => {
  const { photoGallery, height, width } = props;
  const photos = photoGallery.map((element: any) => (
    <div>
      <img
        height={height}
        src={element.url} // use normal <img> attributes as props
        width={width}
        className="image"
        alt=""
      ></img>
    </div>
  ));

  return (
    <>
      <div className="space-y-5">
        {/* <div className="text-xl font-semibold ">Photo Gallery</div> */}
        <h2
          className="text-xl font-semibold mb-8"
          style={{ textAlign: "center", color: "#894578" }}
        >
          Photo Gallery
        </h2>

        <div className="grid space-x-5 md:grid-cols-2 lg:grid-cols-3">
          {photos}
        </div>
      </div>
    </>
  );
};

export default PhotoGallery;
