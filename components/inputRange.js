import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  PanResponder,
} from "react-native";

const WIDTH = Dimensions.get("window").width - 40;
const KNOBSIZE = 20;
const MAXWIDTH = WIDTH - KNOBSIZE / 2 + 6;

const InputRange = ({ min, max, steps, title, onValueChange }) => {
  const [minValue, setMinValue] = useState(min.toString());
  const [maxValue, setMaxValue] = useState(max.toString());
  const [knob1Position, setKnob1Position] = useState(0);
  const [knob2Position, setKnob2Position] = useState(MAXWIDTH);

  const updateValues = (xknob1, xknob2) => {
    const newMinValue =
      Math.round((min + (xknob1 / MAXWIDTH) * (max - min)) / steps) * steps;
    const newMaxValue =
      Math.round((min + (xknob2 / MAXWIDTH) * (max - min)) / steps) * steps;

    setMinValue(`${isNaN(newMinValue) ? "Invalid" : newMinValue}`);
    setMaxValue(`${isNaN(newMaxValue) ? "Invalid" : newMaxValue}`);
    onValueChange && onValueChange(newMinValue, newMaxValue);
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} crore`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(1)} lakh`;
    } else {
      return price;
    }
  };

  const panResponder1 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      const newX = Math.max(
        0,
        Math.min(knob2Position - KNOBSIZE, knob1Position + gestureState.dx)
      );
      setKnob1Position(newX);
      updateValues(newX, knob2Position);
    },
  });

  const panResponder2 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      const newX = Math.max(
        knob1Position + KNOBSIZE,
        Math.min(MAXWIDTH, knob2Position + gestureState.dx)
      );
      setKnob2Position(newX);
      updateValues(knob1Position, newX);
    },
  });

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rangeContainer}>
        <View style={styles.additionalView}>
          <Text style={styles.val_1}>{formatPrice(parseInt(minValue))}</Text>
          <Text style={styles.val_1}>{formatPrice(parseInt(maxValue))}</Text>
        </View>

        <View style={styles.track}>
          <View
            style={[
              styles.activeTrack,
              {
                width: knob2Position - knob1Position,
                transform: [{ translateX: knob1Position + KNOBSIZE / 2 }],
              },
            ]}
          />
        </View>
        <View
          {...panResponder1.panHandlers}
          style={[styles.knob, { left: knob1Position }]}
        />
        <View
          {...panResponder2.panHandlers}
          style={[styles.knob, { left: knob2Position }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  additionalView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  val_1: {
    fontSize: 13,
    letterSpacing: 1,
    color: "grey",
  },
  title: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 0,
    color: "grey",
    textAlign: "center",
    fontSize: 14,
    letterSpacing: 1.5,
  },
  rangeContainer: {
    paddingHorizontal: 20,
    paddingTop: 2,
    paddingBottom: 12,
    backgroundColor: "white",
    borderColor: "white",
    borderBottomWidth: 1,
  },
  track: {
    height: 1,
    backgroundColor: "#cccdf2",
    borderRadius: 3,
  },
  activeTrack: {
    backgroundColor: "orange",
    height: 3,
    marginTop: -3,
    borderRadius: 3,
  },
  knob: {
    position: "absolute",
    height: KNOBSIZE,
    width: KNOBSIZE,
    borderRadius: KNOBSIZE / 2,
    borderColor: "#9c44dc",
    borderWidth: 2,
    backgroundColor: "#fff",
    marginTop: -KNOBSIZE + 8,
  },
});

export default InputRange;
