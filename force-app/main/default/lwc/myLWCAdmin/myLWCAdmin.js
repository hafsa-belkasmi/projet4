import { LightningElement, api, wire, track } from 'lwc';
import getOpportunityData from '@salesforce/apex/OpportunityController.getOpportunityData';
import deleteRecord from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

const COLUMNS = [
    { label: 'Nom du Produit', fieldName: 'Product2Name' },
    {
        label: 'Quantité',
        fieldName: 'Quantity',
        cellAttributes: {
            class: { fieldName: 'quantityClass' }
        }
    },
    { label: 'Quantité en Stock', fieldName: 'Quantit_en_stock__c', type: 'number' },
    { label: 'Prix Unitaire', fieldName: 'UnitPrice', type: 'currency' },
    { label: 'Prix Total', fieldName: 'TotalPrice', type: 'currency' },
    {
        label: 'Voir',
        type: 'button-icon',
        fixedWidth: 50,
        typeAttributes: {
            iconName: 'utility:preview',
            name: 'view_product',
            title: 'Voir Produit',
            variant: 'border-filled',
            alternativeText: 'Voir'
        }
    },
    {
        label: 'Supprimer',
        type: 'button-icon',
        fixedWidth: 50,
        typeAttributes: {
            iconName: 'utility:delete',
            name: 'delete_product',
            title: 'Supprimer',
            variant: 'border-filled',
            alternativeText: 'Supprimer'
        }
    }
];

export default class MyLWC extends NavigationMixin(LightningElement) {
    @api recordId;
    @track noData = false;
    @track opportunityRows = [];
    columns = COLUMNS;

    @wire(getOpportunityData, { opportunityId: '$recordId' })
    opportunityData({ error, data }) {
        if (data && data.length > 0) {
            this.opportunityRows = data.map(item => ({
                Id: item.Id,
                Product2Name: item.Product2?.Name,
                UnitPrice: item.UnitPrice,
                TotalPrice: item.TotalPrice,
                Quantity: item.Quantity,
                Quantit_en_stock__c: item.Quantit_en_stock__c,
                Product2Id: item.Product2Id,
                quantityClass: item.Quantity < 0 ? 'slds-text-color_error' : 'slds-text-color_success'
            }));
            this.noData = false;
        } else {
            this.opportunityRows = [];
            this.noData = true;
        }

        if (error) {
            console.error('Erreur récupération données : ', error);
            this.opportunityRows = [];
            this.noData = true;
        }
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        switch (actionName) {
            case 'view_product':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Product2Id,
                        objectApiName: 'Product2',
                        actionName: 'view'
                    }
                });
                break;
            case 'delete_product':
                this.deleteOpportunityLineItem(row.Id);
                break;
        }
    }

    deleteOpportunityLineItem(recordId) {
        deleteRecord(recordId)
            .then(() => {
                this.opportunityRows = this.opportunityRows.filter(item => item.Id !== recordId);
            })
            .catch(error => {
                console.error('Erreur suppression :', error);
            });
    }
}
