import React, { useEffect } from 'react';
import {  Container, List, ListItem, ListItemText, Button, DeleteButton, Title } from './styles';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { LeftMenuAdmin } from '../../../components';
import { deletePlatform, getPlatforms, setPlatforms } from '../../../store/slices/platform';

const ListPlatform: React.FC = () => {
  const { platforms } = useAppSelector((state) => state.platform);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSuccess = (platform: any) => {
    const updatedPlatforms = platforms.filter((plat) => plat.id !== platform.id);
    dispatch(setPlatforms(updatedPlatforms));
  }

  const onError = () => {
    console.log('PLATFORM CREATION FAILED');
  }

  const handleUpdatePlatform = (id: string) => {
    navigate(`/platforms/update/${id}`);
  }

  const handleAdd = () => {
    navigate(`/platforms/create`);
  }

  const handleDeletePlatform = (id: string) => {
    dispatch(deletePlatform({id, onSuccess, onError}));
  }

  useEffect(() => {
    !platforms.length && dispatch(getPlatforms({onSuccess: (data) => console.log('PLATFORMS GET SUCCESS', data), onError: () => console.log('PLATFORMS GET FAILED')}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Container>
       <main style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%  '}}>
        <LeftMenuAdmin />
        <List>
        <div style={{width: '80%', display: 'flex', alignItems: 'center'}}>
            <Button onClick={handleAdd}>Add</Button>
            <Title>Platforms</Title>
          </div>
          {platforms.map(({id, name}) => (
            <ListItem key={id}>
              <ListItemText> {name}</ListItemText>
              <div>
                <Button onClick={() => handleUpdatePlatform(id)}>Update</Button>
                <DeleteButton onClick={() => handleDeletePlatform(id)}>Delete</DeleteButton>
              </div>
            </ListItem>
          ))}
        </List>
       </main>
    </Container>
  );
}

export default ListPlatform;