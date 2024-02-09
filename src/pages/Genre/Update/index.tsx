import React from 'react';
import {  Container, Form, MainContent, Title } from './styles';
import { Button, LeftMenuAdmin, TextInput } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { setGenres, updateGenre } from '../../../store/slices';

const UpdateGenre: React.FC = () => {
  const { genres } = useAppSelector((state) => state.genre);
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [genreName, setGenreName] = React.useState(genres.find((genre) => genre.id === id)?.name || '');

  const onSuccess = (genre: any) => {
    const updatedGenres = genres.map((g) => (g.id === genre.id ? genre : g));
    dispatch(setGenres(updatedGenres));
    navigate('/genres/list');
  }

  const onError = () => {
    console.log('GENRE UPDATE FAILED');
  }

  const handleUpdateGenre = () => {
    dispatch(updateGenre({id: id ?? '', name: genreName, onSuccess, onError}));
  }

  
  return (
    <Container>
      <main style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%  '}}>
        <LeftMenuAdmin />
        <MainContent>
          <Title>Update Genre</Title>
          <Form>
            <TextInput 
              placeholder="Genre name" 
              value={genreName} 
              onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setGenreName(event.target.value)} 
            />
            <Button type="submit" onClick={handleUpdateGenre}>Update</Button>
          </Form>
        </MainContent>
      </main>
    </Container>
  );
}

export default UpdateGenre;