// types.ts
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  DoctorSelection: undefined;
  DoctorProfile: { doctorId: string }; // example
  Appointments: undefined;
  // add other screens here...
};

type DoctorSelectionNavigationProp = StackNavigationProp
  RootStackParamList,
  'DoctorSelection'
>;

type Props = {
  navigation: DoctorSelectionNavigationProp;
};