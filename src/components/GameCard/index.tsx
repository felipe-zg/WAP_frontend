import React, { useState } from "react";
import { BackFace, Button, Card, FrontFace, GameCardContainer, GameImage, GamePrice, GameTitle } from "./styles";
import { useAppSelector } from "../../hooks";

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { developers } = useAppSelector((state) => state.developer);
  const { publishers } = useAppSelector((state) => state.publisher);
  const { platforms } = useAppSelector((state) => state.platform);
  const { genres } = useAppSelector((state) => state.genre);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = (event: React.MouseEvent<HTMLDivElement>) => {
    const isButtonClick = (event.target as HTMLElement).tagName === 'BUTTON';
    if (!isButtonClick) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleAddToCart = () => {

  };



  return (
    <GameCardContainer>
      <Card isFlipped={isFlipped} onClick={handleCardFlip}>
        <FrontFace>
          <GameImage src={game.image} alt={game.title} />
          <GameTitle>{game.title}</GameTitle>
          <GamePrice>${game.price}</GamePrice>
          <Button onClick={handleAddToCart}>Add to cart</Button>
        </FrontFace>
        <BackFace>
          <div>
          <h3>{game.title}</h3>
            <p>Developer: {developers.find(developer => developer.id === game.developer)?.name}</p>
            <p>Publisher: {publishers.find(publisher => publisher.id === game.publisher)?.name}</p>
            <p>Platform: {platforms.find(platform => platform.id === game.platform)?.name}</p>
            <p>Genre: {genres.find(genre => genre.id === game.genre)?.name}</p>
            <p>Release Date: {game.releaseDate}</p>
          </div>
        </BackFace>
      </Card>
    </GameCardContainer>
  );
};

export default GameCard;