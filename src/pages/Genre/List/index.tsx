import React, { useEffect } from 'react';
import {  Container, List, ListItem, ListItemText, Button, DeleteButton, Title } from './styles';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { LeftMenuAdmin } from '../../../components';
import { deleteGenre, getGenres, setGenres } from '../../../store/slices';

const ListGenre: React.FC = () => {
  const { genres } = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSuccess = (genre: any) => {
    const updatedGenres = genres.filter((g) => g.id !== genre.id);
    dispatch(setGenres(updatedGenres));
  }

  const onError = () => {
    console.log('GENRE CREATION FAILED');
  }

  const handleUpdateGenre = (id: string) => {
    navigate(`/genres/update/${id}`);
  }

  const handleAdd = () => {
    navigate(`/genres/create`);
  }

  const handleDeleteGenre = (id: string) => {
    dispatch(deleteGenre({id, onSuccess, onError}));
  }

  useEffect(() => {
    dispatch(getGenres({onSuccess: (data) => console.log('GENRES GET SUCCESS', data), onError: () => console.log('GENRES GET FAILED')}));
  }, [dispatch]);
  
  return (
    <Container>
       <main style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%  '}}>
        <LeftMenuAdmin />
        <List>
          <div style={{width: '80%', display: 'flex', alignItems: 'center'}}>
            <Button onClick={handleAdd}>Add</Button>
            <Title>Genres</Title>
          </div>
          {genres.map(({id, name}) => (
            <ListItem key={id}>
              <ListItemText>{name}</ListItemText>
              <div>
                <Button onClick={() => handleUpdateGenre(id)}>Update</Button>
                <DeleteButton onClick={() => handleDeleteGenre(id)}>Delete</DeleteButton>
              </div>
            </ListItem>
          ))}
        </List>
       </main>
    </Container>
  );
}

export default ListGenre;