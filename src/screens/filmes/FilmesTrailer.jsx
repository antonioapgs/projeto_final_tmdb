import React, { useEffect, useState } from 'react'
import { View, Linking, ScrollView, TouchableOpacity, Image, Text } from 'react-native'
import { Card, Paragraph, Snackbar, Title } from 'react-native-paper'
import Carregando from '../../components/Carregando'
import apiFilmes from '../../services/apiFilmes'
import { Row, Column as Col } from 'react-native-responsive-grid'

const FilmesTrailer = ({navigation, route}) => {

    const [filme, setFilme] = useState({})
    const [videos, setVideos] = useState([])
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    useEffect(() => {
        const id = route.params.id

        apiFilmes.get(`/movie/${id}?language=pt-BR`).then(resultado => {
            setFilme(resultado.data)
        })

        apiFilmes.get(`/movie/${id}/videos`).then(resultado => {
            setVideos(resultado.data.results)
        })

    }, [])

    return (
        <ScrollView>
            <Card
                key={filme.id}
                margin={10}
                onPress={onToggleSnackBar}>
                <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w500/' + filme.backdrop_path }} />
                <Card.Content>
                    <Title>{filme.title}</Title>
                    <Paragraph>{filme.overview}</Paragraph>
                </Card.Content>
            </Card>
            <Snackbar visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Ver trailer',
                    onPress: () => {
                        //make something
                    },
                }}>
                {`Este filme possui ${filme.vote_count} avaliações e está avaliado em ${filme.vote_average}.`}
            </Snackbar>
            <Row>
                <Col size={50}>
                    <Title>Trailer e Videos relacionados</Title>
                </Col>
            </Row>
            <Row>
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
                            <Text>{video.name}</Text>
                        </TouchableOpacity>            
                    </Col>    
                ))}
            </Row>
        </ScrollView>
    )
}

export default FilmesTrailer
