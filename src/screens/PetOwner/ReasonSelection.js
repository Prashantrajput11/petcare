import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';

const REASONS = [
  { id: 'checkup', icon: '🐾', label: 'Checkup' },
  { id: 'eating', icon: '🍖', label: 'Eating Issues' },
  { id: 'grooming', icon: '🧼', label: 'Grooming' },
  { id: 'sleep', icon: '💤', label: 'Sleep Pattern' },
  { id: 'teeth', icon: '🦷', label: 'Teeth Cleaning' },
  { id: 'behavior', icon: '😟', label: 'Mood / Behavior' },
  { id: 'itching', icon: '🐶💅', label: 'Itching / Skin' },
  { id: 'other', icon: '❓', label: 'Other' },
];

const ReasonSelection = ({ navigation }) => {
  const [selectedReason, setSelectedReason] = useState(null);

  const handleSelect = id => {
    setSelectedReason(id);
  };

  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedReason;

    return (
      <Pressable
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={() => handleSelect(item.id)}
      >
        <Text style={styles.icon}>{item.icon}</Text>
        <Text style={styles.label}>{item.label}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>What’s the reason for your visit?</Text>

      <FlatList
        data={REASONS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />

      <Pressable
        style={{
          backgroundColor: 'tomato',
          marginHorizontal: 23,
          paddingVertical: 14,
          borderRadius: 12,
        }}
        onPress={() => navigation.navigate('DoctorSelection')}
      >
        <Text style={styles.btnText}>See Doctors</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ReasonSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  grid: {
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSelected: {
    backgroundColor: '#ffe6e6',
    borderWidth: 2,
    borderColor: 'tomato',
  },
  icon: {
    fontSize: 30,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
