/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

import styles from './styles';

function handlePress(showModal, setShowModal) {
  setShowModal(!showModal);
}

export default function HelpButton({ showModal, setShowModal }) {
  return (
    <Pressable onPress={() => handlePress(showModal, setShowModal)} style={styles.container}>
      <Svg
        height="25px"
        width="25px"
        viewBox="-10 -10 219.94 219.94"
        fill="#000000"
        stroke="#000000"
        stroke-width="3.9988600000000005">
        <G id="SVGRepo_bgCarrier" strokeWidth="0" />

        <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

        <G id="SVGRepo_iconCarrier">
          <G>
            <G>
              <Path
                style="fill:#010002;"
                d="M99.972,0.004C44.85,0.004,0,44.847,0,99.968c0,55.125,44.847,99.972,99.972,99.972 s99.972-44.847,99.972-99.972C199.943,44.847,155.093,0.004,99.972,0.004z M99.972,190.957c-50.168,0-90.996-40.813-90.996-90.989 c0-50.172,40.828-90.992,90.996-90.992c50.175,0,91.003,40.817,91.003,90.992S150.147,190.957,99.972,190.957z"
              />
              <Path
                style="fill:#010002;"
                d="M99.324,67.354c-3.708,0-6.725,3.01-6.725,6.728v75.979c0,3.722,3.017,6.739,6.725,6.739 c3.722,0,6.739-3.017,6.739-6.739V74.082C106.063,70.364,103.042,67.354,99.324,67.354z"
              />
              <Circle style="fill:#010002;" cx="99.746" cy="48.697" r="8.178" />
            </G>
          </G>
        </G>
      </Svg>
    </Pressable>
  );
}
