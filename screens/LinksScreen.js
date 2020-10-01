import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { connect } from 'react-redux';
import { testUser } from '../store/actions/userActions';

class LinksScreen extends Component {
  static navigationOptions = {
      header: null,
  };
  constructor(props){
    super(props);
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {/**
         * Go ahead and delete ExpoLinksView and replace it with your content;
         * we just wanted to provide you with some helpful links.
         */}
         <View>
      <View>
      </View>
           <Text>Currently Redux valud is </Text>
         </View>
         <View>
           <Text>
            { this.props.testData }
           </Text>
         </View>
        <ExpoLinksView />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => {
  return {
      testData: state.users.testData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    testUser: ()=>dispatch(testUser),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinksScreen);
