import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'


import styles from './styles'
import Pageheader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

function Teacherlist() {
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeacher = JSON.parse(response);
                const favoritedTeacherID = favoritedTeacher.map((teacher: Teacher) => { return teacher.id })
                setFavorites(favoritedTeacherID)
            }
        });
    }

    useFocusEffect(() => {
        loadFavorites()
    })


    function handleToggleFiltersVisible() {
        setIsFilterVisible(!isFilterVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        })

        setIsFilterVisible(false);
        setTeachers(response.data)
    }

    return (
        <View style={styles.container} >
            <Pageheader title="Proffys disponíveis" headerRight={(
                <BorderlessButton onPress={handleToggleFiltersVisible}>
                    <Feather name="filter" size={20} color="#FFF" />
                </BorderlessButton>
            )} >
                {isFilterVisible && (<View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Qual a matéria"
                        value={subject}
                        onChangeText={text => setSubject(text)}
                        placeholderTextColor="#c1bccc"
                    />
                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da Semana</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Qual o dia?"
                                value={week_day}
                                onChangeText={text => setWeekDay(text)}
                                placeholderTextColor="#c1bccc"
                            />
                        </View>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Qual o horário?"
                                value={time}
                                onChangeText={text => setTime(text)}
                                placeholderTextColor="#c1bccc"
                            />
                        </View>

                    </View>
                    <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>)}
            </Pageheader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem
                        key={teacher.id}
                        teacher={teacher}
                        favorited={favorites.includes(teacher.id)}
                    />
                })}

            </ScrollView>
        </View>
    )
}

export default Teacherlist;