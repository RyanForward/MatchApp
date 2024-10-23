import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Cadastro from '../Components/Cadastro';

function RoutesApp(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Cadastro/>}/>
            {/* <Route path='/signup' element={<Cadastro/>}/> */}
            {/* <Route path='/admin' element={<Private><Admin/></Private>}/>
            <Route path='/cards' element={<Cards/>}/> */}
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;