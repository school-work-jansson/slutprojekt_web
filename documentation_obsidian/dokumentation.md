    

# **Slutprojekt – dokumentation**

### **Linus Jansson 3F_TE**

# **1 Utförande**

**1.1 Ändringar utifrån planeringen**

**2** **Funktionalitet**

**3 Testning**

**3.1 Tester i olika webläsare**

**3.2 Validering av koden**

Under projektets gång så har jag både använt mig utav linting program för backend och frontend som talar om ifall det är något slarvfel osv som jag gör. Backenden crashar även (Validera koden på ngt sätt) ifall det är något syntax fel man skrivit.

- https://www.eversql.com/sql-syntax-check-validator/

Frontenden har jag validerat på w3 schools validator, för html och css validering...

**3.2 Test på personer ur målgruppen**
Under test ur målgruppen så har jag fokuserat på att testpersonen ska navigera till en specifik sida på hemsidan och göra en viss grej. De ska navigera till en produkt och lägga upp en review med valfri titel, innehåll och betygg. Sedan ska personen även ändra mellan darkmode och lightmode. Personen ska även gå in på profilen och ändra valfria uppgifter till något annat än det är nu. Sedan ska de svara på följande frågor:
	1. Är det något du saknar av funktionaliteten på hemsidan? 
	2. Hur lätt skulle du säga att göra uppgifterna ovan från 1-5? 
	3. Var det något som du uppfattade som oklart hur du skulle göra?

##### Person 1
1. Är det något du saknar från funktionalliteten av sidan?
	- Mer stabilitet på hemsidan. Mer feedback för vad användaren gör fel, som att man måste vara inloggad för att lämna recensioner. Bättre sök funktion/ett sätt att visa alla produkter. 
2. Hur lätt skulle du säga från 1 till 5 att göra testerna du gjorde innan?
	- Den första är omöjlig om man inte vet vad produkterna heter :( resten var ganska intuative, dock så tog det en stund att lista ut att man skulle vara inloggad 
3. Var det något som du uppfattade som oklart hur du skulle göra?
	- Sök efter produkt

##### Person 2
1. Är det något du saknar från funktionalliteten av sidan?
	- en till sida där man kan se alla produkter för att det är svårt att hitta produkterna om man inte vet vad de heter. 
2. Hur lätt skulle du säga från 1 till 5 att göra testerna du gjorde innan?
	- första var svår eftersom man visste inte vad man skulle söka på, så skulle säga en 4 på svårhetsskalan. 
3. Var det något som du uppfattade som oklart hur du skulle göra?
	- att logga in för att skriva reviews.

##### Person 3
1. Är det något du saknar från funktionalliteten av sidan?
	- Kanske redan nämnts men utveckla sökfunktionen så man kan hitta liknande resultat till den input man angivit
2. Hur lätt skulle du säga från 1 till 5 att göra testerna du gjorde innan?
	- Utifrån skalan skulle jag ge hemsidan en 4
3. Var det något som du uppfattade som oklart hur du skulle göra?
	- Tydligare knapp för att skapa en recension, och inte en textlänk formulerad som en fråga, lite svårt att fatat först


**3.3 Övriga tester**

**3.4 Ändringar utifrån testresultatet**
Utifrån testet från person 2 och 3, fråga 3 så var det svårt att förstå över hur man skulle skriva en recension. Detta har jag ändrat från en text man klickar på för en popup med formuläret till att man ser formuläret direkt om man är inloggad. Om man inte är inloggad så ser man texten "Du måste logga in för att skriva en produkt"

**4 Lagar och säkerhet**

**4.1 Upphovsrätt och GDPR**
När användaren loggar in på hemsidan så berättar discord för användaren att servern kommer ha tillgång till användarens, discord användarnamn, epostadress, profilbild och banner. 

Användaren har även full kontroll över sitt användarnamn och epostadress på hemsidan genom att de kan gå in på sin profil och ändra det till önskat alternativ ifall de inte skulle vilja att servern vet dessa. Servern sparar heller inte någon data på användaren vid ändring av dessa information. 

Profilbilden hanteras direkt av discord och sparas heller inte på servern. Ifall användaren skulle vilja ändra denna så kan den ändras på användarens discordprofil.

  
**4.3 Säkerhet**

Under projektets gång så vägde jag mellan att använda mig av egen lösenord hantering och logga in med en ”third pary” tex Discord eller Google. För att göra sidan mer säker eftersom att jag inte behöver hålla några lösenord säkra och minskar därav risken att konton blir kapade.


Vid använding av färdiggjorda bibliotek i backend och gråntent så har jag även använt mig utav öppen källkod vilket ökar trovärdiheten för den kod jag har använt från andra personer. Detta minskar riskan för kryphål eftersom det är så pass många som har laddat ner de bibliotek jag har använt och som även kan flagg till ifall det är något som inte stämmer, tex att det skulle ligga något fult i bakgrunden som skulle skada mitt projekt.



**5 Utvärdering och reflektion**
Ett problem som uppstod under projektets gång var med att Discord’s användar ID levereras som 64bitars tal i requesten till discord och detta klarar inte javascript av utan den avrundar vid en specifik storlek på talet, det finns datatypen BigInt i javscript som är gjord för att lösa detta problem men jag fick inte det att fungera. Från den slutsats och tanken att jag inte ville att det skulle på något sätt inte fungera genom att den gör en oönskad avrunding ändå så har jag istället gjort så att jag bara hanterar discord idt som en string/varchar i både databasen och backend för att undvika att det blir något fel. 

**5.1 Projektplaneringen**

**5.2 Möjliga förbättringar**

**5.3 Betyg**
Utifrån resultatet av projektet så skulle jag säga att jag har uppnått A nivå i både webserverprogramering och webutveckling 2. Då jag både är väldigt nöjd med sidan, då de är responsiva. Allt ifrån att sidan's menybar ändras beroende på storlek på skärmen och att element om positioneras beroende på storlek på skärm. 

Sidan har även egen gjorda skript för att göra användavänligheten bättre och göra sidan mer säker. Till exempel pagnitionfunktionen som gör så att inte användaren laddar in alla "cards" samtidigt utan man klickar på en knapp för att visa mer. Även darkmode funktionen vilket gör att ifall användaren behöver, om de skulle vara i en mörk miljö med lite belyssning till exmpel så underlättar det för ögonen. 

Skripten hjälper även att skydda backend genom att till exmpel låsa formuläret för recenssioner när användaren har publicerat sin recenssion vilket gör att användaren inte kan spamma publicera knappen. Sida skickar inte heller flera requests i sök funktionen om användaren inte ändrar innehållet i sökrutan.

**7 Loggbok**

**12 / 01 / 22 –**

Idag så satt jag och jobbade både på frontend och projektplaneringen. Då jag va lite seg i huvudet så blev det lite blandat. Jag la till lite i projektplaneringen för att komma ihåg ideér jag kom på och kollade lite på sökrutor till insipiraton. Funktionerna / ideérna jag kommit på skulle jag kunna implementera tex avancerad sökning. Men jag vill få in kärnkomponenterna först så som att faktiskt göra sökningar i databasen innan jag lägger till avancerad sökning som jag även inte tror är så jobbigt. Kom även på att jag skulle kunna lägga till en funktion så användaren får välja att göra ett konto som ligger i databasen eller om man vill göra ett konto med hjälp av tex discord eller google som man senare loggar in med. Detta gör det mycket lättare för användaren då de egentligen bara behöver klicka på en knapp för att logga in och jag inte behöver lagra lösenord. Jag har även lagt till en att göra lista på github så jag senare kommer lättare kunna ha koll på vad som jag kommer behöva göra och vad som jag håller på med för bättre koll på projektet.

**13 / 01 / 22 -**

Idag så har jag fortsatt att jobba på frontend design genom att lägga grunden för ”cards” som kommer innehålla det som användaren söker på. Jag har även fortsatt att expremintera med Sökrutan. Även lagt till en bakgrunds bild som i nu läget är en placeholder och kommer troligen bytas senare under projektet. Också gjort så att Menybaren (navbaren) är sticky, alltså att den kommer följa med ner när man scrollar ner på sidan. För att lättare kunna komma åt sidorna som finns.
![[sida1.png]]
Bredvid så finns det en bild på hur frontenden ser ut i dagsläget

  



**14 / 01 / 22 -**

Idag så fortsatte jag lite kort med frontend och fixade till Navbaren litegrann genom att lägga till ett element som senare kommer hålla info om användaren såsom profilbild osv. Jag har även centrerat navbaren så att allting har space bredvid varje element. Även stylat länkarna litegrann men inget är färdigt än. 
![[Formaterad_navbar1.png]]

**18 / 01 / 22 -**

Idag så försökte jag fixa en footer med copyright som var positionerad vid botten av hemsidan. Upptäckte problemet då att den blev satt på ett visst sätt pga att jag satte display:flex; i bodyn vilket gjorde så att jag var tvungen att ändra om lite i CSSn. Vilket i sin tur gjorde så att navbaren blev dragen till vänster så jag var tvungen att försöka lösa det också. Det slutade med att jag satte navbarens width på 90vw och sedan så drog jag den åt höger 5vw för att få den centrerad igen.

**25 / 01 / 22 -**

Jag har nu lagt till en knapp som man kommer senare klicka på för att visa mer resultat. Antingen att den hämtar mer data från servern eller att det ligger gömt i bakgrunden. Jag har även lagt till en knapp som man klicka på för att scrolla upp til toppen om man scrollar ner en viss längd på sidan. Jag har även kollat lite på backend och lagt till lite klasser samt funktioner lite som en template över hur jag vill ha det senare. (psudeo kod) Som jag senare kommer kunna fylla i.

**26 / 01 / 22 -**

Nu har jag hålit på lite med backend ( sedan igår kväll ). Då jag har implementerat lite klasser som jag kommer använda senare för att querya till databasen. Jag har även implementerat inloggnings funktionen. Jag beslutade mig för att använda Discord oAuth2.0 API då jag inte behöver ta hand om några lösenord då och det är även gratis. Jag har även lagt till fler template routes så att man får en liten överblick på backenden kommer vara uppbyggd. Vilket gör det lite lättare för mig senare att bara stoppa in den koden jag behöver.

Sen har jag även börjat små skissat hur databasen ska vara uppbyggd och det har jag gjort mha dbdiagram.io så att man kan skriva kod och så genererar den ett diagram över databasens layout.

  

**06 / 02 / 22 -**

Idag så har jag hållt på att leka lite med funktionallitetn bakom när en användare vill skicka in en review/recenssion. Jag har nämligen sätt på många sidor att ifall man ska skicka in en lång text så kan man ofta kunna se en preview på hur texten kommer se ut när man har publicerat texten. Så jag gjorde en ny fil (”review.html”) som simulerar detta lite. Så att när användaren skriver något i någon i formulären så uppdateras html dokumentet med det som användaren skrivit i olika element. Jag planerar även att lägga till formatering av texten så att användaren kan tex göra linebreaks genom att klicka enter osv osv.. (möjligen även markdown support)

![[live_preview.png]]

**(02-08) / 02 / 22 -**

Jag har nu glömt skriva lite i utförandet lite några dagar medan jag även har gjort ganska mycket. Så jag går igenom ltie av det jag har gjort efter de commits jag har publicerat på github från första feburari till idag.

Jag har lagt till en funktion så att man kan se preview på stjänorna som man väljer i recenssionen. Denna funktion kommer jag sedan kunna använda för att visa recensioners rating på en produkt genom att skicka in en siffra mellan 1 och 5. 

Jag har även delat upp CSS i flera filer för att lättare kunna dela upp och ändra vissa komponenter på flera sidor.

Backend så har jag lagt till ett bibliotek som kallas dotenv för att inte hårdkoda sensitiva alternativ till servern såsom discord API tokens, lösenord till databas och session nycklar. Efter det så la jag till en funktion för att visa en 404 och 500 sida ifall det skulle bli något fel på sidan, eller ifall användaren skulle försöka navigera till en sida som inte existerar. Jag la även till lagt till en basic session hantering. Detta är för att få inloggnings funktionen att fungera. Så att en användare förblir inloggade även ifall de laddar om eller byter sida. 

Jag har även börjat på produkt sidan som sedan kommer innehålla produktens information och styleat den lite. Jag har även lagt till lite style på stjänorna i star ratingen. Har även gjort sökrutan och produktens informations ruta mer reponsiv. Bland anant så flyttas layouten från höger->vänster till upp->ner ifall bredden på skärmen minskar. 

Menybaren har jag även gjort mer responsiv så att ifall användaren använder en skärm med liten bredd så ändras menybaren till en mer mobil vänlig bar där länkarna sitter på varandra istället för ihoptryckta. Det finns då även en knapp man kan klicka på för att dölja och visa länkarna.

![[responsive menybar.png]]

**12/02/22** -

Jag har nu pillat lite med både databas och backend. Jag har suttit upp en mysql databas med Docker som körs i bakgrunden på datorn. Jag har även fixat ett Databas Schema så att jag lätt kan gå in och ändra, ta bort databasen och testa igen nu medan jag testar.

Sedan har jag lagt till lite i klasserna som hanterar användarna som loggar. Bland annat så har jag lagt till en metod som skapar en ny användare i databasen. Även en metod som kollar ifall en användare finns. Jag har även skrivit mycket psuedo kod i dessa klasser (tex tomma metoder) för att jag vet lite ungefär vad jag behöver.

**13 / 02 / 22 -**

Nu har jag lagt till möjlighet för användaren att byta lite innehåll på sin profil. Rättare sagt så kan användaren byta namn och epost adress och den uppdateras då i databasen. Jag hade tidigare även planerat att när en ny användare "registrerar" sig så ska man få komma till en registrerings sida. Däremot så insåg jag att det blir för krångligt att transportera runt refresh_token till olika sidor samt att skapa en ny entry i databsen med massa tom data. Så jag istället sätter default datan som kommer ifrån discord så har användaren sen möjlighet att ändra användarnamn och epost ifall de så väl skulle vilja det. 

På frontend sidan har jag även lagt till en knapp som man kan klicka på för att få upp en en ruta där man kan skriva en review på en produkt. Denna knapp och ruta ska endast komma upp ifall en användare är inloggad. 

Jag har även pillat lite med session och cookies så att använadren inte blir utloggad direkt utan nu efter en viss tidsperiod. Däremot så vet jag inte om detta fungerar eftersom att det strulat förut och jag har inte lyckats testa. Ska testa detta någon dag framöver.

**18 / 02 / 22 -**
- https://github.com/Splidejs/splide
eller 
- https://github.com/kenwheeler/slick/
Jag har planerat för att ifall det finns en uppladnings funktion av bilder av en produkt så ska det vara möjligt att ladda upp flera bilder så att produkten visar flera bilder i en "carousell"

**19 / 02 / 22 -**
Jag har nu converterat mina HTML filer till EJS för att kuna rendera med backend servern. Dvs att jag visar protypen när man navigerar runt med backenden på i bakgrunden. Jag har även gjort det möjligt att uppdatera sin profil, samt gjort det möjligt att se alla sina reviews på sin profil.

Har även hållt på med databas schemat, ändrat tabell referenser och liknande.


**20 / 02 / 22 -**
Idag så har jag hållt på lite med SQL queries som körs när användaren söker efter en produkt, så att den returnerar namnet, descriptionen och average rating. Detta i sin tur skickas till klienten och skrivs ut i konsolen. Senare så den datan skrivas ut på skärmen i form av cards. Under tiden jag även höll på med SQL så ville jag på något sätt testa så att det fungerade, så att jag gjorde ett python skript som genererar x antal produkter med y antal reviews med ett random rating så att jag kan verifera att det fungerar.

**14 / 03 / 22 -**
	En produkt viss kan nu visas på /p/:product_hash med reviews och produkt information. Jag ändrade även product description och och review content till MEDIUMTEXT istället för varchar(255) eftersom att 255 bytes inte räcker till vid längre innehåll av en produkt eller en review.

**18 / 03 / 22 -**
	Jag har nu lagt till en funktion så att man kan sätta på darkmode på hemsidan. Denna "setting" sparas i sessionen vilket gör att användaren kan byta sida eller uppdatera den vilket resulterar. Däremot ifall servern på något sätt startas om eller ifall sessionen går ut så skulle användaren "setting" återställas till default värde. Därför vid vidare utveckling så skulle man kunna lägga till en till tabell för "user site settings" eller liknande där användares setting sparas oavsett session eller ifall servern startas om.
	Nuvarande sida:
	![[product_page_18_mars_2022.png]]
![[index_18_mars_2022.png]]


**21 / 03 / 22 -**
	Nu har jag fixat lite små buggar jag har även lagt till funktionen att man blir tillbaka skickad till den sidan man var på när man antingen loggar in eller ut så att man inte behöver navigera sig själv tillbaka till den sidan man var på. Jag upptäckte även under utveckling av min "about"  sida att Footern endast tryckts ner tidigare av innehållet. Vilket orsakade att ifall det var för lite innehåll på sidan så trycktes footern uppåt. Detta löste jag genom att lägga in mina tre huvud innehåll (headern, main-content och footern) i ett  main element. Detta för att göra det elementet till 100vh och göra en margin top: auto på min footer för att trycka ner den. En till bugg jag även hittat var att jag endast hade angett att det första sök resultatets "average rating" skulle avrundas. Vilket nu är fixat genom att loopa igenom hela resultatet från databasen och ändra varje columns average rating.

**22 / 03 / 22 -**
Idag så har jag spenderat tid på att få Pagnation att fungera. Detta var nu något jag prioterade eftersom att jag insåg att när jag hade lagt in mängder med test data så tog det väldigt lång tid att ladda in sidan. Detta görs genom att skicka in en high_limit och low_limit till databasen med mysql's funktion Limit och offset som skickar tillbaka en viss mängd data med ett specifierad start index (offset). På så sätt kan jag hålla koll på dessa i frontend och sedan incrementa dem när jag väll klickar på visa mer knappen.

Utöver pagnation så har jag även lagt till huvudfunktionen, att faktiskt lägga upp en review på en produkt som en användare. Man kan specifiera en title, innehåll (om man vill) och en star rating mellan 0-5.

Sedan efter la jag även till funktionen för bilder. Rättare sagt, när jag genererar data till databasen så hämtar jag random bilder och placerar dessa i databasen till respektive produkt allt ifrån 0 till x bilder beroende på produkt. När man väl senare går in och söker efter en produkt så visar den produktens första bild, när man senare går in på sidan så ser man en slideshow över alla bilder som produkten har. Ifall det inte skulle finnas någon bild på produkten så visar den en "no product avaliable" bild på både sökresultatet och produkt sidan. 

Vid en vidare utveckling av projektet så skulle man kunna ha en egen server, med frontend och backend för att kunna ladda upp nya produkter istället för ett skript som manuellt genererar data. Eller så lägger man bara till en funktion på den nuvarande sidan för att användare själv skulle kunna lägga upp nya produkter plus recenssioner på dessa produkter. Men i dagsläget så fungerar python skriptet bra för att simulera funktionaliteten. 


**23 / 03 / 22 -**
Jag har nu efter feedback från andra ändrat mitt recenssions formulär. Jag hittade att man kunde göra ett element "editable" vilket gjorde det möjligt för mig att göra formuläret mer responsivt och "stylish" mha css. Utöver det så har jag även gjort så att formuläret låser sig när användaren har skickat in en "accepterad" recenssion vilket gör att det inte går att spamma publicera knappen. Jag har även refaktorerat frontend skriptet som hanterar forumläret och ska även fortsätta göra det framöver då det är väldigt mycket spagetti kod som jag skrev i början av projektet som placeholder när jag ville simulera en förhandsvisning av recenssionen, däremot nu när jag har ett contentEditable element så behöver jag inte förhandsvisningen, utan man får en inblick i hur recensionen ser ut när man väll skriver den.