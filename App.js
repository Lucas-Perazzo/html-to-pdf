import { Alert, Button, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import reactNativeHTMlToPdf from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import Data from './json/debitoFC03894.json'
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
const formatDate = (date) => moment(date).format('DD/MM/YYYY');

const App = () => {
  const [filePath, setFilePath] = useState('');

  const isPermited = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        Alert.alert('Write permission err', err)
        return false;
      }
    } else {
      return true;
    }
  };

  const html = (x) => {
    const styledeb = ['hola', 'chau', 'no se', 'ok']

    const ResultSets = Data.cabeza[0][0].resultSets[4];
    const Detalle = Data.detalle[0].ejecuciones[0].resultSets[8];

    const renderResults = () => {
      const ape_razon = ResultSets[0].ape_razon;
      const obser_nota_deb = ResultSets[0].obser_nota_deb;
      return `<div>
                <h2>${ape_razon}</h2>
                <h1>${obser_nota_deb}</h1>
                <h2>${formatDate(ResultSets[0].fecha)}</h2>
                <h2>${formatDate(ResultSets[0].inicio)}</h2>
              </div>`
    };

    const render = styledeb.map((item) => {
      return `<div>
                <h2>${item}</h2>
              </div>`
    })

    const hola = 'hola'
    const image = "data:image/png;base64,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"
    return `<style>
                div {
                  border: 2px solid red;
                }
                h1 {
                  font-size: 50px;
                  background-color: red;
                }
                .hola {
                  color: green;
                }
                .img {
                    width: 229px;
                    height: 86px;
                }
            </style>

            <div>
                <img class="img" src=${image} alt="swiss"/>
                <div>${renderResults()}</div>
            </div>`

  };
  //                <img class="img" src="https://i.pinimg.com/originals/ba/ea/9a/baea9a48805a03f020ba5230438a853a.jpg" alt="swiss"/>


  const generatePdf = async () => {
      const text = "hola"
      const options = {
        html: html(text),
        fileName: "test",
        directory: "Documents",
        base64: true,
      }
      const file = await reactNativeHTMlToPdf.convert(options);
      console.log(file);
      let filePath = RNFetchBlob.fs.dirs.DownloadDir + '/test3PDF.pdf';
      console.log(RNFetchBlob.fs.dirs.DownloadDir);

      RNFetchBlob.fs.writeFile(filePath, file.base64, 'base64')
        .then(response => {
          console.log('Success: ', JSON.stringify(response));
        })
        .catch(errors => {
          console.log('Error: ', errors);
        })

      console.log(file.filePath);
      setFilePath(file.filePath);
      console.log(filePath);
      
      Alert.alert('', '' + filePath, [
        {text: 'Cancel', style: 'destructive'},
        {text: 'Open', onPress: () => FileViewer.open(filePath)}
      ], {cancelable: true});
      
    };

  return (
    <View style={styles.flex}>
      <Text style={styles.text}>HTML to PDF</Text>
      <View style={{ marginHorizontal: 40 }}>
        <Button title='Generate PDF' onPress={generatePdf} />
      </View>
    </View>
  )
};
export default App

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    marginVertical: 25,
    textAlign: 'center'
  }
})