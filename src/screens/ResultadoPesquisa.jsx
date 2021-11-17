import React, { useEffect, useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { Button, Card, Divider, List, Paragraph, Title } from 'react-native-paper'
import apiFilmes from '../services/apiFilmes'

const ResultadoPesquisa = ({navigation, route}) => {

    const [artistas, setArtistas] = useState([])

    useEffect(() => {
        const query = route.params.query
        const type = route.params.type

        apiFilmes.get(`/search?q=${query}&type=${type}&offset=${0}&limit=${5}`).then(resultado => {
            console.log(resultado)
            setArtistas(resultado.artists.items)
        })
    }, [])

    return (
        <ScrollView margin={10}>
            <Button marginTop={10} icon="home" mode="contained" onPress={() => navigation.push('Home')}>
                Home
            </Button>
            {artistas.map(artista => (
                <Card size={50} key={artista.id}>
                    <Card.Title title={artista.name} left={LeftContent} />
                </Card>
            ))}
        </ScrollView>
    )
}

export default ResultadoPesquisa
