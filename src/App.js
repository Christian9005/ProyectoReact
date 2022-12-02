import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from './components/footer';
import ClientsAdmin from './pages/admin/clients-admin';
import ProductsAdmin from './pages/admin/products-admin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes/routes';
import Layout from './components/layoud';
import routesPrivate from './routes/routesPrivate';
import LayoutPrivate from './components/layoud-private';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
        {routes.map((route)=>(
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}/>
        ))}
        </Route>
        <Route path='/admin' element={<LayoutPrivate/>}>
        {routesPrivate.map((route) => (
            <Route
              exact
              path={route.route}
              element={route.component}
              key={route.key}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
