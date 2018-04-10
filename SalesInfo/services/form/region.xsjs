var query = "select REGID, REGNAME from BEST.REGION";
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

	var dataList = [];
	var connection = $.db.getConnection();
	var statement = null;
	var resultSet = null;
	try {
		statement = connection.prepareStatement(query);
		resultSet = statement.executeQuery();
		var data;

		while (resultSet.next()) {
			data = {};
			data.REGID = resultSet.getInteger(1);
			data.REGNAME = resultSet.getString(2);
			dataList.push(data);
		}
	} finally {
		close([ resultSet, statement, connection ]);
	}

	var str = JSON.stringify(dataList);
	return str;
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