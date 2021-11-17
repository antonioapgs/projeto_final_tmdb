import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { Avatar, Button, Paragraph } from 'react-native-paper'
import { Row, Column as Col } from 'react-native-responsive-grid'
import Carregando from '../../components/Carregando'
import apiFilmes from '../../services/apiFilmes'

const Elenco = ({navigation, route}) => {

    const [atores, setAtores] = useState([])

    useEffect(() => {
        const id = route.params.id

        apiFilmes.get(`/movie/${id}/credits?language=pt-BR`).then(resultado => {
            setAtores(resultado.data.cast.sort((a, b) => a.name > b.name ? 1 : -1))
        })

    }, [])

    const imagemAtor = (foto) => {
        return foto ?
            <Avatar.Image size={50} source={{ uri: 'https://image.tmdb.org/t/p/w500/' + foto }} /> :
            <Avatar.Icon size={50} icon="duck" />
    }

    return (
        <ScrollView margin={10}>
            <Row>
                { !atores.length && <Carregando /> }
                {atores.map(ator => (
                    <Col size={33} key={ator.id}>
                        { imagemAtor(ator.profile_path) }
                        <Paragraph>{ator.name}</Paragraph>         
                    </Col>    
                ))}
            </Row>
            <Button icon="home" mode="contained" onPress={() => navigation.push('Home')}>Tela inicial</Button>
            
        </ScrollView>
    )
}

export default Elenco
