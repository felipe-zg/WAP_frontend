import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { CreateDeveloper, CreateGame, CreateGenre, CreatePlatform, CreatePublisher, Dashboard, Home, ListDeveloper, ListGame, ListGenre, ListPlatform, ListPublisher, Login, Signup, UpdateDeveloper, UpdateGame, UpdateGenre, UpdatePlatform, UpdatePublisher } from './pages';
import { useAppSelector } from './hooks/redux';

const AppRouter: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { isAuthenticated, role } = user;

  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={isAuthenticated && role === 'admin' ? <Dashboard /> : <Login />} />
          <Route path="/developers/create" element={isAuthenticated && role === 'admin' ? <CreateDeveloper /> : <Login />} />
          <Route path="/developers/list" element={isAuthenticated && role === 'admin' ? <ListDeveloper /> : <Login />} />
          <Route path="/developers/update/:id" element={isAuthenticated && role === 'admin' ? <UpdateDeveloper /> : <Login />} />
          <Route path="/publishers/create" element={isAuthenticated && role === 'admin' ? <CreatePublisher /> : <Login />} />
          <Route path="/publishers/list" element={isAuthenticated && role === 'admin' ? <ListPublisher /> : <Login />} />
          <Route path="/publishers/update/:id" element={isAuthenticated && role === 'admin' ? <UpdatePublisher /> : <Login />} />
          <Route path="/platforms/create" element={isAuthenticated && role === 'admin' ? <CreatePlatform /> : <Login />} />
          <Route path="/platforms/list" element={isAuthenticated && role === 'admin' ? <ListPlatform /> : <Login />} />
          <Route path="/platforms/update/:id" element={isAuthenticated && role === 'admin' ? <UpdatePlatform /> : <Login />} />
          <Route path="/genres/create" element={isAuthenticated && role === 'admin' ? <CreateGenre /> : <Login />} />
          <Route path="/genres/list" element={isAuthenticated && role === 'admin' ? <ListGenre /> : <Login />} />
          <Route path="/genres/update/:id" element={isAuthenticated && role === 'admin' ? <UpdateGenre /> : <Login />} />
          <Route path="/games/create" element={isAuthenticated && role === 'admin' ? <CreateGame /> : <Login />} />
          <Route path="/games/list" element={isAuthenticated && role === 'admin' ? <ListGame /> : <Login />} />
          <Route path="/games/update/:id" element={isAuthenticated && role === 'admin' ? <UpdateGame /> : <Login />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
};

export default AppRouter;
