import React from 'react';
import { Container, Content, Title } from './styles';
import { LeftMenuAdmin } from '../../components';

const Dashboard: React.FC = () => {
  return (
    <Container>
       <main style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%  '}}>
        <LeftMenuAdmin />
        <Content>
          <div style={{width: '80%', display: 'flex', alignItems: 'center'}}>
            <Title>Dashboard</Title>
          </div>
        </Content>
       </main>
    </Container>
  );
}

export default Dashboard;