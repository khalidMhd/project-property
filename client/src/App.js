import './App.css';
import { BrowserRouter, Route, Router, Switch, useLocation } from 'react-router-dom'
import SigninScreen from './screen/auth/singin';
import DashboardScreen from './screen/Dashboard';
import ItemsScreen from './screen/item';
import UnitScreen from './screen/unit';
import CategoryScreen from './screen/category';
import AreaScreen from './screen/area';
import SettingScreen from './screen/settings';
import RegulateScreen from './screen/regulate';
import ComplaintScreen from './screen/complaint';

function App() {
  var location = useLocation();
  return (
    <>

      {location.pathname === '/signin'?
        <Route exact path='/signin' component={SigninScreen} />
      :
          <div className="containerMain">        
                
                {/* <Route exact path='/signup' component={signupScreen} /> */}
                <Route exact path='/' component={DashboardScreen} />
                <Route exact path='/items' component={ItemsScreen} />
                <Route exact path='/units' component={UnitScreen} />
                <Route exact path='/category' component={CategoryScreen} />
                <Route exact path='/area' component={AreaScreen} />
                <Route exact path='/settings' component={SettingScreen} />
                <Route path='/regulate/:id' component={RegulateScreen} />
                <Route path='/complaint' component={ComplaintScreen} />
        </div>
      }
    </>
  );
}

export default App;
