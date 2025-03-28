import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="text-center mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy di SOS Pharmacist</h1>
            <p className="text-gray-600">Ultimo aggiornamento: 28/03/2025</p>
            <p className="mt-4">Benvenuto su SOS Pharmacist. La tua privacy è importante per noi e ci impegniamo a proteggerla. Questa Privacy Policy descrive come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali quando utilizzi il nostro sito web.</p>

            <h2 className="text-2xl font-bold mt-6">1. Titolare del trattamento</h2>
            <p>[Nome Azienda o Proprietario] [Indirizzo] [E-mail di contatto] [P.IVA/Codice Fiscale]</p>

            <h2 className="text-2xl font-bold mt-6">2. Dati raccolti</h2>
            <ul className="list-disc list-inside pl-5">
                <li>Dati di registrazione: nome, cognome, e-mail, password.</li>
                <li>Dati di pagamento: per la sottoscrizione di abbonamenti.</li>
                <li>Dati di navigazione: indirizzo IP, tipo di dispositivo, cookie.</li>
                <li>Dati per la pubblicità: preferenze pubblicitarie e interazioni con gli annunci.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">3. Finalità del trattamento</h2>
            <ul className="list-disc list-inside  pl-5">
                <li>Creare e gestire il tuo account.</li>
                <li>Permettere la sottoscrizione di abbonamenti.</li>
                <li>Fornire servizi e contenuti personalizzati.</li>
                <li>Gestire le inserzioni pubblicitarie.</li>
                <li>Rispondere alle richieste di assistenza.</li>
                <li>Adempiere ad obblighi legali e fiscali.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">4. Base giuridica del trattamento</h2>
            <p>Trattiamo i tuoi dati in conformità al GDPR sulla base di:</p>
            <ul className="list-disc list-inside  pl-5">
                <li>Consenso dell’utente per finalità di marketing e pubblicità.</li>
                <li>Esecuzione di un contratto per la gestione dell’account e degli abbonamenti.</li>
                <li>Obblighi di legge per fatturazione e contabilità.</li>
                <li>Legittimo interesse per migliorare i nostri servizi.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">5. Consensi richiesti</h2>
            <p>Al momento della registrazione o dell’utilizzo del nostro sito, richiederemo il tuo consenso per:</p>
            <ul className="list-disc list-inside  pl-5">
                <li>Trattamento dei dati personali.</li>
                <li>Finalità di marketing.</li>
                <li>Pubblicità personalizzata.</li>
                <li>Condivisione con terze parti.</li>
                <li>Cookie: il consenso verrà raccolto tramite un banner cookie.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">6. Conservazione dei dati</h2>
            <p>Conserviamo i tuoi dati solo per il tempo necessario a fornire i servizi richiesti e adempiere agli obblighi di legge.</p>

            <h2 className="text-2xl font-bold mt-6">7. Condivisione dei dati</h2>
            <ul className="list-disc list-inside  pl-5">
                <li>Provider di pagamento per la gestione degli abbonamenti.</li>
                <li>Fornitori di servizi pubblicitari.</li>
                <li>Autorità competenti, se richiesto dalla legge.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">8. Diritti dell’utente</h2>
            <p>Hai il diritto di:</p>
            <ul className="list-disc list-inside  pl-5">
                <li>Accedere ai tuoi dati.</li>
                <li>Chiedere la rettifica o la cancellazione.</li>
                <li>Ottenere la portabilità dei dati.</li>
                <li>Revocare il consenso al trattamento.</li>
                <li>Presentare reclamo all’Autorità Garante.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">9. Cookie e pubblicità</h2>
            <p>Usiamo cookie per migliorare l’esperienza utente. Puoi gestire le tue preferenze attraverso le impostazioni del browser o tramite il nostro banner cookie.</p>

            <h2 className="text-2xl font-bold mt-6">10. Modifiche alla Privacy Policy</h2>
            <p>Ci riserviamo il diritto di aggiornare questa Privacy Policy. Ti informeremo in caso di modifiche significative.</p>

            <p className="mt-6">Se hai domande, contattaci a info@sospharmacist.com.</p>
            <p className="font-bold mt-4">Grazie per aver scelto SOS Pharmacist!</p>
            <br />
            <br />
            <br />
        </div>
    );
};

export default PrivacyPolicy;
