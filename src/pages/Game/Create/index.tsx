import React, { useEffect } from 'react';
import {  Container, Form, Label, MainContent, Title } from './styles';
import { Button, LeftMenuAdmin, SelectInput, TextInput } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { getPlatforms } from '../../../store/slices/platform';
import { getDevelopers, getGenres, getPublishers } from '../../../store/slices';
import { createGame, setGames } from '../../../store/slices/game';

const CreateGame: React.FC = () => {
  const { platform, publisher, developer, genre, game } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [releaseDate, setReleaseDate] = React.useState('');
  const [image, setImage] = React.useState('');
  const [gamePlatform, setGamePlatform] = React.useState('');
  const [gamePublisher, setGamePublisher] = React.useState('');
  const [gameDeveloper, setGameDeveloper] = React.useState('');
  const [gameGenre, setGameGenre] = React.useState('');

  const onSuccess = (gameObj: any) => {
    const { games } = game;
    const updatedGames = [...games, gameObj];
    dispatch(setGames(updatedGames));
    navigate('/games/list');
  }

  const onError = () => {
    console.log('GAME CREATION FAILED');
  }

  const handleCreatePlatform = () => {
    dispatch(createGame({
      title,
      description,
      price,
      rating: String(rating),
      releaseDate,
      image,
      platform: gamePlatform,
      publisher: gamePublisher,
      developer: gameDeveloper,
      genre: gameGenre,
      onSuccess, 
      onError
    }));
  }

  useEffect(() => {
    !platform.platforms.length && dispatch(getPlatforms({}));
    !publisher.publishers.length && dispatch(getPublishers({}));
    !developer.developers.length && dispatch(getDevelopers({}));
    !genre.genres.length && dispatch(getGenres({}));
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , []);

  
  return (
    <Container>
       <main style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%  '}}>
       <LeftMenuAdmin />
       <MainContent>
          <Title>Create Game</Title>
          <Form>
            <Label>Title</Label>
            <TextInput 
              placeholder="Title" 
              value={title} 
              onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setTitle(event.target.value)} 
            />
            <Label>Description</Label>
            <TextInput 
              placeholder="Description" 
              type='textarea'
              value={description} 
              onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setDescription(event.target.value)} 
            />
            <Label>Price</Label>
            <TextInput 
              placeholder="Price" 
              value={price} 
              onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setPrice(event.target.value)} 
            />
            <Label>Rating</Label>
            <TextInput 
              placeholder="Rating" 
              type='number'
              max={5}
              min={0}
              value={rating} 
              onChange={(event) => setRating(Number(event.target.value))}
            />
            <Label>Release Date</Label>
            <TextInput 
              placeholder="Release Date" 
              type='date'
              value={releaseDate} 
              onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setReleaseDate(event.target.value)} 
            />
            <Label>Image</Label>
            <TextInput 
              placeholder="Image URL"
              type='url'
              value={image}
              onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setImage(event.target.value)} 
            />
            <Label>Platform</Label>
            <SelectInput items={platform.platforms} onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setGamePlatform(event.target.value)} />
            <Label>Publisher</Label>
            <SelectInput items={publisher.publishers} onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setGamePublisher(event.target.value)} />
            <Label>Developer</Label>
            <SelectInput items={developer.developers} onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setGameDeveloper(event.target.value)} />
            <Label>Genre</Label>
            <SelectInput items={genre.genres} onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setGameGenre(event.target.value)} />
            <Button type="submit" onClick={handleCreatePlatform}>Create</Button>
          </Form>
       </MainContent>
       </main>
    </Container>
  );
}

export default CreateGame;