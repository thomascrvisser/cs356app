import { setStatusBarTranslucent } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

const generalStyling = StyleSheet.create({
  headers: {
    fontSize: 35,
    color: '#FFFFEC',
    fontWeight: 'bold',
    marginBottom: 20
  },
  bgScreen: {
    backgroundColor: '#FFFFFF'
  },
  entryScreens: {
    backgroundColor: '#28567B',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  entryLogo: {
    fontWeight:"bold",
    fontSize:50,
    color:"#FFFFFF",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#FFFFFF",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black"
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#3C81B9",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  },
  cardStyle: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: 300,
    height: 70,
    marginVertical: 10,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent:'space-between'
  },
  iconContent: {
    paddingTop: 5
  },
  cardTitleText: {
    fontSize: 30
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContent: {
    backgroundColor: '#3C81B9',
    color: 'white',
    borderRadius: 25,
    fontWeight: 'bold',
    padding: 7,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black'
  },
  formArea: {
    paddingBottom: 20,
    alignItems: 'center'
  },
  formTitle: {
    color: 'black',
    paddingBottom: 5,
    alignSelf: 'flex-start',
    fontSize: 30
  },
  formInputBox: {
    width:300,
    height: 45,
    backgroundColor: '#F5F5F5',
    borderRadius:10,
    paddingLeft: 5
  },
})

export { generalStyling }
