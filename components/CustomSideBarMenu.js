import React, { Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity, ImageBackground} from 'react-native';
import { DrawerItems} from 'react-navigation-drawer'
import {Avatar} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';
import db from '../config'
import { RFValue } from 'react-native-responsive-fontsize';

export default class CustomSideBarMenu extends Component{
  state = {
      userId : firebase.auth().currentUser.email,
     image: null,
     name: "", 
     docId : ""
   };

   selectPicture = async () => {
     const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
     });
     console.log(uri);
     if (!cancelled){
       this.setState({image:uri})
       this. uploadImage(uri,this.state.userId);
   }
   }


   uploadImage=async(uri,imageName)=>{
     var response=await fetch(uri)
     var blob=await response.blob()
     var ref=firebase.storage().ref().child('user_profiles/'+imageName)
     return ref.put(blob).then(response=>{
       this.fetchImage(imageName)
     })
   }

   fetchImage=(imageName)=>{
    var ref=firebase.storage().ref().child('user_profiles/'+imageName)
    storageRef.getDownloadURL().then(url=>{
      this.setState({image:url})
    })
    .catch(error=>{
      this.setState({image:'#'})
 
    })
   }

   updateProfilePicture=(uri)=>{
     db.collection('users').doc(this.state.docId).update({
       image : uri
     })
   }

   getUserProfile(){
     db.collection('users')
     .where('email_id','==',this.state.userId)
     .onSnapshot(querySnapshot => {
       querySnapshot.forEach(doc => {
         this.setState({
           name : doc.data().first_name + " " + doc.data().last_name,
           docId : doc.id,
           image : doc.data().image
         })
       })
     })
   }

componentDidMount(){
  this.getUserProfile()
  this.fetchImage(this.state.userId)

}

  render(){
    return(
      <View style={{flex:1}}>
       <View style={{flex:0.5,borderColor:'red',borderWidth:2,alignItems:'center',backgroundColor:'orange'}}>

            <Avatar
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
                source={{
                  uri:
                    this.state.image
                  }}
                size="medium"

                 overlayContainerStyle={{backgroundColor: 'white'}}
                 onPress={() => this.selectPicture()}
                 activeOpacity={0.7}
                 containerStyle={{flex:0.75,width:'40%',height:'20%', marginLeft: 20, marginTop: 30,borderRadius:40}}
                 showEditButton
              />


            <Text style = {{fontWeight:'100',fontSize:20,paddingTop:10,}}> {this.state.name}</Text>

        </View>

        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props}/>
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutButton}
          onPress = {() => {
              this.props.navigation.navigate('WelcomeScreen')
              firebase.auth().signOut()
          }}>
            <Icon
            name='Log Out' type='antdesign' size={RFValue(20)} iconStyle={{paddingLeft:RFValue(10)}}
            >

            </Icon>
            <Text style={{fontSize:RFValue(15),fontWeight:'bold',marginLeft:RFValue(30)}}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container : {
    flex:1
  },
  drawerItemsContainer:{
    flex:0.8
  },
  logOutContainer : {
    flex:0.2,
    justifyContent:'flex-end',
    paddingBottom:30
  },
  logOutButton : {
    height:30,
    width:'100%',
    justifyContent:'center',
    padding:10
  },
  logOutText:{
    fontSize: 30,
    fontWeight:'bold'
  }
})
