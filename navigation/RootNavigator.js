// RootNavigator.js
import React, { useState, useEffect } from "react";
import { Text } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { supabase } from "../config/supabase";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { useSelector } from "react-redux"; // hoặc context, zustand tuỳ bạn
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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
            setSession(session);
        });


        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);
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
