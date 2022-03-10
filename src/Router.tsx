import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ToDoList from './routes/ToDoList';

function Router() {
  return (
    <BrowserRouter> 
      <Switch>
        <Route path={process.env.PUBLIC_URL + "/"} >
          <ToDoList />
        </Route>
        <Route path={process.env.PUBLIC_URL + "/:todoId"} >
          <ToDoList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
