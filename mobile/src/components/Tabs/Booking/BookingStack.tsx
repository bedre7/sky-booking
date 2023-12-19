import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Booking from ".";
import BookingForm from "./BookingForm";
import { StackNavigationProp } from "@react-navigation/stack";

export type BookingStackParamList = {
  Booking: undefined;
  BookingForm: { flightId: number };
};

const BookingStack = createNativeStackNavigator<BookingStackParamList>();
export type BookingStackProps = StackNavigationProp<BookingStackParamList>;

const BookingStackScreen = () => {
  return (
    <BookingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BookingStack.Screen name="Booking" component={Booking} />
      <BookingStack.Screen name="BookingForm" component={BookingForm} />
    </BookingStack.Navigator>
  );
};

export default BookingStackScreen;
