import React, { useState, useRef, useContext } from "react";
import { AnimatePresence, MotiImage, MotiView } from "moti";
import { Column, Label, Main, Title, Row, Scroll } from "@/constants/Global";
import { Dimensions, Pressable, ScrollView } from "react-native";
import { AntDesign, FontAwesome6, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";

import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
const { width, height } = Dimensions.get('window');

import Slider from '@react-native-community/slider';
import { Video, ResizeMode } from 'expo-av';
import { ThemeContext } from "styled-components/native";

export default function ShortDetails({ route, navigation,  }) {
  const item = route.params?.item;
  const { color, font, theme} = useContext(ThemeContext);
  const aboutModal = useRef(null);
  const video = useRef(null);
  
  const [type, settype] = useState('about');
  const [like, setLike] = useState(false);
  const [isPlay, setisPlay] = useState(true);
  const [time, settime] = useState(0);
  const togglePlay = () => { if (isPlay) { video.current.pauseAsync(); setisPlay(false)} else {video.current.playAsync(); setisPlay(true)}}

  return (
    <>
    <Main>
      <Pressable onPress={() => {navigation.goBack()}} style={{ width: 80, height: 12, marginBottom: -20, borderRadius: 100, backgroundColor: "#505050", zIndex: 99, alignSelf: 'center', marginVertical: 10, }}  />
      <Column style={{ width: time+'%', height: 5, position: 'absolute', top: 0, borderRadius: 100, backgroundColor: "#fff", zIndex: 99,  }}/>
      <Video
          ref={video}
          style={{ flex: 1, width: width, height:  height, borderRadius: 12, backgroundColor: '#404040', }}
          source={{ uri: item?.video }}
          resizeMode={ResizeMode.COVER}
          isLooping
          onLoad={() => {togglePlay(); setisPlay(!isPlay); }}
          posterSource={require('@/assets/images/placeholder-video.png')}
          onPlaybackStatusUpdate={e => settime((e.positionMillis / e.durationMillis * 100).toFixed(0)) }
          progressUpdateIntervalMillis={50}
        />
      <Pressable style={{ width: width, height: height, backgroundColor: "#30303000", position: 'absolute', top: 0, justifyContent: 'center', alignItems: 'center', }} onPress={() =>{togglePlay(); setisPlay(!isPlay)}}>
        <AnimatePresence>
        {isPlay ? 
          <MotiView from={{ opacity: 1,}} animate={{ opacity: 0,}}>
            <FontAwesome6 name="play" size={42} color="#fff" />
          </MotiView> : 
          <MotiView from={{ opacity: 0,}} animate={{ opacity: 1,}}>
            <FontAwesome6 name="pause" size={42} color="#fff" />
          </MotiView>
        }
        </AnimatePresence>
      </Pressable>
    </Main>

      <BottomSheet ref={aboutModal} snapPoints={[90, 350, '80%']} backgroundStyle={{backgroundColor: color.background, }} handleIndicatorStyle={{backgroundColor: "#d7d7d760"}}>
        <BottomSheetScrollView>

          <Row style={{ justifyContent: 'space-between', alignItems: 'center',  paddingHorizontal: 20, paddingBottom: 20, marginTop: 0, borderBottomColor: "#303030", borderBottomWidth: 2,}}>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
              <Pressable onPress={() => navigation.goBack()}  style={{ width: 42, height: 42, borderRadius: 100, marginLeft: -10, justifyContent: 'center', alignItems: 'center', }}>
                <AntDesign name="arrowleft" size={18} color={color.title} />
              </Pressable>

              <Pressable onPress={() => settype('about')} style={{ backgroundColor: type === 'about' ? color.title : 'transparent',  flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "#ffffff70",  borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8,}}>
                <Label style={{ color: type === 'about' ? color.background : color.title }}>Sobre</Label>
              </Pressable>

              <Pressable onPress={() => settype('video')} style={{ backgroundColor: type === 'video' ? color.title : 'transparent', marginLeft: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "#ffffff70",  borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8,}}>
                <Label style={{ color: type === 'video' ? color.background : color.title }}>Vídeo</Label>
              </Pressable>
            </Row>
            <Row>
              <Pressable style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: "#303030", justifyContent: 'center', alignItems: 'center', }}>
                {like ?<AntDesign name="heart" size={18} color="#fff" /> : <AntDesign name="hearto" size={18} color="#fff" />}
              </Pressable>
              <Pressable   style={{ width: 42, height: 42, borderRadius: 100, marginLeft: 12, backgroundColor: "#303030", justifyContent: 'center', alignItems: 'center', }}>
                  <FontAwesome6 name="share" size={18} color="#fff" />
              </Pressable>
            </Row>
          </Row>

          {type === 'video' && <MotiView from={{ opacity: 0, translateY: 40,}} animate={{ opacity: 1, translateY: 0,}} transition={{ type: 'timing', duration: 300,}}><Column style={{ padding: 20, }}>
            <Title style={{ fontSize: 32, marginBottom: 10, }}>Controles</Title>

          <Row style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop:20, }}>

            <Pressable style={{ width: 52, height: 52, backgroundColor: "#303030", justifyContent: 'center', borderRadius: 8, alignItems: 'center', }} onPress={() => video.current.setPositionAsync(time - 10)} >
              <MaterialCommunityIcons name="rewind" size={24} color="#fff" />
            </Pressable>
            
            <Pressable style={{ width: 52, height: 52, marginHorizontal: 20, backgroundColor: "#303030", justifyContent: 'center', borderRadius: 8, alignItems: 'center', }} onPress={() =>{togglePlay(); setisPlay(!isPlay)}}>
              <AnimatePresence>
              {isPlay ? <FontAwesome6 name="play" size={24} color="#fff" /> : <FontAwesome6 name="pause" size={24} color="#fff" />}
              </AnimatePresence>
            </Pressable>

            <Pressable style={{ width: 52, height: 52, backgroundColor: "#303030", justifyContent: 'center', borderRadius: 8, alignItems: 'center', }} onPress={() => video.current.setPositionAsync(time + 10)} >
              <MaterialCommunityIcons name="fast-forward" size={24} color="#fff" />
            </Pressable>

          </Row>

          

          <Column style={{ backgroundColor: "#303030", width: 170, alignSelf: 'center',  borderRadius: 100, marginHorizontal: 20,}}>
              <Slider
                style={{width: 100, height: 50, transform: [{ scaleX: 1.5 }, { scaleY: 1.5 },], marginHorizontal: 34,   }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#D7D7D7"
                thumbTintColor="#3E59AE"
                onValueChange={(value) => video.current.setVolumeAsync(value)}
              />
            </Column>


            </Column>
          </MotiView>}

          {type === 'about' &&  <MotiView from={{ opacity: 0, translateY: 40,}} animate={{ opacity: 1, translateY: 0,}} transition={{ type: 'timing', duration: 300,}}><Column style={{ padding: 20, }}>
            <Title style={{ fontSize: 32, marginBottom: 10, }}>{item.title}</Title>
            <Label>{item.desc}</Label>

            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 15, }}>
            <Pressable style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "#ffffff70",  borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8,}}>
                <MaterialCommunityIcons name="hands-pray" size={18} color="#fff" />
                <Label style={{ marginLeft: 10, }}>Agradecer</Label>
              </Pressable>
              <Pressable style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "#ffffff70",  borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8,}}>
                <FontAwesome6 name="hands-clapping" size={18} color="#fff" />
                <Label style={{ marginLeft: 10, }}>Palmas</Label>
              </Pressable>
              <Pressable style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "#ffffff70",  borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8,}}>
                <Fontisto name="bookmark" size={18} color="#fff" />
                <Label style={{ marginLeft: 10, }}>Favoritar</Label>
              </Pressable>
            </Row>


            <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, marginTop: 20, marginHorizontal: -20, paddingHorizontal: 20, borderTopColor: '#303030', borderTopWidth: 2, }}>
              <Title>Veja mais</Title>
              <Pressable style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "#303030",  borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8,}}>
                <MaterialCommunityIcons name="play" size={24} color="#fff" />
                <Label style={{ marginHorizontal: 10, }}>Assistir</Label>
              </Pressable>
            </Row>
            <ScrollView horizontal>
              <Column style={{ width: 140, marginVertical: 12,  marginRight: 12, backgroundColor: "#303030", borderRadius: 12, height: 200, }}></Column>
              <Column style={{ width: 140, marginVertical: 12,  marginRight: 12, backgroundColor: "#303030", borderRadius: 12, height: 200, }}></Column>
              <Column style={{ width: 140, marginVertical: 12,  marginRight: 12, backgroundColor: "#303030", borderRadius: 12, height: 200, }}></Column>
           
            </ScrollView>

            <Column>
              <Title>Anúncio</Title>
              <Column style={{ flexGrow: 1, marginVertical: 12, backgroundColor: "#303030", borderRadius: 12, height: 200, }}></Column>
            </Column>
          </Column></MotiView>}

        </BottomSheetScrollView>
      </BottomSheet>
   
    </>

  );
}

