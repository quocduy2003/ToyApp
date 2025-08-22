// RootNavigator.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../config/supabase";
import { getCurrentUser } from "../reduxtollkit/UserSlice";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const user = userState?.user;

    useEffect(() => {
        const checkSession = async () => {
            try {
                // Lấy phiên từ Supabase
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    // Kiểm tra thời gian hết hạn thủ công (nếu cần)
                    console.log('session:', session);
                    const storedSession = await AsyncStorage.getItem("customSession");
                    if (storedSession) {
                        const { expiresAt } = JSON.parse(storedSession);
                        console.log('expiresAt:', expiresAt);
                        if (new Date().getTime() < expiresAt) {
                            setSession(session);
                            // Load thông tin user từ database
                            dispatch(getCurrentUser());
                        } else {
                            await supabase.auth.signOut();
                            await AsyncStorage.removeItem("customSession");
                        }
                    }
                } 
            } catch (error) {
                console.error("Error checking session:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth state changed:', event, session);
            setSession(session);
            if (session && event === 'SIGNED_IN') {
                // Load thông tin user khi có session mới
                dispatch(getCurrentUser());
            } else if (event === 'SIGNED_OUT') {
                // Clear session khi đăng xuất
                setSession(null);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [dispatch]);
    if (isLoading) {
        return <Text>Đang tải...</Text>;
    }
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {session ? (
                <Stack.Screen name="App" component={AppNavigator} />
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            )}
        </Stack.Navigator>
    );
}
