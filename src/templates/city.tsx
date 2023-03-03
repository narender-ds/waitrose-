import * as React from "react";
// import Banner from "../components/banner";
// import Footer from "../components/footer";
// import Header from "../components/header";
// import BreadCrumbs from "../components/BreadCrumbs";
// import {
//   stagingBaseUrl,
//   slugify,
//   conversionDetailsDirection,
//   conversionDetailsPhone,
//   AnalyticsEnableDebugging,
//   AnalyticsEnableTrackingCookie,
// } from "../constants";
import {
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  conversionDetailsDirection,
  slugify,
  stagingBaseurl,
} from "../../sites-global/global";
// import favicon from "../images/favicon.png";
import { JsonLd } from "react-schemaorg";
import "../index.css";
import { Link } from "@yext/pages/components";
import getDirectionUrl from "../components/commons/GetDirection";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/layouts/PageLayout";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import { svgIcons } from "../components/commons/svgIcon";

var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "city",
    filter: {
      savedFilterIds: ["dm_stores-directory_address_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      // "c_addressRegionDisplayName",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.address",
      "dm_directoryChildren.googlePlaceId",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.mainPhone",
      // "dm_directoryChildren.what3WordsAddress",
      "dm_directoryChildren.yextDisplayCoordinate",
      "dm_directoryChildren.id",
      //seo section
      // "c_canonical",
      // "c_metaDescription",
      // "c_metaTitle",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  if (document.dm_directoryParents) {
    document?.dm_directoryParents?.map((i: any) => {
      if (i.meta.entityType.id == "ce_country") {
        currentUrl = `${i.slug}/${document.slug.toString()}.html`;
      } else if (i.meta.entityType.id == "ce_region") {
        let url = `${document.dm_directoryParents[1].slug}/${
          i.slug
        }/${document.slug.toString()}.html`;
        currentUrl = url;
      }
    });
    return `/${currentUrl}`;
  } else {
    return `/${document.slug.toString()}.html`;
  }
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  let metaDescription = document.c_metaDescription
    ? document.c_metaDescription
    : "Visit your " +
      document.name +
      "Get the real Waitrose's taste now – order fresh cooked , sides, drinks and desserts online for delivery or takeaway. Better ingredients. Better ";
  let metaTitle = document.c_metaTitle
    ? document.c_metaTitle
    : "Visit " + document.name + " | Order : Delivery Or Takeaway | ";

  return {
    title: metaTitle,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          // href: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "author",
          content: "Waitrose",
        },
      },

      {
        type: "meta",
        attributes: {
          name: "robots",
          content: "noindex, nofollow",
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: ` ${
            document.c_canonical
              ? document.c_canonical
              : `${stagingBaseurl}/${document.slug.toString()}.html`
          }`,
        },
      },
      ///og tags

      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${stagingBaseurl}/${document.slug.toString()}.html`,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "og:image",
          content:
            "https://www.waitrose.com.mx/en-US/images/logos/pji_arch_red_en.png",
        },
      },

      /// twitter tag

      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content:
            "https://www.waitrose.com.mx/en-US/images/logos/pji_arch_red_en.png",
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: `${stagingBaseurl}/${document.slug.toString()}.html`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${metaDescription}`,
        },
      },
    ],
  };
};

const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
}) => {
  const {
    name,
    dm_directoryParents,
    dm_directoryChildren,
    c_canonical,
    c_metaDescription,
    c_metaTitle,
    _site,
  } = document;

  let templateData = { document: document, __meta: __meta };

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  const childrenDivs =
    dm_directoryChildren &&
    dm_directoryChildren?.map((entity: any) => {
      var origin: any = null;
      if (entity.address.city) {
        origin = entity.address.city;
      } else if (entity.address.region) {
        origin = entity.address.region;
      } else {
        origin = entity.address.country;
      }

      let url = "";
      if (!entity.slug) {
        let slugString = entity.id + " " + entity.name;
        let slug = slugify(slugString);
        // console.log('slug', slug);
        url = `${slug}.html`;
      } else {
        url = `${entity.slug?.toString()}.html`;
      }

      // const what3WordsAddressString = entity.what3WordsAddress ? (
      //   <div className="store-phone w3w">
      // {svgIcons.what3Words}{" "}
      //   <Link target="_blank" href={entity.what3WordsAddress? `https://what3words.com/${entity.what3WordsAddress} `: ""} rel="noopener noreferrer" eventName={`what3WordsLinks`} >What3Words</Link>
      //   </div>
      //   ) : (
      //     ""
      //     );
      // console.log(document.dm_directoryParents,'dm_directoryParents')
      return (
        <div className="w-full sm:w-1/2 xl:w-1/3 px-[15px]">
          <div className="near-location">
            <h4>
              <a key={entity.slug} href={`/${url}`}>
                {entity.name}
              </a>
            </h4>
            <div className="icon-row">
            <div className="icon">
              {svgIcons.addressPin}
              </div>
              <div className="content-col">
              <p>
                {entity.address.line1 ? entity.address.line1 : ""},{" "}
                {entity.address.line2 ? entity.address.line2 : ""}
                <br /> {entity.address.city ? entity.address.city : ""},{" "}
                {entity.address.postalCode ? entity.address.postalCode : ""},{" "}
                <br />
                {entity.address.countryCode
                  ? regionNames.of(entity.address.countryCode)
                  : ""}{" "}
                <br />
              </p>
            </div>
            </div>
            {/* {what3WordsAddressString} */}
            {entity.mainPhone ? (
              <>
              <div className="icon-row">
             <a id="address" className=" location-phn" href={`tel:${entity.mainPhone}`}>
             <div className="icon">
                  {svgIcons.phoneIcon}
                  </div>
                  <div className="content-col">
                  <p>
                    <Link
                      href={`tel:${entity.mainPhone}`}
                      rel="noopener noreferrer"
                      eventName={`phone`}
                    >
                      {entity.mainPhone}
                    </Link>
                  </p>
                  </div>
                
                </a>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="store-link">
              <Link
                data-ya-track="directions"
                className="direction"
                onClick={() => {
                  getDirectionUrl(entity);
                }}
                href="javascript:void(0);"
                rel="noopener noreferrer"
                eventName={`getdirections"`}
                conversionDetails={conversionDetailsDirection}
              >
                {svgIcons.getDirection} Get Directions
              </Link>
              <Link
                className="view-details"
                href={`/${url}`}
                rel="noopener noreferrer"
                eventName={`storeViewDetails`}
              >
                {svgIcons.viewDetails} View Details
              </Link>
            </div>  
          </div>
        </div>
      );
    });

  let breadcrumbScheme: any = [];
  let currentIndex: any = 0;
  dm_directoryParents &&
    dm_directoryParents?.map((i: any, index: any) => {
      currentIndex = index;
      if (index != 0) {
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id": `${stagingBaseurl}/${i.slug}`,
            name: i.name,
          },
        });
      }
    });

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: currentIndex + 1,
    item: {
      "@id": `${stagingBaseurl}/${document.slug.toString()}.html`,
      name: document.name,
    },
  });

  return (
    <>
      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Waitrose's ",
          url: "https://www.waitrose.com/international/",
          logo: "https://www.waitrose.com.mx/en-US/images/logos/pji_arch_red_en.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Waitrose's ",
            addressLocality: "Waitrose's International, Inc.",
            addressRegion: "Louisville",
            postalCode: "99900",
            addressCountry: "Louisville",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "contact",
            telephone: "01255 222568",
          },
          sameAs: [
            "https://www.facebook.com/waitrosemx",
            "https://www.instagram.com/waitrosemx/",
            "https://www.twitter.com/waitrosemx",
          ],
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: breadcrumbScheme,
        }}
      />
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={"header"}>
          <PageLayout global={_site}>
            {/* <BreadCrumbs
              name={name}
              parents={dm_directoryParents}
              address={""}
            /> */}
            <BreadCrumbs
            name={name}
            parents={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
            address={""}
          ></BreadCrumbs>
            {/* <Banner
                  Name={document.dm_directoryParents ? document.dm_directoryParents : []}
                  TagLine={""}
                  BackgroundImage={
                    document._site.c_directoryManagerBannerImage.url
                    ? document._site.c_directoryManagerBannerImage.url
                    : bannerImage
                  }
                  CtaButton={""}
                  text={name ? name : ""}
                  template={"city"}
                  /> */}
            <h3 className="sec_heading mt-12" style={{ textAlign: "center" }}>
              Available Stores in {name},{" "}
              {document.dm_directoryParents[2].name
                ? document.dm_directoryParents[2].name
                : ""}
              , {document.dm_directoryParents[1].name}{" "}
            </h3>
            <div className="directory-country nearby-sec">
              <div className="container">
                <div className="flex  flex-wrap justify-center -mx-[15px]">
                  {childrenDivs}
                </div>
              </div>
            </div>
          </PageLayout>
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};
export default City;
