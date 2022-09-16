import { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.15.6:3333/games')
      .then(response => response.json())
      .then(setGames);
  }, []);

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading title='Encontre seu duo!' subtitle='Seleicone o game que deseja achar' />

        <FlatList
          contentContainerStyle={styles.contentList}
          data={games}
          keyExtractor={item => item.id}

          renderItem={({ item }) => {
            return (
              <GameCard
                data={item}
                onPress={() => handleOpenGame(item)}
              />
            )
          }}

          horizontal
          showsHorizontalScrollIndicator={false}
        />

      </SafeAreaView>
    </Background>
  );
}