import { StyleSheet } from 'react-native';

const generalStyling = StyleSheet.create({
  headers: {
    fontSize: 30,
    color: '#FFFFEC'
  },
  bgScreen: {
    backgroundColor: '#72a0c1'
  },
  entryScreens: {
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  entryLogo: {
    fontWeight:"bold",
    fontSize:50,
    color:"#E4B607",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#A6E5FF",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#E4B607",
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
    backgroundColor: '#FFFFEC',
    borderRadius: 15,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: 300,
    height: 70,
    marginHorizontal: 4,
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
    backgroundColor: '#A6E5FF',
    color: 'white',
    borderWidth: 2,
    borderRadius: 10,
    fontWeight: 'bold',
    padding: 7,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'black'
  }
})

export { generalStyling }
