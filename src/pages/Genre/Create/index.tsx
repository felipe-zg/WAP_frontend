import React from 'react';
import {  Container, Form, MainContent, Title } from './styles';
import { Button, LeftMenuAdmin, TextInput } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { createGenre, setGenres } from '../../../store/slices';

const CreateGenre: React.FC = () => {
  const { genres } = useAppSelector((state) => state.genre)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [genreName, setGenreName] = React.useState('');

  const onSuccess = (genre: any) => {
    const updatedGenres = [...genres, genre];
    dispatch(setGenres(updatedGenres));
    navigate('/genres/list');
  }

  const onError = () => {
    console.log('GENRE CREATION FAILED');
  }

  const handleCreateGenre = () => {
    dispatch(createGenre({name: genreName, onSuccess, onError}));
  }

  
  return (
    <Container>
       <main style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%  '}}>
       <LeftMenuAdmin />
       <MainContent>
          <Title>Create Genre</Title>
          <Form>
            <TextInput 
              placeholder="Genre name" 
              value={genreName} 
              onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setGenreName(event.target.value)} 
            />
            <Button type="submit" onClick={handleCreateGenre}>Create</Button>
          </Form>
       </MainContent>
       </main>
    </Container>
  );
}

export default CreateGenre;