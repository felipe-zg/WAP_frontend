import React from 'react';
import {  Container, Form, MainContent, Title } from './styles';
import { Button, LeftMenuAdmin, TextInput } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { setPublishers, updatePublisher } from '../../../store/slices/publisher';

const UpdatePublisher: React.FC = () => {
  const { publishers } = useAppSelector((state) => state.publisher);
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [publisherName, setPublisherName] = React.useState(publishers.find((publisher) => publisher.id === id)?.name || '');

  const onSuccess = (data: any) => {
    const updatedPublishers = publishers.map((publisher) => {
      if (publisher.id === data.id) {
        return data;
      }
      return publisher;
    });
    dispatch(setPublishers(updatedPublishers));
    navigate('/publishers/list');
  }

  const onError = () => {
    console.log('PUBLISHER UPDATE FAILED');
  }

  const handleUpdatePublisher = () => {
    dispatch(updatePublisher({id: id ?? '', name: publisherName, onSuccess, onError}));
  }

  
  return (
    <Container>
      <main style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%  '}}>
        <LeftMenuAdmin />
        <MainContent>
          <Title>Update Publisher</Title>
          <Form>
            <TextInput 
              placeholder="Publisher name" 
              value={publisherName} 
              onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setPublisherName(event.target.value)} 
            />
            <Button type="submit" onClick={handleUpdatePublisher}>Update</Button>
          </Form>
        </MainContent>
      </main>
    </Container>
  );
}

export default UpdatePublisher;