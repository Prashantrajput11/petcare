import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { USER_ROLES } from '../../constant/roles';

const RoleSelection = ({ navigation }) => {
  const handleRoleSelect = role => {
    // Save in AsyncStorage if needed
    // Then navigate to respective stack
    if (role === USER_ROLES.DOCTOR) {
      navigation.navigate('DoctorStack');
    } else if (role === USER_ROLES.OWNER) {
      navigation.navigate('PetOwnerStack');
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Select your role</Text>

      <Pressable
        style={styles.roleBtn}
        onPress={() => handleRoleSelect(USER_ROLES.DOCTOR)}
      >
        <Text style={styles.roleText}>Doctor</Text>
      </Pressable>

      <Pressable
        style={styles.roleBtn}
        onPress={() => handleRoleSelect(USER_ROLES.PETOWNER)}
      >
        <Text style={styles.roleText}>Pet Owner</Text>
      </Pressable>
    </View>
  );
};

export default RoleSelection;

const styles = StyleSheet.create({
  roleBtn: {
    backgroundColor: 'tomato',
    paddingHorizontal: 4,
    paddingVertical: 6,
    borderRadius: 6,
  },
  roleText: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
