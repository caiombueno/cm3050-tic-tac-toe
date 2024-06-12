import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

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



/// TicTacBoard.js

function TicTacToeBoard(props) {
  const boardValues = props.boardValues;
  const rowLength = 3;
  const colLength = 3;

  const checkBoardValuesValidity = (boardValues) => {
    const hasCorrectNumberOfRows = boardValues.length === rowLength;
    const hasCorrectNumberOfColumns = boardValues.every(row => row.length === colLength);
    const hasValidValues = boardValues.every(row => row.every(value => ['X', 'O', ''].includes(value)));
    return hasCorrectNumberOfRows && hasCorrectNumberOfColumns && hasValidValues;
  };

  try {
    if (!checkBoardValuesValidity(boardValues)) {
      throw new InvalidBoardValuesError();
    }

    const getSquaresPerRow = (rowIndex) => {
      return boardValues[rowIndex].map((value, colIndex) => (
        <TicTacToeSquare
          key={`${rowIndex}-${colIndex}`}
          rowIndex={rowIndex}
          colIndex={colIndex}
        >
          {value}
        </TicTacToeSquare>
      ));
    };

    const getRows = () => {
      return boardValues.map((_, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {getSquaresPerRow(rowIndex)}
        </View>
      ));
    };

    return (
      <View style={styles.container}>
        {getRows()}
      </View>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}

// TicTacToeSquare.js

/// Represents a square in a TicTacToe board
function TicTacToeSquare(props) {
  const value = props.children;
  const style = props.style;

  let image;
  if (value === 'X') {
    image = require('./assets/images/x.png');
  } else if (value === 'O') {
    image = require('./assets/images/o.png');
  }

  return (
    <View style={[styles.square, style]}>
      {(image) ? <Image style={styles.image} source={image} /> : <SquareText>{value}</SquareText>}
    </View>
  );
};

const SquareText = props => (<Text style={styles.squareText}>{props.children}</Text>);


const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    margin: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: '1%',
  },
  squareText: { fontSize: 50, },
  image: {
    width: '100%',
    height: '100%',
  }
});

class InvalidBoardValuesError extends Error {
  constructor() {
    super();
    this.message = 'Invalid board values';
    this.name = 'InvalidBoardValuesError';
  }
}
