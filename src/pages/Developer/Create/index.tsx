import React from 'react';
import {  Container, Form, MainContent, Title } from './styles';
import { Button, LeftMenuAdmin, TextInput } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createDeveloper, setDevelopers } from '../../../store/slices';
import { useNavigate } from 'react-router-dom';

const CreateDeveloper: React.FC = () => {
  const { developers } = useAppSelector((state) => state.developer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [developerName, setDeveloperName] = React.useState('');

  const onSuccess = (developer: any) => {
    const updatedDevelopers = [...developers, developer];
    dispatch(setDevelopers(updatedDevelopers));
    navigate('/developers/list');
  }

  const onError = () => {
    console.log('DEVELOPER CREATION FAILED');
  }

  const handleCreateDeveloper = () => {
    dispatch(createDeveloper({name: developerName, onSuccess, onError}));
  }

  
  return (
    <Container>
       <main style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%  '}}>
       <LeftMenuAdmin />
       <MainContent>
          <Title>Create Developer</Title>
          <Form>
            <TextInput 
              placeholder="Developer name" 
              value={developerName} 
              onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setDeveloperName(event.target.value)} 
            />
            <Button type="submit" onClick={handleCreateDeveloper}>Create</Button>
          </Form>
       </MainContent>
       </main>
    </Container>
  );
}

export default CreateDeveloper;