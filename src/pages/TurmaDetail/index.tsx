import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ImageBackground, Text, Image, Switch, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { View } from 'react-native';
import styles from './styles'
import Button from '../../components/Button'
import TurmaModal from '../../components/TurmaModal'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import DatePicker from '@react-native-community/datetimepicker'
import { useState } from 'react';
import DatePicker from '../../components/DatePicker';
import { TextInput } from 'react-native-paper';
import { TurmaInterface, UserInterface } from '../../interface/interface';
import firebase from 'firebase';
import AlertModal from '../../components/AlertModal';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../../config/Firebase';
import { Foundation } from '@expo/vector-icons';

const TurmaDetail = ({ route }) => {

    const { id, title, status } = route.params
    const navigation = useNavigation();
    const [turma, setTurma] = useState<TurmaInterface>({
        id,
        title,
        status,
    })
    const [studentAdd, setStudentAdd] = useState('')
    const [studentRemove, setStudentRemove] = useState('')
    const [modalAlertVisible, setModalAlertVisible] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    function navigateBack() {
        navigation.goBack();
    }

    async function handleAddTurmaAluno() {

        try {
            const userData = await db
                .collection('users')
                .where('uid', '==', studentAdd)
                .get()

                let userTurma = ''
                userData.forEach((doc)=>{
                    userTurma = doc.get('turma')
                })

            if (userData.docs.length && userTurma !== turma.title) {
                
                const data = {
                    turma: turma.title
                }
                db.collection('users')
                    .doc(studentAdd)
                    .update(data)
                setMessageAlert('Aluno adcionado na turma')
                setModalAlertVisible(true)
            }else if(userTurma === turma.title){
                setMessageAlert('Aluno já está na turma')
                setModalAlertVisible(true)
            } else {
                setMessageAlert('Aluno nao encontrado')
                setModalAlertVisible(true)
            }


        }
        catch (error) {
            setMessageAlert('Erro ao adcionar aluno')
            setModalAlertVisible(true)
            //alert(error)
        }
    }

    async function handleRemoveTurmaAluno() {

        try {
            // const data = {
            //     turma: turma.title
            // }
            const userData = await db
                .collection('users')
                .where('uid', '==', studentRemove)
                .where('turma', '==', turma.title)
                .get()

            if (userData.docs.length) {
                const data = {
                    turma: ''
                }
                db.collection('users')
                    .doc(studentRemove)
                    .update(data)
                setMessageAlert('Aluno removido da turma')
                setModalAlertVisible(true)
            } else {
                setMessageAlert('Aluno nao encontrado')
                setModalAlertVisible(true)
            }

            setModalAlertVisible(true)

        }
        catch (error) {
            setMessageAlert('Erro ao remover Aluno')
            setModalAlertVisible(true)
            //alert(error)
        }
    }

    let modalIcon = messageAlert == 'Aluno removido da turma' || messageAlert == 'Aluno adcionado na turma' ? <AntDesign name="checkcircle" size={24} color="green" /> : <Foundation name="alert" size={24} color="#e6d927" />

    return (
        <View style={styles.container}>

            <View style={styles.nav}>
                <View style={styles.navUp}>
                    <Feather name="arrow-left" size={30} color="white" onPress={() => { navigateBack() }} />
                    <Image
                        style={styles.logo}
                        source={require("../../public/logoalt.png")}></Image>
                </View>

            </View>

            <AlertModal
                header={messageAlert}
                comfirmationString='Ok'
                isVisible={modalAlertVisible}
                close={() => {
                    setModalAlertVisible(false)
                }}>
                {modalIcon}
            </AlertModal>
            <ScrollView>
                <View style={styles.containerContent}>
                    <View style={styles.navDown}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.textAtivo}>{turma.title}</Text>
                        </View>
                        <View style={styles.containerAtivo}>
                            <Text style={styles.textAtivo}>Status</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: turma.status ? '#07b022' : 'red' }}>{turma.status ? 'Ativo' : 'Inativo'}</Text>
                        </View>
                    </View>

                    
                </View>
            </ScrollView>
        </View>
    )
}

export default TurmaDetail;