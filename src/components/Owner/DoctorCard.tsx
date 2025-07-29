import { StyleSheet, Text, View, Image } from 'react-native';
import React, { memo } from 'react';

// const fakeHeavyComputation = () => {
//   console.log(`🧠 Running heavy calc for `);
//   let total = 0;
//   for (let i = 0; i < 5000; i++) {
//     console.log('i', i);

//     total += i;
//   }

//   console.log('total', total);

//   return total;
// };

interface DoctorItem {
  name: string;
  image: string;
  location: string;
  rating: number;
  specializations: string[];
  availability: {
    [day: string]: string[]; // e.g., { Monday: ['10:00 AM', '2:00 PM'] }
  };
}

interface DoctorCardProps {
  item: DoctorItem;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ item }) => {
  console.log('rendered');

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {/* Doctor Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                item.image ||
                'https://images.pexels.com/photos/6234618/pexels-photo-6234618.jpeg',
            }}
            style={styles.doctorImage}
          />
        </View>

        {/* Doctor Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.meta}>
            📍 {item.location} | ⭐ {item.rating}
          </Text>

          {/* Specializations as chips */}
          <Text style={styles.label}>Specializations:</Text>
          <View style={styles.chipsContainer}>
            {item.specializations.map((specialization, index) => (
              <View key={index} style={styles.chip}>
                <Text style={styles.chipText}>{specialization}</Text>
              </View>
            ))}
          </View>

          {/* Availability */}
          <Text style={styles.label}>Availability:</Text>
          <View style={styles.availabilityContainer}>
            {Object.entries(item.availability).map(([day, slots]) => (
              <Text key={day} style={styles.availability}>
                <Text style={styles.dayText}>{day}:</Text> {slots.join(', ')}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(DoctorCard);

export default memo(DoctorCard);
// export default DoctorCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  imageContainer: {
    marginRight: 16,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e9ecef',
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginTop: 8,
    marginBottom: 8,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  availabilityContainer: {
    marginTop: 4,
  },
  availability: {
    fontSize: 13,
    color: '#495057',
    marginBottom: 2,
    lineHeight: 18,
  },
  dayText: {
    fontWeight: '600',
    color: '#212529',
  },
});
