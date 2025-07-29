import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import React, { useCallback, useState, useMemo } from 'react';
import doctors from '../../data/doctor.json';
import DoctorCard from '../../components/Owner/DoctorCard';
import Header from '../../components/UI/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../type';

type DoctorSelectionNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'DoctorSelection'
>;

type Props = {
  navigation: DoctorSelectionNavProp;
};
const DoctorSelection = ({ navigation }: Props) => {
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name'); // 'name', 'rating-high', 'rating-low', 'location'

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const specializations = [
      ...new Set(doctors.flatMap(doc => doc.specializations)),
    ];
    const locations = [...new Set(doctors.map(doc => doc.location))];
    const availableDays = [
      ...new Set(doctors.flatMap(doc => Object.keys(doc.availability))),
    ];

    return {
      specializations: specializations.sort(),
      locations: locations.sort(),
      days: availableDays.sort(),
    };
  }, []);

  // Filter and sort doctors
  const filteredAndSortedDoctors = useMemo(() => {
    let filtered = doctors.filter(doctor => {
      // Specialization filter
      const matchesSpecialization =
        selectedSpecializations.length === 0 ||
        selectedSpecializations.some(spec =>
          doctor.specializations.includes(spec),
        );

      // Location filter
      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(doctor.location);

      // Availability filter
      const matchesAvailability =
        selectedDays.length === 0 ||
        selectedDays.some(day =>
          Object.keys(doctor.availability).includes(day),
        );

      // Rating filter
      const matchesRating = doctor.rating >= minRating;

      return (
        matchesSpecialization &&
        matchesLocation &&
        matchesAvailability &&
        matchesRating
      );
    });

    // Sort filtered results
    switch (sortBy) {
      case 'rating-high':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'rating-low':
        return filtered.sort((a, b) => a.rating - b.rating);
      case 'location':
        return filtered.sort((a, b) => a.location.localeCompare(b.location));
      case 'name':
      default:
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [
    doctors,

    selectedSpecializations,
    selectedLocations,
    selectedDays,
    minRating,
    sortBy,
  ]);

  const renderDoctorItem = useCallback(({ item }) => {
    return <DoctorCard item={item} />;
  }, []);

  const toggleFilter = (filterArray, setFilterArray, value) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter(item => item !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedSpecializations([]);
    setSelectedLocations([]);
    setSelectedDays([]);
    setMinRating(0);
    setSortBy('name');
  };

  const getActiveFiltersCount = () => {
    let count = 0;

    if (selectedSpecializations.length > 0) count++;
    if (selectedLocations.length > 0) count++;
    if (selectedDays.length > 0) count++;
    if (minRating > 0) count++;
    return count;
  };

  const FilterChip = ({ label, selected, onPress }) => (
    <Pressable
      style={[styles.filterChip, selected && styles.filterChipSelected]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.filterChipText,
          selected && styles.filterChipTextSelected,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );

  const RatingButton = ({ rating, selected, onPress }) => (
    <Pressable
      style={[styles.ratingButton, selected && styles.ratingButtonSelected]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.ratingButtonText,
          selected && styles.ratingButtonTextSelected,
        ]}
      >
        {rating}+ ⭐
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Available Doctors"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      {/* Filter and Sort Controls */}
      <View style={styles.controlsContainer}>
        <Pressable
          style={[
            styles.filterButton,
            getActiveFiltersCount() > 0 && styles.filterButtonActive,
          ]}
          onPress={() => setShowFilters(true)}
        >
          <Text
            style={[
              styles.filterButtonText,
              getActiveFiltersCount() > 0 && styles.filterButtonTextActive,
            ]}
          >
            Filters{' '}
            {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
          </Text>
        </Pressable>

        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <Pressable
            style={styles.sortButton}
            onPress={() => {
              const options = ['name', 'rating-high', 'rating-low', 'location'];
              const currentIndex = options.indexOf(sortBy);
              const nextIndex = (currentIndex + 1) % options.length;
              setSortBy(options[nextIndex]);
            }}
          >
            <Text style={styles.sortButtonText}>
              {sortBy === 'name' && 'Name'}
              {sortBy === 'rating-high' && 'Rating ↓'}
              {sortBy === 'rating-low' && 'Rating ↑'}
              {sortBy === 'location' && 'Location'}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Results Count */}
      <Text style={styles.resultsCount}>
        {filteredAndSortedDoctors.length} doctor
        {filteredAndSortedDoctors.length !== 1 ? 's' : ''} found
      </Text>

      {/* Doctor List */}
      <FlatList
        data={filteredAndSortedDoctors}
        keyExtractor={item => item.id}
        renderItem={renderDoctorItem}
        contentContainerStyle={{ paddingBottom: 20, marginHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <View style={styles.modalActions}>
              <Pressable onPress={clearAllFilters}>
                <Text style={styles.clearButton}>Clear All</Text>
              </Pressable>
              <Pressable onPress={() => setShowFilters(false)}>
                <Text style={styles.doneButton}>Done</Text>
              </Pressable>
            </View>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Specializations Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Specializations</Text>
              <View style={styles.filterChipsContainer}>
                {filterOptions.specializations.map(spec => (
                  <FilterChip
                    key={spec}
                    label={spec}
                    selected={selectedSpecializations.includes(spec)}
                    onPress={() =>
                      toggleFilter(
                        selectedSpecializations,
                        setSelectedSpecializations,
                        spec,
                      )
                    }
                  />
                ))}
              </View>
            </View>

            {/* Locations Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Locations</Text>
              <View style={styles.filterChipsContainer}>
                {filterOptions.locations.map(location => (
                  <FilterChip
                    key={location}
                    label={location}
                    selected={selectedLocations.includes(location)}
                    onPress={() =>
                      toggleFilter(
                        selectedLocations,
                        setSelectedLocations,
                        location,
                      )
                    }
                  />
                ))}
              </View>
            </View>

            {/* Availability Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Available Days</Text>
              <View style={styles.filterChipsContainer}>
                {filterOptions.days.map(day => (
                  <FilterChip
                    key={day}
                    label={day}
                    selected={selectedDays.includes(day)}
                    onPress={() =>
                      toggleFilter(selectedDays, setSelectedDays, day)
                    }
                  />
                ))}
              </View>
            </View>

            {/* Rating Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Minimum Rating</Text>
              <View style={styles.ratingContainer}>
                {[0, 3, 4, 4.5].map(rating => (
                  <RatingButton
                    key={rating}
                    rating={rating === 0 ? 'Any' : rating}
                    selected={minRating === rating}
                    onPress={() => setMinRating(rating)}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#212529',
  },
  searchInput: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal: 16,
  },
  filterButton: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  filterButtonActive: {
    backgroundColor: '#4A90E2',
  },
  filterButtonText: {
    fontWeight: '600',
    color: '#495057',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginRight: 8,
  },
  sortButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#495057',
  },
  resultsCount: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 16,
  },
  clearButton: {
    color: '#dc3545',
    fontWeight: '600',
  },
  doneButton: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#212529',
  },
  filterChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  filterChipSelected: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  filterChipText: {
    fontSize: 14,
    color: '#495057',
  },
  filterChipTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  ratingButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  ratingButtonSelected: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  ratingButtonText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
  ratingButtonTextSelected: {
    color: '#fff',
  },
});
