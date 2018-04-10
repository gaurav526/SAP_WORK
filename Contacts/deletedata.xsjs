$.response.contentType = "application/text";

var email = $.request.parameters.get('EMAIL');

function deleteData() {
	var connection = $.db.getConnection();
	var pstmt = null;
	var rs;
	var queryToExecute = "DELETE FROM BEST.PERSONAL WHERE EMAIL = ?";
	// var queriesToExecute = "delete from BEST.PERSONAL where EMAIL in (?, ?, ...)";
	try {
		pstmt = connection.prepareStatement(queryToExecute);
		pstmt.setString(1, email);
		rs = pstmt.execute();
		connection.commit();
	} finally {
		pstmt.close();
		connection.close();
	}
	return rs;
}

function doGet() {

	try {
		$.response.contentType = "text/plain";
		$.response.setBody(deleteData());
	} catch (err) {
		$.response.contentType = "text/plain";
		$.response
				.setBody("Error while executing query: [" + err.message + "]");
		$.response.returnCode = 200;
	}
}
doGet();
