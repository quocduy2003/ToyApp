import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const SearchComponent = () => {
  return (
    <View style={styles.container}>
      {/* Ô tìm kiếm */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#FFC107" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          placeholderTextColor="#B9D6F3"
        />
      </View>

      {/* Avatar/logo */}
      <Image
        source={{
          uri: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/7911322/avatar-icon-md.png",
        }}
        style={styles.avatar}
      />
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    // paddingVertical: 8,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FFC107", // khung viền vàng
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    height: 42,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#011F82", // đồng bộ text chính
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFC107", // avatar viền vàng
  },
});
