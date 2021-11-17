import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './src/screens/Home'
import FilmesTrailer from './src/screens/filmes/FilmesTrailer';

const Stack = createNativeStackNavigator();

export default function App(props) {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'TMDB - Buscador' }} />
        <Stack.Screen name="trailer" component={FilmesTrailer} options={{ title: 'Filme' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}