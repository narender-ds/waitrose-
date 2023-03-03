// src/template/404.tsx
import {
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  GetPath,
  Template,
} from "@yext/pages";
import * as React from "react";
import { favicon } from "../../sites-global/global";
import { StaticData } from "../../sites-global/staticData";
import PageLayout from "../components/layouts/PageLayout";
import "../index.css"


// The path must be exactly 404.html
export const getPath: GetPath<TemplateProps> = () => {
  return "404.html";
};

// Add a title to the page
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "Page Not Found",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
        },
      },
    ]
  };
};

// Template that will show as the page
const FourOhFour: Template<TemplateRenderProps> = ({
  document,
}) => {
  const {
    _site
  } = document;
  return (
    <>
      <PageLayout global={_site}>
        <div className="content-list">
          <div className="container">
            <div className="sec-title text-center">
              <h1 className="" style={{ textAlign: "center" }}>
                {StaticData.PagenotFound}
              </h1>
              <p>{StaticData.cantfind_page}.</p>
              <p>{StaticData.Youcouldtry}</p>
              <div className="button-bx max-w-[45rem] !mx-auto !mt-5">
                <a className="btn" href="javascript:history.back()">{StaticData.Previuspage} &gt;</a>
                <a className="btn" href="/">{StaticData.homePage} &gt;</a>
              </div>
            </div>


          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default FourOhFour;
