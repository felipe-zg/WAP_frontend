  import React from 'react';
  import AppRouter from './AppRouter';
  import { Provider } from 'react-redux';
  import { store } from './store/store';

  const App: React.FC = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}}>
        <div style={{width: '1600px'}}>
          <Provider store={store}>
            <AppRouter />
          </Provider>
        </div>
      </div>
    );
  };

  export default App;
