import Kanbas from './Kanbas';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Kanbas/store';

function App() {
  return (
    <Provider store={store}>
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Kanbas" />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </HashRouter>
    </Provider>
  );
}

export default App;