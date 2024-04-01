import * as React from "react";
import Stack from "@mui/material/Stack";
import myquiz from "../myquiz.jpg";
import createquiz from "../createquiz.jpg";
import playquiz from "../playquiz.jpg";
import { NavLink } from "react-router-dom";
import ImgCard from "./ImgCard";

export default function Home() {
  const navlinks = [
    { to: "/create", img: createquiz, text: "Create New Quiz" },
    { to: "/myquiz", img: myquiz, text: "My Quizzes" },
    { to: "/playForum", img: playquiz, text: "Play Quiz" },
  ];
  return (
    <div className="container-home">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {navlinks.map((links, index) => (
          <NavLink key={index} className={"imageContainer"} to={links.to}>
            <ImgCard
              img={links.img}
              text={links.text}
              height={"300px"}
              width={"300px"}
              imgHeight={"243px"}
            />
          </NavLink>
        ))}
      </Stack>
    </div>
  );
}
