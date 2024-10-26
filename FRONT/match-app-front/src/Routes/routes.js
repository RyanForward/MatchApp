import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Cadastro from '../Pages/Cadastro';
import Login from '../Pages/Login';
import HistoricoPartidas from '../Pages/Historico';

function RoutesApp(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Cadastro/>}/>
            <Route path='/historico' element={<HistoricoPartidas/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;