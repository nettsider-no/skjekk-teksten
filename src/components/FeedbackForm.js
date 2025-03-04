import React, { useState, useEffect} from 'react';
import DOMPurify from 'dompurify';
import TextareaAutosize from 'react-textarea-autosize';
import './FeedbackForm.css';

// Функция для очистки Markdown-разметки
const cleanMarkdown = (input) => {
  let output = input;
  // Удаляем блоки, обёрнутые в тройные обратные кавычки (с возможным языковым идентификатором)
  output = output.replace(/```(?:\w+)?\n?([\s\S]*?)\n?```/g, '$1');
  // Удаляем inline-код, обёрнутый в одиночные обратные кавычки
  output = output.replace(/`([^`]+)`/g, '$1');
  // Удаляем зачёркнутый текст (~~текст~~)
  output = output.replace(/~~([^~]+)~~/g, '$1');
  // Удаляем маркеры заголовков (например, "# " в начале строки)
  output = output.replace(/^#+\s*/gm, '');
  // Удаляем выделения с помощью звездочек и подчёркиваний (оставляем содержимое)
  output = output.replace(/(\*|_){1,2}([^*_]+)(\*|_){1,2}/g, '$2');
  
  return output.trim();
};

const FeedbackForm = ({ currentTopic, setCurrentTopic }) => {
  const [userText, setUserText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedbackLanguage, setFeedbackLanguage] = useState("Norwegian");

  // Загружаем сохранённые данные из localStorage при монтировании
  useEffect(() => {
    const savedTopic = localStorage.getItem('currentTopic');
    const savedText = localStorage.getItem('userText');
    if (savedTopic) {
      setCurrentTopic(savedTopic);
    }
    if (savedText) {
      setUserText(savedText);
    }
  }, [setCurrentTopic]);

  // Сохраняем изменения currentTopic и userText в localStorage
  useEffect(() => {
    localStorage.setItem('currentTopic', currentTopic);
  }, [currentTopic]);

  useEffect(() => {
    localStorage.setItem('userText', userText);
  }, [userText]);

  const handleSubmit = async () => {
    setLoading(true);
    const criteriaText = `Vurderingsskjemaene til norskprøven må være forholdsvis knappe for at de skal
være brukervennlige. Ulempen er at knappe beskrivelser gir rom for ulike tolkninger.
Begreper som formidling, grammatikk og så videre kan defineres på forskjellige
måter. For at sensorene skal gi en så lik og rettferdig vurdering som mulig, er det
viktig at de legger det samme i innholdet i kriteriene. Prøveutviklerne i Direktoratet
for høyere utdanning og kompetanse (HK-dir) har derfor utarbeidet denne
forklaringen til kriteriene, for å utdype hvordan kriteriene skal forstås, og hvordan
skjemaet skal brukes.Norskprøven måler på nivåene A1, A2, B1 og B2. Et rammeverksnivå er ikke et punkt, men et område på enskala. Vurderingsskjemaene til norskprøven gir en beskrivelse av minimumskrav for
et nivå – det vil si at kandidater kan tilfredsstille kravet til et nivå med god margin
uten å kunne plasseres på nivået over. Det vil altså kunne være nivåforskjeller
mellom to kandidater som begge plasseres for eksempel på nivå A2: En kan være
så vidt på nivået, mens en annen er helt i øvre sjikt. Det vil også være tilfeller der en
kandidat er på B1 i alle kriterier bortsett fra ett, og derfor plasseres på A2.Formidling
Med formidling mener vi hvordan kandidaten løser oppgavene og hvor forståelige og
hensiktsmessige kandidatsvarene er i den gitte sammenhengen. Norskprøven skal kun
teste kandidatenes norskferdigheter, og derfor vurderer vi ikke meninger eller kunnskap
i det kandidatene skriver. Det vi vil måle med disse kriteriene, er om kandidaten har
de språklige funksjonene som trengs for å gjøre det oppgaven krever. Disse kriteriene
ivaretar noe av det som er sentralt i kommunikativ språktesting, nemlig at man ser på
språkets funksjonalitet: om språket er tilstrekkelig til å formidle et relevant innhold på en
forståelig måte.Under formidling vurderer vi hver oppgave for seg, både fordi de ulike oppgavene
er laget for å måle språk på ulike nivåer, og fordi de måler ulike språkfunksjoner.
Kandidatene må oppfylle kravene i alle formidlingskriteriene og i alle de språklige
kriteriene for å plasseres på et nivå samlet. Det er tre oppgaver i A1-A2-prøven og A2-
B1-prøven og to oppgaver i B1-B2-prøven. For at kandidatene skal få et resultat, må
de besvare alle oppgavene. Hvis én eller flere oppgaver ikke er besvart, vil kandidaten
ikke få en vurdering på delprøven i skriftlig framstilling. Det vil da stå «ikke nok
grunnlag for vurdering» på prøvebeviset.Det finnes et eget formidlingskriterium for hvert nivå på hver oppgave. Unntaket er nivå A2 på oppgave 1 i A1-A2-prøven (meldingsoppgaven) – her er det ikke beskrevet
et eget kriterium. Grunnen til dette er at denne oppgaven i liten grad egner seg til å
skille mellom formidling på A1-nivå og A2-nivå. Oppgaven legger opp til et kort og
svært enkelt svar. I tillegg er oppgaveformuleringen den samme fra prøve til prøve,
og den er offentliggjort på HK-dir sine nettsider, som en del av eksempeloppgavene
på A1-A2. Dessuten er melding en teksttype som svært mange kandidater bruker i
hverdagen og dermed kjenner godt. Derfor er det grunn til å tro at mange kandidater
er spesielt godt forberedt på denne oppgaven. Vi legger derfor til grunn at det som
måles i denne oppgaven i mange tilfeller er innlært tekst, noe som er relevant å måle
på A1-nivået, men i liten grad på A2-nivået. Vi vil understreke at det på alle de andre
oppgavene er viktig at kandidater på alle nivå, inkludert A1, unngår å gjengi tekst
som er skrevet av andre. Dette regnes som plagiat og vil kunne føre til at kandidaten
tas for fusk, og dermed får alle resultatene fra den aktuelle avviklingen annullert,
samt en karantene på opptil tre avviklinger. Det vil si at man ikke kan melde seg opp
til en ny norskprøve før det har gått opptil et år. Vi vil også presisere at A1-kravet må være oppfylt på denne oppgaven for at kandidaten skal kunne plasseres på A2 samlet. Språket som produseres i oppgaven skal tas med i vurderingsgrunnlaget for de språklige kriteriene uansett hvilket nivå besvarelsen
vurderes til, og kan dermed være med på å trekke opp eller ned. Dette kan få betydning
for resultatet i tilfeller der en kandidat ligger nært opptil grensen mot A2.
I og med at norskprøven kun skal måle språkferdigheter, og ikke kunnskap, stilles det
ingen sjangerkrav på prøven. Det som er avgjørende er om kandidatens svar fungerer
i den gitte sammenhengen eller ikke. I «begrunne»-oppgaven (oppgave 3 på A2-B1-
prøven) skal for eksempel kandidatene formulere en e-post der de skal uttrykke
meninger og begrunne disse – vanligvis får de beskjed om å klage på noe og begrunne
klagen. På formidlingskriteriet vurderer sensorene kun hvor godt kandidaten
formidler synspunkt og begrunnelser, og ikke om kandidaten mestrer formaliteter
knyttet til e-poster eller klagebrev. Ofte vil slike formaliteter bestå i innlærte standard-
fraser som sier minimalt om kandidatens selvstendige språkferdigheter, og det er
derfor lite relevant for vurdering av språkferdigheter over A1-nivå. Krav til svar på oppgaven
Når det gjelder svar på oppgaven, må sensor ikke være for kategorisk. Vi gir konkrete
oppgaver for at kandidatene ikke skal kunne pugge en tekst utenat og skrive den på
prøven. Dersom kandidaten svarer litt på siden av oppgaven, skal dette ikke slås hardt
ned på så lenge sensor ikke har grunn til å tro at teksten er pugget på forhånd og
reprodusert. Dette betyr ikke at vi ser helt bort fra svar på oppgaven. Hvis oppgaven
er å skrive en melding om at du vil selge en sykkel, godtar vi besvarelser der kandi-
daten har misforstått spørsmålet litt og skriver at de ønsker å kjøpe en sykkel. Om
de derimot skriver en tekst av typen «Jeg heter Amir. Jeg er 23 år. Jeg kommer fra
Marokko.», er dette for langt unna oppgaveformuleringen til at vi godtar det, selv på
de laveste nivåene. Kandidater som svarer på noe annet enn det oppgaven spør om på én eller flere
oppgaver, får ikke noen vurdering, og på prøvebeviset vil det stå «ikke nok grunnlag
for vurdering». Hvor stor presisjon som forventes i svar på oppgaven, varierer noe ut fra oppgavenes
vanskegrad og kandidatens språknivå. I utgangspunktet er det høyere krav til presisjon
jo høyere nivå man tar prøven på. Vi forventer altså større presisjon av kandidater som
tar B1-B2-prøven enn av kandidater som tar A1-A2 prøven. I tillegg spiller nivået til
kandidaten inn i vurderingen av én og samme oppgave, på ett og samme prøvenivå.
For eksempel er vi litt mer tilbøyelige til å godta at en A1-kandidat misforstår en gitt
oppgave på A2-B1-prøven, enn at en B1-kandidat misforstår den samme oppgaven.
I tillegg til at kandidatens tekst skal være svar på oppgaven, beskriver oppgave-
formuleringen og formidlingskriteriene hvilke språkfunksjoner som kreves for å
vurderes til de ulike nivåene. Dette er nærmere forklart under.
BOKMÅL | 06.06.23 | 5 Hvilke språkfunksjoner testes i prøven?
De ulike oppgavene i prøven måler ulike språkfunksjoner. På A1-A2-prøven er det
snakk om de informative språkfunksjonene «fortelle» og «beskrive». Disse funksjonene
er mindre krevende enn funksjonen «begrunne», som testes i oppgave 3 på A2-B1-
prøven, og som igjen er mindre krevende enn funksjonen «argumentere», som testes i
oppgave 2 på B1-B2-prøven. Språkfunksjonen «beskrive» er først og fremst relevant på bildeoppgaven på A1-A2 og A2-B1. Vår definisjon av denne språkfunksjonen i denne sammenhengen innebærer
at det er tilstrekkelig å bruke enkeltord eller ufullstendige setninger for å oppnå A1 på
formidlingskriteriet for bildeoppgaven. I bildeoppgaven måles også kandidatenes evne til å videreformidle informasjon, altså en sentral del av kandidatens medieringsferdigheter. For å vurderes til A1 er det
tilstrekkelig at kandidaten klarer å formidle noen få enkeltelementer i bildet. Dette
kan være ved hjelp av enkeltord, eller med enkle, og ofte ufullstendige
setninger, som substantivfraser eller verbfraser. Det er først og fremst dette som
utgjør forskjellen på et «svært enkelt» (A1) og et «enkelt» (A2) svar på oppgaven.
Bildene inneholder alltid noen elementer som er innenfor et A1-vokabular, slik at
A1-kandidater skal få vist hva de kan. Ofte inneholder bildene også noen elementer
som krever et litt mer utbygd ordforråd, som er tilpasset A2-kandidater. For mange
A1-kandidater egner denne oppgavetypen seg likevel spesielt godt, fordi den er
konkret og styrt, og stiller dermed mindre krav til selvstendig språkbruk enn de andre
oppgavene. På A2-nivå skal kandidaten beskrive bildet på en slik måte at en person som ikke har
sett bildet, får et inntrykk av hovedinnholdet i det. Dette forutsetter at kandidatene
svarer med noe mer enn enkeltord, slik at leseren får en viss forståelse av hva som
foregår på bildet. På B1-nivå forventer vi at beskrivelsen er enda tydeligere og mer
sammenhengende enn på A2, slik at det er lett for leseren å forstå hva som foregår på
bildet. Noen kandidater på relativt høye språknivå velger å løse denne oppgaven ved å skrive
en fortellende tekst om bildet. Dette trekker ikke ned, så lenge hovedinnholdet i bildet
kommer frem i fortellingen. I tillegg til å måle medieringsferdigheter, har bildeoppgaven
en viktig funksjon for å motvirke at pugget tekst får for stor betydning for vurderingen. I
og med at bildeoppgaven er en relativt lukket oppgave som til en viss grad styrer hvilket
ordforråd som bør brukes, og som i liten grad er utsatt for spredning på internett, egner
den seg godt for å vise kandidatenes reelle språkferdigheter, og kan derfor være en
viktig indikasjon på kandidatens nivå i tilfeller der andre oppgaver kan være preget av
pugging og innlærte standardfraser. I «fortelle om et kjent tema»-oppgaven testes først og fremst «fortelle»-funksjonen, men i mange tilfeller vil også «beskrive»-funksjonen bli aktuell her (både på A1-A2 og A2-B1). Som i bildeoppgaven kan formidlingskriteriet for A1 oppfylles på en svært enkel måte,
ved hjelp av enkeltord, eller med enkle, og ofte ufullstendige setninger, som substantiv-
fraser eller verbfraser. Altså stilles det ikke krav om fullstendige setninger på formidlings-
kriteriet, men for å få A1 på grammatikkriteriet, må kandidaten vise eksempler på enkle
setninger på enten bildeoppgaven eller fortelleoppgaven. (Kravet om setninger på A1 er
nærmere beskrevet i forklaringen av grammatikkriteriet.) Fra A2 og oppover forventes
det også at tekstene har en viss sammenheng på «fortelle om et kjent tema»-oppgaven,
slik tekstoppbyggingskriteriet beskriver. Dette er noe av det som skiller et «svært enkelt»
svar (A1) fra et «enkelt» svar (A2) på oppgaven. Tekstlengde og grad av variasjon og
kompleksitet i ordforråd og grammatikk spiller også inn her. Språkfunksjonen «begrunne» kommer først inn i oppgave 3 på A2-B1-prøven, som nevnt over. Denne språkfunksjonen krever et mer utbygd språk enn å fortelle, både grammatisk og med tanke på ordforråd. For å vurderes til B1 i formidling på denne
oppgaven må kandidaten gi noen grunner for et synspunkt knyttet til det oppgaven
spør om, på en forståelig måte. Det er imidlertid ikke et krav at kandidaten må skrive
en begrunnelse for å i det hele tatt få et resultat på denne oppgaven. Hvis besvarelsen
for eksempel inneholder relevante synspunkter, er det tilstrekkelig for å få A2 på for-
midlingskriteriet for denne oppgaven. Hvis en A1-kandidat er meldt opp til A2-B1-
prøven, vil oppgave 3 ofte være svært vanskelig for kandidaten, og det er ikke beskrevet
et eget formidlingskriterium for A1 på denne oppgaven. A1-kandidater vil ikke
nødvendigvis klare å uttrykke synspunkter i svaret sitt, men ettersom oppgaven er laget
for å måle språk på et mye høyere nivå, er det tilstrekkelig at kandidaten prøver å svare
på oppgaven ut fra sine forutsetninger, for å kunne vurderes til A1 i formidling her.
Det er en del likhetstrekk mellom de to språkfunksjonene «begrunne» og
«argumentere», men begrunnelser er enklere fordi de er mer konkrete og kan være
preget av personlige, og potensielt usaklige preferanser. I argumentasjon forventes
det at man i større grad skal kunne generalisere og reflektere rundt mer abstrakte
tema som ikke nødvendigvis er direkte relevante for ens eget liv. Selv om
argumentasjonsoppgaven legger opp til at man skal ta utgangspunkt i personlige
synspunkt, stilles det altså høyere krav til saklighet og kandidatens evne til å
generalisere for at det skal kunne regnes som argumentasjon, og dermed vurderes
til B2. BOKMÅL | 06.06.23 | 6 I B2-oppgaven ber vi kandidatene om å ta stilling til et spørsmål og argumentere for et synspunkt. Noen kandidater velger i stedet å drøfte en sak uten å ta stilling til
spørsmålet. Kandidatene skal ikke trekkes for dette, selv om det ikke er denne formen
for løsning vi etterspør. Grunnen til at vi ikke ber kandidatene om å drøfte på denne
måten, er at det ofte vil være mer krevende enn å bare argumentere for én side av en sak.
Det er viktig å være oppmerksom på at også B2-nivået tillater noe uklarhet i
argumentasjonen, og at kandidatenes kulturelle bakgrunn kan påvirke måten
argumentasjonen er framstilt på. Så lenge sammenhengen og logikken i
argumentasjonen stort sett kommer klart frem, skal det ikke slås ned på stilvalg
som kan virke fremmede i en norsk teksttradisjon. Krav til forståelighet
Kravene formidlingskriteriene stiller til forståelighet varierer ut fra hvilket nivå det er
snakk om, og ut fra hvor vanskelige de ulike oppgavetypene er. På den ene siden stilles
det høyere krav til grad av forståelighet på de høye nivåene. Samtidig er det ikke
forventet like stor forståelighet på de vanskeligste oppgavene i en prøve, som i de
letteste. I vurderingen må man også ta hensyn til hvor store sjanser kandidaten tar, altså
hvor ambisiøs språkbruken er. Dessuten må man ha i bakhodet at det er forskjell på
lesere som er vant til å forholde seg til ulike varianter av innlærerspråk, slik norsklærere
i voksenopplæringen er, og lesere som ikke har så mye erfaring med dette. En tommel-
fingerregel er at språk som generelt sett vil fremstå som uforståelig for mannen i gata,
ikke oppfyller kriteriene for A2. Om det holder til A1 eller ikke, må vurderes ut fra hvor
mye av teksten sensor forstår ut fra sine forutsetninger. På A1-nivå er det forventet at svaret på den første oppgaven i A1-A2-prøven skal være «stort sett forståelig» for sensor, mens deler av svaret kan være vanskelig å forstå på oppgave 2 og 3. Denne formuleringen tar hensyn til at oppgave 2 og 3 er laget for å
også kunne måle på A2-nivå, og dermed kan være krevende for A1-kandidater. På A1
kan det forekomme at mindre deler av teksten er helt uforståelige, også for erfarne
norsklærere. På A2-nivå forventer vi at svarene på de enkleste oppgavene stort sett skal være
forståelige for folk flest, med litt godvilje. På oppgave 3 («begrunne»-oppgaven) på
A2-B1-prøven er det derimot rom for mange uklarheter på A2. Når vi på B1 forventer at svaret på oppgave 2 i A2-B1-prøven skal være «lett forståelig», mens det holder at svaret er forståelig på oppgave 1 og 3, skyldes dette at oppgave 1 og 3 for mange er mer krevende å besvare enn oppgave 2. Oppgave 2 – «fortelle om et kjent tema» er ofte enklere enn oppgave 1 og 3 fordi den er så åpen at kandidaten i stor
grad kan velge vokabular og vinkling selv. Oppgave 1 og 3 er mer styrende med tanke
på hvilket vokabular kandidaten må kjenne til for å kunne svare på oppgaven. Oppgave
3 krever i tillegg at kandidaten bruker språkfunksjonen «begrunne», som er mer kre-
vende språklig sett, som nevnt over. Vi forventer altså i utgangspunktet at B1-kandidater skriver på en forståelig (oppgave 1 og 3) eller lett forståelig (oppgave 2) måte på A2-B1-prøven. Det er likevel viktig å
understreke at det kan være noen tilfeller av feil som fører til misforståelser også på
dette nivået, spesielt i komplekse setninger. Dette er for de fleste mest aktuelt på de
vanskeligste oppgavene, altså «begrunne»-oppgaven (som står i både A2-B1 og B1-B2-
prøven) og «argumentere»-oppgavene i B1-B2-prøven. Selv om formidlingskriteriet
for «begrunne»-oppgaven krever at kandidaten skal gi «noen» grunner på en forståelig
måte, vil vi understreke at dette åpner for at det kan være uklarheter i andre deler av
begrunnelsen eller teksten for øvrig. Som nevnt skal kandidatene premieres for å
forsøke seg på avanserte strukturer, og jo høyere ambisjonsnivå kandidaten har, jo
større er sjansen for å gjøre feil som går ut over forståeligheten. Dette kommer
eksplisitt til uttrykk i formidlingskriteriet for «argumentere»-oppgaven på B1-B2-
prøven, der det åpnes for at begrunnelsen kan være uklar eller mangelfull. Det samme
prinsippet gjelder også på andre oppgaver, hvis kandidaten prøver seg på kompliserte
BOKMÅL | 06.06.23 | 7 strukturer. Det går likevel en grense for hvor mye uklarhet man kan godta – på B1 skal
det uansett ambisjonsnivå stort sett gå greit å oppfatte hva kandidaten mener.
På B2-nivå forventer vi at kandidatene jevnt over skriver klart og tydelig, men på grunn
av at det å argumentere er en krevende språkfunksjon, er det rom for noe uklarhet i
argumentasjonen i oppgave 2 på B1-B2-prøven. Tekstenes lengde
Det er oppgitt anbefalt tidsbruk og veiledende antall ord på noen av oppgavene. For
eksempel anbefales det å skrive 80-200 ord på «fortelle om et kjent tema»-oppgaven på
A2-B1-prøven. Dette er ment som en hjelp til kandidatene for å sikre at de produserer
nok språk til å bli nivåplassert og for å unngå at kandidatene bruker mer tid enn
nødvendig på hver oppgave. Det er viktig at sensorene ikke henger seg for mye opp i
antall ord, spesielt hvis kandidaten på alle oppgavene til sammen skriver nok til å bli
vurdert. Antall ord er altså ikke ment som absolutte krav, og det vil i mange tilfeller være
mulig å plassere en kandidat på for eksempel nivå A2 i formidling på en oppgave selv
om hen har skrevet kortere enn oppgitt antall ord. (Men om det totale antallet ord i
besvarelsen er tilstrekkelig til å oppfylle det språklige kriteriet for ordforråd er en annen
sak – det må vurderes opp mot de andre oppgavene. Se kapittelet om ordforråd for en
nærmere beskrivelse av dette.) BOKMÅL | 06.06.23 | 8 SPRÅK Tekstoppbygging: Ingen krav til tekstoppbygging på A1-nivået. Skriver enkle tekster. Det er en viss Skriver tekster der sammenhengen sammenheng i tekstene, for stort sett er grei å følge. Bruker en eksempel på grunn av tema, kronologi og/eller enkle bindeord.Del ulike bindeledd for å skape sammenheng i tekstene. Skriver tekster der sammenhengen i all hovedsak er lett å følge. Bruker en rekke ulike bindeledd og andre tekstbindende virkemidler. Tekstene har stort sett klar struktur og fremdrift. Med tekstoppbygging mener vi den logiske og tematiske sammenhengen og strukturen
i tekstene. Det er flere momenter som bidrar til dette. Det mest iøynefallende er
gjerne ulike typer bindeledd, både bindeord som «og», «men», «derfor» o.l., og ulike
koherensmarkører som «på den ene siden», «først og fremst» osv. Men en tekst kan
være sammenhengende selv om den inneholder få slike bindeledd. Det er dessuten
viktig å merke seg at det ikke er slik at innlærere på høyere ferdighetsnivåer nødven-
digvis bruker et høyere antall eksplisitte bindeledd i tekstene, men man bruker gjerne
flere ulike typer verktøy for å gjøre tekstene sammenhengende, jo høyere opp i nivåene
man kommer. På de høye nivåene bruker man også mindre frekvente bindeledd.
Under kriteriet «Tekstoppbygging» ser vi også på andre tekstbindende virkemidler,
altså verktøy som kan bidra til struktur og sammenheng i tekstene. I en fortelling vil vi
for eksempel gjerne ha en kronologisk fremstilling av hendelser, mens det i en argumen-
terende tekst vil være naturlig at synspunkt introduseres og underbygges på en struk-
turert måte som gjør det lett å følge fremstillingen, blant annet ved hjelp av en logisk
avsnittsinndeling. I de fleste teksttyper vil tematisk sammenheng spille inn. Dette skapes
ved at teksten, eller ulike deler av teksten, omhandler samme tema eller tema som er
relatert til hverandre. Både ordvalg og grammatikk bidrar til å gjøre en tekst sammen-
hengende. Ord som tematisk tilhører samme domene, bidrar for eksempel til tematisk
sammenheng. Grammatiske virkemidler kan blant annet brukes for å underbygge den
logiske sammenhengen i teksten, for eksempel veksling mellom ubestemt og bestemt
form av substantiver («Jeg har lest ei bok i påsken. Boka var veldig spennende.», og bruk
av anaforiske pronomen («Jeg har lest ei bok i påsken. Den var veldig spennende.».
Forventninger og krav til struktur og sammenheng vil variere noe ut fra hvilken teksttype
man har med å gjøre. I en bildebeskrivelse er det for eksempel naturlig at tekstene blir
noe mindre sammenhengende enn i en oppgave der man skal begrunne en mening. Så
selv om vurderingen av de språklige kriteriene skal baseres på kandidatens prestasjon
gjennom hele prøven, aksepterer vi altså en viss variasjon i graden av sammenheng i de
ulike tekstene. På A1-nivå stiller vi ingen krav til tekstoppbygging. På dette nivået ser vi derfor bort fra
dette kriteriet når vi vurderer. På A2-nivå krever vi en viss sammenheng i tekstene. Dette kan oppnås ved bruk av enkle sideordnende bindeord som «og», «men» og «så», og eventuelt også bruk av
subjunksjoner som «fordi» og «som», hvis kandidaten velger å prøve seg på litt mer
komplekse strukturer. Men sammenhengen kan like gjerne oppnås ved hjelp av andre
virkemidler som kronologi, tematisk sammenheng, bestemthet og/eller anaforiske
pronomen. Kronologisk sammenheng i en tekst krever ikke nødvendigvis bruk av ord
som markerer kronologi – dette kan også komme implisitt frem ved at kandidaten
forteller om et logisk handlingsforløp med tematisk sammenheng (f.eks. «Jeg vasker
grønnsakene. Jeg koker grønnsakene. Jeg spiser grønnsakene.») På B1 er det et krav at sammenhengen stort sett skal være grei å følge, og at kandidaten bruker en del ulike bindeledd for å skape sammenheng i tekstene. Selv om andre virke- midler, som kronologi, bestemthet osv. ikke er nevnt eksplisitt i B1-kriteriet, vil de kunne ha stor betydning for strukturen og sammenhengen i tekstene også på dette nivået. Med «grei å følge» mener vi at kandidaten stort sett lykkes i å få frem en viss logisk sammen-
heng mellom setninger og tekstdeler, også i relativt krevende teksttyper. Men sammen-
hengen kan være noe uklar noen steder, til en viss grad også i relativt enkle teksttyper.
På B2 krever vi at sammenhengen i tekstene i all hovedsak er lett å følge. I tillegg
forventer vi at kandidaten bruker et ganske bredt repertoar av bindeledd og andre
virkemidler på en hensiktsmessig måte, for å skape struktur og fremdrift i teksten.
Dette er nødvendig for at logikken i kandidatens argumentasjon i all hovedsak skal
komme tydelig frem. I argumenterende tekst vil det imidlertid kunne være noe
uklar sammenheng noen steder, slik det fremgår av formidlingskriteriet for
argumentasjonsoppgaven på B1-B2. BOKMÅL | 06.06.23 | 9 Rettskriving og tegnsetting Skriver noen ord slik at de er gjenkjennelige. En del ord vil være vanskelige å gjenkjenne, særlig mindre vanlige ord.
Ingen krav til tegnsetting på dette nivået. Skriver en del ord riktig. Noen ord kan være vanskelige å gjenkjenne, særlig mindre vanlige ord. Markerer noen av setningene med punktum, stor bokstav e.l. Har et ganske godt grep om rettskriving, men det vil være en del feil. Markerer i all hovedsak setningene med punktum og stor bokstav. Har et godt grep om rettskriving og tegnsetting, selv om det vil
være noen feil. Rettskriving og tegnsetting viser til hvordan ordene er skrevet og i hvilken grad setningene
er markert med stor bokstav og punktum/spørsmålstegn, eventuelt bruk av komma.
Vanlige ord som man har lest og skrevet mange ganger, er lettere å stave riktig. Sensor
må til en viss grad bruke skjønn for å vurdere hvilke ord som kan antas å være vanlige og
mindre vanlige for kandidatene, men Rammeverkets beskrivelser av relevant tematikk
innenfor de ulike domenene på ulike nivå, kan være til god hjelp. (Se for eksempel over-
sikten i kompetansepakken til læreplanene fra 2021.) Ofte vil «vanlige ord» være ord som
kandidatene trenger for å fortelle om det nære og dagligdagse på en enkel måte, f.eks.
om folk man kjenner, hva man jobber med, hva man gjør på fritiden osv.
Det er også mye annet som spiller inn på hvor vanskelig det er å stave ulike ord riktig.
Korte ord med ingen eller få konsonantkombinasjoner er lettere enn lange ord med
mange konsonanter. Doble konsonanter kan være en utfordring, og ellers ord hvor det
er stor avstand mellom skrift og tale. Skj/sj/kj-kombinasjoner kan være vanskelige selv
for morsmålsbrukere. Det utgjør en vesentlig forskjell for vurderingen om skrivefeilene som forekommer er
konsekvente, eller om det snarere dreier seg om glipper/tastefeil. Hvis for eksempel
det samme ordet forekommer flere steder i teksten, og det bare er skrevet feil i ett
tilfelle, er ikke dette noe sensor skal legge stor vekt på i vurderingen, selv om det
skulle dreie seg om et vanlig, enkelt ord som f.eks. «mat». På A1 forventer vi ikke mer av rettskrivingen enn at noen helt vanlige ord er skrevet slik at det er mulig å forstå hva som er ment. I praksis er antallet gjenkjennelige ord tilstrekkelig så lenge alle oppgavene er besvart. På dette nivået stiller vi ikke krav til at setningene skal være markert med stor bokstav og punktum.
På A2 forventer vi at en del vanlige ord er skrevet riktig. Det er ikke mulig å definere
nøyaktig hvor mange ord eller hvor stor andel av de vanlige ordene i besvarelsen som
må være riktig skrevet. Dette vil blant annet variere ut fra de aktuelle ordenes vanske-
grad og hvor stor andel ordene utgjør av besvarelsen for øvrig. Hvis det er snakk om
en kandidat som skriver veldig kort og holder seg til enkle og trygge formuleringer, kan
vi forvente at de fleste ordene er riktig skrevet, mens det må godtas mange feil i
besvarelser der kandidaten prøver seg på noe mer enn det absolutte minimum for nivået.
I mindre vanlige ord vil skrivemåten på A2 i større grad basere seg på hvordan ordene
uttales (enten av kandidaten selv eller andre). Det må være noen eksempler på at set-
ningsgrenser markeres på dette nivået, vanligvis med punktum og/eller stor bokstav.
Andre måter å markere setningsgrenser på, som f.eks. linjeskift, godtas også på dette
nivået. Eventuelt overforbruk av tegn vil trekke ned på lik linje med fravær av tegn der
det er påkrevet, men dette er mindre vanlig, og er derfor ikke nevnt spesifikt i kriteriet.
På B1 krever vi at kandidatene har et ganske godt grep om norsk rettskriving og
tegnsetting. Det er ikke et krav at rettskrivingen skal være feilfri, og det vil ofte være
skrivefeil i lavfrekvente ord og ord som har en komplisert stavemåte, men kandidater
på dette nivået skal ha godt grep om skrivemåten til de fleste dagligdagse ord.
Kandidatene markerer i all hovedsak setningene med punktum og stor bokstav på B1.
Men sensorene må alltid til en viss grad bruke skjønn, og i noen helt spesielle tilfeller
kan det aksepteres at stor bokstav utelates, hvis tegnsettingen, rettskrivingen og
språket for øvrig er så overbevisende at det veier opp for denne mangelen. Begrunnelsen
for dette er at mangel på stor bokstav i liten grad går ut over formidlingen, og at mange
er vant til å skrive med automatisk retting av små bokstaver i f.eks. skriveprogrammer
og e-postprogrammer. På B2 krever vi at kandidatene har et godt grep om rettskriving og tegnsetting, men vi
forventer ikke at det skal være feilfritt. Når det gjelder tegnsetting, vil det ofte dreie seg
om kommafeil på dette nivået, for eksempel som følge av påvirkning fra kommaregler
for engelsk i setninger med foranstilte adverbial («For det første, vil jeg trekke frem …»).
BOKMÅL | 06.06.23 | 10 Ordforråd A1 A2 B1 B2 Har et svært begrenset ordforråd. Bruker noen ord riktig. Gjør mange feil ordvalg. Har et tilstrekkelig ordforråd til å uttrykke seg om dagligdagse emner, og bruker en del
dagligdagse ord og uttrykksmåter riktig.Gjør fremdeles mange feil ordvalg.Har et ganske bredt ordforråd. Mestrer godt et enkelt repertoar av ord og uttrykksmåter knyttet til kjente emner. Kan gjøre ordvalg
som fører til misforståelser, særlig når emnet er ukjent eller abstrakt. Mestrer godt et bredt ordforråd.
Kan variere formuleringene og velger i all hovedsak ord som passer i sammenhengen. Feil forekommer
uten at det fører til misforståelser. Kriteriet «Ordforråd» refererer både til leksikalsk variasjon og presisjon. Jo flere ord man behersker, jo mer nyansert, presist og variert kan man uttrykke seg. Å lære et ord er imidlertid en gradvis prosess, og å kunne et ord består av mange delkompetanser.
Å tilegne seg forståelsen av alle sidene av et ord (betydning, form og bruk), er noe
som skjer litt etter litt: Først får innlæreren en omtrentlig forståelse av et ords
hovedinnhold, mens kjennskap til bibetydninger, assosiasjoner, hvilke andre ord
ordet ofte opptrer sammen med osv., kommer senere. I dette kriteriet ser vi både på
hvor bredt vokabular kandidatene har og hvor godt, i betydningen passende og
effektivt, de bruker sine språklige ressurser. På de fleste oppgavene i prøven er det, som nevnt under formidling, oppgitt omtrent hvor mange ord som forventes i besvarelsene. Når sensorene skal vurdere omfanget
av kandidatens ordforråd, skal de bruke skjønn, og som på alle de språklige kriteriene
skal man gjøre en helhetlig vurdering av språket i alle oppgavene i besvarelsen. Dette
kan for eksempel innebære at sensor kan vurdere kandidatens ordforråd som stort
nok til å sette A2 på dette kriteriet selv om en kandidat har skrevet færre enn cirka 80
ord på «fortelle om et kjent tema»-oppgaven, hvis det som er produsert totalt sett er
overbevisende nok til å kompensere for dette. Vi forventer ikke at A1-kandidater skriver
fullt så langt på denne oppgaven, og derfor står det på kandidatenes instruksside at
anbefalingen om å skrive minst 80 ord på denne oppgaven gjelder dem som sikter på
A2. Tilsvarende gjelder anbefalingen om minst 80 ord på «begrunne»-oppgaven kun for
kandidater som sikter mot B1. Hvis kandidatene har mangler i ordforrådet, vil de i noen tilfeller benytte seg av strategier som f.eks. å bruke ord fra andre språk. I undervisningssituasjoner og i
dagliglivet for øvrig har slike strategier en viktig funksjon, og de har derfor en sentral
plass i læreplanen fra 2021. Men i prøvesituasjonen risikerer kandidatene å bli trukket for
innslag av andre språk, spesielt hvis det dreier seg om ord som ikke ligner på norske ord.
I noen tilfeller kan det riktignok være hensiktsmessig å ty til ord som ligner på norske
ord, og som dermed vil være forståelige for en person som kun forstår norsk. Det
engelske ordet «traffic» vil for eksempel trolig være forståelig for alle med et visst
språknivå på norsk. I slike tilfeller er det kun vurderingen av rettskrivingskriteriet som
eventuelt kan bli noe påvirket, mens grammatikkriteriet kan bli påvirket i andre
tilfeller. Men kandidatene bør være særlig forsiktige med å bruke ord som ikke ligner
på norske ord. Hvis kandidaten for eksempel velger å bruke et ord som «chair», som
ikke ligner på det norske ordet for «stol», vil vi anse dette som en ordfeil på linje med
andre feil. Dette gjelder ikke lånord som er i allmenn bruk på norsk, som f.eks.
«smoothie». I noen sammenhenger er det selvsagt naturlig at det forekommer
referanser til utenlandske ord som ikke ligner på norske ord, f.eks. når kandidatene
forteller om sin egen kultur, men disse bør brukes på en slik måte at det ikke går ut
over forståeligheten i teksten. På A1 har kandidatene et svært begrenset ordforråd, som ofte er knyttet til det konkrete, nære og personlige. De viser riktig bruk av noen ord knyttet til temaene i opp-
gavene, og med «riktig bruk» mener vi her at ordene er brukt på en forståelig måte,
som gir mening i den sammenhengen ordet er brukt i. I praksis er antallet ord tilstrek-
kelig så lenge alle oppgavene er besvart. A1-kandidatene kan gjøre mange feil ordvalg,
spesielt hvis de skriver relativt lange tekster. På A2 har kandidatene nok bredde i ordforrådet til å uttrykke seg om dagligdagse emner, det vil si konkret tematikk som så å si alle voksne kommer borti i hverdagen, og som man derfor kan regne med at er kjent for alle. De bruker en del av disse
ordene riktig. Hvis de legger seg på en veldig trygg linje med tanke på ordvalg og
antall ord, og unngår å prøve seg på ord de er usikre på, kan man forvente at de
fleste ordene er brukt riktig, men i motsatt fall kan de gjøre mange feil ordvalg. Det
sistnevnte forekommer gjerne når de svarer på oppgaver som først og fremst er laget
for å måle språk over A2-nivå, som f.eks. «begrunne»-oppgaven (oppgave 3 på A2-B1-
prøven). Disse oppgavene vil mange A2-kandidater velge å løse ved å prøve seg på
et noe mer abstrakt og utbygd ordforråd enn det som er minimumskravet på dette
nivået. (Dette er det, som nevnt over, også tatt høyde for i formidlingskriteriet, ved at
det forventes lavere grad av forståelighet i svarene på de vanskeligste oppgavene.)
På B1 mestrer kandidatene godt et ordforråd knyttet til dagligdagse og andre kjente
emner. Det vil si at disse ordene i all hovedsak blir brukt på en måte som passer i
sammenhengen. B1-kandidatene kan likevel gjøre noen feil som fører til
misforståelser, men dette gjelder først og fremst hvis de velger å uttrykke seg om
emner som er abstrakte eller som de har mindre kjennskap til. Ordforrådet er en del
mer utbygd enn på A2, slik at kandidatene til en viss grad kan uttrykke seg om slike
emner. Oppgavene på A2-B1 har i utgangspunktet relativt konkret tematikk som
man kan regne med at alle kandidatene kjenner til, men siden oppgavene åpner for
BOKMÅL | 06.06.23 | 11 fri språklig produksjon, vil en del kandidater på dette prøvenivået likevel komme inn
på temaer som er relativt ukjente for dem. På B2 har kandidatene tilegnet seg et bredt ordforråd som de kan bruke på en ganske variert og presis måte, også når de omtaler abstrakte og ukjente emner. De velger i all
hovedsak ord som passer i sammenhengen. Fortsatt kan feil forekomme, men dette
skal i utgangspunktet ikke føre til misforståelser. Unntaksvis vil sensor likevel kunne
se gjennom fingrene med et og annet feil ordvalg som fører til misforståelse, hvis den
språklige produksjonen ut fra en helhetsvurdering er overbevisende nok.
Grammatikk
Viser noen eksempler på riktig bruk av noen få grunnleggende grammatiske strukturer. Viser en del eksempler på riktig bruk av grunnleggende grammatiske strukturer. Gjør mange feil, også helt
elementære. Har et ganske godt grep om grunnleggende grammatiske strukturer. Viser noen eksempler
på komplekse setninger. Gjør en del feil, og kan også gjøre noen feil som fører til misforståelser,
særlig i komplekse strukturer. Har et godt grep om grunnleggende
grammatiske strukturer. Viser variasjon i
setningsstruktur, og bruker komplekse
setninger på en stort sett vellykket måte. Feil
forekommer uten at det fører til misforståelser.
Grammatikk er kanskje det språktrekket som oftest knyttes til korrekthet.
Grammatiske avvik, både i bøyningsmønstre og leddstilling, er forholdsvis lette å slå
ned på. Det er viktig å minne om at en god grammatikk er mer enn en grammatikk
uten feil. Kompleksitet og variasjon er like viktig som korrekthet. På alle de språklige
nivåene vil man finne kandidater som ikke tar sjansen på å bruke strukturer og
uttrykksmåter de ikke behersker, og kandidater som er dristige og forsøker seg på
formuleringer de ikke helt har kontroll på. Det er lettere å uttrykke seg feilfritt hvis
man unngår strukturer og setningsmønstre man bare delvis behersker.
Kompleksiteten kan vi se både på frasenivå og setningsnivå. Verb-, adjektiv- og
substantivfraser kan bygges ut, for eksempel: «huset» eller «det gamle huset vi
nettopp har kjøpt helt i enden av blindveien». Det er viktig å understreke at
kandidatene ikke må straffes for at de tør å bruke et språk de ikke helt behersker,
men premieres for at de forsøker på mer komplekse strukturer.
I beskrivelsene av grammatikk bruker vi betegnelsen «grunnleggende grammatiske
strukturer». Dette er strukturer både i ordbøyning og leddstilling som er relativt enkle
og vanlige, og som man tilegner seg tidlig.
Når det gjelder ordnivået, vil vi regne som grunnleggende strukturer at:
substantiv og adjektiv bøyes i kjønn, tall og bestemthet
verb bøyes i tempus
pronomen bøyes i kjønn og tall
På frase- og setningsnivå regnes det som grunnleggende strukturer at:
setninger må ha et subjekt («Jeg leser en bok.» «Det regner.»)
setninger må ha et finitt verb («Jeg leser en bok.» «Jeg har lest en bok.»
«Jeg skal lese en bok.»)
negasjonen plasseres etter finitt verb i helsetninger («Jeg leser ikke en bok.»
«Jeg har ikke lest en bok.»)
spørsmål har inversjon mellom subjekt og verbal («Leser du en bok?»
«Hva leser du nå?»)
På A1 forventer vi svært begrenset kjennskap til grammatikk. Kandidaten bruker bare
noen få, svært enkle strukturer, ofte innøvde standardfraser som «Hvordan går det?»
«God helg!» osv.). Men kandidatene må likevel vise noe svært enkel selvstendig språk-
bruk for å plasseres på A1. Dette innebærer at de må vise noen få eksempler på riktig
bruk av grunnleggende grammatiske strukturer, inkludert noen eksempler på svært
enkle setninger som de (sannsynligvis) har konstruert selv (f.eks. «jeg har en katt»).
Siden meldingsoppgaven er kjent og dermed ofte vil inneholde innlærte setninger, må
kandidatene også vise eksempler på riktig bruk av setningsmønster i minst én av de
andre oppgavene for å få A1. For å vurderes som «riktige» må setningene inneholde
både subjekt og verbal i riktig rekkefølge.
På A2 forventer vi at kandidaten viser en del eksempler på riktig bruk av grunnleggende
grammatiske strukturer, men det vil fortsatt være feil, også elementære. Vi forventer at
kandidater på A2-nivå uttrykker seg enkelt, men at de har en del eksempler på f.eks.
riktig bøyning av verb og substantiver og riktig oppbygning av enkle setninger.
A2-nivået kjennetegnes av spesielt stor grad av variasjon mellom kandidater når det
gjelder kompleksiteten i språkbruken. Noen kandidater holder seg til de få, enkle
strukturene de mestrer, og skriver dermed ganske feilfritt. Andre prøver seg på
vanskeligere ting, som de i varierende grad lykkes med. For å ta høyde for denne
variasjonen, åpner formuleringen i kriteriet for ulike måter å være på A2-nivå på.
På B1 forventer vi at kandidatene har et ganske godt grep om grunnleggende
grammatiske strukturer. Kandidaten gjør likevel fremdeles en del feil, men har ganske
BOKMÅL | 06.06.23 | 12
god kontroll over de vanligste bøyningsmønstrene og enkle setningstyper. Det vil også
være noen eksempler på vellykket bruk av komplekse setninger, altså setninger med
utbygde fraser og leddsetninger. Med ordet «vellykket» mener vi her at setningene det
gjelder er greie å forstå og at de fungerer i sammenhengen – de trenger ikke være
feilfrie. Særlig i de komplekse setningene kan det være noen feil som fører til
misforståelser, og slike feil kan i noen tilfeller også forekomme i enklere setninger.
På B2 forventer vi at kandidatene har et godt grep om grunnleggende grammatiske
strukturer. Feil vil fortsatt forekomme, men disse fører ikke til misforståelser. I en del
tilfeller kan det være at noen av de grunnleggende strukturene ikke er helt på plass,
selv på B2. Hvilke strukturer dette gjelder, vil variere, blant annet ut fra kandidatenes
språkbakgrunn. For eksempel vil noen kunne glippe i bruken av det formelle subjektet
“det”, mens andre kan ha større problemer med bruk av bestemthet. Selv om feilene
ikke skal føre til misforståelser på B2, er det rom for at sensor unntaksvis kan la en
og annen feil passere selv om den går ut over forståeligheten, hvis kandidatens språk-
produksjon ellers er overbevisende nok.
Vi forventer også at kandidaten viser god variasjon i setningsstruktur og for det meste
vellykket bruk av komplekse setninger. For at vi skal anse setningene som «vellykkede»
i en B2-sammenheng, skal de være klare og lette å forstå, og hensiktsmessige i
sammenhengen. Som nevnt vil feil fortsatt forekomme, og da spesielt i de komplekse
strukturene. For eksempel vil mange B2-kandidater ha noen tilfeller av inversjonsfeil og
feil i plassering av adverbial i leddsetninger.`;

const systemMessage = `
You are an expert in evaluating texts written in Norwegian for the Norskprøven exam. Your task is to objectively assess the presented text and determine its language level (A1, A2, B1, B2). Please read ALL the following evaluation criteria very carefully and process the information thoroughly:
${criteriaText}

Based on all of these criteria (which are very important!), provide a precise analysis of the text's language level and explain why the text is evaluated at that level, providing detailed analysis and reasons why the text corresponds to this level. Your answer must consist solely of an evaluation in HTML code:
- Wrap the overall evaluation in a <div class="feedback-text">.
- The language level should be clearly indicated in an <h3> tag.
- Any important remarks or examples of mistakes should be enclosed in a <span class="feedback-note">.
Your response must include:
- A clear and definitive indication of the text's language level in an <h3> tag.
- A thorough analysis of the text, explaining in detail why the text corresponds to that level, according to the specified criteria.
- Specific praise for the strengths of the text (e.g., clarity, organization, appropriate vocabulary, etc.), integrated naturally into the feedback.
- Constructive suggestions on what areas could be improved (if any), with specific recommendations.
- For every issue or area for improvement that you identify in the text, you must provide a corrected or improved version of that section along with a brief explanation of why this change is recommended. Do not simply point out the problem; include a specific suggestion for how to fix it.
- After providing your detailed evaluation and analysis of the text, include a brief motivational message that praises the candidate for their effort and highlights the strengths of their writing. The message should be supportive and positive, encouraging the candidate to continue improving and working on any identified issues, so that they feel motivated to further develop their language skills.
-To provide an accurate assessment, the text must be at least **50 words long**. If the text is shorter than this, try to estimate the level but include a note stating that the result is highly uncertain due to insufficient text length.
Do not include extra headings (such as 'Evaluation', 'Analysis', or 'Motivation')—provide a single, coherent piece of feedback. If you cannot provide feedback, output an error message in uppercase wrapped in a <strong> tag in ${feedbackLanguage} (not another language!) that clearly explains why feedback cannot be given.
Note: You must evaluate only texts written in Norwegian. The entire response must be in ${feedbackLanguage}(not another language!) (except any examples directly extracted from the input text, which must remain in Norwegian).
Now, evaluate the following text:

Tema: ${currentTopic}
Tekst: ${userText}
`;

    try {
      // Формируем запрос, включающий тему и текст
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          temperature: 0.2,
          top_p: 0.9,
          frequency_penalty: 0.2,
          presence_penalty: 0.2,
          messages: [
            {
              role: "system",
              content: systemMessage
            },
            {
              role: "user",
              content: `Тема: ${currentTopic}\nТекст: ${userText}`
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFeedback(`Feil: ${errorData.error ? errorData.error.message : "Ukjent feil"}`);
      } else {
        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
          const rawFeedback = data.choices[0].message.content;
          const cleanedFeedback = cleanMarkdown(rawFeedback);
          const safeFeedback = DOMPurify.sanitize(cleanedFeedback);
          setFeedback(safeFeedback);
        } else {
          setFeedback("Kunne ikke motta et gyldig svar fra API-et.");
        }
      }
    } catch (error) {
      console.error("Feil ved henting av tilbakemelding:", error);
      setFeedback("Det oppstod en feil. Prøv igjen senere.");
    }
    setLoading(false);
  };

  // Если пользователь вручную меняет тему, устанавливаем isTopicGenerated в false
  const handleTopicChange = (e) => {
    setCurrentTopic(e.target.value);
  };

  // Функция для копирования фидбека в буфер обмена
  const copyFeedbackToClipboard = () => {
    if (feedback) {
      const tempElement = document.createElement('textarea');
      tempElement.value = feedback;
      document.body.appendChild(tempElement);
      tempElement.select();
      document.execCommand('copy');
      document.body.removeChild(tempElement);
      alert('Feedback copied to clipboard!');
    }
  };

  // Функция для очистки только темы
  const clearTopic = () => {
    setCurrentTopic("");
    localStorage.removeItem('currentTopic');
  };

  // Функция для очистки только текста
  const clearText = () => {
    setUserText("");
    localStorage.removeItem('userText');
  };

  // Функция для очистки всех полей: темы, текста и фидбека
  const clearAllFields = () => {
    clearTopic();
    clearText();
    setFeedback("");
  };


  return (
    <div className="feedback-form">
      <h2>Skriv inn temaet for oppgaven:</h2>
      <TextareaAutosize
  type="text"
  value={currentTopic}
  onChange={handleTopicChange}
  placeholder="Skriv inn et tema eller bruk det genererte"
  rows="1"
  className="topic-input"
/>
      <div className='clear-buttons'>
        <button onClick={clearTopic} className="clear-button" disabled={!currentTopic}>Tøm tema</button>
      </div>
      <h2>Skriv teksten din:</h2>
      
      <textarea
        rows="10"
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        placeholder="Teksten din…"
        className="feedback-textarea"
      />
      <div className="clear-buttons">       
        <button onClick={clearText} className="clear-button" disabled={!userText}>Tøm tekst</button>     
      </div>
      <h2>Velg språk for tilbakemelding:</h2>
      <select
        value={feedbackLanguage}
        onChange={(e) => {
          setFeedbackLanguage(e.target.value);
        }}
        className="language-select"
      >
        <option value="Norwegian">Norsk</option>
        <option value="English">Engelsk</option>
        <option value="French">Fransk</option>
        <option value="Arabic">Arabisk</option>
        <option value="Farsi">Farsi</option>
        <option value="Swahili">Swahili</option>
        <option value="Kurdish (Kurmanji)">Kurdisk (Kurmanji)</option>
        <option value="Romanian">Rumensk</option>
        <option value="Ukrainian">Ukrainsk</option>
        <option value="Russian">Russisk</option>

      </select>
      <button onClick={handleSubmit} disabled={loading || (!userText || !currentTopic)} className="feedback-button">
        {loading ? "Sender…" : "Få tilbakemelding"}
      </button>
      {feedback && (
        <div className="feedback-response">
          <h3>Tilbakemelding:</h3>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(feedback) }}></div>
          <button onClick={copyFeedbackToClipboard} className="feedback-copy-button">
            Kopier tilbakemelding
          </button>
          <div className="clear-buttons"><button onClick={clearAllFields} className="clear-button">Tøm alt</button></div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;