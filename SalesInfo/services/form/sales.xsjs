$.response.contentType = "application/text";

var body = '';
var dataToInsertJson = $.request.parameters.get('dataToInsert');
var dataToInsert = JSON.parse(dataToInsertJson);

var pId = dataToInsert.PID;
var regId = dataToInsert.REGID;
var sCount = dataToInsert.SCOUNT;

function insertData() {
	var connection = $.db.getConnection();
	var pstmt = null;
	var resultSet = null;
	var queryToExecute = "INSERT INTO BEST.SALES(PID,REGID, SCOUNT) VALUES(?,?,?)";
	try {
		pstmt = connection.prepareStatement(queryToExecute);
		pstmt.setString(1, pId);
		pstmt.setString(2, regId);
		pstmt.setString(3, sCount);
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
