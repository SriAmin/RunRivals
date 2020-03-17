import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/screens/Login';

//Main Stack Navigator Function:
//Allows navigation where squences acts like that of a stack
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
