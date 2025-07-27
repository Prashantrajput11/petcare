// DoctorStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DoctorHome from '../screens/Doctor/DoctorHome'; // your screen
import MyAppointments from '../screens/Doctor/MyAppointments';

const Stack = createNativeStackNavigator();

const DoctorStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DoctorHome" component={DoctorHome} />
      <Stack.Screen name="MyAppointments" component={MyAppointments} />
    </Stack.Navigator>
  );
};

export default DoctorStack;
