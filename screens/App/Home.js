import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import IntroHeader from '../../components/Home/IntroHeader'
import MyCarousel from '../../components/Home/Carousel'
import CardIteam from '../../components/Home/CardIteam'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProduct } from '../../reduxtollkit/ProductSlice'
import { getCategories } from '../../reduxtollkit/CatagorySlice'


const Home = () => {
  const dispatch = useDispatch();
  const dataProduct = useSelector((store) => store.products.items);
  const dataCategories = useSelector((store) => store.categories.items);
  const categoriesToShow = [
    ...dataCategories.slice(0, 3), // lấy 3 category đầu tiên
    { id: "all", name: "Tất cả", image: "https://cdn-icons-png.flaticon.com/512/1828/1828778.png" }
  ];
  const data = [
    { id: 1, image: "https://picsum.photos/600/400?1" },
    { id: 2, image: "https://picsum.photos/600/400?2" },
    { id: 3, image: "https://picsum.photos/600/400?3" },
    { id: 4, image: "https://picsum.photos/600/400?4" },
  ];

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProduct())
  }, [dispatch]);

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image style={{ width: 45, height: 45 }} source={{ uri: item.image }} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>

      <IntroHeader />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <MyCarousel data={data} />

        <View style={{ height: 100, marginTop: 10 }}>
          <FlatList
            style={{ paddingHorizontal: 8 }}
            data={categories}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={renderCategory}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={{ paddingHorizontal: 8, marginTop: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Sản phẩm mới</Text>
          <FlatList
            data={dataProduct}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CardIteam imageUrl={item.image} name={item.name} price={item.price} />
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
    borderRadius: 16,
    marginRight: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between'
  }
})
