//import * as RNFS from 'react-native-fs';
import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import Header from '../components/Header-Component';

export default ASTResults=({navigation})=>{
var RNFS = require('react-native-fs');

var myString = 'this, is my, string';
//const [myArray, setArray]=useState([]);
var myArray;

var path = RNFS.DocumentDirectoryPath + '/test3.txt';

const [isContent, setContent]=useState('');
// write the file
// RNFS.writeFile(path, 'Lorem,ipsum,dolor,sit,amet,333', 'utf8')
//   .then((success) => {
//     console.log('FILE WRITTEN!');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// get a list of files and directories in the main bundle
lapsList=()=>{
RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  .then((result) => {
    console.log('GOT RESULT', result[1].name);

    // stat the first file, specifies which file to read
    return Promise.all([RNFS.stat(result[1].path), result[1].path]);
  })
  .then((statResult) => {
    if (statResult[0].isFile()) {
      // if we have a file, read it
     // console.log(statResult[0].mtime);
      return RNFS.readFile(RNFS.DocumentDirectoryPath+'/test3.txt', 'utf8');
    }
    return 'no file';
  })
  .then((contents) => {
    // log the file contents
    console.log(contents.split(","));
    //str.split(",")
  //setArray( contents.split(","));
   
     setContent(contents.split(","));
     
     //setContent(contents.split(","))

   
   //console.log("array: "+myArray);
   //return (isContent)
  // setContent(myArray);
  //return(setContent(contents.split(",")))
  })
  .catch((err) => {
    console.log(err.message, err.code);
  }); 


//return(isContent);
}

const HR= {
    labels: [isContent[0], isContent[1]],
    datasets: [
      {
        data: [
         100,
         90
        ]
      }
    ]
  }
// asyncData=()=>{
// (async function(){
//   var result = await lapsList()
//   console.log('Woo done!');

//   console.log("split values: "+ result.split(","));
//   //setArray(result.split(","));
//   //return (myArray);
// })()}

  return(
    
  //   this.isContent.map((data) => {
  //     return (
  //       <View><Text>{data}</Text></View>
  //     )
          
  //   }    
  // )
 <View>
    <Header openDrawer={navigation.openDrawer} />
  <LineChart
  // data = { datasets: [ { data: [3, 5, 6], color: () => '#C7EBFF', strokeWidth: 4 }, 
  // { data: [2, 5, 7], color: () => '#ED7C33' }, ] }
     data={HR}
   // width={Dimensions.get("window").width} // from react-native
    height={180}
    width={400}
    //yAxisLabel="Days"
    //yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    
    chartConfig={{
      backgroundColor: "#000000",
      backgroundGradientFrom: "#ff1111",
      backgroundGradientTo: "#ff6666",
      decimalPlaces: 1, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "4",
        strokeWidth: "2",
        stroke: "#ffffff"
      }
    }}
    bezier
    style={{
      marginVertical: '2%',
      marginHorizontal:'5%',
      width:'90%',
     // marginLeft: '5%',
     // marginRight:'5%',
      alignItems:'center',
      borderRadius: 16
    }}
  />

      <View style={{ margin: 10 }}>
        <Text>{this.lapsList()}</Text>
      </View>

      </View>
  )

}


// export default ASTResults=()=>{
//     const filePath= '../files/README.txt';
//     const [isMessage, setMessage]=useState(0);
    
//         RNFS.readFile('../files/README.txt', 'ascii').then(res => {
            
//             setMessage(1);
//         })
//         .catch(err => {
            
//             console.log(err.message, err.code);
//           setMessage(2);
//         })
        
    
//     return(
//     <View>
//         <View>
//             <Text>
//                 Test
//             </Text>
//         </View>
//        {isMessage==1 && <Text>Success </Text>}
//     </View>
//     )

// }

// readFile(filepath: string, encoding?: string)
