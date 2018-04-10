$.response.contentType = "application/text";

var body = '';
var dataToInsertJson = $.request.parameters.get('dataToInsert');
var dataToInsert = JSON.parse(dataToInsertJson);

var email = dataToInsert.EMAIL;
var firstname = dataToInsert.FIRSTNAME;
var lastname = dataToInsert.LASTNAME;
var age = dataToInsert.AGE;
var address = dataToInsert.ADDRESS;

function insertData() {
	var connection = $.db.getConnection();
	var pstmt = null;
	var resultSet = null;
	var queryToExecute = "INSERT INTO BEST.PERSONAL (EMAIL, FIRSTNAME, LASTNAME, AGE, ADDRESS) VALUES(?,?,?,?,?)";
	try {
		pstmt = connection.prepareStatement(queryToExecute);
		pstmt.setString(1, email);
		pstmt.setString(2, firstname);
		pstmt.setString(3, lastname);
		pstmt.setString(4, age);
		pstmt.setString(5, address);
		resultSet = pstmt.execute();
		connection.commit();
	} finally {
		pstmt.close();
		connection.close();
	}
	return resultSet;
}
function doGet() {

	try {
		$.response.contentType = "text/plain";
		$.response.setBody(insertData());
	} catch (err) {
		$.response.contentType = "text/plain";
		$.response
				.setBody("Error while executing query: [" + err.message + "]");
		$.response.returnCode = 200;
	}
}
doGet();
