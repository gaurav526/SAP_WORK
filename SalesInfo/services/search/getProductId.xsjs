$.response.contentType = "application/text";

var pName = $.request.parameters.get('PNAME');

var query = "select PID from BEST.PRODUCT where PNAME=?";
function close(closables) {
	var closable;
	var i;
	for (i = 0; i < closables.length; i++) {
		closable = closables[i];
		if (closable) {
			closable.close();
		}
	}
}
function getData() {

	var data;
	var connection = $.db.getConnection();
	var pstmt = null;
	var resultSet = null;
	try {
		pstmt = connection.prepareStatement(query);
		pstmt.setString(1, pName);
		resultSet = pstmt.executeQuery();

		while (resultSet.next()) {
			data = resultSet.getInteger(1);
		}
	} finally {
		close([ resultSet, pstmt, connection ]);
	}

	//var str = JSON.stringify(data);
	return data;
}
function doGet() {
	try {
		$.response.contentType = "application/json";
		$.response.setBody(getData());
	} catch (err) {
		$.response.contentType = "text/plain";
		$.response
				.setBody("Error while executing query: [" + err.message + "]");
		$.response.returnCode = 200;
	}
}
doGet();