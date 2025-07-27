import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import doctors from '../../data/doctor.json';
import DoctorCard from '../../components/Owner/DoctorCard';

const DoctorSelection = () => {
  const renderDoctorItem = useCallback(({ item }) => {
    return <DoctorCard item={item} />;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Available Doctors</Text>
      <FlatList
        data={doctors}
        keyExtractor={item => item.id}
        renderItem={renderDoctorItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default DoctorSelection;

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
