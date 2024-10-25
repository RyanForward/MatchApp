import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Cadastro from '../Pages/Cadastro';
import Login from '../Pages/Login';

function RoutesApp(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Cadastro/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;