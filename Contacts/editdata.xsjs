$.response.contentType = "application/text";

var body = '';
var dataToEditJson = $.request.parameters.get('dataToEdit');
var dataToEdit = JSON.parse(dataToEditJson);

var email = dataToEdit.EMAIL;
var firstname = dataToEdit.FIRSTNAME;
var lastname = dataToEdit.LASTNAME;
var age = dataToEdit.AGE;
var address = dataToEdit.ADDRESS;

function editData() {
	var connection = $.db.getConnection();
	var pstmt = null;
	var resultSet;
	var queryToExecute = "update BEST.PERSONAL set FIRSTNAME=?, LASTNAME=?, AGE=?, ADDRESS=? where EMAIL=?";
	try {
		pstmt = connection.prepareStatement(queryToExecute);
		pstmt.setString(1, firstname);
		pstmt.setString(2, lastname);
		pstmt.setString(3, age);
		pstmt.setString(4, address);
		pstmt.setString(5, email);
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
		$.response.setBody(editData());
	} catch (err) {
		$.response.contentType = "text/plain";
		$.response
				.setBody("Error while executing query: [" + err.message + "]");
		$.response.returnCode = 200;
	}
}
doGet();
