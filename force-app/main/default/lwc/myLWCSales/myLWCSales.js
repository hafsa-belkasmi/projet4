import { LightningElement, api, wire, track } from 'lwc';
import getProducts from '@salesforce/apex/RetrieveOpportunityProducts.getProducts';

const COLUMNS = [
    { label: 'Nom du produit', fieldName: 'Product2.Name' },
    { label: 'Prix unitaire', fieldName: 'UnitPrice', type: 'currency' },
    { label: 'Prix total', fieldName: 'TotalPrice', type: 'currency' },
    { label: 'Quantité', fieldName: 'Quantity', type: 'number' },
    { label: 'Quantité en stock', fieldName: 'Quantite_en_stock__c', type: 'number' },
    {
        type: 'button-icon',
        label: 'Supprimer',
        fixedWidth: 100,
        typeAttributes: {
            iconName: 'utility:delete',
            name: 'delete',
            title: 'Supprimer',
            alternativeText: 'Supprimer',
            variant: 'border-filled'
        }
    }
];

export default class MyLWCSales extends LightningElement {
    @api recordId;
    @track columns = COLUMNS;
    @track data = [];

    @wire(getProducts, { opportunityId: '$recordId' })
    wiredProducts({ error, data }) {
        if (data) {
            this.data = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'delete') {
            // Pour le moment on retire visuellement la ligne sans suppression côté serveur
            this.data = this.data.filter(item => item.Id !== row.Id);
            // Tu peux appeler ici une méthode Apex pour supprimer réellement si besoin
        }
    }
}
