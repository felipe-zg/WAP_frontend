import React from "react";
import { GenreItem, GenreList, LeftMenuContainer } from "./styled";

const items = [
  {
    name: "Games",
    path: "/games/list",
  },
  {
    name: "Developers",
    path: "/developers/list",
  },
  {
    name: "Publishers",
    path: "/publishers/list",
  },
  {
    name: "Platforms",
    path: "/platforms/list",
  },
  {
    name: "Genres",
    path: "/genres/list",
  },
];

const LeftMenuAdmin: React.FC = () => {
  return (
    <LeftMenuContainer>
      <GenreList>
        {items.map((item) => (
          <GenreItem to={item.path}>
            {item.name}
          </GenreItem>
        ))}
      </GenreList>
    </LeftMenuContainer>
  );
};

export default LeftMenuAdmin;