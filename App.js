import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [splitDay, setSplitDay] = useState('Lower Body');
  const [workingSets, setWorkingSets] = useState([]);
  
  // Hardcoding RPE to 8.5 for the MVP since I usually train near failure anyway
  const logSet = (load, reps) => {
    const setRecord = {
      id: Date.now().toString(),
      load,
      reps,
      rpe: 8.5 
    };
    setWorkingSets(prev => [...prev, setRecord]);
  };

  const clearSession = () => setWorkingSets([]);

  const switchSplit = () => {
    setSplitDay(prev => prev === 'Lower Body' ? 'Upper Body' : 'Lower Body');
    clearSession();
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.headerBlock}>
        <Text style={styles.titleText}>{splitDay} Session</Text>
        <TouchableOpacity onPress={switchSplit}>
          <Text style={styles.swapText}>Swap Split</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.logArea}>
        {workingSets.length === 0 ? (
          <Text style={styles.emptyState}>No working sets logged yet.</Text>
        ) : (
          workingSets.map((s, index) => (
            <View key={s.id} style={styles.setRow}>
              <Text style={styles.setDetail}>Set {index + 1}</Text>
              <Text style={styles.setDetail}>{s.load} lbs</Text>
              <Text style={styles.setDetail}>{s.reps} reps</Text>
              <Text style={styles.setDetail}>@RPE {s.rpe}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.logBtn} onPress={() => logSet(135, 8)}>
          <Text style={styles.btnLabel}>+ Log 135x8</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logBtn} onPress={() => logSet(155, 5)}>
          <Text style={styles.btnLabel}>+ Log 155x5</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.logBtn, styles.clearBtn]} onPress={clearSession}>
          <Text style={styles.btnLabel}>End Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: { flex: 1, backgroundColor: '#0f0f0f', paddingTop: 60, paddingHorizontal: 20 },
  headerBlock: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: '#333', paddingBottom: 15 },
  titleText: { color: '#fafafa', fontSize: 24, fontWeight: '800' },
  swapText: { color: '#00e676', fontSize: 16 },
  
  logArea: { flex: 1, marginTop: 20 },
  emptyState: { color: '#666', fontStyle: 'italic', marginTop: 10 },
  setRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1a1a1a', padding: 16, marginBottom: 8, borderRadius: 6 },
  setDetail: { color: '#ddd', fontSize: 16, fontWeight: '500' },

  controls: { paddingVertical: 30 },
  logBtn: { backgroundColor: '#2979ff', padding: 18, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  clearBtn: { backgroundColor: '#d50000', marginTop: 10 },
  btnLabel: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
