import React, { useEffect } from 'react';
import {  Container, List, ListItem, ListItemText, Button, DeleteButton, Title } from './styles';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { LeftMenuAdmin } from '../../../components';
import { deletePublisher, getPublishers, setPublishers } from '../../../store/slices/publisher';

const ListPublisher: React.FC = () => {
  const { publishers } = useAppSelector((state) => state.publisher);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSuccess = (publisher: any) => {
    const updatedPublishers = publishers.filter((pub) => pub.id !== publisher.id);
    dispatch(setPublishers(updatedPublishers));
  }

  const onError = () => {
    console.log('PUBLISHER CREATION FAILED');
  }

  const handleUpdatePublisher = (id: string) => {
    navigate(`/publishers/update/${id}`);
  }

  const handleAdd = () => {
    navigate(`/publishers/create`);
  }

  const handleDeletePublisher = (id: string) => {
    dispatch(deletePublisher({id, onSuccess, onError}));
  }

  useEffect(() => {
    !publishers.length && dispatch(getPublishers({onSuccess: (data) => console.log('PUBLISHERS GET SUCCESS', data), onError: () => console.log('PUBLISHERS GET FAILED')}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Container>
       <main style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%  '}}>
        <LeftMenuAdmin />
        <List>
          <div style={{width: '80%', display: 'flex', alignItems: 'center'}}>
            <Button onClick={handleAdd}>Add</Button>
            <Title>Publishers</Title>
          </div>
          {publishers.map((publisher) => (
            <ListItem key={publisher.id}>
              <ListItemText>
                {publisher.name}
              </ListItemText>
              <div>
                <Button onClick={() => handleUpdatePublisher(publisher.id)}>Update</Button>
                <DeleteButton onClick={() => handleDeletePublisher(publisher.id)}>Delete</DeleteButton>
              </div>
            </ListItem>
          ))}
        </List>
       </main>
    </Container>
  );
}

export default ListPublisher;