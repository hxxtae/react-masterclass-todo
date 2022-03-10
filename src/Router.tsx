import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ToDoList from './routes/ToDoList';

function Router() {
  return (
    <BrowserRouter> 
      <Route path={process.env.PUBLIC_URL + "/"} >
        <ToDoList />
      </Route>
    </BrowserRouter>
  );
}

export default Router;
