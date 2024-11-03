import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./components/AppNavigator";
//import MoreScreen from './screens/moreStack';
import { UserContextProvider } from "./context/userContext";
// ----- New -----
import { createStackNavigator } from '@react-navigation/stack';  
import Test from "./components/screens/Test";

const Stack = createStackNavigator();

const App = () => {
  return (
    // ----- Previous -----
    <UserContextProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </UserContextProvider>
    // ----- Current -----
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Test" component={Test} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;
