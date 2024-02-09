import React, { useEffect } from 'react';
import {  Checkbox, Container, Form } from './styles'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Button, PasswordInput, TextInput } from '../../components';
import { login } from '../../store/slices/user';
import { redirect, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberme, setRememberme] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberme(event.target.checked);
  };

  const onSuccess = (user: any) => {
    navigate(user.role === 'admin' ? '/dashboard' : '/');
  }

  const onError = () => {
    console.log('Error saving token');
  }

  const handleLogin = () => {
    if(email === '' || password === '') return alert('Please fill in all fields');
    dispatch(login({email, password, rememberme, onSuccess, onError}));
  }

  useEffect(() => {
    if(user.isAuthenticated) redirect(user.role === 'admin' ? '/dashboard' : '/');
  }, [user]);
  
  return (
    <Container>
      <Form>
        <div>
          <TextInput placeholder="E-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
          <PasswordInput  placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <div style={{flexDirection: 'row', width: '100%'}}>
            <Checkbox id='Remember_me' placeholder='Rem' value={rememberme.toString()} onChange={handleChange}/>
            <label htmlFor="Remember_me" style={{marginLeft: '16px'}}>Remember me</label>
          </div>
        </div>
        <Button type="submit" onClick={handleLogin}>Login</Button>
      </Form>
    </Container>
  );
}

export default Login;