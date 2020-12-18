/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataTable } from 'react-native-paper';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button, 
  Modal,
  TouchableHighlight,
  Pressable,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect } from 'react';


const StartS=({navigation})=>{
  
  const[OrginalPrice, UpdateOrginalPrice] = useState("")
  const[DiscountPercentage, UpdateDiscountPercentage] = useState("")
  const[SaveMoney, updateSaveMoney] = useState(0)
  const[finalPrice, updateFinalPrince] = useState(0)
  const[hislist, sethisList] = useState([])
  const[buttonCheck, setButtonCheck] = useState(true);


  // navigation.setOptions({
  //   headerRight:()=> <Button title = "History" onPress={()=>{navigation.navigate("History", {listitems: hislist, settingList: sethisList})}}/>

  // })

  const inputValidations=(text, meth)=>{
    
    if(meth=="original_num"){
      if((!text.includes("-"))){ 

          UpdateOrginalPrice(text)
      }
  }
    else if(meth=="Discount"){
      if(text == "100"){
        UpdateDiscountPercentage(text)
      }
      else if(text.length <=2)
      UpdateDiscountPercentage(text)
    }
    
   
  }
  useEffect(()=>{
  
    navigation.setOptions({
      headerRight:()=> <Button title = "History" onPress={()=>{navigation.navigate("History", {listitems: hislist, settingList: sethisList})}}/>
  
    })
   
    if(OrginalPrice=="" || DiscountPercentage==""){
      setButtonCheck(true)
    }
    else{
      setButtonCheck(false)
    }
    calculateDiscount()
  
  });

  
  const calculateDiscount =()=>{
  
    
    var x = parseFloat((OrginalPrice) * (DiscountPercentage/100)).toFixed(2)
    var y = parseFloat(OrginalPrice - x).toFixed(2)
    updateSaveMoney(x)
    updateFinalPrince(y) 
  }
  const clearAttr=()=>{
    UpdateOrginalPrice("");
    UpdateDiscountPercentage("");
    updateSaveMoney(0);
    updateFinalPrince(0);
  }
  const saveDdata=()=>{
    sethisList([...hislist, {key: Math.random().toString() ,"OriginalPrice": OrginalPrice, "Discount":DiscountPercentage,"FinalPrice": finalPrice }])
   
    clearAttr()
  }
 
  const display=()=> {
    if(OrginalPrice!=0){
      
      return(
        <View >
        <Text  style = {{color:"black", fontWeight:"bold"}}>You Save: {SaveMoney}</Text>
        <Text  style = {{color:"black", fontWeight:"bold", marginTop:"2%"}}>Final Price: {finalPrice}</Text>
        </View>
      )
    }
  }

  
  return(
    <View>
      <View style= {{width:"100%", justifyContent:"center", alignItems:"flex-end", marginTop:"1%" }} >
    
       </View>
      <View style = {{marginTop:"1%",alignItems:"center", backgroundColor:"red", height:"15%", justifyContent:"center"}}>
        <Text style = {{color:"white", fontWeight:"bold"}}>Discount Calculator App</Text>
      </View>

      <View style ={{marginTop:"25%", alignItems:"center"}}>

      <Text  style = {{color:"black", fontWeight:"bold"}} >Enter Original Price</Text>
      <TextInput
      style={{ width: "45%" ,marginTop:"2%", borderColor: 'gray', borderWidth: 2, color:"black", justifyContent:"center", textAlign:"center"}}
      placeholder="Original Price"
      keyboardType={"number-pad"}
 
      onChangeText={(text) => {inputValidations(text,"original_num")}}
    
      value = {(OrginalPrice).toString()}
   
       textAlign={'center'}
      />

      <Text style = {{marginTop:"5%", fontWeight:"bold"}}>Enter the Discount</Text>
      <TextInput
      style={{ width: "45%" , marginTop:"2%",borderColor: 'gray', borderWidth: 2, color:"black", justifyContent:"center", textAlign:"center",}}
      placeholder="Discount Percentage"
      keyboardType={"number-pad"}
      onChangeText={(text) => {inputValidations(text,"Discount");}}
      value = {(DiscountPercentage).toString()}
       textAlign={'center'}
      />
      <View style={{marginTop:"8%"}}>
       {display()}
       </View>
      </View>
      <View style={{width:"100%", marginTop:"8%", flexDirection:"row",justifyContent:"center"}}>
        
        <View style={{width:"32%", marginLeft:"1%"}}>
        <TouchableOpacity title="Save" onPress={()=>{saveDdata()}} disabled={buttonCheck}><View style={{backgroundColor:"burlywood", height:35, justifyContent:"center", alignItems:"center"}}>
          <Text style={{fontSize:18, color:"white"}}>Save</Text></View></TouchableOpacity>
     
        </View>
       
      </View>
      
      
    </View>
  )
}


const HistoryS=({navigation, route})=>{
  
  const listitems = route.params.listitems;
  const settingList = route.params.settingList;
  const [displaylist, setdisplaylist] = useState(listitems)
  

  useEffect(()=>{
    
    navigation.setOptions({
      headerRight:()=> <Button title = "Clear" onPress={()=>{clearAttr()}}/>
  
    })

  })
  

  const clearAttr=()=>{

   
    Alert.alert(
      "Clearing List",
      "Are you sure you want to delete this list?",
      [
        {
          text: "Cancel",
          onPress: () => {} ,
         
        },
        { text: "Delete", onPress: () => {setdisplaylist([]);
          navigation.setOptions(settingList([]))} }
      ],
  
    );
    
    
  
  }




  return(
  <View>

    <DataTable>
           <DataTable.Header>
            <DataTable.Title >No. </DataTable.Title>
            <DataTable.Title >Original Price</DataTable.Title>
            <DataTable.Title >Discount</DataTable.Title>
            <DataTable.Title >Final Price</DataTable.Title>
            <DataTable.Title ></DataTable.Title>
           
            </DataTable.Header>
    </DataTable>

      {displaylist.map((value, index)=>{
        return(
         <View key={value.key}>
           <DataTable>
            <DataTable.Row> 
            <DataTable.Cell>{index+1}</DataTable.Cell> 
            <DataTable.Cell>{value.OriginalPrice}</DataTable.Cell>
            <DataTable.Cell>{value.Discount}</DataTable.Cell>
            <DataTable.Cell>{value.FinalPrice} </DataTable.Cell>
            <DataTable.Cell style={{justifyContent:"flex-end"}}>
            <TouchableOpacity style={{justifyContent:"center"}} onPress={()=>{
              const updatedList = displaylist.filter((val,ind)=>index != ind);
              navigation.setOptions(settingList(updatedList));
              setdisplaylist(updatedList)
}}>
              <Text style={{backgroundColor:"red", color:"white", textAlign:"right", fontSize:16, borderRadius:10}}>DEL</Text>
            </TouchableOpacity>
            </DataTable.Cell>
           
            </DataTable.Row>
           </DataTable>

         </View> 
          
        )})}
        
  </View>
  );
}

const StackNavigator = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator initialRouteName={"Start Screen"}>
        <StackNavigator.Screen name="Start Screen" component={StartS} />
        <StackNavigator.Screen name="History" component={HistoryS} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});


export default App;