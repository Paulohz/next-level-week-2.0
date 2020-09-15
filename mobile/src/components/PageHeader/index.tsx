import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler'

import backicon from '../../assets/images/icons/back.png'
import logoimg from '../../assets/images/logo.png'

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

interface Pageheaderprops {
    title: string;
    headerRight?: ReactNode;
}

const Pageheader: React.FC<Pageheaderprops> = ({ title, children, headerRight }) => {
    const { navigate } = useNavigation();

    function handleGoBack() {
        navigate('Landing');
    }
    return (
        <View style={styles.container} >
            <View style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={backicon} resizeMode="contain" />
                </BorderlessButton>

                <Image source={logoimg} resizeMode="contain" />
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>
                    {title}
                </Text>
                {headerRight}
            </View>



            {children}
        </View>
    )

}

export default Pageheader;