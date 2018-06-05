export default ({ navigation }) => (
    <View style={{ paddingVertical: 20 }}>
      <Card>
        { /* ... */}
  
        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="transparent"
          textStyle={{ color: "#bcbec1" }}
          title="Sign In"
          onPress={() => navigation.navigate("SignIn")}
        />
      </Card>
    </View>
  );