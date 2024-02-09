import React from "react";
import { GamesGridContainer } from "./styles";
import GameCard from "../GameCard";

interface Props {
  games: Game[];
}

const GamesGrid: React.FC<Props> = ({ games }) => {
  return (
    <GamesGridContainer>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </GamesGridContainer>
  );
};

export default GamesGrid;