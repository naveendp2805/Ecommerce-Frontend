import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';

function App() {

  return (
    <>
      <MainLayout>
        <AppRoutes />
      </MainLayout>

      <ToastContainer position='top-right' autoClose={3000} theme="light" />
    </>
  );
}

export default App;
