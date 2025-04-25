public class RetrieveOpportunityProducts {

    @AuraEnabled(cacheable=true)  // Ajout de l'annotation pour que la méthode soit accessible
    public static String getMessage() {
        return 'Hello, Salesforce!';
    }
}

