import React from 'react';
import {  Container, Form } from './styles'
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { Button, PasswordInput, TextInput } from '../../components';

const Signup: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  
  return (
    <Container>
      <Form>
        <view>
          <TextInput  placeholder="Username" />
          <PasswordInput  placeholder="Password" />
          <PasswordInput  placeholder="Confirm password" />
        </view>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}

export default Signup;