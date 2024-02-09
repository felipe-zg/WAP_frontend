import React from 'react';
import {  Container, Form, MainContent, Title } from './styles';
import { Button, LeftMenuAdmin, TextInput } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { createPlatform, setPlatforms } from '../../../store/slices/platform';

const CreatePlatform: React.FC = () => {
  const { platforms } = useAppSelector((state) => state.platform);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [platformName, setPlatformName] = React.useState('');

  const onSuccess = (platform: any) => {
    console.log('PLATFORM CREATION RECEIVED', platform);
    const updatedPlatforms = [...platforms, platform];
    dispatch(setPlatforms(updatedPlatforms));
    navigate('/platforms/list');
  }

  const onError = () => {
    console.log('PLATFORM CREATION FAILED');
  }

  const handleCreatePlatform = () => {
    dispatch(createPlatform({name: platformName, onSuccess, onError}));
  }

  
  return (
    <Container>
       <main style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%  '}}>
       <LeftMenuAdmin />
       <MainContent>
          <Title>Create Platform</Title>
          <Form>
            <TextInput 
              placeholder="Platform name" 
              value={platformName} 
              onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setPlatformName(event.target.value)} 
            />
            <Button type="submit" onClick={handleCreatePlatform}>Create</Button>
          </Form>
       </MainContent>
       </main>
    </Container>
  );
}

export default CreatePlatform;