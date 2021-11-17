import React, { useEffect, useState } from 'react'
import { Linking, ScrollView, TouchableOpacity, Image, Text } from 'react-native'
import { Button, Card, Divider, List, Paragraph, Title } from 'react-native-paper'
import Carregando from '../../components/Carregando'
import apiFilmes from '../../services/apiFilmes'
import { Row, Column as Col } from 'react-native-responsive-grid'

const FilmesTrailer = ({navigation, route}) => {

    const [filme, setFilme] = useState({})
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const id = route.params.id

        apiFilmes.get(`/movie/${id}?language=pt-BR`).then(resultado => {
            setFilme(resultado.data)
        })

        apiFilmes.get(`/movie/${id}/videos`).then(resultado => {
            setVideos(resultado.data.results.sort((a, b) => a.name > b.name ? 1 : -1))
        })

    }, [])

    return (
        <ScrollView>
            <Card
                key={filme.id}
                margin={10}>
                <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w500/' + filme.backdrop_path }} />
                <Card.Content>
                    <Title>{filme.title}</Title>
                    <Divider  />
                    <Paragraph>{filme.overview}</Paragraph>
                    <Divider  />
                    <Paragraph>{`Qtd. de avaliações: ${filme.vote_count}`}</Paragraph>
                    <Divider  />
                    <Paragraph>{`Nota média: ${filme.vote_average}`}</Paragraph>
                    <Divider  />
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => navigation.push('elenco', {id: filme.id })}>Elenco</Button>
                    <Button onPress={() => navigation.push('reviews', {id: filme.id })}>Reviews</Button>
              </Card.Actions>
            </Card>
            <Row margin={10}>
                <Col size={100}>
                    <Title>Trailer e outros videos relacionados</Title>
                </Col>
            </Row>
            <Row margin={10}>
                {!videos.length && <Carregando />}
                {videos.map(video => (
                    <Col size={50} key={video.id} >
                        <TouchableOpacity
                            onPress={() => 
                                Linking.openURL('vnd.youtube:' + video.key)
                            }>
                            <Image
                                style={{ height: 300, margin: 5 }}
                                source={{ uri: 'https://image.tmdb.org/t/p/w500/' + filme.poster_path }}
                            />
                            <Paragraph>{video.name}</Paragraph>
                        </TouchableOpacity>            
                    </Col>    
                ))}
            </Row>
        </ScrollView>
    )
}

export default FilmesTrailer
