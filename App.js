import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import SignUp from './src/screens/SignUp';

//Main Stack Navigator Function:
//Allows navigation where squences acts like that of a stack
const navigator = createStackNavigator(
  {
    Login: Login,
    'Home Page': Home,
    'Sign Up': SignUp,
  },
  {
   intialRouteName: 'Login',
  }
)

export default createAppContainer(navigator);
