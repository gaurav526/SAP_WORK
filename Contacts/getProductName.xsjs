$.response.contentType = "application/text";
var pId = $.request.parameters.get('PID');
var query = "select PNAME from BEST.PRODUCT WHERE PID=?";


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
	var pstmt = null;
	var resultSet = null;
	try {
		pstmt = connection.prepareStatement(query);
		pstmt.setString(1, pId);
		resultSet = pstmt.executeQuery();
		var data;

		while (resultSet.next()) {
			data = {};
			data.PNAME = resultSet.getString(1);
			dataList.push(data);
		}
	} finally {
		close([ resultSet, pstmt, connection ]);
	}
	        
	var str = JSON.stringify({
		UserSet : dataList
	});
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