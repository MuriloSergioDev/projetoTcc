import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import styles from './styles';
import Button from '../../components/Button'
import { useState } from 'react';
import { DesempenhoInterface, UserInterface } from '../../interface/interface';
import firebase from "firebase";
import { db } from '../../config/Firebase';
import AlertModal from '../../components/AlertModal';
import { AntDesign } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { useEffect } from 'react';
import { Foundation } from '@expo/vector-icons';

type Props = {

}

const SignUp = ({ }: Props) => {

    const navigation = useNavigation();
    const [modalAlertVisible, setModalAlertVisible] = useState(false);
    const turmasTemp = []
    const [turmas, setTurmas] = useState([]);
    const [comfirmPassword, setComfirmPassword] = useState('');
    const [messageAlert, setMessageAlert] = useState('');
    const [user, setUser] = useState<UserInterface>(
        {
            name: '',
            email: '',
            password: '',
            turma: '',
            permission: 1
        }
    )

    useEffect(() => {
        getTurmas()
    }, [])

    async function handleSignUp() {

        if (user.name && user.email && user.password && comfirmPassword && user.turma) {
            console.log(user)
            try {
                const response = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

                await response.user.sendEmailVerification()

                if (response.user.uid) {
                    const data = {
                        uid: response.user.uid,
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        turma: user.turma,
                        permission: user.permission
                    }

                    db.collection('users')
                        .doc(response.user.uid)
                        .set(data)

                    setDesempenhoFirebase(response.user.uid)
                    setMessageAlert('Cadastro realizado com sucesso')
                    setModalAlertVisible(true)
                }
            }
            catch (error) {
                setMessageAlert('Erro ao realizar cadastro')
                setModalAlertVisible(true)
                //alert(error)
            }
        } else {
            setMessageAlert('Preencha todos os campos')
            setModalAlertVisible(true)
        }

    }

    async function getTurmas() {
        try {
            const data = await db
                .collection('turmas')
                .where('status', '==', true)
                .get()

            data.forEach((doc) => {

                const turma = {
                    value: doc.get("title"),
                    label: doc.get("title"),
                }
                //console.log(turma)
                turmasTemp.push(turma)
            })
            setTurmas(turmasTemp)
        }
        catch (error) {
            alert(error)
        }
    }

    async function setDesempenhoFirebase(uid) {

        const bimestres = [1, 2, 3, 4, 5]

        try {
            bimestres.map((bimestre) => {

                const data: DesempenhoInterface = {
                    uid,
                    turma: user.turma,
                    facil: 0,
                    medio: 0,
                    dificil: 0,
                    bimestre
                }

                db.collection('desempenho')
                    .doc(uid + user.turma + bimestre)
                    .set(data)
            })
        }
        catch (error) {
            alert(error)
        }
    }

    function navigateBack() {
        navigation.goBack();
    }

    let modalIcon = messageAlert == 'Cadastro realizado com sucesso' ? <AntDesign name="checkcircle" size={24} color="green" /> : <Foundation name="alert" size={24} color="#e6d927" />

    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={{alignItems: 'center'}}>
                    <Image
                        style={styles.logo}
                        source={require("../../public/logo.png")}></Image>

                    <AlertModal
                        header={messageAlert}
                        comfirmationString='Ok'
                        isVisible={modalAlertVisible}
                        close={() => {
                            setModalAlertVisible(false)
                            if (messageAlert == 'Cadastro realizado com sucesso') {
                                navigateBack()
                            }
                        }}>
                        {modalIcon}
                    </AlertModal>


                    <View style={styles.inputBox}>
                        {/* @ts-ignore */}
                        <TextInput
                            theme={{
                                colors: {
                                    placeholder: '#6556A0', text: '#6556A0', primary: '#6556A0'
                                }
                            }}
                            style={styles.input}
                            mode='flat'
                            label="Nome"
                            value={user.name}
                            onChangeText={(value => setUser(prevState => { return { ...prevState, name: value } }))}
                        />
                    </View>

                    <View style={styles.inputBox}>
                        {/* @ts-ignore */}
                        <TextInput
                            theme={{
                                colors: {
                                    placeholder: '#6556A0', text: '#6556A0', primary: '#6556A0'
                                }
                            }}
                            style={styles.input}
                            mode='flat'
                            label="Email"
                            value={user.email}
                            onChangeText={(value => setUser(prevState => { return { ...prevState, email: value } }))}
                        />
                    </View>

                    <View style={styles.inputBox}>
                        {/* @ts-ignore */}
                        <TextInput
                            theme={{
                                colors: {
                                    placeholder: comfirmPassword === user.password ? '#6556A0' : 'red', text: comfirmPassword === user.password ? '#6556A0' : 'red', primary: comfirmPassword === user.password ? '#6556A0' : 'red'
                                }
                            }}
                            style={styles.input}
                            secureTextEntry={true}
                            mode='flat'
                            label="Senha"
                            value={user.password}
                            onChangeText={(value => setUser(prevState => { return { ...prevState, password: value } }))}
                        />
                    </View>

                    <View style={styles.inputBox}>
                        {/* @ts-ignore */}
                        <TextInput
                            theme={{
                                colors: {
                                    placeholder: comfirmPassword === user.password ? '#6556A0' : 'red', text: comfirmPassword === user.password ? '#6556A0' : 'red', primary: comfirmPassword === user.password ? '#6556A0' : 'red'
                                }
                            }}
                            style={styles.input}
                            secureTextEntry={true}
                            mode='flat'
                            label="Confirmar senha"
                            value={comfirmPassword}
                            onChangeText={(value => setComfirmPassword(value))}
                        />
                    </View>

                    <View style={styles.inputBoxSelect}>
                        <RNPickerSelect
                            placeholder={{ label: 'Selecione uma turma', value: null }}
                            value={user.turma}
                            onValueChange={(value) => setUser(prevState => { return { ...prevState, turma: value } })}
                            items={turmas}
                            style={pickerSelectStyles}
                        />
                    </View>


                    <View style={styles.buttonBox}>
                        <Button
                            color='#F0D65D'
                            underlayColor='#d4bc50'
                            textColor='white'
                            label="CRIAR CONTA"
                            onPress={() => { handleSignUp() }}></Button>
                    </View>
                    <View style={styles.buttonBox}>
                        <Button
                            color='#6556A0'
                            underlayColor='#514580'
                            textColor='white'
                            label="JÁ POSSUO CONTA"
                            onPress={() => { navigateBack() }}></Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUp;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});