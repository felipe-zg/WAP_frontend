import React, { useEffect } from 'react';
import {  Container, List, ListItem, ListItemText, Button, DeleteButton, Title } from './styles';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { LeftMenuAdmin } from '../../../components';
import { deleteGame, getGames, setGames } from '../../../store/slices/game';

const ListGame: React.FC = () => {
  const { games } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSuccess = (game: any) => {
    const updatedGames = games.filter((g) => g.id !== game.id);
    dispatch(setGames(updatedGames));
  }

  const onError = () => {
    console.log('GAME CREATION FAILED');
  }

  const handleAdd = () => {
    navigate(`/games/create`);
  }

  const handleDeleteGame = (id: string) => {
    dispatch(deleteGame({id, onSuccess, onError}));
  }

  useEffect(() => {
    dispatch(getGames({onSuccess: (data) => console.log('GAMES GET SUCCESS', data), onError: () => console.log('GAMES GET FAILED')}));
  }, [dispatch]);
  
  return (
    <Container>
       <main style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%'}}>
        <LeftMenuAdmin />
        <List>
        <div style={{width: '80%', display: 'flex', alignItems: 'center'}}>
            <Button onClick={handleAdd}>Add</Button>
            <Title>Games</Title>
          </div>
          {games.map(({id, title}) => (
            <ListItem key={id}>
              <ListItemText> {title}</ListItemText>
              <div>
                <DeleteButton onClick={() => handleDeleteGame(id)}>Delete</DeleteButton>
              </div>
            </ListItem>
          ))}
        </List>
       </main>
    </Container>
  );
}

export default ListGame;