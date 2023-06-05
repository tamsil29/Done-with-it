import React, { Dispatch } from "react";
import { View, StyleSheet, Modal } from "react-native";
import AppText from "../components/AppText";
import * as Progress from "react-native-progress";
import colors from "../config/colors";
import AnimatedLottieView from "lottie-react-native";

interface Props {
  progress?: number;
  visible?: boolean;
  onDone: Dispatch<any>
}

function UploadScreen({onDone, progress = 0, visible = false }: Props) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <>
          <Progress.Bar
            color={colors.primary}
            progress={progress}
            width={200}
          />
          <AppText style={styles.uploadingText}>Uploading...</AppText>
          </>
        ) : (
          <AnimatedLottieView
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            source={require("../assets/animations/done.json")}
            style={styles.animation}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 150,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  uploadingText:{
    color: colors.primary,
    marginTop: 10,
    fontWeight: '600'
  }
});

export default UploadScreen;
