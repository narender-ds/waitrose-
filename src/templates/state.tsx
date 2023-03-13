import * as React from "react";
// import { stagingBaseUrl,  AnalyticsEnableDebugging,
//   AnalyticsEnableTrackingCookie } from "../constants";
//import bannerImage from "../images/app-bg.png";
import "../index.css";
// import favicon from "../images/favicon.png";
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
import PageLayout from "../components/layouts/PageLayout";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import {
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  stagingBaseurl,
} from "../../sites-global/global";
// import Logo from "../images/logo.svg";
var currentUrl = "";

export const config: TemplateConfig = {
  stream: {
    $id: "states",
    filter: {
      savedFilterIds: ["dm_stores-directory_address_region"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.id",

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
  if (document?.dm_directoryParents) {
    document?.dm_directoryParents?.map((i: any) => {
      currentUrl = i.slug;
      currentUrl = `${currentUrl}/${document.slug.toString()}`;
    });

    return currentUrl + ".html";
  } else {
    return `${document.slug.toString()}.html`;
  }
};
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  let metaDescription = document.c_metaDescription
    ? document.c_metaDescription
    : "Visit your " +
      document.name +
      "Get the real Waitrose's taste now – order fresh vegies, sides, drinks and desserts online for delivery or takeaway. Better ingredients. Better eatables";
  let metaTitle = document.c_metaTitle
    ? document.c_metaTitle
    : "Visit " + document.name + " | Order Items: Delivery Or Takeaway | ";

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
              : `${stagingBaseurl}/${currentUrl}`
          }`,
        },
      },
      ///og tags

      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${stagingBaseurl}/${currentUrl}`,
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
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: `${stagingBaseurl}/${currentUrl}`,
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

const State: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
  __meta,
}) => {
  const { name, dm_directoryParents, dm_directoryChildren, _site,slug } = document;

  let templateData = { document: document, __meta: __meta };
  console.log('document',dm_directoryChildren)

  // const childrenDivs =
  //   dm_directoryChildren &&
  //   dm_directoryChildren.map((entity: any) => {
  //     let url: any = "";

  //     url = document.slug.toString();
  //     let url1: any = "";
  //     url1 = url.replace(/(\b\S.+\b)(?=.*\1)/g, "").trim();
  //     if (entity.dm_directoryChildrenCount == 1) {
  //       if (
  //         entity.dm_directoryChildren &&
  //         entity.dm_directoryChildren[0].slug
  //       ) {
  //         return (
  //           <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
  //             <a
  //               key={entity.slug}
  //               href={stagingBaseUrl+"/" + entity.dm_directoryChildren[0].slug + ".html"}
  //               className="hover:text-red"
  //             >
  //               {entity.name} ({entity.dm_directoryChildrenCount})
  //             </a>
  //           </div>
  //         );
  //       } else {
  //         let name: any = entity.dm_directoryChildren[0].name.toLowerCase();
  //         let string: any = name.toString();
  //         let removeSpecialCharacters = string.replace(
  //           /[&\/\\#^+()$~%.'":*?<>{}!@]/g,
  //           ""
  //         );
  //         let result: any = removeSpecialCharacters.replaceAll("  ", "-");
  //         let finalString: any = result.replaceAll(" ", "-");
  //         url = `${entity.dm_directoryChildren[0].id}-${finalString}.html`;
  //         return (
  //           <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
  //             <a key={entity.slug} href={stagingBaseUrl+ "/" + url} className="hover:text-red">
  //               {entity.name} ({entity.dm_directoryChildrenCount})
  //             </a>
  //           </div>
  //         );
  //       }
  //     } else {
  //       return (
  //         <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
  //           <a
  //             key={entity.slug}
  //             href={stagingBaseUrl+"/" + entity.slug + ".html"}
  //             className="hover:text-red"
  //           >
  //             {entity.name} ({entity.dm_directoryChildrenCount})
  //           </a>
  //         </div>

  //       );
  //     }
  //   });
  const childrenDivs = dm_directoryChildren ? dm_directoryChildren.map((entity: any) => {
    var detlslug;

    //var name : any= "/"+document.dm_directoryParents[1].slug+"/"+document.slug+"/"+dm_directoryChildren[1].slug;

    //console.log(name,"hdf");
    //var string: any = name.toString();
    //let result: any = string.replaceAll(" ", "-");
    if (typeof entity.dm_directoryChildren != "undefined") {

      if (entity.dm_directoryChildrenCount == 1) {
        entity.dm_directoryChildren.map((res: any) => {
            //detlslug = `/${res.id.toString()}.html`;
            detlslug = slug+"/"+entity.slug+"/"+res.id+".html";
            console.log(detlslug,"dsdddsv");
        })
      } else {
        detlslug = slug + "/" + entity.slug + ".html";

      }

    }

    return (
      <p className=" storelocation-category">
        <a
          key={entity.slug}
          href={detlslug}
        >
          {entity.name} ({entity.dm_directoryChildrenCount})
        </a>
      </p>
    )
  }) : null;
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
        Name={document.dm_directoryParents[1].name}
        TagLine={""}
        BackgroundImage={
          document._site.c_directoryManagerBannerImage.url
            ? document._site.c_directoryManagerBannerImage.url
            : bannerImage
        }
        CtaButton={""}
        text={name}
        template={"state"}
      /> */}

            <h3 className="sec_heading mt-12" style={{ textAlign: "center" }}>
              Cities in {name}, {document.dm_directoryParents[1].name}{" "}
            </h3>
            <div className="directory-country nearby-sec">
              <div className="container">
                <div className="flex flex-wrap justify-center -mx-[15px]">
                  <div className="w-full text-center"></div>
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

export default State;
