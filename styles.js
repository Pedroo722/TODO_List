import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginRight: 12,
        borderWidth: 1,
        padding: 10,
        flex: 1
    },
    modalInput: {
        borderWidth: 1,
        padding: 10,
        width: 300,
        margin: 50
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 100,
        marginHorizontal: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
    },
});

export default styles;