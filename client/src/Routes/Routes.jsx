import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import UserForm from '../Pages/UserForm';
import UserList from '../Pages/UserList';

const routes=createBrowserRouter([
    
    {
        path:'/userform',
        element:<UserForm/>
    },
    {
        path:'/usersList',
        element:<UserList/>
    }
])

export default routes;