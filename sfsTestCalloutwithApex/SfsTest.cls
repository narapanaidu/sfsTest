public with sharing class SfsTest {
    
    @AuraEnabled(cacheable=true)
    public static String getSfsLenders() {
        List<creditor> results;
        Http http = new Http();
		HttpRequest request = new HttpRequest();
		request.setEndpoint('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json');
		request.setMethod('GET');
		HttpResponse response = http.send(request);
		// If the request is successful, return the JSON response.
        if (response.getStatusCode() == 200) {
        		return response.getBody();
        }
        return null;
        }

}