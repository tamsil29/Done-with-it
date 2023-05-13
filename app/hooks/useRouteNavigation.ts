import React from 'react'
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const useRouteNavigation = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  return navigation
}

export default useRouteNavigation