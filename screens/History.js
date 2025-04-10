import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChartSection from '../components/dashboard/ChartSection';
import TransactionList from '../components/dashboard/TransactionList';

const History = () => {
//   // Sample data - replace with your actual data source
//   const [transactions, setTransactions] = useState([
//     { id: '1', type: 'income', amount: 1000, description: 'Salary', date: '2025-04-01' },
//     { id: '2', type: 'Saving', amount: 200, description: 'Rent', date: '2025-04-02' },
//     { id: '3', type: 'income', amount: 500, description: 'Freelance', date: '2025-04-03' },
//     { id: '4', type: 'Saving', amount: 150, description: 'Car', date: '2025-04-05' },
//   ]);

//   const [filter, setFilter] = useState('all'); // 'all', 'income', 'expense'

//   const filteredTransactions = transactions.filter(transaction => {
//     if (filter === 'all') return true;
//     return transaction.type === filter;
//   });

//   const totalBalance = transactions.reduce((sum, transaction) => {
//     return transaction.type === 'income' 
//       ? sum + transaction.amount 
//       : sum - transaction.amount;
//   }, 0);

//   const renderTransaction = ({ item }) => (
//     <View style={styles.transactionItem}>
//       <View style={styles.transactionInfo}>
//         <Text style={styles.description}>{item.description}</Text>
//         <Text style={styles.date}>{item.date}</Text>
//       </View>
//       <Text style={[
//         styles.amount,
//         item.type === 'income' ? styles.income : styles.expense
//       ]}>
//         {item.type === 'income' ? '+' : '-'}${item.amount}
//       </Text>
//     </View>
//   );

  return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Transaction History</Text>
//         <Text style={styles.balance}>Balance: ${totalBalance}</Text>
//       </View>

//       <View style={styles.filterContainer}>
//         <TouchableOpacity 
//           style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
//           onPress={() => setFilter('all')}
//         >
//           <Text style={styles.filterText}>All</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.filterButton, filter === 'income' && styles.activeFilter]}
//           onPress={() => setFilter('income')}
//         >
//           <Text style={styles.filterText}>Income</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.filterButton, filter === 'Saving' && styles.activeFilter]}
//           onPress={() => setFilter('Saving')}
//         >
//           <Text style={styles.filterText}>Expenses</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={filteredTransactions}
//         renderItem={renderTransaction}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.listContainer}
//       />
//     </SafeAreaView>
<SafeAreaView style={styles.container}>


<View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>History</Text>
  <Text style={styles.sectionSubtitle}>view your previous saving goals </Text>
</View>

<TransactionList />
</SafeAreaView>
   );
};

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     padding: 20,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   balance: {
//     fontSize: 18,
//     color: '#666',
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     padding: 10,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   filterButton: {
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginHorizontal: 5,
//     backgroundColor: '#f0f0f0',
//   },
//   activeFilter: {
//     backgroundColor: '#007AFF',
//   },
//   filterText: {
//     color: '#333',
//   },
//   listContainer: {
//     padding: 10,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   transactionInfo: {
//     flex: 1,
//   },
//   description: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 5,
//   },
//   date: {
//     fontSize: 14,
//     color: '#666',
//   },
//   amount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   income: {
//     color: '#4CAF50',
//   },
//   expense: {
//     color: '#F44336',
//   },
// });

container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
    paddingTop: 0,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    fontFamily: "Roboto",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#1e1e1e80",
    marginTop: 4,
    fontFamily: "Roboto",
    marginBottom : 10
  },
});
export default History;
