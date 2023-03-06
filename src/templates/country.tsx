import * as React from "react";
// import Footer from "../components/footer";
// import Header from "../components/header";
// import Banner from "../components/banner";
// import BreadCrumbs from "../components/BreadCrumbs";
import "../index.css";
// import bannerImage from "../images/app-bg.png";
import {favicon} from "../../sites-global/global";
import { JsonLd } from "react-schemaorg";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
// import {
//   stagingBaseUrl, AnalyticsEnableDebugging,
//   AnalyticsEnableTrackingCookie
// } from "../constants";
import {
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  stagingBaseurl,
} from "../../sites-global/global";
import PageLayout from "../components/layouts/PageLayout";
import BreadCrumbs from "../components/layouts/Breadcrumb";
// import Logo from "../images/logo.svg";

var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "country",
    filter: {
      savedFilterIds: ["dm_stores-directory_address_countrycode"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",

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
  currentUrl = "/" + document.slug.toString() + ".html";
  return "/" + document.slug.toString() + ".html";
  // return "index.html";
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  let metaDescription = document.c_metaDescription
    ? document.c_metaDescription
    : "Visit your " +
      document.name +
      "Get the real Waitrose's taste now – order fresh cooked pizza, sides, drinks and desserts online for delivery or takeaway. Better ingredients. Better pizza";
  let metaTitle = document.c_metaTitle
    ? document.c_metaTitle
    : "Visit " + document.name + " | Order Items: Delivery | ";

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
          href: favicon,
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
              : `${stagingBaseurl}${currentUrl}`
          }`,
        },
      },
      ///og tags

      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: stagingBaseurl + currentUrl,
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
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: stagingBaseurl + currentUrl,
        },
      },
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
          name: "twitter:description",
          content: `${metaDescription}`,
        },
      },
    ],
  };
};
const Country: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,

  __meta,
  // _site,
}) => {
  let templateData = { document: document, __meta: __meta };

  const { dm_directoryChildren, dm_directoryParents } = document;

  const { name, _site } = document;
  // console.log( dm_directoryChildren,'jgdhrjgf')
  // const childrenDivs = dm_directoryChildren?.map((entity: any) => {
  //   return (
  //     <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
  //       <a
  //         key={entity.slug}
  //         href={stagingBaseUrl+"/" +document.slug+'/'+ entity.slug + ".html"}
  //         className="hover:text-red"
  //       >
  //         {entity.name} ({entity.dm_directoryChildrenCount})
  //       </a>
  //     </div>
  //   );
  // });
  var slug = "";
  const childrenDivs =
    dm_directoryChildren &&
    dm_directoryChildren?.map((entity: any) => {
      if (entity?.dm_directoryChildrenCount == 1) {
        entity.dm_directoryChildren?.map((i: any) => {
          i.dm_directoryChildren?.map((e: any) => {
            slug = e.slug + ".html";
          });
        });
        return (
          <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
            <a key={entity.slug} href={slug} className="hover:text-red">
              {entity.name} ({entity.dm_directoryChildrenCount})
            </a>
          </div>
        );
      } else {
        let slug = "/" + document.slug + "/" + entity.slug + ".html";
        return (
          <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4 test">
            <a key={entity.slug} href={slug} className="hover:text-red">
              {entity.name} ({entity.dm_directoryChildrenCount})
            </a>
          </div>
        );
      }
    });
  let breadcrumbScheme = [];

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 1,
    item: {
      "@id": `${stagingBaseurl}/${document.slug.toString()}.html`,
      name: document.name,
    },
  });

  return (
    <>
      <JsonLd<Store>
        item={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Waitrose",
          url: "https://www.waitrose.com/international/",
          logo: "https://www.waitrose.com.mx/en-US/images/logos/pji_arch_red_en.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Waitrose",
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
            <BreadCrumbs
              name={name}
              baseUrl={relativePrefixToRoot}
              parents={dm_directoryParents}
              address={""}
            />
            {/* <Banner
        Name={name ? name : ""}
        TagLine={""}
        BackgroundImage={
          document._site.c_directoryManagerBannerImage.url
            ? document._site.c_directoryManagerBannerImage.url
            : bannerImage
        }
        CtaButton={""}
        text={"Regions"}
        template={"country"}
      /> */}

            <h3 className="sec_heading mt-12" style={{ textAlign: "center" }}>
              All Regions of {name}{" "}
            </h3>
            <div className="directory-country py-5 lg:py-[60px]">
              <div className="container">
                <div className="flex flex-wrap justify-center -mx-4">
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

export default Country;
