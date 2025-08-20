import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import IntroHeader from '../../components/Home/IntroHeader'
import MyCarousel from '../../components/Home/Carousel'
import CardIteam from '../../components/Home/CardIteam'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProduct } from '../../reduxtollkit/ProductSlice'
const Home = () => {
  const dispatch = useDispatch();
  const dataProduct = useSelector((store) => store.products);
  const data = [
    { id: 1, image: "https://picsum.photos/600/400?1" },
    { id: 2, image: "https://picsum.photos/600/400?2" },
    { id: 3, image: "https://picsum.photos/600/400?3" },
    { id: 4, image: "https://picsum.photos/600/400?4" },
  ];
  const categories = [
    { id: "1", name: "Lego", image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-4co39hUWEJP0hqqTJ69PaM8SxEYwYC.png&w=500&q=75" },
    { id: "2", name: "Robot", image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-JLGCwuVRfvOMwVMpimP9wXFiu6Nw4x.png&w=160&q=75" },
    { id: "3", name: "Xe hơi", image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-JLGCwuVRfvOMwVMpimP9wXFiu6Nw4x.png&w=160&q=75" },
    { id: "4", name: "Búp bê", image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-JLGCwuVRfvOMwVMpimP9wXFiu6Nw4x.png&w=160&q=75" },
    { id: "5", name: "Board Game", image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-JLGCwuVRfvOMwVMpimP9wXFiu6Nw4x.png&w=160&q=75" },
  ];
  useEffect(() => {
    dispatch(getAllProduct())
  },[dispatch]);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
    >
      <Image style={{ width: 45, height: 45 }} source={{ uri: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-4co39hUWEJP0hqqTJ69PaM8SxEYwYC.png&w=500&q=75" }} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1 }}>
      <IntroHeader />
      <MyCarousel data={data} />
      <FlatList
        style={{ marginTop: 10, paddingHorizontal: 8, height: 100 }}
        data={categories}
        keyExtractor={(item) => item.id}
        horizontal={true}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})