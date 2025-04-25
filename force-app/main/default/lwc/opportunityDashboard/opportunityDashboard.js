import { LightningElement, track, api } from 'lwc';

// ❌ SUPPRIMÉ : import findCasesBySubject (la classe Apex n’existe pas encore)

const COLUMNS = [
    { label: 'Sujet', fieldName: 'Subject', type: 'text' },
    { label: 'Statut', fieldName: 'Status', type: 'text' },
    { label: 'Priorité', fieldName: 'Priority', type: 'text' },
];

export default class OpportunityDashboard extends LightningElement {
    @api recordId; // ID de l'opportunité si utilisé sur une Record Page
    @track cases = []; // Tableau vide pour éviter les erreurs
    @track error;
    searchTerm = '';
    columns = COLUMNS;
    isRefreshing = false;

    updateSearchTerm(event) {
        this.searchTerm = event.target.value;
    }

    handleSearch() {
        // Comme findCasesBySubject est manquant, on simule des données en attendant
        this.cases = [
            { Id: '001', Subject: 'Test 1', Status: 'Nouveau', Priority: 'Haute' },
            { Id: '002', Subject: 'Test 2', Status: 'En cours', Priority: 'Moyenne' },
        ];
        this.error = undefined;
    }

    refreshCases() {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.handleSearch();
            this.isRefreshing = false;
        }
    }

    get hasCases() {
        return this.cases && this.cases.length > 0;
    }

    get hasRealError() {
        return this.error && this.error.trim() !== '';
    }
}
