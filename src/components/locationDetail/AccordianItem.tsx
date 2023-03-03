import * as React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export default function FaqAccordian(props: any) {
  // console.log("props", props);
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <>
      {props.Question ? (
        <div className="sec-title">
          <h2>{props.Title}</h2>
        </div>
      ) : (
        ""
      )}
      {props.Title ? (
        <>
          {" "}
          {props?.Question?.map((que: any, index: any) => {
            return (
              <>
                <div>
                  <Accordion open={open === index + 1}>
                    <AccordionHeader onClick={() => handleOpen(index + 1)}>
                      {que?.name}
                    </AccordionHeader>
                    <AccordionBody>{que?.answer}</AccordionBody>
                  </Accordion>
                </div>
              </>
            );
          })}{" "}
        </>
      ) : (
        ""
      )}
    </>
  );
}
