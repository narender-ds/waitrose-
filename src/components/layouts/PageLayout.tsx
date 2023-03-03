import * as React from "react";
import BannerSlide from "./bannerSlide";
import Footer from "./footer";
import Header from "./header";
// import BannerSlide from "./bannerSlide";


type Props = {
   global: any;
  children?: React.ReactNode;
 
 

};

const PageLayout = ({  global, children}: Props) => {
  return (
    <>
      <Header c_headerNav={global.c_headerNav} c_bookASlotCta={global.c_bookASlotCta} c_headerMain={global.c_headerMain} c_myTrolleyCta={global.c_myTrolleyCta}/>
      {/* <BannerSlide  timezone={timezone} name={name} hours={hours}BackgroundImage={global.c_bannerPhoto}  c_cTAForBanner={global.c_bannerCta} c_bannerSlogan={global.c_bannerSlogan}/> */}
      {children}
      <Footer c_footerLogo={global.c_footerLogo} c_waitroseHelpAndSupportSection={global.c_waitroseHelpAndSupportSection} c_usefulInformationSection={global.c_usefulInformationSection} c_moreFromUsSection={global.c_moreFromUsSection} c_aboutWaitroseSection={global.c_aboutWaitroseSection} c_socialIcon={global.c_socialIcon} c_visitOurMobileSiteTitle={global.c_visitOurMobileSiteTitle} c_footerImage={global.c_footerImage} c_footerLogoText={global.c_footerLogoText} c_copyrightTag={global.c_copyrightTag}/>
    </>
  );
};

export default PageLayout;
