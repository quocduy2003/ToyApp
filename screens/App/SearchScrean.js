import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'


const SearchScrean = ({ navigation }) => {
    const [searchText, setSearchText] = useState("")

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
                        <TouchableOpacity onPress={() => setSearchText("")}>
                            <Ionicons name="close-circle" size={20} color="gray" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

        </View>
    )
}

export default SearchScrean

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    backBtn: {
        marginRight: 8,
        padding: 4,
    },
    searchBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        borderRadius: 12,
        paddingHorizontal: 10,
        height: 45,
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 5,
    },
})
