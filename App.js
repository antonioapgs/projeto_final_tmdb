import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './src/screens/Home'
import FilmesTrailer from './src/screens/filmes/FilmesTrailer';
import Reviews from './src/components/Reviews';
import Elenco from './src/screens/elenco/Elenco';

const Stack = createNativeStackNavigator();

export default function App(props) {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'TMDB - Buscador' }} />
        <Stack.Screen name="trailer" component={FilmesTrailer} options={{ title: 'Filme' }} />
        <Stack.Screen name="reviews" component={Reviews} options={{ title: 'Reviews' }} />
        <Stack.Screen name="elenco" component={Elenco} options={{ title: 'Elenco' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}