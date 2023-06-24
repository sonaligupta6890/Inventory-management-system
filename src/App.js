import {Routes,Route} from 'react-router-dom';
import './App.css';
import Layout from './components/Shared/Layout';
import AddFruit from './pages/AddFruit';
import UpdateFruit from './pages/UpdateFruit';
import AllFruits from './pages/AllFruits';

function App(){
  return(
    <Layout>
      <Routes>
        <Route path="/" element={<AllFruits/>}></Route>
        <Route path="/add-fruit" element={<AddFruit/>}></Route>
        <Route path="/edit-fruit/:id" element={<UpdateFruit/>}></Route>
      </Routes>
    </Layout>
  )
}


export default App;
