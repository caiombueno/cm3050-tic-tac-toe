import { StyleSheet, Text, View, PixelRatio, Image } from 'react-native';


/// Represents a square in a TicTacToe board
export default function TicTacToeSquare(props) {
    const value = props.children;
    const style = props.style;

    let image;
    if (value === 'X') {
        image = require('../../assets/images/x.png');
    } else if (value === 'O') {
        image = require('../../assets/images/o.png');
    }

    return (
        <View style={[styles.square, style]}>
            {(image) ? <Image style={styles.image} source={image} /> : <SquareText>{value}</SquareText>}
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
        backgroundColor: 'white',
        margin: '1%',
    },
    squareText: { fontSize: 50, },
    image: {
        width: '100%',
        height: '100%',
    }
});
