import React, {useState} from 'react';
import {useRoute, StackActions, useNavigation} from '@react-navigation/native';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {Header, Card, Button, SearchBar} from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import FastImage from 'react-native-fast-image';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import Styles from '../styles';

const Create = () => {
  const route = useRoute();
  const navigator = useNavigation();

  const [date, setDate] = useState(new Date());
  const [search, setSearch] = useState('');
  const [people, setPeople] = useState([
    {
      name: 'brynn',
      avatar: 'https://i.pravatar.cc/300',
    },
    {
      name: 'Alex',
      avatar: 'https://i.pravatar.cc/300',
    },
    {
      name: 'Jhon',
      avatar: 'https://i.pravatar.cc/300',
    },
    {
      name: 'brynn',
      avatar: 'https://i.pravatar.cc/300',
    },
    {
      name: 'Alex',
      avatar: 'https://i.pravatar.cc/300',
    },
    {
      name: 'Jhon',
      avatar: 'https://i.pravatar.cc/300',
    },
    {
      name: 'brynn',
      avatar: 'https://i.pravatar.cc/300',
    },
    {
      name: 'Alex',
      avatar: 'https://i.pravatar.cc/300',
    },
    {
      name: 'Jhon',
      avatar: 'https://i.pravatar.cc/300',
    },
  ]);

  const handleBack = () => {
    const popAction = StackActions.pop(1);
    navigator.dispatch(popAction);
  };

  const updateSearch = search => {
    setSearch(search);
  };

  return (
    <ScrollView>
      <Header
        leftComponent={{icon: 'arrow-back', color: '#fff', onPress: handleBack}}
      />
      <Card>
        <SearchBar
          placeholder="Search People"
          onChangeText={updateSearch}
          containerStyle={{
            backgroundColor: 'none',
            borderBottomColor: 'white',
            borderTopColor: 'white',
          }}
          inputContainerStyle={{
            backgroundColor: 'none',
          }}
          inputStyle={{backgroundColor: 'none'}}
          lightTheme
          value={search}
        />
      </Card>
      <Card>
        {true ? (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={Styles.cardView}>
              {people?.map((u, i) => {
                return (
                  <TouchableOpacity key={i} style={Styles.flatList}>
                    <FastImage
                      style={Styles.fastImage}
                      source={{
                        uri: u.avatar,
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={Styles.textCenter}>
                      {u.name.length > 5
                        ? u.name.substring(0, 5) + '...'
                        : u.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <Text style={Styles.textCenter}>No People added</Text>
        )}
      </Card>
      <Card>
        <DatePicker date={date} onDateChange={setDate} />
      </Card>
      <Card>
        <Input
          placeholder="message"
          multiline
          leftIcon={{type: 'font-awesome', name: 'pencil-square-o'}}
          style={Styles.left5}
        />
      </Card>
      <Card>
        <Button
          buttonStyle={Styles.buttonBackground}
          icon={
            <Icon
              name="ios-calendar-outline"
              color="#ffffff"
              size={20}
              style={Styles.right10}
            />
          }
          title="Add Reminder"
        />
      </Card>
    </ScrollView>
  );
};

export default Create;
