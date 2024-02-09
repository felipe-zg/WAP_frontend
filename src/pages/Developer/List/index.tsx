import React, { useEffect } from 'react';
import {  Container, List, ListItem, ListItemText, Button, DeleteButton, Title } from './styles';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { deleteDeveloper, getDevelopers, setDevelopers } from '../../../store/slices';
import { useNavigate } from 'react-router-dom';
import { LeftMenuAdmin } from '../../../components';

const ListDeveloper: React.FC = () => {
  const { developers } = useAppSelector((state) => state.developer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSuccess = (developer: any) => {
    const updatedDevelopers = developers.filter((dev) => dev.id !== developer.id);
    dispatch(setDevelopers(updatedDevelopers));
  }

  const onError = () => {
    console.log('DEVELOPER CREATION FAILED');
  }

  const handleUpdateDeveloper = (id: string) => {
    navigate(`/developers/update/${id}`);
  }

  const handleAdd = () => {
    navigate(`/developers/create`);
  }

  const handleDeleteDeveloper = (id: string) => {
    dispatch(deleteDeveloper({id, onSuccess, onError}));
  }

  useEffect(() => {
    !developers.length && dispatch(getDevelopers({onSuccess: (data) => console.log('DEVELOPERS GET SUCCESS', data), onError: () => console.log('DEVELOPERS GET FAILED')}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Container>
       <main style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%  '}}>
        <LeftMenuAdmin />
        <List>
        <div style={{width: '80%', display: 'flex', alignItems: 'center'}}>
            <Button onClick={handleAdd}>Add</Button>
            <Title>Developers</Title>
          </div>
          {developers.map((developer) => (
            <ListItem key={developer.id}>
              <ListItemText>
                {developer.name}
              </ListItemText>
              <div>
                <Button onClick={() => handleUpdateDeveloper(developer.id)}>Update</Button>
                <DeleteButton onClick={() => handleDeleteDeveloper(developer.id)}>Delete</DeleteButton>
              </div>
            </ListItem>
          ))}
        </List>
       </main>
    </Container>
  );
}

export default ListDeveloper;