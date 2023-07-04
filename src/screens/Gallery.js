import React, { useState, useEffect } from 'react';
import { 
    FlatList, 
    Image, 
    View, 
    ActivityIndicator, 
    Text, 
    Dimensions, 
    StyleSheet, 
    TextInput, 
    Pressable 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { colors } from '../colors/Colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const Gallery = ({navigation}) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [filteredImages, setFilteredImages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`https://jsonplaceholder.typicode.com/photos`);
      const newImages = response.data;
      setImages(newImages);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const handleSearchBar = ()=>{
    setShowSearchBar(!showSearchBar)
  }

  const handleTextChange = (text) => {
    setText(text)
    if (text === ''){
        setFilteredImages([])
    }
    else{
        setIsLoading(true)
        const filtered = images.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredImages(filtered);
        setIsLoading(false)
    }
  };

  const renderItem = ({ item }) => (
    <Pressable style={{paddingLeft:'3%',marginTop:'3%'}} onPress={()=>navigation.navigate('details',{image:item})} >
        <Image source={{ uri: item.thumbnailUrl }} style={styles.imageView} />
        <Text style={styles.titltText}>{item.title.split(' ')[0]}</Text>
    </Pressable>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerView}>
        <View style={styles.iconsBar}>
            <Icon name="home" size={40} color={colors.white} />
            <Icon name="search" size={40} color={colors.white} onPress={handleSearchBar} />
        </View>
        <View style={{paddingTop:'3%',paddingLeft:'6%'}}>
            <Text style={styles.text1}>Home</Text>
            <Text style={styles.text2}>July 4, 2023</Text>
        </View>
        <View>
        { showSearchBar ? (
            <TextInput
                placeholder="Search Image"
                style={styles.searchBarStyle}
                placeholderTextColor={colors.black}
                onChangeText={handleTextChange}
                value={text}
            />
        ) : null
        }
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.blue} />
      ) : (
        <View style={{flex:1,flexGrow:1,marginTop:'3%',alignSelf:'center'}}>
            <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={filteredImages.length>0?filteredImages:images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            />
        </View>
      )}
    </View>
  );
};


export default Gallery;

const styles = StyleSheet.create({
    headerView:{
        backgroundColor:colors.darkGreen,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        height:SCREEN_HEIGHT*.25
    },
    iconsBar:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:'5%',
        paddingTop:'7%'
    },
    text1:{
        fontSize:RFPercentage(4),
        fontWeight:'700',
        color:colors.white
    },
    text2:{
        paddingTop:3,
        fontSize:RFPercentage(2.2),
        fontWeight:'400',
        color:colors.white
    },
    titltText:{
        fontSize:RFPercentage(2.2),
        textAlign:'center',
        fontWeight:'500',
        color:colors.grey2
    },
    imageView:{ 
        width: SCREEN_WIDTH*.42, 
        height: SCREEN_HEIGHT*.24, 
        borderRadius:10 
    },
    searchBarStyle:{
        backgroundColor:colors.white,
        marginVertical:'2%',
        width:'80%',
        alignSelf:'center',
        shadowColor: colors.grey5,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
        borderRadius:15
    }
})
