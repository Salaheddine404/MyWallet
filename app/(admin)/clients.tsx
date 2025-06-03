import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

// Mock data for demonstration
const clients = [
  { id: 1, fullName: 'Said Talibi', pan: '****7890', lastActive: '1 minute ago' },
  { id: 2, fullName: 'Yasmine El Mansouri', pan: '****5578', lastActive: '15 minutes ago' },
  { id: 3, fullName: 'Ahmed Al Fassi', pan: '****9012', lastActive: '1 hour ago' },
  { id: 4, fullName: 'Salma Ben Youssef', pan: '****3856', lastActive: '2 hours ago' },
  { id: 5, fullName: 'Nour El Houda Charif', pan: '****4890', lastActive: '3 hours ago' },
  { id: 6, fullName: 'Anas El Idrissi', pan: '****1145', lastActive: '4 hours ago' },
  { id: 7, fullName: 'Lina Al Amrani', pan: '****6189', lastActive: '5 hours ago' },
  { id: 8, fullName: 'Rania Benali', pan: '****0193', lastActive: '6 hours ago' },
  { id: 9, fullName: 'Othman El Hariri', pan: '****4567', lastActive: '7 hours ago' },
  { id: 10, fullName: 'Iman Al Rachidi', pan: '****8901', lastActive: '8 hours ago' },
  { id: 11, fullName: 'Marouane Al Ghamdi', pan: '****2345', lastActive: '9 hours ago' },
  { id: 12, fullName: 'Amina El Baraka', pan: '****6789', lastActive: '10 hours ago' },
  { id: 13, fullName: 'Walid Ibn Saoud', pan: '****0103', lastActive: '11 hours ago' },
  { id: 14, fullName: 'Hanane Al Mazrouei', pan: '****4567', lastActive: '12 hours ago' },
  { id: 15, fullName: 'Amine El Khattabi', pan: '****2901', lastActive: '13 hours ago' },
  { id: 16, fullName: 'Fatima Zahra Al Najjar', pan: '****2345', lastActive: '14 hours ago' },
  { id: 17, fullName: 'Hicham Al Farouqi', pan: '****6789', lastActive: '15 hours ago' },
  { id: 18, fullName: 'Dounia Al Marri', pan: '****0123', lastActive: '16 hours ago' },
  { id: 19, fullName: 'Zakaria El Ghazali', pan: '****4567', lastActive: '17 hours ago' },
  { id: 20, fullName: 'Khadija El Jazairi', pan: '****8901', lastActive: '18 hours ago' },
  { id: 21, fullName: 'Youssef Al Bakri', pan: '****3156', lastActive: '19 hours ago' },
  { id: 22, fullName: 'Nisrine Al Qadi', pan: '****7890', lastActive: '20 hours ago' },
  { id: 23, fullName: 'Mehdi Ben Hammou', pan: '****1634', lastActive: '21 hours ago' },
  { id: 24, fullName: 'Amal El Hafidi', pan: '****5618', lastActive: '22 hours ago' },
  { id: 25, fullName: 'Samir Al Shammari', pan: '****6012', lastActive: '23 hours ago' },
  { id: 26, fullName: 'Laila El Karoui', pan: '****2256', lastActive: '1 day ago' },
  { id: 27, fullName: 'Idriss Al Fakhouri', pan: '****6390', lastActive: '1 day ago' },
  { id: 28, fullName: 'Malak Al Omari', pan: '****1285', lastActive: '1 day ago' },
  { id: 29, fullName: 'Badr El Mahdi', pan: '****5318', lastActive: '1 day ago' },
  { id: 30, fullName: 'Soumaya El Khatib', pan: '****9552', lastActive: '1 day ago' },
  { id: 31, fullName: 'Taha Al Quraishi', pan: '****3926', lastActive: '1 day ago' },
  { id: 32, fullName: 'Kawtar Ibn Rushd', pan: '****7770', lastActive: '1 day ago' },
  { id: 33, fullName: 'Rachid Al Hanafi', pan: '****1634', lastActive: '1 day ago' },
  { id: 34, fullName: 'Sofia Al Zahrawi', pan: '****8778', lastActive: '1 day ago' },
  { id: 35, fullName: 'Ayman Benabdallah', pan: '****1512', lastActive: '1 day ago' },
  { id: 36, fullName: 'Imane El Filali', pan: '****3786', lastActive: '1 day ago' },
  { id: 37, fullName: 'Adil Al Ajmi', pan: '****7630', lastActive: '1 day ago' },
  { id: 38, fullName: 'Sara Al Moujahid', pan: '****3544', lastActive: '1 day ago' },
  { id: 39, fullName: 'Karim Al Tamimi', pan: '****6918', lastActive: '1 day ago' },
  { id: 40, fullName: 'Hiba Al Souissi', pan: '****3162', lastActive: '1 day ago' },
  { id: 41, fullName: 'Nabil El Idrissi', pan: '****7546', lastActive: '1 day ago' },
  { id: 42, fullName: 'Houda Al Dhahabi', pan: '****9630', lastActive: '1 day ago' },
  { id: 43, fullName: 'Mohamed Al Rifai', pan: '****5794', lastActive: '1 day ago' },
  { id: 44, fullName: 'Ilham Benchekroun', pan: '****6848', lastActive: '1 day ago' },
  { id: 45, fullName: 'Ziad Al Marzouki', pan: '****2512', lastActive: '1 day ago' },
  { id: 46, fullName: 'Sabah El Mekki', pan: '****3546', lastActive: '1 day ago' },
  { id: 47, fullName: 'Tarek Al Harbi', pan: '****2260', lastActive: '1 day ago' },
  { id: 48, fullName: 'Yousra Al Ayoubi', pan: '****1574', lastActive: '1 day ago' },
  { id: 49, fullName: 'Anouar El Ayachi', pan: '****4978', lastActive: '1 day ago' },
  { id: 50, fullName: 'Rym Al Khalifa', pan: '****3322', lastActive: '1 day ago' },
  { id: 51, fullName: 'Houssam Al Seddik', pan: '****7416', lastActive: '1 day ago' },
  { id: 52, fullName: 'Najwa Al Talhami', pan: '****3200', lastActive: '1 day ago' },
  { id: 53, fullName: 'Ismail El Amine', pan: '****7794', lastActive: '1 day ago' },
  { id: 54, fullName: 'Meriem Al Ghrib', pan: '****5618', lastActive: '1 day ago' },
  { id: 55, fullName: 'Ayoub Al Basri', pan: '****9002', lastActive: '1 day ago' },
  { id: 56, fullName: 'Nawal Al Louzi', pan: '****9956', lastActive: '1 day ago' },
  { id: 57, fullName: 'Reda Al Karroubi', pan: '****1200', lastActive: '1 day ago' },
  { id: 58, fullName: 'Meryem El Bouzidi', pan: '****1274', lastActive: '1 day ago' },
  { id: 59, fullName: 'Laith Al Hammadi', pan: '****4488', lastActive: '1 day ago' },
  { id: 60, fullName: 'Zineb Al Azouzi', pan: '****9112', lastActive: '1 day ago' },
  { id: 61, fullName: 'Omar Al Jazouli', pan: '****3056', lastActive: '1 day ago' },
  { id: 62, fullName: 'Sanae Al Kassimi', pan: '****0890', lastActive: '1 day ago' },
  { id: 63, fullName: 'Imad El Hassani', pan: '****2134', lastActive: '1 day ago' },
  { id: 64, fullName: 'Aicha Ben Arfa', pan: '****5068', lastActive: '1 day ago' },
  { id: 65, fullName: 'Ali Al Karkouri', pan: '****5412', lastActive: '1 day ago' },
  { id: 66, fullName: 'Mouna Al Mokhtari', pan: '****2656', lastActive: '1 day ago' },
  { id: 67, fullName: 'Fares Al Lakhmari', pan: '****3990', lastActive: '1 day ago' },
  { id: 68, fullName: 'Widad El Haddad', pan: '****7934', lastActive: '1 day ago' },
  { id: 69, fullName: 'Khalil Al Ghannouchi', pan: '****3078', lastActive: '1 day ago' },
  { id: 70, fullName: 'Bahia Al Idrissi', pan: '****3212', lastActive: '1 day ago' },
  { id: 71, fullName: 'Fouad Al Khouzami', pan: '****6556', lastActive: '1 day ago' },
  { id: 72, fullName: 'Asmae Al Lahlou', pan: '****7790', lastActive: '1 day ago' },
  { id: 73, fullName: 'Mazen El Abbassi', pan: '****6634', lastActive: '1 day ago' },
  { id: 74, fullName: 'Dalal Al Mejdoub', pan: '****0078', lastActive: '1 day ago' },
  { id: 75, fullName: 'Ayman Al Slaoui', pan: '****7532', lastActive: '1 day ago' },
  { id: 76, fullName: 'Kenza El Kharraz', pan: '****3156', lastActive: '1 day ago' },
  { id: 77, fullName: 'Nasser Al Barghouti', pan: '****1890', lastActive: '1 day ago' },
  { id: 78, fullName: 'Ines El Allami', pan: '****1287', lastActive: '1 day ago' },
  { id: 79, fullName: 'Tariq Al Hashimi', pan: '****5678', lastActive: '1 day ago' },
  { id: 80, fullName: 'Majda Al Hammani', pan: '****9012', lastActive: '1 day ago' },
  { id: 81, fullName: 'Yassine El Qadiri', pan: '****3256', lastActive: '1 day ago' },
  { id: 82, fullName: 'Wiam Al Chaabi', pan: '****7891', lastActive: '1 day ago' },
  { id: 83, fullName: 'Samy Al Khalil', pan: '****3437', lastActive: '1 day ago' },
  { id: 84, fullName: 'Ghita El Arroussi', pan: '****5670', lastActive: '1 day ago' },
  { id: 85, fullName: 'Marwan Al Slaoui', pan: '****9015', lastActive: '1 day ago' },
  { id: 86, fullName: 'Leila Al Khadiri', pan: '****3986', lastActive: '1 day ago' },
  { id: 87, fullName: 'Rayan Al Fikri', pan: '****7896', lastActive: '1 day ago' },
  { id: 88, fullName: 'Sabah Al Arabi', pan: '****1230', lastActive: '1 day ago' },
  { id: 89, fullName: 'Bassam Al Hachemi', pan: '****5238', lastActive: '1 day ago' },
  { id: 90, fullName: 'Hasna El Moumni', pan: '****9772', lastActive: '1 day ago' },
  { id: 91, fullName: 'Mourad Al Naimi', pan: '****3646', lastActive: '1 day ago' },
  { id: 92, fullName: 'Najat Al Rifi', pan: '****1260', lastActive: '1 day ago' },
  { id: 93, fullName: 'Ilyas Ibn Battuta', pan: '****0034', lastActive: '1 day ago' },
  { id: 94, fullName: 'Zohra Al Makhloufi', pan: '****5578', lastActive: '1 day ago' },
  { id: 95, fullName: 'Jawad Al Idrissi', pan: '****9892', lastActive: '1 day ago' },
  { id: 96, fullName: 'Hajar Al Hakam', pan: '****3746', lastActive: '1 day ago' },
  { id: 97, fullName: 'Azzedine Al Slaoui', pan: '****9090', lastActive: '1 day ago' },
  { id: 98, fullName: 'Ikram El Mehdi', pan: '****1134', lastActive: '1 day ago' },
  { id: 99, fullName: 'Oualid Al Sefiani', pan: '****5678', lastActive: '1 day ago' },
  { id: 100, fullName: 'Malika Al Taouil', pan: '****9452', lastActive: '1 day ago' }
];

export default function ClientsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Clients</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.gray[400]} />
          <Text style={styles.searchPlaceholder}>Search clients...</Text>
        </View>

        <ScrollView style={styles.clientList}>
          {clients.map((client) => (
            <View key={client.id} style={styles.clientCard}>
              <View style={styles.clientInfo}>
                <Text style={styles.clientName}>{client.fullName}</Text>
                <Text style={styles.clientPan}>PAN: {client.pan}</Text>
              </View>
              <View style={styles.clientMeta}>
                <Text style={styles.lastActive}>Last active: {client.lastActive}</Text>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: colors.gray[400],
    fontSize: 16,
  },
  clientList: {
    flex: 1,
  },
  clientCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  clientInfo: {
    marginBottom: 10,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  clientPan: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  clientMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastActive: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  viewButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
}); 