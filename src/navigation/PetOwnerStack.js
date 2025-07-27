// PetOwnerStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ReasonSelection from '../screens/PetOwner/ReasonSelection';
import DoctorSelection from '../screens/PetOwner/DoctorSelection';
import SlotBooking from '../screens/PetOwner/DoctorSelection';
import MyAppointments from '../screens/PetOwner/DoctorSelection';

const Stack = createNativeStackNavigator();

const PetOwnerStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReasonSelection" component={ReasonSelection} />
      <Stack.Screen name="DoctorSelection" component={DoctorSelection} />
      <Stack.Screen name="SlotBooking" component={SlotBooking} />
      <Stack.Screen name="MyAppointments" component={MyAppointments} />
    </Stack.Navigator>
  );
};

export default PetOwnerStack;
