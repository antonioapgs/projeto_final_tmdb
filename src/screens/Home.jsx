import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import { List, Searchbar } from 'react-native-paper';
import Carregando from '../components/Carregando';
import apiFilmes from '../services/apiFilmes';

const Home = ({navigation}) => {

    const [filtro, setFiltro] = useState('');
    const [generos, setGeneros] = useState([]);
    const [movies, setMovies] = useState([]);
    const [generosFiltrados, setGenerosFiltrados] = useState([]);

    useEffect(() => {

        apiFilmes.get(`/genre/movie/list?language=pt-BR`).then(resultado => {
            setGeneros(resultado.data.genres)
        })

    }, [])

    const searchFilterFunction = (text) => {
        if (text) {
          const newData = generos.filter(function (genero) {
            const itemData = genero.name
              ? genero.name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });

          setGenerosFiltrados(newData);
          setFiltro(text);
        } else {
          setGenerosFiltrados(generos);
          setFiltro('');
        }
    };

    const getMovies = (idGenre) => {
        console.log(idGenre);
        apiFilmes.get(`/discover/movie?language=pt-BR&with_genres=${idGenre}`).then(resultado => {
            console.log(resultado);
            setMovies(resultado.data.results)
        })
    };

    return (
        <ScrollView>
            <Searchbar
                placeholder="Pesquisar os gêneros de filmes"
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={(text) => searchFilterFunction(text)}
                value={filtro}
            />

            <List.Section title="Gênero">
                {!generosFiltrados.length && filtro.length > 0 && <Carregando />}
                {generosFiltrados.map(item => (
                    <List.Accordion key={item.id}
                        title={item.name}
                        left={props => <List.Icon {...props} icon="movie" />}
                        onPress={() => getMovies(item.id)}>
                            {!movies.length && <Carregando />}
                            {movies.sort().map(movie => (
                                <List.Item button 
                                    key={movie.id}
                                    title={movie.title} 
                                    onPress={() => navigation.push('trailer', {id: movie.id})} />
                            ))}
                    </List.Accordion>
                ))}
            </List.Section>
        </ScrollView>

    );
}

export default Home
