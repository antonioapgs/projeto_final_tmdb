import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { Avatar, Button, List, Paragraph } from 'react-native-paper'
import apiFilmes from '../services/apiFilmes'

const Reviews = ({navigation, route}) => {
    
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const id = route.params.id

        apiFilmes.get(`/movie/${id}/reviews`).then(resultado => {
            setReviews(resultado.data.results)
        })

    }, [])

    const imagemAuthor = (details) => {
        return details.avatar_path ?
            <Avatar.Image size={50} source={{ uri: (details.avatar_path.indexOf('https') > -1 ? details.avatar_path.substring(1, details.avatar_path.length-1) : 'https://image.tmdb.org/t/p/w500' + details.avatar_path) }} /> :
            <Avatar.Icon size={50} icon="duck" />
    }

    return (
        <ScrollView>
            <List.Section margin={5}>
                {!reviews.length && <Paragraph style={{textAlign:'center'}}>Nenhum review registrado.</Paragraph> }
                {reviews.map(item => (
                    <List.Accordion key={item.id}
                        title={`Nota: ${item.author_details.rating ? item.author_details.rating : 'sem nota'} - ${item.author_details.username}`}
                        left={() => imagemAuthor(item.author_details)} >
                        <Paragraph margin={5}>{item.content}</Paragraph>
                    </List.Accordion>
                ))}
            </List.Section>
            <Button icon="home" mode="contained" onPress={() => navigation.push('Home')}>Tela inicial</Button>
        </ScrollView>
    )
}

export default Reviews
