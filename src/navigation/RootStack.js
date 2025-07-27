// RootStack.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RoleSelection from '../screens/Common/RoleSelection';
import { USER_ROLES } from '../constant/roles';
import DoctorStack from './DoctorStack';
import PetOwnerStack from './PetOwnerStack';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [role, setRole] = useState('pet');

  // useEffect(() => {
  //   const getRole = async () => {
  //     const storedRole = await AsyncStorage.getItem('userRole');
  //     setRole(storedRole);
  //   };
  //   getRole();
  // }, []);

  if (!role) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="RoleSelection" component={RoleSelection} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {role === 'doctor' ? <DoctorStack /> : <PetOwnerStack />}
    </NavigationContainer>
  );
};

export default RootStack;
