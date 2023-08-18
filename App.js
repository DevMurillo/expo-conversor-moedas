import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function App() {
  const [moedaOrigem, setMoedaOrigem] = useState('BRL')
  const [moedaDestino, setMoedaDestino] = useState('USD')
  const [valorEntrada, setVAlorEntrada] = useState('33.33')
  const [resultado, setResultado] = useState('')

  const handleConverter = async () => {
    let URL = `https://economia.awesomeapi.com.br/last/${moedaOrigem}-${moedaDestino}`;
    try {
      let page = await fetch(URL);
      let json = await page.json();
      //console.log(json);
      let indice = parseFloat(json[`${moedaOrigem}${moedaDestino}`].high);
      //setResultado(indice)
      let valor = parseFloat(valorEntrada);
      setResultado((valor *indice).toFixed(2))
    } catch (error) {
      setResultado(`Erro: ${error.message}`)
    }
   }

  const handleLimpar = () => {
    setResultado('');
    setVAlorEntrada('33.33333');
    setMoedaOrigem('BRL');
    setMoedaDestino('USD');
   }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Convesor de Moedas</Text>
      <View>
        <Text style={styles.tbMoeda}>Moeda 1</Text>
        <Picker
          style={styles.picker}
          selectedValue={moedaOrigem}
          onValueChange={(itemValue, itemIndex) =>
            setMoedaOrigem(itemValue)
          }>
            <Picker.Item label="Real Brasileiro" value="BRL" />
          <Picker.Item label="Dólar Americano" value="USD" />
          <Picker.Item label="Bitcoin" value="BTC" />
          <Picker.Item label="Dogecoin" value="DOGE" />
          <Picker.Item label="Ethereum" value="ETH" />
          <Picker.Item label="Iene Japonês" value="JPY" />
        </Picker>
      </View>
      <View>
        <Text style={styles.tbMoeda}>Moeda 2</Text>
        <Picker
          style={styles.picker}
          selectedValue={moedaDestino}
          onValueChange={(itemValue, itemIndex) =>
            setMoedaDestino(itemValue)
          }>
             <Picker.Item label="Real Brasileiro" value="BRL" />
          <Picker.Item label="Dólar Americano" value="USD" />
          <Picker.Item label="Bitcoin" value="BTC" />
          <Picker.Item label="Dogecoin" value="DOGE" />
          <Picker.Item label="Ethereum" value="ETH" />
          <Picker.Item label="Iene Japonês" value="JPY" />
        </Picker>
      </View>
      <View>
        <Text style={styles.tbMoeda}>Valo para Conversão</Text>
        <TextInput
          style={styles.input}
          value={valorEntrada}
          onChangeText={setVAlorEntrada}
          keyboardType='numeric'>
        </TextInput>
      </View>
      <Pressable onPress={handleConverter} style={styles.button}>
        <Text style={styles.title}>Conveter</Text>
      </Pressable>
      <Pressable onPress={handleLimpar} style={styles.button}>
        <Text style={styles.title}>Limpar</Text>
      </Pressable>
      <View><Text style={styles.lbResultado}>{resultado}</Text></View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff'
  },
  picker: {
    color: '#fff',
    width: 200,
    height: 50,
    backgroundColor: '#000'
  },
  input: {
    color: '#fff',
    textAlign: 'right',
    height: 40,
    width: 200
  },
  tbMoeda: {
    color: '#fff'
  },
  button: {
    width: 200,
    height: 40,
    paddingBottom: 10,
    backgroundColor: '#999',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  lbResultado: {
    color: '#fff'
  }
});