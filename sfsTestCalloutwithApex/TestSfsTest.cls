@isTest
private class TestSfsTest {
    
    
    @isTest static  void testgetSfsLendersPositiveTest() {
        // Create the mock response based on a static resource
        StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
        mock.setStaticResource('sfsLenders');
        mock.setStatusCode(200);
        mock.setHeader('Content-Type', 'application/json;charset=UTF-8');
        // Associate the callout with a mock response
        Test.setMock(HttpCalloutMock.class, mock);
        // Call method to test
        String response = SfsTest.getSfsLenders();
        List<creditor> credList = creditor.parse(response); 
        System.assertEquals(10, credList.size(),
          'The array should only contain 10 items.');  
    } 
    
    
    @isTest static  void testgetSfsLendersNegativeTest() {
        // Create the mock response based on a static resource
        StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
        mock.setStaticResource('sfsLenders');
        mock.setStatusCode(404);
        mock.setHeader('Content-Type', 'application/json;charset=UTF-8');
        // Associate the callout with a mock response
        Test.setMock(HttpCalloutMock.class, mock);
        // Call method to test
        String response = SfsTest.getSfsLenders();
        System.assertEquals(null, response,
          'The response should be null.');  
    } 
}