import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { searchProducts, resetSearch } from '../../reduxtollkit/ProductSlice'
import LottieView from 'lottie-react-native'
const SearchScrean = ({ navigation }) => {
    const [searchText, setSearchText] = useState("")
    const dispatch = useDispatch();
    const { searchResults, searchStatus } = useSelector((state) => state.products);
    useEffect(() => {

        if (searchText.length > 0) {
            console.log("Search text changed:", searchText);
            dispatch(searchProducts(searchText));
        } else {
            dispatch(resetSearch());
        }
    }, [searchText, dispatch])
    const handleSearch = () => {
        navigation.navigate('ResultScreen', { searchQuery: searchText });
    };
    const handleSuggestionPress = (item) => {
        setSearchText(item.name);
        navigation.navigate('ProductDetail', { id: item.id });
    };
    const renderSuggestion = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleSuggestionPress(item)}
            style={styles.suggestionItem}
        >   
            <Image
                source={{ uri: item.image }}
                style={styles.suggestionImage}
            />
            <Text style={styles.suggestionText}>{item.name}</Text>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>

                <View style={styles.searchBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchText}
                        onChangeText={setSearchText}
                        autoFocus
                    />
                    {searchText.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchText('')}>
                            <Ionicons name="close-circle" size={20} color="gray" />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={handleSearch} style={{ marginLeft: 10, backgroundColor: "#FFC107", padding: 8, borderRadius: 8 }}>
                        <Ionicons name="search" size={22} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {searchText.length > 0 && searchStatus === 'succeeded' && searchResults.length > 0 && (
                <FlatList
                    data={searchResults}
                    renderItem={renderSuggestion}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.suggestionList}
                />
            )}

            {searchStatus === 'loading' && (
                <LottieView
                    source={require("../../assets/loading.json")} // file lottie loading
                    autoPlay
                    loop
                    style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 20 }}
                />
            )}
            {searchText.length > 0 && searchStatus === 'succeeded' && searchResults.length === 0 && (
                <Text style={styles.noResultsText}>Không tìm thấy sản phẩm</Text>
            )}
        </View>
    );
};

export default SearchScrean;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    backBtn: {
        marginRight: 8,
        padding: 4,
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 12,
        paddingHorizontal: 10,
        height: 45,
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 5,
    },
    suggestionList: {
        marginTop: 10,
        paddingHorizontal: 10,
    },
    suggestionItem: {
        maxWidth: '90%',
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    suggestionText: {
        fontSize: 14,
        color: '#333',
    },
    suggestionImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 10,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    noResultsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});