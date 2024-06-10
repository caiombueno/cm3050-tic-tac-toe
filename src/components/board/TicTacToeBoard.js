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
        const isBoardValuesInvalid = !checkBoardValuesValidity(boardValues);
        // if boardValues isn't a 3x3 grid of 'X', 'O', or '' values, throw error
        if (isBoardValuesInvalid) throw new InvalidBoardValuesError();



        // get an array of [TicTacToeSquare] for a given rowIndex
        const getSquaresPerRow = (rowIndex) => {
            let squaresPerRow = [];
            // iterate through each column in the row
            for (let colIndex = 0; colIndex < colLength; colIndex++) {
                const value = boardValues[rowIndex][colIndex];
                const key = [rowIndex, colIndex];

                const square =
                    <TicTacToeSquare
                        key={key}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        rowLength={rowLength}
                        colLength={colLength}
                    >
                        {value}
                    </TicTacToeSquare>;

                squaresPerRow.push(square);
            }
            return squaresPerRow;
        };

        // get the [Row] components for the board
        const getRows = () => {
            var rows = [];
            for (let row = 0; row < rowLength; row++) {
                rows.push(<Row key={row}>{getSquaresPerRow(row)}</Row>);
            };
            return rows;
        };

        // wrap rows in a [Container]
        const container = <Container>{getRows()}</Container>;
        return (container);
    } catch (error) {
        console.error(error);
    }

}

const Container = (props) => (<View style={styles.container}>{props.children}</View>)

const Row = (props) => (<View style={styles.row}>{props.children}</View>)

const styles = StyleSheet.create({
    container: {
        margin: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    row: { flexDirection: 'row' },
});
