
import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/Home/CardIteam';

const SearchResults = () => {
    const { searchResults, searchStatus } = useSelector((state) => state.products);

    const renderItem = ({ item }) => (
        <View style={styles.cardWrapper}>
            <ProductCard
                imageUrl={item.image}
                name={item.name}
                price={item.price}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {searchStatus === 'loading' && <Text style={styles.statusText}>Đang tải...</Text>}
            {searchStatus === 'succeeded' && searchResults.length === 0 && (
                <Text style={styles.statusText}>Không tìm thấy sản phẩm phù hợp</Text>
            )}
            {searchStatus === 'succeeded' && searchResults.length > 0 && (
                <FlatList
                    data={searchResults}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
};

export default SearchResults;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
    cardWrapper: {
        flex: 1,
        margin: 5,
        minWidth: 170,
        maxWidth: '48%',
    },
    statusText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});