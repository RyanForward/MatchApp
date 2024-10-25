import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Cadastro from '../Components/Cadastro';

function RoutesApp(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Cadastro/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;