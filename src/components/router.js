import { StackNavigator } from "react-navigation";
//import SignUp from "./SignUp";
import TabNavigator from './TabNavigator';
import Login from './Login';
export const SignedOut = StackNavigator({
  SignUp: {
    screen: Login,
    navigationOptions: {
      title: "Sign Up"
    }
},
TabNavigator:{
    screen:TabNavigator,
    }
});