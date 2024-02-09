import React, { useEffect } from 'react';
import { Container } from './styles'
import { LeftMenu } from '../../components';
import GamesGrid from '../../components/GamesGrid';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGames } from '../../store/slices/game';
import { getGenres } from '../../store/slices';

const Home: React.FC = () => {
  const { games } = useAppSelector((state) => state.game);
  const { genres } = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();
  const [selectedGenre, setSelectedGenre] = React.useState('');

  useEffect(() => {
    !games.length && dispatch(getGames({}));
  }, [dispatch, games]);

  useEffect(() => {
    !genres.length && dispatch(getGenres({}));
  }, [dispatch, genres]);

  useEffect(() => {
    console.log('selectedGenre', selectedGenre);
  }, [selectedGenre]);

  useEffect(() => {
    console.log('games ', games);
  }, [games]);
  
  return (
    <Container>
      <main style={{display: 'flex', flexDirection: 'row'}}>
        <LeftMenu genres={genres} onSelectGenre={setSelectedGenre}/>
        <div style={{ flex: 1, padding: '20px'}}>
          <GamesGrid games={selectedGenre === '' ? games : games.filter(game => game.genre === selectedGenre)} />
        </div>
      </main>
    </Container>
  );
}

export default Home;
