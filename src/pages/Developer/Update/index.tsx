import React from 'react';
import {  Container, Form, MainContent, Title } from './styles';
import { Button, LeftMenuAdmin, TextInput } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setDevelopers, updateDeveloper } from '../../../store/slices';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateDeveloper: React.FC = () => {
  const { developers } = useAppSelector((state) => state.developer);
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [developerName, setDeveloperName] = React.useState(developers.find((developer) => developer.id === id)?.name || '');

  const onSuccess = (developer: any) => {
    console.log('DEVELOPER UPDATE RECEIVED AAAA', developer);
    const updatedDevelopers = developers.map((dev) => dev.id === developer.id ? developer : dev);
    dispatch(setDevelopers(updatedDevelopers));
    navigate('/developers/list');
  }

  const onError = () => {
    console.log('DEVELOPER UPDATE FAILED');
  }

  const handleUpdateDeveloper = () => {
    dispatch(updateDeveloper({id: id ?? '', name: developerName, onSuccess, onError}));
  }

  
  return (
    <Container>
      <main style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%  '}}>
        <LeftMenuAdmin />
        <MainContent>
          <Title>Update Developer</Title>
          <Form>
            <TextInput 
              placeholder="Developer name" 
              value={developerName} 
              onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setDeveloperName(event.target.value)} 
            />
            <Button type="submit" onClick={handleUpdateDeveloper}>Update</Button>
          </Form>
        </MainContent>
      </main>
    </Container>
  );
}

export default UpdateDeveloper;