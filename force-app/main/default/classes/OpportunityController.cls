public with sharing class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<OpportunityLineItem> getOpportunityData(Id opportunityId) {
        return [
            SELECT Id, Product2.Name, UnitPrice, TotalPrice, Quantity, Quantit_en_stock__c, Product2Id
            FROM OpportunityLineItem
            WHERE OpportunityId = :opportunityId
        ];
    }
}