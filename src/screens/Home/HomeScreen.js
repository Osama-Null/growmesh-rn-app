import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, StyleSheet, } from "react-native";
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const HomeScreen = () => {
  return (
    <View  style={styles.scrollView}>
		<View style={styles.row}>
            <View style={styles.image}>
                <MaterialIcons name="account-circle" size={45} color="black" />
            </View>
			<Image
				source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/7xmv6dxc_expires_30_days.png"}} 
				resizeMode = {"stretch"}
				style={styles.image2}
			/>
		</View>
		<Text style={styles.text}>
			{"Total saving"}
		</Text>
		<Text style={styles.text2}>
			{"KWD 24.44"}
		</Text>
		<View style={styles.view}>
			<TouchableOpacity style={styles.buttonRow} onPress={()=>alert('Pressed!')}>
				<Text style={styles.text3}>
					{"Date"}
				</Text>
				<AntDesign name="down" size={15} color="white" />
			</TouchableOpacity>
		</View>
		<View style={styles.column}>
			<View style={styles.view2}>
				<Text style={styles.text4}>
					{"Date"}
				</Text>
			</View>
			<Text style={styles.text5}>
				{"chart"}
			</Text>
		</View>
		<Text style={styles.text6}>
			{"Savings Goals"}
		</Text>
		<View style={styles.column2}>
			<View style={styles.column3}>
				<View style={styles.row2}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/8uqctwi4_expires_30_days.png"}} 
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
					<View style={styles.column4}>
						<View style={styles.row3}>
							<Text style={styles.text7}>
								{"Travel"}
							</Text>
							<Text style={styles.text8}>
								{"KWD 100"}
							</Text>
						</View>
						<View style={styles.box}>
						</View>
					</View>
				</View>
				<View style={styles.box2}>
				</View>
				<View style={styles.row2}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/xvu7dn40_expires_30_days.png"}} 
						resizeMode = {"stretch"}
						style={styles.image5}
					/>
					<View style={styles.column4}>
						<View style={styles.row3}>
							<Text style={styles.text7}>
								{"Kids"}
							</Text>
							<Text style={styles.text8}>
								{"KWD 24"}
							</Text>
						</View>
						<View style={styles.box3}>
						</View>
					</View>
				</View>
				<View style={styles.box2}>
				</View>
				<View style={styles.row4}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/pxppn3ob_expires_30_days.png"}} 
						resizeMode = {"stretch"}
						style={styles.image5}
					/>
					<View style={styles.column4}>
						<View style={styles.row5}>
							<Text style={styles.text7}>
								{"Rent"}
							</Text>
							<Text style={styles.text8}>
								{"KWD 24.44"}
							</Text>
						</View>
						<View style={styles.box4}>
						</View>
					</View>
				</View>
				<Text style={styles.text10}>
					{"See All"}
				</Text>
			</View>
			<Image
				source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/em1sgz79_expires_30_days.png"}} 
				resizeMode = {"stretch"}
				style={styles.absoluteImage}
			/>
		</View>
	</View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
		flex: 1,
	},
	absoluteImage: {
		position: "absolute",
		bottom: -47,
		right: 0,
		width: 60,
		height: 60,
	},
	box: {
		height: 8,
		backgroundColor: "#36C3C6",
		borderRadius: 64,
	},
	box2: {
		width: 287,
		height: 1,
		backgroundColor: "#00000057",
		marginBottom: 13,
		marginLeft: 71,
	},
	box3: {
		height: 8,
		backgroundColor: "#B536C6",
		borderRadius: 64,
	},
	box4: {
		height: 8,
		backgroundColor: "#D8686A",
		borderRadius: 64,
	},
	buttonRow: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#2E3039",
		borderRadius: 39,
		paddingVertical: 4,
		paddingHorizontal: 14,
	},
	column: {
		alignItems: "center",
		backgroundColor: "#00000033",
		paddingTop: 7,
		paddingBottom: 117,
		paddingHorizontal: 122,
		marginBottom: 14,
		marginHorizontal: 16,
	},
	column2: {
		marginBottom: 133,
		marginHorizontal: 16,
	},
	column3: {
		alignItems: "flex-start",
		backgroundColor: "#00000026",
		borderRadius: 14,
		paddingVertical: 23,
	},
	column4: {
		flex: 1,
	},
	image: {
		width: 41,
		height: 41,
	},
	image2: {
		width: 34,
		height: 41,
	},
	image3: {
		width: 20,
		height: 20,
	},
	image4: {
		width: 41,
		height: 41,
		marginRight: 7,
	},
	image5: {
		width: 41,
		height: 41,
		marginRight: 8,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 6,
		marginTop: 8,
		marginBottom: 9,
		marginHorizontal: 16,
	},
	row2: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 14,
		paddingVertical: 10,
		paddingHorizontal: 23,
		marginBottom: 14,
	},
	row3: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 9,
	},
	row4: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 9,
		paddingHorizontal: 23,
		marginBottom: 14,
	},
	row5: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	text: {
		color: "#000000",
		fontSize: 16,
		textAlign: "center",
		marginBottom: 11,
		marginHorizontal: 16,
	},
	text2: {
		color: "#000000",
		fontSize: 25,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 11,
		marginHorizontal: 16,
	},
	text3: {
		color: "#FFFFFF",
		fontSize: 16,
		marginRight: 13,
	},
	text4: {
		color: "#FFFFFF",
		fontSize: 16,
	},
	text5: {
		color: "#000000",
		fontSize: 16,
		textAlign: "center",
		width: 135,
	},
	text6: {
		color: "#000000",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 13,
		marginLeft: 16,
	},
	text7: {
		color: "#000000",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "left",
		marginRight: 4,
		flex: 1,
	},
	text8: {
		color: "#000000",
		fontSize: 16,
		textAlign: "right",
		flex: 1,
	},
	text9: {
		color: "#1E1E1E",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
		marginRight: 4,
		flex: 1,
	},
	text10: {
		color: "#000000",
		fontSize: 16,
		textAlign: "center",
        alignSelf:"center"
	},
	view: {
		alignItems: "center",
	},
	view2: {
		backgroundColor: "#2E303966",
		borderRadius: 39,
		paddingTop: 7,
		paddingBottom: 8,
		paddingHorizontal: 29,
		marginBottom: 18,
	},
})