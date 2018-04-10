$.response.contentType = "application/text";

var email = [];
email = $.request.parameters.get('email[]');

function deleteData() {
	var connection = $.db.getConnection();
	var pstmt = null;
	var rs;
	var queriesToExecute;
	var int;

	for (int = 0; int < email.length; int++) {
		queriesToExecute = "delete from BEST.PERSONAL where EMAIL= '"
				+ email[int] + "'";

		pstmt = connection.prepareStatement(queriesToExecute);
		rs = pstmt.execute();
		connection.commit();

	}

	pstmt.close();
	connection.close();

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
