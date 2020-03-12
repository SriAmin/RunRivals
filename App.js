import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Hello from './src/Hello';

const navigator = createStackNavigator(
  {
    HelloPage: Hello,
  },
  {
   intialRouteName: 'HelloPage',
   defaultNavigationOptions: {
     title: 'Run Rivals'
   } 
  }
)

export default createAppContainer(navigator);
