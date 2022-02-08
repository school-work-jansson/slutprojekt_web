    

### **Projektplanering för slutprojekt i Webserverprogrammering och Webutveckling 2**

# 1. Inledning

## 1.1 Kort beskrivning av projekt
Detta projekt kommer vara en hemsida där klienten kan gå in och söka efter en produkt de skulle vilja köpa, till exempel en IPhone 12 Pro max. Då ska använder kunna se betyg, recenssioner, och specificationer på just den produkten. 

## 1.2 Målgrupp
Målgruppen är till personer som är i behov av produkter inom ämnet teknik.

## 1.3Vilket betyg jag satsar på.

Jag satsar på betyget A i både Webserverprogrammering och Webutveckling 2

# 2 Ingående beskrivning av projektet

## 2.1 Detaljerad beskrivningen av projektet
Under Covid-19 pandemin så har det blivit mer och mer vanligt att man handlar sina saker på internet och antingen får det levererat hem till dörren eller att man åker och hämtar det hos ett postombud. Med det sagt så är det väldigt svårt att se kvalitén på något utifrån en bild på internet.

Detta projekt är tänkt att underlätta för användaren att hitta rätt produkt för det som de behöver. Sjäva ideén är väldigt inspererat av sidan Trustpilot, vilket är en sida som går ut på att på ett censurfritt ställe kunna lägga recenssioner på företag utan att bli manipulerad av företag. Jag tänker att man istället för att recensera företag så ska man kunna recensera företagens produkter.

Min idé är att sidan ska vara ganska simpel eftersom att det ska vara lätt att navigera sig runt på sidan och hitta just det man letar efter. 


## 2.2 Lista allt som skall göras för att projektet skall bli til

En sammanfattad punkt-lista på vad som behöver göras för att projektet ska bli klart. Uppdelade i tre olika delar Backend, Frontend och Databas

*\*Kan vara saker som jag lägger till ifall jag har tid kvar med projektet.

### 2.2.1 **Backend**
- Inloggnings hantering med hjälp av oAuth 2.0
	- Spara access- och refresh tokens
- Mailserver
- Säkerhetstänk
	- CSRF och XSS

### 2.2.2 **Frontend**
- Sökfunktion
	- Se resultat
	- Pagnition knapp för att se mer
	- *Avancerad sökning*
		- Välja prisklass
        - Markeringar    
        - Recensioner
        - Kategori
- Produkt
	- Se alla reviews till just den produkten
	- Star ratiting funktion som tar meddelvärdet av alla recenssioner
	- Specifiaktioner av en produkt
	- Beskrivning
	- Pris
	- Företaget som producerar produkten
	- Möjliga affärer som säljer produkten
	- Kategori
	- *Markeringar på produkt (fairtrade etc)* Ifall jag skulle lägga till mer än bara teknik specifierade produkter
- Mailing funktion (Kontakta)
- konton
	- Profil
		- Ändra sin profil
	- Kunna publicera recenssioner på nya produkter
		- *För att kunna publicera nya produkter så måste man ha en viss mängd "karma"*
	- Kunna publicera recenssioner på existerande produkter

### **2.2.3 Databas**
- Konton
- Produkter
	- Pris
	- Företag
	- Kategori
	- Miljö märkning
- Recenssioner 

### 2.2.4 Ska göras allmänt
- Validera frontend CSS med w3schools validator
- Användar tester



## 2.3 Beskriv vilka undersider webbplatsen kommer att använda sig av samt andra speciella saker, tex extern kod (som DOM-script)

## 2.4 Kunskaper
- Erfaren inom backend
- Lära mig mer om responsiva sidor och jquery (frontend scripts)

## 2.5 Möjliga utvecklings ideér

-  Addon till webläsaren man använder så att man kan se betyget på en produkt när man är på en hemsida och tänker på att köpa/beställa den.    
- Meddelandesystem mellan administrator och klient (utöver mail service)
- Flera sätt att kunna logga in på sidan eftersom att jag inte vill tvinga användaren att behöva skaffa ett discord konto för att kunna använda sidan.
- Främst så "satsar" jag på produkter innom teknik kategorin så som dator komponenter eller liknande. Men om jag skulle vidareutveckla projektet så skulle jag kunna lägga till flera kategorier för att kunna breda ut målgruppen


## 2.6 Projektets säkerhet

När jag menar säkerhet så menar jag inte säkerhet för själva projeketet utan för användaren. Användaren ska inte behöva oroa sig för möjliga dataintrång och därför så är användarsäkerheten viktig. Det är även viktigt för mig som utvecklare att tänka på under utvecklingen möjliga säkerhetsrisker ([https://expressjs.com/en/advanced/best-practice-security.html](https://expressjs.com/en/advanced/best-practice-security.html))

Nu så är säkerhetsrisken för användaren ganska låg eftersom användaren inte behöver ange känslig information som jag tar hand om till exempel hantering av lösenord. Då oAuth 2.0 gör så att användaren aldrig behöver skapa ett konto för att logga in på min sida utan använder sig utav andra tjänster. 

Ända möjliga säkerhetsrisken som skulle kunna uppstå för användaren är [CSRF](https://owasp.org/www-community/attacks/csrf) då jag ändå måste använda mig utav kakor eller sessions då jag fortfarande har användare.

Om jag däremot skulle vidareutveckla detta och lägga till hantering av lösenord av någon anledning så skulle jag behöva lägga stor uppmärksamhet på möjliga säkerhetsrisker som kan uppstå vid hantering av användares känsligadata.

Det jag däremot måste tänka lite på under projektets gång är säkerhetsrisken för dataintrång på servern på grund av till exempel XSS

[XSS](https://owasp.org/www-community/attacks/xss/) eller så kallad Cross Site Scripting är en hacknings teknik där attackeraren kan injecera kod på serversidan. Genom att till exempel skicka med en kodsnutt som körs på frontend eller backend för att kunna manipulera innehållet eller hämta data från databasen.

[CSRF](https://owasp.org/www-community/attacks/csrf) eller så kallad Cross Site Request Forgery är en metod för en attackerare att kunna lura användaren att göra oönskade saker på en hemsida genom hackningstekniken "social engineering", till exempel byta lösenord eller epostadress utan användaren direkt märker det.

Genom att läsa på lite om dessa säkerhetsrisker och hitta möjliga utvecklingstekniker för att undvika just de här riskerna så kommer jag att göra sidan säkrare.

Yttligare en risk som skulle kunna uppstå är när jag använder bibliotek med stängd källkod, eller bibliotek med öppen källkod som inte används av så många. Därför använder jag pakethanteraren NPM och github för att hitta öppen källkod med som många utvecklare använder i sina projekt. Detta minskar risken av en möjlig attack eller kryphål eftersom källkoden hanteras och gås troligen igenom av många utvecklare, som troligtvis har mycket en högre kunskap att hitta säkerhetsrisker.

# 3 Tidsplanering
## 3.1 Deadlines

Vecka 3 – Skriva projektplanering & TODO lista
Vecka 4 – Skriva projektplanering & TODO lista
Vecka 5 – Skriva projektplanering & TODO lista
Vecka 6 – Frontend design, funktionallitet och material (bilder)
Vecka 7 – Designa Databas
Vecka 8 – Skapa tabeller till databas
Vecka 9 – Databas
Vecka 10 – Backend
Vecka 11 – Backend