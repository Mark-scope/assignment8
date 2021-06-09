import { Route, Switch } from "react-router-dom";
import {Login,Signup} from  '../pages/index'


function Router() {
    return(
        <div>
            <Switch>
                <Route exact path='/' component={Signup} />
                <Route exact path='/login' component={Login} />
            </Switch>
        </div>
    )
}
export default Router;