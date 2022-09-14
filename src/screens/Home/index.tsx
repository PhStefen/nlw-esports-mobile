import React from 'react';
import { FlatList, Image, View } from 'react-native';
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from '../../components/Heading';
import { GameCard } from '../../GameCard';
import { styles } from './styles';

import { GAMES } from '../../utils/games';

export function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={logoImg}
        style={styles.logo}
      />

      <Heading title='Encontre seu duo!' subtitle='Seleicone o game que deseja achar' />

      <FlatList
        contentContainerStyle={styles.contentList}
        data={GAMES}
        keyExtractor={item => item.id}
        renderItem={ ({item}) => <GameCard data={item} /> }
        horizontal
        showsHorizontalScrollIndicator={false}
      />

    </View>
  );
}