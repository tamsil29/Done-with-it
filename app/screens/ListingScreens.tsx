import React from 'react';
import { FlatList } from 'react-native';
import Screen from '../components/Screen';

const listings = [
    {
        id: 1,
        title: 'Red Jacket for sale',
        price: 100,
        image: 'https://i0.pickpik.com/photos/241/235/620/mountain-hiking-adventure-landscape-preview.jpg'
    }
]

function ListingScreens() {
    return (
        <Screen>
            <FlatList data={undefined} renderItem={undefined}/>
        </Screen>
    );
}

export default ListingScreens;