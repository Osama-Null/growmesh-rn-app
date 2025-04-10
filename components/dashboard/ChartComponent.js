import React from "react";
import { View } from "react-native";
import {
  Svg,
  Path,
  G,
  Defs,
  ClipPath,
  Rect,
  LinearGradient,
  Stop,
  RadialGradient,
} from "react-native-svg";

const ChartComponent = () => (
  <Svg width={380} height={154} viewBox="0 0 380 154" fill="none">
    <G clipPath="url(#a)">
      <G opacity={0.7}>
        <Path
          d="M258.778 0v154"
          stroke="url(#b)"
          strokeWidth={2}
          strokeDasharray="2 2"
        />
      </G>
      <Path
        d="M1.944 40.657.22 47.839A8.003 8.003 0 0 0 0 49.705V146c0 4.418 3.582 8 8 8h364c4.418 0 8-3.582 8-8v-39.948a8.001 8.001 0 0 0-2.644-5.46c-2.644-2.09-7.931-6.27-13.219-5.914-5.287.356-10.575 5.247-15.862.895-5.288-4.352-10.575-17.948-15.863-9.02-5.288 8.93-10.576 40.384-15.863 38.813-5.287-1.571-10.575-36.167-15.862-52.25-5.288-16.082-10.575-13.65-15.863-14.218-5.287-.568-10.575-4.135-15.862-9.006-5.288-4.87-10.575-11.044-15.863-16.61-5.287-5.565-10.575-10.522-15.862 4.64-5.288 15.161-10.575 50.441-15.863 50.891-5.287.45-10.575-33.93-15.862-37.738-5.288-3.807-10.575 23-15.863 38.482-5.287 15.522-10.575 19.8-15.862 24.67-5.288 4.87-10.575 10.334-15.863-5.154-5.287-15.488-10.575-51.928-15.862-54.118-5.288-2.19-10.575 29.87-15.863 43.196-5.287 13.326-10.575 7.917-15.862-.667-5.288-8.66-10.575-20.571-15.863-30.057-5.287-9.485-10.575-16.546-15.862-10.29-5.288 6.255-10.575 25.826-15.863 29.618-5.287 3.792-10.575-8.195-15.862-23.304C41.6 48.266 36.313 30.034 31.025 19.172 25.738 8.31 20.45 4.817 15.163 10.937 9.875 17.057 4.588 32.79 1.944 40.657Z"
        fill="url(#c)"
      />
      <Path
        d="M265 41.5c0 4.245-3.235 7.5-7 7.5s-7-3.255-7-7.5 3.235-7.5 7-7.5 7 3.255 7 7.5Z"
        fill="#A3A9EE"
        stroke="#A3CFEE"
        strokeWidth={4}
      />
    </G>
    <Defs>
      <RadialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0 87.07 -3012.94 0 257.778 62.711)"
      >
        <Stop stopColor="#1573FE" />
        <Stop offset={1} stopColor="#1573FE" stopOpacity={0} />
      </RadialGradient>
      <LinearGradient
        id="c"
        x1={190}
        y1={7.938}
        x2={190}
        y2={154}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#15FED3" stopOpacity={0.6} />
        <Stop offset={1} stopColor="#1573FE" stopOpacity={0} />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h380v154H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ChartComponent;
