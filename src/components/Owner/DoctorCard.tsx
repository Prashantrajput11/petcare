import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const DoctorCard = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.meta}>
      📍 {item.location} | ⭐ {item.rating}
    </Text>
    <Text style={styles.label}>Specializations:</Text>
    <Text style={styles.specials}>{item.specializations.join(', ')}</Text>
    <Text style={styles.label}>Availability:</Text>
    {Object.entries(item.availability).map(([day, slots]) => (
      <Text key={day} style={styles.availability}>
        {day}: {slots.join(', ')}
      </Text>
    ))}
  </View>
);

export default DoctorCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  label: {
    fontWeight: '500',
    marginTop: 6,
  },
  specials: {
    fontSize: 14,
    color: '#333',
  },
  availability: {
    fontSize: 13,
    color: '#444',
  },
});
