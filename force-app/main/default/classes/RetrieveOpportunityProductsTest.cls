@isTest
public class RetrieveOpportunityProductsTest {
    @isTest
    public static void testGetMessage() {
        // Appeler la méthode statique getMessage() pour vérifier qu'elle retourne le bon message
        String result = RetrieveOpportunityProducts.getMessage();
        System.assertEquals('Hello, Salesforce!', result);
    }
}
