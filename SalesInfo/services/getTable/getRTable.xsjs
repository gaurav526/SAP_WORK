$.response.contentType = "application/text";

var rId = $.request.parameters.get('REGID');

//var query = "select PID, REGID, SCOUNT from BEST.SALES WHERE PID=?";
var query = "select R.REGNAME,P.PNAME, S.SCOUNT FROM BEST.SALES S INNER JOIN BEST.REGION R ON R.REGID=S.REGID INNER JOIN BEST.PRODUCT P ON P.PID=S.PID WHERE S.REGID=?";
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
		pstmt.setString(1, rId);
		resultSet = pstmt.executeQuery();
		var data;

		while (resultSet.next()) {
			data = {};
			data.PNAME = resultSet.getString(1);
			data.REGNAME = resultSet.getString(2);
			data.SCOUNT = resultSet.getInteger(3);
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