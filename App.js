import React, { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import * as Location from "expo-location";
import db from "./db/data1.json";
import iconWeather from "./db/iconWeather.json";
import degWind from "./db/degWind.json";
import moment from "moment";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState();
  // const [degree, setDegree] = React.useState(parseInt(((data?.current?.wind_deg % 360) / 45).toFixed(0)) + 1);

  const timeZone = data?.timezone_offset;

  // const iconWeather = [
  //   {
  //     id: "0esw",
  //     src: "https://img.icons8.com/external-line-adri-ansyah/128/ffffff/external-weather-weather-line-adri-ansyah.png",
  //     description: "ensoleilé",
  //     status: "jour",
  //   },
  //   {
  //     id: "1rdx",
  //     src: "https://img.icons8.com/external-solid-adri-ansyah/128/ffffff/external-weather-weather-solid-adri-ansyah-19.png",
  //     description: "couvert",
  //     status: "jour",
  //   },
  //   {
  //     id: "2tfc",
  //     src: "https://img.icons8.com/external-solid-adri-ansyah/128/ffffff/external-weather-weather-solid-adri-ansyah-16.png",
  //     description: "peu nuageux",
  //     status: "jour",
  //   },
  //   {
  //     id: "3ygv",
  //     src: "https://img.icons8.com/external-line-adri-ansyah/128/ffffff/external-weather-weather-line-adri-ansyah-9.png",
  //     description: "partiellement nuageux",
  //     status: "jour",
  //   },
  //   {
  //     id: "4uhb",
  //     src: "https://img.icons8.com/external-line-adri-ansyah/128/ffffff/external-weather-weather-line-adri-ansyah-12.png",
  //     description: "pluie",
  //     status: "jour",
  //   },
  //   {
  //     id: "5ijn",
  //     src: "https://img.icons8.com/external-line-adri-ansyah/128/ffffff/external-weather-weather-line-adri-ansyah-18.png",
  //     description: "légère pluie",
  //     status: "jour",
  //   },
  //   {
  //     id: "6okn",
  //     src: "https://img.icons8.com/external-line-adri-ansyah/128/ffffff/external-weather-weather-line-adri-ansyah-18.png",
  //     description: "pluie modérée",
  //     status: "jour",
  //   },
  // ];

  //

  const week = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const deg_wind =
    Number(((data?.current?.wind_deg % 360) / 45).toFixed(0)) + 1;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords.longitude);
    })();

    setData(db);
    // setDegree(deg_wind);
    // setDegree(parseInt(((data?.current?.wind_deg % 360) / 45).toFixed(0)) + 1);
  }, []);

  let waitingText = "Loading..";
  if (errorMsg) {
    waitingText = errorMsg;
  } else if (location) {
    waitingText = JSON.stringify(location);
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="#0B5ED7" />
      <View style={styles.container}>
        {errorMsg ? (
          <Text style={styles.paragraph}>{waitingText}</Text>
        ) : (
          <>
            {/* <Text style={styles.paragraph}>{waitingText}</Text> */}

            <View
              style={{
                // flex: ,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 50,
              }}
            >
              {/* <View style={{ height: 300 }}> */}
              <Text style={[styles.paragraph, { fontSize: 30 }]}>
                {data?.timezone}
              </Text>

              {/* <View style={{ height: '32%', width: '35%' }}> */}

              <View style={{ height: 128, width: 128, margin: 20 }}>
                {iconWeather
                  ?.filter(
                    (ico) =>
                      ico.description == data?.current.weather[0]?.description
                  )
                  .map((filtered) => (
                    <Image
                      source={{ uri: filtered.src }}
                      alt={filtered.description}
                      style={{ height: 128, width: 128 }}
                      key={Math.random()}
                    />
                  ))}
              </View>

              <Text style={[styles.paragraph, { fontSize: 30 }]}>
                {data?.current.weather[0].description}{" "}
              </Text>
              <Text style={[styles.paragraph, { fontSize: 30 }]}>
                {Math.floor(data?.current.temp)}°C{" "}
              </Text>
              <Text style={styles.paragraph} className="day_after">
                Ressenti {data?.current.feels_like.toFixed(0)}°
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 0.3,
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  width: "33%",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: "https://img.icons8.com/glyph-neue/60/ffffff/wind.png",
                  }}
                  alt="wind"
                  style={{ height: 25, width: 25, margin: 12 }}
                />
                <Text style={[styles.paragraph, { fontSize: 20 }]}>
                  {(data?.current?.wind_speed * 3.6).toFixed(0)} Km/h{" "}
                  {deg_wind &&
                    degWind
                      ?.filter((windDeg) => windDeg?.id === deg_wind)
                      ?.map((filteredDeg) => (
                        <Image
                          source={{ uri: filteredDeg.name }}
                          alt="orientation"
                          style={{ height: 30, width: 30 }}
                          key={Math.random()}
                        />
                      ))}{" "}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  width: "33%",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: "https://img.icons8.com/external-nawicon-glyph-nawicon/60/ffffff/external-drop-ecology-nawicon-glyph-nawicon.png",
                  }}
                  alt="himidity"
                  style={{ height: 25, width: 25, margin: 15 }}
                />
                <Text style={[styles.paragraph, { fontSize: 20 }]}>{data?.current.humidity} %</Text>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  width: "33%",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: "https://img.icons8.com/glyph-neue/60/ffffff/atmospheric-pressure.png",
                  }}
                  style={{ height: 25, width: 25, margin: 15 }}
                />
                <Text style={[styles.paragraph, { fontSize: 20 }]}>
                  {data?.current.pressure} hpa
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.5,
                width: "100%",
                marginTop: 50,
                marginBottom: 50,
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  styles.paragraph,
                  { textAlign: "center", marginVertical: 30, fontSize: 16 },
                ]}
              >
                Next 6 days
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  height: "auto",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                {week?.map((day, indx) => (
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    key={Math.random()}
                  >
                    <Text style={styles.paragraph}>
                      {moment(data?.daily[indx + 1]?.dt * 1000).format("ddd")}
                    </Text>
                    {iconWeather
                      .filter(
                        (ico) =>
                          ico.description ===
                          data?.daily[indx].weather[0].description
                      )
                      .map((filtered) => (
                        <Text
                          style={{ height: 60 }}
                          className="mini"
                          key={Math.random() * 2}
                        >
                          <Image
                            source={{ uri: filtered.src }}
                            alt={filtered.description}
                            style={{ height: 30, width: 30 }}
                          />
                        </Text>
                      ))}
                    <Text style={styles.paragraph}>
                      {Math.floor(data?.daily[indx].temp.day)}°C
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: 100,
                marginTop: 30,
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.paragraph}>
                  {JSON.stringify(
                    new Date((data?.current?.sunrise + timeZone) * 1000)
                  ).slice(12, 20)}{" "}
                </Text>
                <Image
                  style={{ height: 40, width: 40, margin: 15 }}
                  source={{
                    uri: "https://img.icons8.com/ios/160/ffffff/sunrise--v1.png",
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.paragraph}>
                  {JSON.stringify(
                    new Date((data?.current?.sunset + timeZone) * 1000)
                  ).slice(12, 20)}{" "}
                </Text>
                <Image
                  style={{ height: 40, width: 40, margin: 15 }}
                  source={{
                    uri: "https://img.icons8.com/ios/160/ffffff/sunset--v1.png",
                  }}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    // backgroundColor: "#444",
    backgroundColor: "#0B5ED7",
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    color: "#fff",
    justifyContent: "space-around",
  },
});
