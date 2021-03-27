import React, {useState} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {useRoute, StackActions, useNavigation} from '@react-navigation/native';
import {Header, Card, Button} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import {NAVIGATIONS} from '../constants/navigator';
import {remindersProps} from '../constants/types';
import Styles from '../styles';

const Event = () => {
  const route = useRoute();
  const navigator = useNavigation();

  const [reminders, setReminders] = useState<remindersProps[]>([
    {
      date: route?.params?.date,
      time: '11:30 PM',
      message:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis itaque autem praesentium molestias consequuntur? Eaque sapiente, doloremque aut rem dolorem dolore, et nulla quidem officiis ut vero cumque ducimus odio!',
      users: [
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
      ],
    },
    {
      date: route?.params?.date,
      time: '11:30 PM',
      message:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis itaque autem praesentium molestias consequuntur? Eaque sapiente, doloremque aut rem dolorem dolore, et nulla quidem officiis ut vero cumque ducimus odio!',
      users: [
        {
          name: 'brynn',
          avatar: 'https://i.pravatar.cc/300',
        },
      ],
    },
  ]);

  const handleBack = () => {
    navigator.dispatch(StackActions.popToTop());
  };

  const handleAdd = () => {
    navigator.navigate(NAVIGATIONS.CREATE);
  };

  return (
    <ScrollView>
      <Header
        leftComponent={{icon: 'arrow-back', color: '#fff', onPress: handleBack}}
      />
      <Card>
        {reminders?.length ? (
          <Card.Title>{reminders.length} Reminders</Card.Title>
        ) : (
          <Card.Title>No Reminders</Card.Title>
        )}
        <Card.Divider />
        <View>
          <Image
            resizeMode="cover"
            style={Styles.logoImageWithSelf}
            source={require('../assets/images/logo.png')}
          />
          <View style={Styles.bottom20} />
          <Text style={Styles.textCenter}>For {route?.params?.date}</Text>
        </View>
      </Card>
      {reminders?.map(reminder => {
        return (
          <Card>
            <Card.Title>{reminder?.time}</Card.Title>
            <Card.Divider />
            <View>
              <Text style={Styles.bottom20}>{reminder?.message}</Text>
              <Text style={Styles.bottom20}>People Include in Reminder</Text>
            </View>
            {reminder?.users?.map((u, i) => {
              return (
                <>
                  <Card.Divider />
                  <View key={i} style={Styles.cardView}>
                    <FastImage
                      style={Styles.fastImage}
                      source={{
                        uri: u.avatar,
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={Styles.username}>
                      {' '}
                      {u.name.length > 15
                        ? u.name.substring(0, 15) + '...'
                        : u.name}
                    </Text>
                  </View>
                </>
              );
            })}
            <ActionButton
              buttonColor="#1C70CA"
              degrees={0}
              size={50}
              style={Styles.Mbottom20}
              renderIcon={() => {
                return (
                  <Icon
                    name="md-newspaper-sharp"
                    style={Styles.actionButtonIcon}
                  />
                );
              }}>
              <ActionButton.Item
                buttonColor="#CA1C3B"
                title="Delete Reminder"
                onPress={() => {}}>
                <Icon name="md-trash-bin" style={Styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor="#1ABFA6"
                title="Edit Reminder"
                onPress={() => {}}>
                <Icon name="md-pencil" style={Styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
          </Card>
        );
      })}
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
          onPress={handleAdd}
          title="Add Reminder"
        />
      </Card>
    </ScrollView>
  );
};

export default Event;
