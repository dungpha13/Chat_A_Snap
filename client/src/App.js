import { Route, Routes } from 'react-router-dom';

import './App.css';

import { privateRoutes, publicRoutes } from './routes';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          return <Route key={index} path={route.path} Component={route.component} />
        })}
        {privateRoutes.map((route, index) => {
          return <Route key={index} path={route.path} Component={route.component} />
        })}
      </Routes>

    </div>
  );
}

export default App;
