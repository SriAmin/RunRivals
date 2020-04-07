import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import SignUp from './src/screens/SignUp';
import LeaderBoard from './src/screens/LeaderBoard';

//Main Stack Navigator Function:
//Allows navigation where squences acts like that of a stack
const navigator = createStackNavigator(
  {
    Login: Login,
    'Home Page': Home,
    'Sign Up': SignUp,
    Leaderboard: LeaderBoard,
  },
  {
   intialRouteName: 'Login',
  }
)

export default createAppContainer(navigator);
