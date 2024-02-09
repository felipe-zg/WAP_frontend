import React from "react";
import { GenreItem, GenreList, LeftMenuContainer } from "./styled";

interface Props {
  genres: {id: string, name: string}[];
  onSelectGenre: (genre: string) => void;
}

const LeftMenu: React.FC<Props> = ({ genres, onSelectGenre }) => {
  return (
    <LeftMenuContainer>
      <GenreList>
        {genres.map((genre) => (
          <GenreItem key={genre.id} onClick={() => onSelectGenre(genre.id)}>
            {genre.name}
          </GenreItem>
        ))}
      </GenreList>
    </LeftMenuContainer>
  );
};

export default LeftMenu;