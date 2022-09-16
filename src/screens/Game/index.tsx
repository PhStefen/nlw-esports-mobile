

import { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { GameParams } from '../../@types/@navigation';

import { Entypo } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';

import logoImg from '../../assets/logo-nlw-esports.png'
import { THEME } from '../../theme';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';

import { styles } from './styles';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

export function Game() {

    const [duos, setDuos] = useState<DuoCardProps[]>([]);

    const navigation = useNavigation();
    const route = useRoute();
    const game = route.params as GameParams;

    function handleGoBack() {
        navigation.goBack();
    }


    useEffect(() => {
        fetch(`http://192.168.15.6:3333/games/${game.id}/ads`)
            .then(response => response.json())
            .then(setDuos)
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>


                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={handleGoBack}
                    >
                        <Entypo
                            name='chevron-thin-left'
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>

                    <Image
                        source={logoImg}
                        style={styles.logo}
                    />

                    <View style={styles.right} />
                </View>

                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.cover}
                    resizeMode="cover"
                />

                <Heading
                    title={game.title}
                    subtitle="Conecte-se e comece a jogar!"
                >

                </Heading>

                <FlatList
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DuoCard
                            data={item}
                            onConnect={() => null}
                        />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={duos.length === 0 ? styles.contentEmptyList : styles.contentList}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.textEmptyList}>
                            Não há um anúncios publicados ainda.
                        </Text>
                    )}
                />

            </SafeAreaView>
        </Background >
    );
}