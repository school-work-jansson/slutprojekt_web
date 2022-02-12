    

# **Slutprojekt – dokumentation**

### **Linus Jansson 3F_TE**

# **1 Utförande**

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
	

**1.1 Ändringar utifrån planeringen**

**2** **Funktionalitet**

**3 Testning**

**3.1 Tester i olika webläsare**

**3.2 Validering av koden**

Under projektets gång så har jag både använt mig utav linting program för backend och frontend som talar om ifall det är något slarvfel osv som jag gör. Backenden crashar även (Validera koden på ngt sätt) ifall det är något syntax fel man skrivit.

Frontenden har jag validerat på w3 schools validator, för html och css validering...

**3.2 Test på personer ur målgruppen**

**3.3 Övriga tester**

**3.4 Ändringar utifrån testresultatet**

**4 Lagar och säkerhet**

**4.1 Upphovsrätt och GDPR**

  
  

**4.3 Säkerhet**

Under projektets gång så vägde jag mellan att använda mig av egen lösenord hantering och logga in med en ”third pary” tex Discord eller Google. För att göra sidan mer säker eftersom att jag inte behöver hålla några lösenord säkra och minskar därav risken att konton blir kapade.

Backend och frontend så har jag även använt mig utav öppen källkod vilket ökar trovärdiheten för den kod jag har använt från andra personer. Detta minskar riskan för kryphål eftersom det är så pass många som har laddat ner de bibliotek jag har använt och som även kan flagg till ifall det är något som inte stämmer, tex att det skulle ligga något fult i bakgrunden som skulle skada mitt projekt.

**5 Utvärdering**

**5.1 Projektplaneringen**

**5.2 Möjliga förbättringar**

**6 Betyg**