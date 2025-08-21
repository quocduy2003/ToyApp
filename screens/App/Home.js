import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import IntroHeader from '../../components/Home/IntroHeader'
import MyCarousel from '../../components/Home/Carousel'
import CardIteam from '../../components/Home/CardIteam'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProduct } from '../../reduxtollkit/ProductSlice'
import { fetchCategories } from '../../reduxtollkit/CategorySlice'


const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const dataProduct = useSelector((store) => store.products.items);
  const dataCategories = useSelector((store) => store.categories.list) || [];
  const categoriesToShow = [
    ...dataCategories.slice(0, 3), // lấy 3 category đầu tiên
    { id: "4", category_name: "Tất cả", category_image: "https://mxvzzfnncsdukkekbwmn.supabase.co/storage/v1/object/public/images-storage/select-all%20(1).png" }
  ];
  console.log(categoriesToShow);
  const data = [
    { id: 1, image: "https://picsum.photos/600/400?1" },
    { id: 2, image: "https://picsum.photos/600/400?2" },
    { id: 3, image: "https://picsum.photos/600/400?3" },
    { id: 4, image: "https://picsum.photos/600/400?4" },
  ];

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProduct())
  }, [dispatch]);

  const renderCategory = ({ item }) => {
    const isAll = item.category_name === "Tất cả";
    const handlePress = () => {
      if (isAll) {
        navigation.navigate("CategoryFull");
      } else {
        navigation.navigate("ResultScreen", { searchQuery: item.category_name });
      }
    };
    return (
      <TouchableOpacity style={styles.card} onPress={handlePress}>
        <Image style={{ width: 45, height: 45 }} source={{ uri: item.category_image }} />
        <Text style={styles.title}>{item.category_name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>

      <IntroHeader navigation={navigation} />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>


        <MyCarousel data={data} />

        <View style={{ padding: 10 }}>
          <FlatList
            data={categoriesToShow}
            keyExtractor={(item) => item.id}
            numColumns={4}
            scrollEnabled={false}
            renderItem={renderCategory}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
          />
        </View>

        <View style={{ paddingHorizontal: 8, marginTop: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Sản phẩm </Text>
          <FlatList
            data={dataProduct}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('DetailProduct', { id: item.id })}>
                <CardIteam imageUrl={item.image} name={item.name} price={item.price} />
              </TouchableOpacity>
            )}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderColor: '#ffc1072d',
    borderWidth: 1,
    borderRadius: 16,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-around'
  },

})