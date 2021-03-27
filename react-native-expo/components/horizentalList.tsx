import React from "react";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/Ionicons";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";

import { usersProps } from "../constants/types";
import styles from "../styles";

const HorizentalList = ({
  users,
  onPress,
  info,
  titile,
  iconType
}: {
  users: usersProps[];
  onPress?: (user) => void;
  info?: string;
  titile?: string;
  iconType?: string;
}) => {
  return (
    <>
      {users.length ? (
        <View>
          {titile && (
            <Text style={[styles.textCenter, styles.font22, styles.mTop5]}>
              {titile}
            </Text>
          )}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.Mbottom20} />
            <View style={styles.cardView}>
              {users?.map((u, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={[styles.horizentalList, styles.mTop]}
                    onPress={() => onPress(u)}
                  >
                    {iconType === "add" ? (
                      <Icon
                        name="ios-add-circle-sharp"
                        color="#c1e3c7"
                        size={35}
                        style={styles.avatarIcon}
                      />
                    ) : (
                      <Icon
                        name="ios-remove-circle-sharp"
                        color="#eba7a7"
                        size={35}
                        style={styles.avatarIcon}
                      />
                    )}
                    <UserAvatar
                      size={60}
                      key={u?.profile_picture}
                      name={`${u?.first_name} ${u?.last_name}`}
                      src={u?.profile_picture}
                      style={styles.avatar}
                    />
                    <Text style={[styles.textCenter, styles.mTop5]}>
                      {`${u?.first_name} ${u?.last_name}`.length > 5
                        ? `${u?.first_name} ${u?.last_name}`?.substring(0, 5) +
                          "..."
                        : `${u?.first_name} ${u?.last_name}`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      ) : (
        <>
          {info && <Text style={[styles.textCenter, styles.mTop]}>{info}</Text>}
        </>
      )}
    </>
  );
};

export default HorizentalList;
