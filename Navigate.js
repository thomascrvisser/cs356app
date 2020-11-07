import Home from './home';
import Register from './register';
import Login from './login';
import Settings from './settings'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const stackNavigatorOptions = {
    headerShown: false
}
const AppNavigator = createStackNavigator({
    Login:{screen:Login},
    Register:{screen:Register},
    Home:{screen:Home},
    Settings:{
        screen:Settings,
        screenOptions={headerShown: true}
    }
},
{
    defaultNavigationOptions : stackNavigatorOptions
}  
);
export default createAppContainer(AppNavigator);