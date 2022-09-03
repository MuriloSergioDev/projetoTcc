import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(229, 229, 229)',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight
    },
    logo: {
        height: Dimensions.get('window').height* 0.3,
        width: Dimensions.get('window').width * 0.5,
        resizeMode: "contain",
        marginBottom: 50
    },
    input: {
        padding: 5,
        fontSize: 20,
        width: Dimensions.get('window').width * 0.7,
        backgroundColor: 'rgb(229, 229, 229)',
    },
    text: {
        color: '#6556A0',
        width: Dimensions.get('window').width * 0.7,
        fontSize: 20
    },
    inputBox: {
        marginBottom: 20,
    },
    buttonBox: {
        marginVertical: 10,
    },
    textForget: {
        marginTop: 10,
        width: Dimensions.get('window').width * 0.7,
        color: '#6556A0',
        fontWeight: 'bold',
        marginBottom: 50
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      contentBox: {
        height: Dimensions.get('window').height* 0.6,
      }
});