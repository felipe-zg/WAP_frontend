import React from 'react';
import {  Container, Form, MainContent, Title } from './styles';
import { Button, LeftMenuAdmin, TextInput } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { createPublisher, setPublishers } from '../../../store/slices/publisher';

const CreatePublisher: React.FC = () => {
  const { publishers } = useAppSelector((state) => state.publisher)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [publisherName, setPublisherName] = React.useState('');

  const onSuccess = (publisher: any) => {
    const updatedPublishers = [...publishers, publisher];
    dispatch(setPublishers(updatedPublishers));
    navigate('/publishers/list');
  }

  const onError = () => {
    console.log('PUBLISHER CREATION FAILED');
  }

  const handleCreatePublisher = () => {
    dispatch(createPublisher({name: publisherName, onSuccess, onError}));
  }

  
  return (
    <Container>
       <main style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%  '}}>
       <LeftMenuAdmin />
       <MainContent>
          <Title>Create Publisher</Title>
          <Form>
            <TextInput 
              placeholder="Publisher name" 
              value={publisherName} 
              onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setPublisherName(event.target.value)} 
            />
            <Button type="submit" onClick={handleCreatePublisher}>Create</Button>
          </Form>
       </MainContent>
       </main>
    </Container>
  );
}

export default CreatePublisher;