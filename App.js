import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/Login';

const navigator = createStackNavigator(
  {
    LoginPage: Login,
  },
  {
   intialRouteName: 'LoginPage',
   defaultNavigationOptions: {
     title: 'Run Rivals'
   } 
  }
)

export default createAppContainer(navigator);
