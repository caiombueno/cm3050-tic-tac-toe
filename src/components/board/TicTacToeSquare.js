import { StyleSheet, Text, View, PixelRatio } from 'react-native';


/// Represents a square in a TicTacToe board
export default function TicTacToeSquare(props) {
    const rowIndex = props.rowIndex;
    const colIndex = props.colIndex;
    const rowLength = props.rowLength;
    const colLength = props.colLength;
    const value = props.children;

    const getBorderStyle = (row, col) => {
        const style = {};
        if (row < rowLength - 1) style.borderBottomWidth = 1;
        if (col < colLength - 1) style.borderRightWidth = 1;
        return style;
    };

    return (
        <View style={[styles.square, getBorderStyle(rowIndex, colIndex)]}>
            <SquareText>{value}</SquareText>
        </View>
    );
};

const SquareText = props => (<Text style={styles.squareText}>{props.children}</Text>);

const styles = StyleSheet.create({
    square: {
        flex: 1,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
    },
    squareText: { fontSize: '50vw', },
});
