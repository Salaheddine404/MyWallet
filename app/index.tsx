import { Redirect } from 'expo-router';
import LoginScreen from "./screens/LoginScreen";

export default function Index() {
  // You can add authentication check here if needed
  // const isAuthenticated = false;
  // if (isAuthenticated) {
  //   return <Redirect href="/home" />;
  // }
  
  return <LoginScreen />;
}