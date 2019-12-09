import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  Icon,
  Image,
  TextInput,
  render,
  TouchableOpacity
} from "react-native";
import List from "../../components/List/index";
import {
  baseURL,
  listNGOs,
  listGovtShelters,
  listPrivateProperties
} from "../../constants/apiRoutes";
import { getData, getDecodedToken } from "../utils/locaStorage";

class ListScreen extends Component {
  static navigationOptions = {
    title: "Helps Nearby"
  };
  state = {
    NGOUri: require("../../assets/images/home.jpg"),
    RescueRequestsUri: require("../../assets/images/home.jpg"),
    GovtShelterUri: require("../../assets/images/home.jpg"),
    PrivatePropertyUri: require("../../assets/images/home.jpg"),
    listNGO: "",
    listGovtShelter: "",
    listPrivateProperties: "",
    showPrivateProperties: false
  };

  apiCallGet = async (url, token) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    });
    return res.json();
  };

  componentDidMount = async () => {
    var privateProperties="";
    const token = await getData("token");
    console.log(token);
    if (typeof token !== "undefined") {
      privateProperties = await this.apiCallGet(baseURL + listPrivateProperties, token);
      if(!privateProperties.errorMessage){
        this.setState({
          listPrivateProperties: privateProperties
        })
      }
    } else{
      privateProperties = ""
    }
    const decodedtOken = getDecodedToken(token);
    const NGO = await this.apiCallGet(baseURL + listNGOs);
    const govtShelters = await this.apiCallGet(baseURL + listGovtShelters);

    this.setState({
      listNGO: NGO.errorMessage ? "" : NGO,
      listGovtShelter: govtShelters.errorMessage ? "" : govtShelters
      // listPrivateProperties: privateProperties
    });
  };

  arr = [
    { name: "NGO 1", distance: "--away" },
    { name: "NGO 2", distance: "--away" },
    { name: "NGO 3", distance: "--away" },
    { name: "NGO 4", distance: "--away" },
    { name: "NGO 5", distance: "--away" }
  ];

  navigateToDetailPage = data => {
    this.props.navigation.navigate("ListDetail", data);
  };

  render() {
    {
      console.log("state =  " + this.state.listPrivateProperties);
    }
    {
      console.log("check =  " + typeof this.state.listPrivateProperties);
    }
    return (
      <View>
        {/* <View>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Search"
            placeholderTextColor="grey"
            style={{ flex: 1, fontWeight: "700", backgroundColor: "white" }}
          />
        </View> */}

        <ScrollView>
          <View style={styles.parentContainer}>
            <Text style={styles.textContainer}> NGO(s)</Text>
            <View style={{ height: 130, marginTop: 20 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {typeof this.state.listNGO === "object" ? (
                  this.state.listNGO.data.map((item, index) => {
                    return (
                      <List
                        key={index}
                        category={"NGO"}
                        imageUri={this.state.NGOUri}
                        name={item.AuthorityName}
                        distance={item.Id}
                        data={item}
                        listDetail={this.navigateToDetailPage}
                      />
                    );
                  })
                ) : (
                  <Text style={styles.defaultText}> No NGOs Found </Text>
                )}
              </ScrollView>
            </View>
          </View>
          <View style={styles.parentContainer}>
            <Text style={styles.textContainer}> Government Shelters </Text>
            <View style={{ height: 130, marginTop: 20 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {typeof this.state.listGovtShelter === "object" ? (
                  this.state.listGovtShelter.data.map((item, index) => {
                    return (
                      <List
                        key={index}
                        category={"Government Shelters"}
                        imageUri={this.state.NGOUri}
                        name={item.AccomodationType}
                        distance={item.Id}
                        data={item}
                        listDetail={this.navigateToDetailPage}
                      />
                    );
                  })
                ) : (
                  <Text style={styles.defaultText}>No Shelters Found</Text>
                )}
              </ScrollView>
            </View>
          </View>
          <View style={[styles.parentContainer, (this.state.showPrivateProperties) ? {display: 'block'} : {display : 'none'}]}>
            <Text style={styles.textContainer}> Private Properties </Text>
            <View style={{ height: 130, marginTop: 20 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {typeof this.state.listPrivateProperties === "object" ? (
                  this.state.listPrivateProperties.data.map((item, index) => {
                    return (
                      <List
                        key={index}
                        imageUri={this.state.NGOUri}
                        category={"Private Properties"}
                        name={item.AccomodationType}
                        distance={item.Id}
                        data={item}
                        listDetail={this.navigateToDetailPage}
                      />
                    );
                  })
                ) : (
                  <Text style={styles.defaultText}>
                    No Private properties Found
                  </Text>
                )}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 20
  },
  parentContainer: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 1
  },
  defaultText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
    color: "red",
    paddingTop: 20,
    paddingLeft: 50
  }
});

export default ListScreen;
