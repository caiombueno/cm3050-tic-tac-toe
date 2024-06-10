import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TicTacToeBoard from './src/components/board/TicTacToeBoard';

export default function App() {
  const boardValues = [
    ['X', 'O', 'O'],
    ['O', 'X', 'O'],
    ['X', 'O', 'X']
  ];
  return (
    <SafeAreaView style={styles.view}>
      {/* Render the TicTacToeBoard, passing the boardValues */}
      <TicTacToeBoard boardValues={boardValues} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});