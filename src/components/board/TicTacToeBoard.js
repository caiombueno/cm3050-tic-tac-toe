import React from 'react';
import { StyleSheet, View } from 'react-native';
import TicTacToeSquare from './TicTacToeSquare';
import InvalidBoardValuesError from '../../utils/errors';

export default function TicTacToeBoard(props) {
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

const styles = StyleSheet.create({
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
});
