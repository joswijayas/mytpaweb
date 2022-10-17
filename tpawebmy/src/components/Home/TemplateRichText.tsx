import React from "react";
import { Link } from "react-router-dom";
// import MentionHover from "./MentionHover";
import {
  HashtagRichText1,
  URLRichText,
  MentionRichText,
  HashtagRichText2,
} from "./helpRT";
import MentionHover from "./MentionHover";

const RichTextTemplate = ({ texts }: { texts: string[] }) => {
    // console.log(texts)
  return (
    <>
      {texts.map((text, index) => {
        if (text.match(HashtagRichText2)) {
          let firstIndexHastag = text.indexOf("[");
          let lastIndexHastag = text.indexOf("]");
          let hastagSubString = text.substring(
            firstIndexHastag + 1,
            lastIndexHastag
          );

          let hastagUrl = text.substring(firstIndexHastag + 2, lastIndexHastag);
          return (
            <Link className="" to={`/MainPage/SearchTags/${hastagUrl}`} key={index}>
                {hastagSubString}{" "}
            </Link>
          );
        } else if (text.match(HashtagRichText1)) {
          let hastagUrl = text.substring(1, text.length);
          return (
            <Link className="" to={`/MainPage/SearchTags/${hastagUrl}`} key={index}>
              {text}{" "}
            </Link>
          );
        } else if (text.match(URLRichText)) {
          return (
            <a target="#" href={text} key={index}>
              {text} &nbsp;
            </a>
          );
        } else if (text.match(MentionRichText)) {
          return <MentionHover text={text}/>
        } else {
          return <span key={index}>{text} </span>;
        }
      })}
    </>
  );
};

export default RichTextTemplate;