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
    contentBox: {
        flex: 1,
        backgroundColor: 'rgb(229, 229, 229)',
        alignItems: 'center',
    },
    nav: {
        backgroundColor: '#6556A0',
        width: Dimensions.get('window').width,
        alignItems: 'flex-start',
        padding: 10,
        flexDirection: 'column',
    },
    textNav: {
        fontSize: 20,
        color: 'white',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    logo: {
        height: Dimensions.get('window').height* 0.2,
        width: Dimensions.get('window').width * 0.4,
        resizeMode: "contain",
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#6556A0',
        borderStyle: 'solid',
        padding: 5,
        fontSize: 20,
        width: Dimensions.get('window').width * 0.7,

    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20
    },
    inputBox: {
        marginBottom: 20
    },
    buttonBox: {
        marginTop: 'auto',
        marginBottom: 20
    },
    buttonMenuBox: {      
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Dimensions.get('window').width * 0.85,        
    },
    menuBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});