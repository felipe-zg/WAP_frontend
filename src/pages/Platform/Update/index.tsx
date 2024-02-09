import React from 'react';
import {  Container, Form, MainContent, Title } from './styles';
import { Button, LeftMenuAdmin, TextInput } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { setPlatforms, updatePlatform } from '../../../store/slices/platform';

const UpdatePlatform: React.FC = () => {
  const { platforms } = useAppSelector((state) => state.platform);
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [platformName, setPlatformName] = React.useState(platforms.find((platform) => platform.id === id)?.name || '');

  const onSuccess = (platform: any) => {
    const updatedPlatforms = platforms.map((plat) => plat.id === platform.id ? platform : plat);
    dispatch(setPlatforms(updatedPlatforms));
    navigate('/platforms/list');
  }

  const onError = () => {
    console.log('PLATFORM UPDATE FAILED');
  }

  const handleUpdatePlatform = () => {
    dispatch(updatePlatform({id: id ?? '', name: platformName, onSuccess, onError}));
  }

  
  return (
    <Container>
      <main style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%  '}}>
        <LeftMenuAdmin />
        <MainContent>
          <Title>Update Platform</Title>
          <Form>
            <TextInput 
              placeholder="Platform name" 
              value={platformName} 
              onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setPlatformName(event.target.value)} 
            />
            <Button type="submit" onClick={handleUpdatePlatform}>Update</Button>
          </Form>
        </MainContent>
      </main>
    </Container>
  );
}

export default UpdatePlatform;