import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Avatar } from 'react-native-elements';
import appTheme from '../../../styles';

const UserAvatar: FC<{ size?: number; color?: string; username?: string }> = ({
  size,
  color,
  username,
}) => {
  return (
    <View style={styles.avatar}>
      <Avatar
        size={size || 120}
        title={"EP"}
        rounded
        activeOpacity={0.7}
        icon={{ name: 'user', type: 'font-awesome' }}
        containerStyle={{ backgroundColor: color || appTheme.colors.gray3 }}
      />
    </View>
  );
};

export default UserAvatar;

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
  },
});