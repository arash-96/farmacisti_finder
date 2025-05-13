const PrivacyPolicy = () => {
    return (
        <main className="p-6 max-w-4xl mx-auto text-gray-800">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy di SOS Pharmacist</h1>
            <p className="italic mb-6">Ultimo aggiornamento: 13/05/2025</p>

            <p className="mb-4">
                Questa informativa è resa ai sensi dell’art. 13 del Regolamento (UE) 2016/679 (GDPR) e descrive le modalità con cui SOS Pharmacist raccoglie, utilizza e protegge i dati personali degli utenti che accedono al sito{" "}
                <a href="https://www.sos-pharmacist.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                    www.sos-pharmacist.com
                </a>.
            </p>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Titolare del Trattamento</h2>
                <p>
                    Il titolare del trattamento dei dati è:<br />
                    Email: <a href="mailto:info@sospharmacist.com" className="text-blue-600 underline">
                        info@sospharmacist.com
                    </a>.<br />
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Tipologie di Dati Raccolti</h2>
                <ul className="list-disc list-inside">
                    <li>Dati identificativi: nome, cognome, email (tramite moduli di contatto o registrazione);</li>
                    <li>Dati tecnici: indirizzi IP, tipo di browser, orario di accesso e dati relativi alla navigazione;</li>
                    <li>Cookie: solo cookie tecnici e di analisi anonima (vedi Cookie Policy separata).</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Finalità del Trattamento</h2>
                <ul className="list-disc list-inside">
                    <li>Gestione delle richieste ricevute tramite il sito (form di contatto);</li>
                    <li>Registrazione e gestione dell’account utente;</li>
                    <li>Miglioramento del sito e monitoraggio statistico del traffico (in forma aggregata e anonima);</li>
                    <li>Adempimento a obblighi di legge o regolamenti.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Base Giuridica del Trattamento</h2>
                <ul className="list-disc list-inside">
                    <li>Il consenso dell’interessato (es. quando compila un modulo);</li>
                    <li>L’esecuzione di misure precontrattuali o contrattuali (es. registrazione utente);</li>
                    <li>L’adempimento di obblighi legali.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Modalità di Trattamento e Conservazione</h2>
                <p>
                    I dati sono trattati con strumenti informatici in modo lecito, corretto e trasparente. I dati saranno conservati solo per il tempo necessario alle finalità sopra indicate o secondo quanto previsto dalla legge.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Comunicazione e Diffusione dei Dati</h2>
                <p>
                    I dati non saranno mai venduti o diffusi. Potranno essere comunicati a:
                </p>
                <ul className="list-disc list-inside">
                    <li>Fornitori di servizi tecnici e hosting;</li>
                    <li>Collaboratori e professionisti incaricati dal titolare;</li>
                    <li>Autorità competenti, solo nei casi previsti dalla legge.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Diritti dell’Interessato</h2>
                <p>L’utente può, in qualsiasi momento, esercitare i diritti previsti dal GDPR (artt. 15-22), tra cui:</p>
                <ul className="list-disc list-inside">
                    <li>Accesso ai dati;</li>
                    <li>Rettifica o aggiornamento;</li>
                    <li>Cancellazione (diritto all’oblio);</li>
                    <li>Limitazione del trattamento;</li>
                    <li>Portabilità dei dati;</li>
                    <li>Opposizione al trattamento.</li>
                </ul>
                <p>Le richieste vanno inviate a <a href="mailto:info@sospharmacist.com" className="text-blue-600 underline">
                    info@sospharmacist.com
                </a>.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">8. Modifiche alla Privacy Policy</h2>
                <p>
                    Ci riserviamo il diritto di aggiornare questa informativa. In caso di modifiche rilevanti, sarà data opportuna comunicazione sul sito.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">9. Contatti</h2>
                <p>
                    Per qualsiasi chiarimento o per esercitare i tuoi diritti, puoi scrivere a:<br />
                    📧 <a href="mailto:info@sospharmacist.com" className="text-blue-600 underline">
                        info@sospharmacist.com
                    </a>.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">10. Tutela dei contenuti e proprietà intellettuale</h2>
                <p>
                    Tutti i contenuti presenti su SOS Pharmacist, inclusi testi, immagini, loghi, grafica, codice, layout e ogni altro elemento pubblicato, sono di proprietà esclusiva del Titolare o concessi in licenza d’uso, e sono protetti dalle normative italiane e internazionali sul diritto d’autore e sulla proprietà intellettuale.
                </p>
                <p>
                    È vietata qualsiasi forma di riproduzione, distribuzione, pubblicazione, trasmissione, modifica o utilizzo anche parziale dei contenuti senza autorizzazione scritta del Titolare. Ogni violazione sarà perseguita nei termini di legge.
                </p>
                <p>Per segnalazioni o richieste di utilizzo, scrivere a <a href="mailto:info@sospharmacist.com" className="text-blue-600 underline">
                    info@sospharmacist.com
                </a>.</p>
            </section>
        </main>
    );
};

export default PrivacyPolicy;
