// Tennis Quiz Questions Database
const questionsDB = {
    easy: [
        {
            question: "Vad kallas det när man vinner ett tennisset med 6-0?",
            answers: ["Bagel", "Donut", "Noll", "Shutout"],
            correct: 0
        },
        {
            question: "Hur många set måste man vinna för att vinna en match i Grand Slam-turneringar för herrar?",
            answers: ["2", "3", "4", "5"],
            correct: 1
        },
        {
            question: "Vad heter det område som spelaren måste stå inom när hen servar?",
            answers: ["Baslinjen", "Servicerutan", "Nätområdet", "Servicelinjen"],
            correct: 1
        },
        {
            question: "Vilken av dessa Grand Slam-turneringar spelas på grus?",
            answers: ["Wimbledon", "US Open", "French Open", "Australian Open"],
            correct: 2
        },
        {
            question: "Vad kallas poängen 0 i tennis?",
            answers: ["Noll", "Love", "Zero", "Start"],
            correct: 1
        },
        {
            question: "Hur många poäng behöver man för att vinna ett game (utan deuce)?",
            answers: ["3", "4", "5", "6"],
            correct: 1
        },
        {
            question: "Vilken hand höll John McEnroe racket med?",
            answers: ["Höger", "Vänster", "Båda", "Växlade"],
            correct: 1
        },
        {
            question: "Vad heter det när ställningen är 40-40?",
            answers: ["Deuce", "Advantage", "Match point", "Set point"],
            correct: 0
        },
        {
            question: "Vilken av dessa Grand Slam-turneringar spelas på gräs?",
            answers: ["French Open", "US Open", "Wimbledon", "Australian Open"],
            correct: 2
        },
        {
            question: "Hur bred är en tennisbana?",
            answers: ["8,23 meter", "10,97 meter", "12,8 meter", "15 meter"],
            correct: 1
        },
        {
            question: "Vad kallas det när man slår bollen innan den studsar?",
            answers: ["Volley", "Smash", "Lob", "Drop shot"],
            correct: 0
        },
        {
            question: "Vilken spelarinna har vunnit flest Grand Slam-titlar?",
            answers: ["Steffi Graf", "Martina Navratilova", "Serena Williams", "Margaret Court"],
            correct: 3
        },
        {
            question: "Vad kallas det när man slår bollen rakt ner i motståndarens bana från luften?",
            answers: ["Volley", "Smash", "Lob", "Drive"],
            correct: 1
        },
        {
            question: "Hur många chanser får man om man missar första serven?",
            answers: ["En", "Två", "Tre", "Obegränsat"],
            correct: 0
        },
        {
            question: "Vilken färg har traditionellt en tennisboll?",
            answers: ["Vit", "Gul", "Grön", "Orange"],
            correct: 1
        },
        {
            question: "Vad heter det när man spelar på höger sida av banan vid serve?",
            answers: ["Forehand-sidan", "Backhand-sidan", "Deuce-sidan", "Ad-sidan"],
            correct: 2
        },
        {
            question: "Vilken Grand Slam-turnering spelas först på året?",
            answers: ["French Open", "Wimbledon", "US Open", "Australian Open"],
            correct: 3
        },
        {
            question: "Vad kallas det när bollen träffar nätet under en serve men landar i rätt ruta?",
            answers: ["Fel", "Let", "Ace", "Fault"],
            correct: 1
        },
        {
            question: "Hur högt är nätet i mitten av banan?",
            answers: ["0,914 meter", "1 meter", "1,07 meter", "1,2 meter"],
            correct: 0
        },
        {
            question: "Vad heter Roger Federers hemland?",
            answers: ["Österrike", "Tyskland", "Schweiz", "Sverige"],
            correct: 2
        },
        {
            question: "Vilket år började Wimbledon tillåta professionella spelare?",
            answers: ["1968", "1970", "1965", "1972"],
            correct: 0
        },
        {
            question: "Vad kallas det när man slår bollen högt upp för att komma förbi motståndaren?",
            answers: ["Smash", "Volley", "Lob", "Drive"],
            correct: 2
        },
        {
            question: "Vilken spelarinna vann Wimbledon 2023?",
            answers: ["Serena Williams", "Marketa Vondrousova", "Ons Jabeur", "Elena Rybakina"],
            correct: 1
        },
        {
            question: "Vad står ATP för?",
            answers: ["American Tennis Players", "Association of Tennis Professionals", "Australian Tennis Program", "Advanced Tennis Performance"],
            correct: 1
        },
        {
            question: "Hur många games måste man vinna för att vinna ett set (utan tiebreak)?",
            answers: ["5", "6", "7", "8"],
            correct: 1
        },
        {
            question: "Vilken spelare har vunnit French Open flest gånger?",
            answers: ["Roger Federer", "Novak Djokovic", "Rafael Nadal", "Andre Agassi"],
            correct: 2
        },
        {
            question: "Vad heter den mest prestigefulla tennisturneringen för damer?",
            answers: ["WTA Finals", "Wimbledon", "Fed Cup", "WTA Tour"],
            correct: 1
        },
        {
            question: "Vilken typ av underlag används på US Open?",
            answers: ["Grus", "Gräs", "Hardcourt", "Konstgräs"],
            correct: 2
        },
        {
            question: "Vad kallas det när man returnerar en serve direkt för vinst?",
            answers: ["Ace", "Winner", "Return ace", "Break"],
            correct: 2
        },
        {
            question: "Hur många set spelas det i damernas Grand Slam-finaler?",
            answers: ["Bäst av 3", "Bäst av 5", "Exakt 3", "Exakt 5"],
            correct: 0
        },
        {
            question: "Vad heter det när man vinner motstånandarens serve?",
            answers: ["Hold", "Break", "Ace", "Winner"],
            correct: 1
        },
        {
            question: "Vilken månad spelas Wimbledon traditonellt?",
            answers: ["Juni", "Juli", "Augusti", "September"],
            correct: 1
        },
        {
            question: "Vad kallas den mjuka bollen som används på lägre nivåer?",
            answers: ["Training ball", "Junior ball", "Practice ball", "Low compression ball"],
            correct: 3
        },
        {
            question: "Vilken färg bär spelarna traditionellt på Wimbledon?",
            answers: ["Gul", "Vit", "Grön", "Blå"],
            correct: 1
        },
        {
            question: "Vad heter det när man slår bollen mjukt så att den knappt går över nätet?",
            answers: ["Drop shot", "Slice", "Volley", "Chip"],
            correct: 0
        },
        {
            question: "Hur många huvuddomare finns det i en tennis match?",
            answers: ["En", "Två", "Tre", "Fyra"],
            correct: 0
        },
        {
            question: "Vad kallas det när bollen går utanför banan?",
            answers: ["Fel", "Out", "Fault", "Miss"],
            correct: 1
        },
        {
            question: "Vilken spelare vann US Open herrar 2023?",
            answers: ["Carlos Alcaraz", "Novak Djokovic", "Daniil Medvedev", "Jannik Sinner"],
            correct: 1
        },
        {
            question: "Vad heter det område mellan servicelinjerna?",
            answers: ["No man's land", "Service box", "Forecourt", "Midcourt"],
            correct: 0
        },
        {
            question: "Hur många linjedomare kan det maximalt finnas i en match?",
            answers: ["6", "9", "12", "15"],
            correct: 1
        },
        {
            question: "Vad kallas det när man träffar bollen på racketets kant?",
            answers: ["Frame shot", "Edge shot", "Rim shot", "Side shot"],
            correct: 0
        },
        {
            question: "Vilken Grand Slam-turnering har mest prestigelöst priskupa för damer?",
            answers: ["Venus Rosewater Dish", "Daphne Akhurst Memorial Cup", "Suzanne Lenglen Cup", "US Open Trophy"],
            correct: 0
        },
        {
            question: "Vad står WTA för?",
            answers: ["World Tennis Association", "Women's Tennis Association", "Women's Tennis Alliance", "World Tennis Alliance"],
            correct: 1
        },
        {
            question: "Hur många bollar får man använda under en match innan de byts ut?",
            answers: ["6", "7", "9", "12"],
            correct: 1
        },
        {
            question: "Vad heter det när man vinner alla fyra Grand Slam-turneringar samma år?",
            answers: ["Super Slam", "Grand Slam", "Perfect Slam", "Golden Slam"],
            correct: 1
        },
        {
            question: "Vilken hand använder Rafael Nadal för att spela tennis?",
            answers: ["Höger", "Vänster", "Båda", "Växlar"],
            correct: 1
        },
        {
            question: "Hur många chanser får man om man begär Hawk-Eye på Wimbledon?",
            answers: ["2", "3", "4", "Obegränsat"],
            correct: 1
        },
        {
            question: "Vad heter det när man slår bollen med underspin?",
            answers: ["Topspin", "Slice", "Flat", "Kick"],
            correct: 1
        },
        {
            question: "Vilken stad arrangerar French Open?",
            answers: ["Lyon", "Marseille", "Paris", "Nice"],
            correct: 2
        },
        {
            question: "Vad kallas mötesplatsen för alla fyra Grand Slam-turneringarna?",
            answers: ["Tennis Majors", "Grand Slam Circuit", "Major Tours", "Big Four"],
            correct: 1
        }
    ],
    medium: [
        {
            question: "Vem var den första spelaren att vinna Calendar Grand Slam i öppna eran?",
            answers: ["Rod Laver", "Steffi Graf", "Margaret Court", "Maureen Connolly"],
            correct: 1
        },
        {
            question: "Vilket år infördes tiebreak i tennis?",
            answers: ["1965", "1970", "1975", "1980"],
            correct: 1
        },
        {
            question: "Vem tränade Stefan Edberg under hans mest framgångsrika period?",
            answers: ["Tony Pickard", "Sven Salumaa", "Percy Rosberg", "Ulf Schmidt"],
            correct: 0
        },
        {
            question: "Vilken spelare har flest ATP Masters 1000-titlar?",
            answers: ["Rafael Nadal", "Roger Federer", "Novak Djokovic", "Andre Agassi"],
            correct: 2
        },
        {
            question: "Vad heter den berömda tennismatchen mellan John McEnroe och Björn Borg 1980?",
            answers: ["Wimbledon Final", "Fire and Ice", "The Greatest Match", "Classic Clash"],
            correct: 0
        },
        {
            question: "Vilken kvinnlig spelare hade flest veckor som världsetta?",
            answers: ["Steffi Graf", "Martina Navratilova", "Serena Williams", "Chris Evert"],
            correct: 0
        },
        {
            question: "Vem vann den första öppna Wimbledon 1968?",
            answers: ["Ken Rosewall", "Rod Laver", "Arthur Ashe", "John Newcombe"],
            correct: 1
        },
        {
            question: "Vilken spelare hade smeknamnet 'The Ice Man'?",
            answers: ["Stefan Edberg", "Björn Borg", "Mats Wilander", "Ivan Lendl"],
            correct: 1
        },
        {
            question: "Hur många Grand Slam-singeltitlar vann Björn Borg?",
            answers: ["9", "11", "13", "15"],
            correct: 1
        },
        {
            question: "Vem är den yngsta kvinnliga spelaren som vunnit Wimbledon?",
            answers: ["Martina Hingis", "Venus Williams", "Steffi Graf", "Lottie Dod"],
            correct: 3
        },
        {
            question: "Vilken spelare vann 'Battle of the Sexes' 1973?",
            answers: ["Bobby Riggs", "Billie Jean King", "Margaret Court", "John McEnroe"],
            correct: 1
        },
        {
            question: "Vad heter Davis Cup-finalen för damer?",
            answers: ["Fed Cup", "Billie Jean King Cup", "Wightman Cup", "Hopman Cup"],
            correct: 1
        },
        {
            question: "Vem var den första spelaren att tjäna över 1 miljon dollar på tennis?",
            answers: ["Chris Evert", "Billie Jean King", "Virginia Wade", "Martina Navratilova"],
            correct: 0
        },
        {
            question: "Vilken spelare har längst vinningsvit på grus i modern tid?",
            answers: ["Rafael Nadal", "Björn Borg", "Thomas Muster", "Guillermo Vilas"],
            correct: 0
        },
        {
            question: "Vem designade den ursprungliga Wimbledon-pokalen för herrar?",
            answers: ["Mappin & Webb", "Elkington & Co", "Asprey", "Garrard"],
            correct: 1
        },
        {
            question: "Vilken spelare vann sin första Grand Slam-titel vid 17 års ålder?",
            answers: ["Maria Sharapova", "Martina Hingis", "Monica Seles", "Arantxa Sánchez Vicario"],
            correct: 2
        },
        {
            question: "Vad heter den officiella tennisbollen som används på Wimbledon?",
            answers: ["Slazenger", "Wilson", "Dunlop", "Head"],
            correct: 0
        },
        {
            question: "Vem var den första spelaren att vinna över 100 miljoner dollar i karriären?",
            answers: ["Pete Sampras", "Andre Agassi", "Roger Federer", "Novak Djokovic"],
            correct: 3
        },
        {
            question: "Vilken spelare hade flest aces under en Grand Slam-turnering?",
            answers: ["John Isner", "Ivo Karlovic", "Kevin Anderson", "Goran Ivanišević"],
            correct: 1
        },
        {
            question: "Vem vann den längsta matchen i tennis-historien?",
            answers: ["John Isner", "Nicolas Mahut", "Kevin Anderson", "John Millman"],
            correct: 0
        },
        {
            question: "Vilken kvinnlig spelare har vunnit flest French Open-titlar?",
            answers: ["Steffi Graf", "Monica Seles", "Chris Evert", "Justine Henin"],
            correct: 2
        },
        {
            question: "Vad heter världsrankingen för herrarna?",
            answers: ["ATP Rankings", "FedEx ATP Rankings", "Emirates ATP Rankings", "Pepperstone ATP Rankings"],
            correct: 3
        },
        {
            question: "Vem var den siste amatörspelaren som vann Wimbledon?",
            answers: ["Rod Laver", "John Newcombe", "Ken Rosewall", "Arthur Ashe"],
            correct: 1
        },
        {
            question: "Vilken spelare har flest titlar på WTA Tour?",
            answers: ["Steffi Graf", "Martina Navratilova", "Serena Williams", "Chris Evert"],
            correct: 1
        },
        {
            question: "Vem uppfann det moderna racket-strängsystemet?",
            answers: ["Babolat", "Prince", "Wilson", "Head"],
            correct: 1
        },
        {
            question: "Vilken spelare vann Australian Open när det fortfarande spelades på gräs?",
            answers: ["Rod Laver", "Ken Rosewall", "Stefan Edberg", "Pat Rafter"],
            correct: 2
        },
        {
            question: "Vad heter den årliga prisutdelningen för tennis?",
            answers: ["ITF World Champions", "ATP Awards", "Tennis Hall of Fame", "Golden Racket"],
            correct: 0
        },
        {
            question: "Vem var den första kvinnan som slog mer än 200 km/h på en serve?",
            answers: ["Venus Williams", "Serena Williams", "Brenda Schultz-McCarthy", "Sabine Lisicki"],
            correct: 2
        },
        {
            question: "Vilken spelare introducerade 'tweener'-slaget?",
            answers: ["Guillermo Vilas", "Yannick Noah", "Gael Monfils", "Roger Federer"],
            correct: 1
        },
        {
            question: "Vad heter den berömda tennisklubben i Queen's Club?",
            answers: ["Queen's Club Championships", "Stella Artois Championships", "cinch Championships", "Aegon Championships"],
            correct: 2
        },
        {
            question: "Vem var den första spelaren att använda grafitracket i professionell tennis?",
            answers: ["Arthur Ashe", "Jimmy Connors", "Björn Borg", "John McEnroe"],
            correct: 0
        },
        {
            question: "Vilken spelare vann flest Grand Slam-dubbelttitlar?",
            answers: ["John McEnroe", "Todd Woodbridge", "Mark Woodforde", "Bob Bryan"],
            correct: 1
        },
        {
            question: "Vad heter den äldsta tennisturneringen i världen?",
            answers: ["Wimbledon", "Queen's Club", "US National Championships", "Northern Championships"],
            correct: 0
        },
        {
            question: "Vem var den första spelaren att vinna alla fyra Grand Slams på olika underlag?",
            answers: ["Andre Agassi", "Roger Federer", "Rafael Nadal", "Novak Djokovic"],
            correct: 0
        },
        {
            question: "Vilken organisation grundades 1973 för att försvara kvinnors rättigheter i tennis?",
            answers: ["WTA", "Women's Tennis Council", "Virginia Slims", "Women's International Tennis Association"],
            correct: 0
        },
        {
            question: "Vem höll rekordet för flest aces i en match innan Hawk-Eye?",
            answers: ["Goran Ivanišević", "Mark Philippoussis", "Richard Krajicek", "Greg Rusedski"],
            correct: 0
        },
        {
            question: "Vilken spelare började använda tunga topspin-slag i modern tennis?",
            answers: ["Björn Borg", "Guillermo Vilas", "Manuel Orantes", "Adriano Panatta"],
            correct: 0
        },
        {
            question: "Vad heter det system som används för att mäta bollhastighet?",
            answers: ["SpeedTrack", "Radar Gun", "VelocityMeter", "TennisSpeed"],
            correct: 1
        },
        {
            question: "Vem var den första spelaren att vinna över 1000 matcher på ATP Tour?",
            answers: ["Jimmy Connors", "Ivan Lendl", "John McEnroe", "Guillermo Vilas"],
            correct: 0
        },
        {
            question: "Vilken spelare introducerade det moderna dubbelhandade backhandslaget?",
            answers: ["Chris Evert", "Jimmy Connors", "Björn Borg", "Pancho Segura"],
            correct: 3
        },
        {
            question: "Vad heter den teknologi som används för att spåra bollar?",
            answers: ["Hawk-Eye", "Eagle Eye", "Ball Tracker", "Line Watch"],
            correct: 0
        },
        {
            question: "Vem var den första kvinnliga spelaren att tjäna över 20 miljoner dollar?",
            answers: ["Steffi Graf", "Monica Seles", "Martina Navratilova", "Arantxa Sánchez Vicario"],
            correct: 0
        },
        {
            question: "Vilken stad har arrangerat flest Davis Cup-finaler?",
            answers: ["Paris", "London", "New York", "Melbourne"],
            correct: 1
        },
        {
            question: "Vem designade den moderna Wimbledon-centercourten?",
            answers: ["Norman Foster", "David Chipperfield", "Populous", "KSS Group"],
            correct: 2
        },
        {
            question: "Vilken spelare höll världsrekordet för snabbaste serve i över 10 år?",
            answers: ["Andy Roddick", "Ivo Karlovic", "John Isner", "Milos Raonic"],
            correct: 0
        },
        {
            question: "Vad heter den berömda tennismatcher-dokumentären från 2017?",
            answers: ["Borg vs McEnroe", "The Final Match", "Tennis Legends", "Court Warriors"],
            correct: 0
        },
        {
            question: "Vem var den första spelaren att vinna Wimbledon med metalracket?",
            answers: ["Jimmy Connors", "Arthur Ashe", "Björn Borg", "Ilie Năstase"],
            correct: 0
        },
        {
            question: "Vilken organisation ansvarar för dopingkontroller i tennis?",
            answers: ["ITF", "ATP", "WTA", "WADA"],
            correct: 0
        },
        {
            question: "Vem var den första spelaren att använda en sportagent i tennis?",
            answers: ["Arthur Ashe", "Donald Dell", "Mark McCormack", "Björn Borg"],
            correct: 2
        },
        {
            question: "Vilken teknisk innovation introducerades först på US Open 2006?",
            answers: ["Hawk-Eye", "Speed Gun", "Electronic Line Calling", "Shot Clock"],
            correct: 0
        }
    ],
    hard: [
        {
            question: "Vem vann den första ATP Tour-matchen någonsin 1990?",
            answers: ["Stefan Edberg", "Ivan Lendl", "Andre Agassi", "Pete Sampras"],
            correct: 0
        },
        {
            question: "Vilken spelare hade den längsta vinningsraden på hardcourt i öppna eran?",
            answers: ["Ivan Lendl", "John McEnroe", "Jimmy Connors", "Novak Djokovic"],
            correct: 3
        },
        {
            question: "Vad var Steffi Grafs exakta Grand Slam-titel-siffra i singel?",
            answers: ["20", "21", "22", "23"],
            correct: 2
        },
        {
            question: "Vem var den första spelaren att genomföra Career Golden Slam (inklusive OS)?",
            answers: ["Andre Agassi", "Steffi Graf", "Rafael Nadal", "Serena Williams"],
            correct: 1
        },
        {
            question: "Vilken spelare höll rekordet för flest konsekutiva Grand Slam-kvartsfinaler?",
            answers: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Jimmy Connors"],
            correct: 0
        },
        {
            question: "Vad hette den berömda rivaliteten mellan Chris Evert och Martina Navratilova?",
            answers: ["The Greatest Rivalry", "Fire and Ice", "The Golden Era", "The Battle"],
            correct: 1
        },
        {
            question: "Vem var den sista spelaren att vinna Calendar Grand Slam i herrsingel?",
            answers: ["Rod Laver", "Don Budge", "Maureen Connolly", "Steffi Graf"],
            correct: 0
        },
        {
            question: "Vilken exakt tid pågick den längsta tennismatchen i historien?",
            answers: ["11 timmar 5 minuter", "11 timmar 15 minuter", "10 timmar 45 minuter", "12 timmar 20 minuter"],
            correct: 0
        },
        {
            question: "Vem introducerade det första kolfiber-racketet?",
            answers: ["Prince", "Head", "Dunlop", "Yonex"],
            correct: 2
        },
        {
            question: "Vilken spelare vann den första miljondollar-bonusen från Grand Prix Masters?",
            answers: ["John McEnroe", "Ivan Lendl", "Jimmy Connors", "Björn Borg"],
            correct: 1
        },
        {
            question: "Vad var Monica Seles ålder när hon vann sin första Grand Slam?",
            answers: ["16 år 6 månader", "16 år 8 månader", "16 år 11 månader", "17 år 2 månader"],
            correct: 0
        },
        {
            question: "Vem var den första spelaren att vinna över 800 matcher på ATP Tour?",
            answers: ["Jimmy Connors", "Ivan Lendl", "John McEnroe", "Ilie Năstase"],
            correct: 0
        },
        {
            question: "Vilken organisation ersatte ILTF (International Lawn Tennis Federation)?",
            answers: ["ATP", "ITF", "Grand Slam Committee", "Professional Tennis Council"],
            correct: 1
        },
        {
            question: "Vem var den första kvinnliga linjedomaren på Wimbledon?",
            answers: ["Margaret Osborne duPont", "Pauline Betz", "Dorothy Round", "Nora Gordon"],
            correct: 3
        },
        {
            question: "Vilken spelare hade smeknamnet 'Rocket' under sin karriär?",
            answers: ["Rod Laver", "Ken Rosewall", "Lew Hoad", "Ashley Cooper"],
            correct: 0
        },
        {
            question: "Vad hette den första professionella tennisturneringen 1926?",
            answers: ["US Pro", "French Pro", "Wembley Pro", "World Championship"],
            correct: 2
        },
        {
            question: "Vem var den första spelaren att använda Wilson Pro Staff-racketet?",
            answers: ["John McEnroe", "Jimmy Connors", "Ivan Lendl", "Chris Evert"],
            correct: 1
        },
        {
            question: "Vilken exakt hastighet hade Andy Rodddicks rekordserve 2004?",
            answers: ["249,4 km/h", "249,3 km/h", "249,5 km/h", "249,2 km/h"],
            correct: 0
        },
        {
            question: "Vem var den första spelaren att vinna samma Grand Slam fem gånger i rad?",
            answers: ["Björn Borg", "Rafael Nadal", "Roger Federer", "Pete Sampras"],
            correct: 0
        },
        {
            question: "Vilken stad var värd för den första Davis Cup-finalen 1900?",
            answers: ["Boston", "New York", "Philadelphia", "Brookline"],
            correct: 3
        },
        {
            question: "Vem var den första spilledaren att förlora en Grand Slam-final efter att ha lett med 2-0 i set?",
            answers: ["Ivan Lendl", "John McEnroe", "Jimmy Connors", "Guillermo Vilas"],
            correct: 0
        },
        {
            question: "Vilken organisation grundade de första World Championships 1913?",
            answers: ["ILTF", "USLTA", "LTA", "FFT"],
            correct: 0
        },
        {
            question: "Vem var den första spelaren att använda oversize-racketet i professionell tennis?",
            answers: ["Pam Shriver", "Gene Mayer", "Howard Schoenfield", "Prince Manufacturing"],
            correct: 1
        },
        {
            question: "Vilken spelare vann den första WCT Finals 1971?",
            answers: ["Ken Rosewall", "Rod Laver", "John Newcombe", "Arthur Ashe"],
            correct: 0
        },
        {
            question: "Vad var det ursprungliga namnet för French Open?",
            answers: ["French Championships", "Championnats de France", "Roland Garros Tournament", "Paris Championships"],
            correct: 1
        },
        {
            question: "Vem var den första kvinnliga spelaren att slå över 200 km/h på en serve?",
            answers: ["Venus Williams", "Brenda Schultz-McCarthy", "Serena Williams", "Sabine Lisicki"],
            correct: 1
        },
        {
            question: "Vilken exakt vikt hade den ursprungliga tennisbollen 1870?",
            answers: ["56-58 gram", "57-58 gram", "56-59 gram", "57-59 gram"],
            correct: 2
        },
        {
            question: "Vem designade det första modernt stringade racketet 1875?",
            answers: ["Walter Wingfield", "Spencer Gore", "William Renshaw", "Harry Gem"],
            correct: 0
        },
        {
            question: "Vilken stad arrangerade den första inomhus-tennisturneringen?",
            answers: ["London", "Paris", "Boston", "New York"],
            correct: 2
        },
        {
            question: "Vem var den första spelaren att vinna alla fyra Grand Slams i samma kalenderår (amatör)?",
            answers: ["Don Budge", "Rod Laver", "Maureen Connolly", "Margaret Court"],
            correct: 0
        },
        {
            question: "Vilken organisation kontrollerade tennis innan öppna eran?",
            answers: ["ILTF", "Professional Tennis Association", "World Tennis Federation", "Amateur Tennis Association"],
            correct: 0
        },
        {
            question: "Vem var den första spelaren att tjäna miljoner på tennis före öppna eran?",
            answers: ["Rod Laver", "Ken Rosewall", "Pancho Gonzales", "Tony Trabert"],
            correct: 2
        },
        {
            question: "Vilken teknisk innovation introducerades först 1877 på Wimbledon?",
            answers: ["Net posts", "Baseline markers", "Service lines", "Centre mark"],
            correct: 2
        },
        {
            question: "Vem var den första kvinnliga spredaren som blev professionell 1959?",
            answers: ["Karol Fageros", "Althea Gibson", "Maureen Connolly", "Angela Mortimer"],
            correct: 0
        },
        {
            question: "Vilken exakt höjd hade det ursprungliga tennsnätet 1874?",
            answers: ["0,99 meter", "1,07 meter", "1,22 meter", "1,52 meter"],
            correct: 3
        },
        {
            question: "Vem var den första spelaren att använda metal strings?",
            answers: ["Rod Laver", "Ken Rosewall", "Pancho Gonzales", "Victor Seixas"],
            correct: 3
        },
        {
            question: "Vilken organisation skapade det första officiella rankingsystemet 1973?",
            answers: ["ATP", "Computer Ranking System", "ILTF", "WCT"],
            correct: 1
        },
        {
            question: "Vem var den första spelaren att vinna över 100 professionella titlar?",
            answers: ["Jimmy Connors", "Ivan Lendl", "Ilie Năstase", "Rod Laver"],
            correct: 0
        },
        {
            question: "Vilken stad arrangerade den första 'tie-break' matchen 1965?",
            answers: ["Newport", "Forest Hills", "Wimbledon", "Roland Garros"],
            correct: 0
        },
        {
            question: "Vem var den första spelaren att använda en dubbelsträngad racket?",
            answers: ["Werner Fischer", "Ilie Năstase", "Stan Smith", "Arthur Ashe"],
            correct: 0
        },
        {
            question: "Vilken organisation ersatte World Championship Tennis (WCT) 1990?",
            answers: ["ATP Tour", "Grand Prix Tennis", "Professional Tennis Council", "Men's International Tennis"],
            correct: 0
        },
        {
            question: "Vem var den första spelaren att vinna över 50 miljoner dollar i karriären?",
            answers: ["Pete Sampras", "Andre Agassi", "Stefan Edberg", "Boris Becker"],
            correct: 0
        },
        {
            question: "Vilken exakt längd hade den ursprungliga tennisbanan 1877?",
            answers: ["23,77 meter", "23,76 meter", "78 fot", "78,5 fot"],
            correct: 0
        },
        {
            question: "Vem introducerade det första polyester-strängningssystemet?",
            answers: ["Luxilon", "Babolat", "Prince", "Tecnifibre"],
            correct: 0
        },
        {
            question: "Vilken organisation skapade det första anti-doping-programmet i tennis?",
            answers: ["ITF", "ATP", "WTA", "IOC"],
            correct: 0
        },
        {
            question: "Vem var den första spelaren att vinna over 1000 matcher i öppna eran?",
            answers: ["Jimmy Connors", "Ivan Lendl", "John McEnroe", "Guillermo Vilas"],
            correct: 0
        },
        {
            question: "Vilken stad arrangerade den första Night Session på Grand Slam 1975?",
            answers: ["New York", "Melbourne", "Paris", "London"],
            correct: 0
        },
        {
            question: "Vem var den första spelaren att använda en widebody-racket?",
            answers: ["Michael Chang", "Andre Agassi", "Jim Courier", "Pete Sampras"],
            correct: 1
        },
        {
            question: "Vilken organisation introducerade det första elektroniska rankingsystemet?",
            answers: ["ATP", "WTA", "ITF", "Computer Tennis Ranking"],
            correct: 0
        },
        {
            question: "Vem var den första kvinnliga spelaren att tjäna över 10 miljoner dollar?",
            answers: ["Steffi Graf", "Martina Navratilova", "Chris Evert", "Monica Seles"],
            correct: 1
        }
    ],
    expert: [
        {
            question: "Vem var den första spelaren att vinna 'Boxed Set' (alla Grand Slam-titlar i singel, dubbel och mixed)?",
            answers: ["Martina Navratilova", "Margaret Court", "Doris Hart", "Shirley Fry"],
            correct: 2
        },
        {
            question: "Vilken exakt datum spelades den första Wimbledon-finalen?",
            answers: ["19 juli 1877", "21 juli 1877", "18 juli 1877", "20 juli 1877"],
            correct: 0
        },
        {
            question: "Vem var den första spillearen att vinna 'Super Slam' (alla Grand Slams plus OS och Tour Finals samma år)?",
            answers: ["Steffi Graf", "Novak Djokovic", "Rafael Nadal", "Serena Williams"],
            correct: 0
        },
        {
            question: "Vilken spelare hade det ursprungliga rekordet för lägsta ranking som vunnit Grand Slam före wildcards?",
            answers: ["Mark Edmondson", "Andrés Gómez", "Gaston Gaudio", "Albert Costa"],
            correct: 0
        },
        {
            question: "Vem var den första spelaren att vinna över 100 miljoner dollar i samtliga tävlingar (inklusive exhibitions)?",
            answers: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Andre Agassi"],
            correct: 0
        },
        {
            question: "Vilken exakt hastighet hade Sabine Lisickis rekordserve 2014?",
            answers: ["210,8 km/h", "211,0 km/h", "210,6 km/h", "210,9 km/h"],
            correct: 0
        },
        {
            question: "Vem designade den allra första tennis-strängningsmasinen 1922?",
            answers: ["Pierre Babolat", "Walter Merkel", "Henri Cochet", "René Lacoste"],
            correct: 1
        },
        {
            question: "Vilken organisation etablerade det första World Computer Rankings 1973?",
            answers: ["Commercial Union Assurance", "Pepsi-Cola", "Marlboro", "Volvo"],
            correct: 0
        },
        {
            question: "Vem var den första spelaren att använda 'spaghetti strings' i professionell tennis?",
            answers: ["Mike Fishbach", "Georges Goven", "Ilie Năstase", "Werner Fischer"],
            correct: 1
        },
        {
            question: "Vilken exakt vikt hade Rod Lavers racket under hans Grand Slam-år 1969?",
            answers: ["395 gram", "390 gram", "385 gram", "400 gram"],
            correct: 0
        },
        {
            question: "Vem var den första kvinnliga spillearen att använda metal racket i Wimbledon-final?",
            answers: ["Billie Jean King", "Chris Evert", "Virginia Wade", "Evonne Goolagong"],
            correct: 1
        },
        {
            question: "Vilken organisation skapade de första officiella tennisreglerna 1874?",
            answers: ["All England Club", "Marylebone Cricket Club", "Wimbledon Committee", "Lawn Tennis Association"],
            correct: 1
        },
        {
            question: "Vem var den första spillearen att tjäna över 1 miljon dollar på WCT-touren?",
            answers: ["John McEnroe", "Jimmy Connors", "Björn Borg", "Ivan Lendl"],
            correct: 2
        },
        {
            question: "Vilken exakt tid tog den kortaste Grand Slam-finalen i öppna eran?",
            answers: ["47 minuter", "49 minuter", "51 minuter", "53 minuter"],
            correct: 1
        },
        {
            question: "Vem var the första spillearen att vinna huvudtävlingen efter att ha gått igenom kvalificering på alla fyra Grand Slams?",
            answers: ["Vladimir Voltchkov", "Nicolas Escudé", "Nicolas Lapentti", "Alex Radulescu"],
            correct: 3
        },
        {
            question: "Vilken organisation finansierade den första professionella tennistouren för damer 1970?",
            answers: ["Virginia Slims", "Philip Morris", "Tobacco Sports", "World Tennis Magazine"],
            correct: 0
        },
        {
            question: "Vem var den första spillearen att använda Prince Graphite racketet 1980?",
            answers: ["Pam Shriver", "Gene Mayer", "Jose Luis Clerc", "Vitas Gerulaitis"],
            correct: 0
        },
        {
            question: "Vilken exakt diameter har en tennisboll enligt ITF-reglerna?",
            answers: ["6,35-6,67 cm", "6,30-6,70 cm", "6,25-6,75 cm", "6,40-6,60 cm"],
            correct: 0
        },
        {
            question: "Vem var den första spillearen att vinna WCT Finals tre gånger i rad?",
            answers: ["John McEnroe", "Björn Borg", "Jimmy Connors", "Ivan Lendl"],
            correct: 0
        },
        {
            question: "Vilken organisation skapade det första live-TV-sändningsmöjligheter för tennis 1979?",
            answers: ["CBS Sports", "NBC Sports", "ABC Sports", "ESPN"],
            correct: 3
        },
        {
            question: "Vem var den första spillearen att använda synthetiska strings professionellt?",
            answers: ["Rod Laver", "Ken Rosewall", "John Alexander", "Tony Roche"],
            correct: 2
        },
        {
            question: "Vilken exakt yta täcker en tennisbana inklusive körzoner?",
            answers: ["648 m²", "668 m²", "688 m²", "708 m²"],
            correct: 1
        },
        {
            question: "Vem grundade den första Independent Players Association 1972?",
            answers: ["Arthur Ashe", "Charlie Pasarell", "Donald Dell", "Jack Kramer"],
            correct: 2
        },
        {
            question: "Vilken organisation introducerade det första Challenger-systemet 1978?",
            answers: ["Men's International Professional Tennis Council", "ATP", "ITF", "Grand Prix"],
            correct: 0
        },
        {
            question: "Vem var den första spillearen att använda kevlar-strings?",
            answers: ["Stefan Edberg", "Michael Chang", "Alberto Berasategui", "Sergi Bruguera"],
            correct: 2
        },
        {
            question: "Vilken exakt hastighet hade den snabbaste kvinnliga servicen före Lisicki?",
            answers: ["209 km/h", "208 km/h", "207 km/h", "206 km/h"],
            correct: 1
        },
        {
            question: "Vem var den första spillearen att vinna over 50 Challenger-titlar?",
            answers: ["Guillermo Cañas", "Tommy Robredo", "Nicolas Mahut", "Ivo Karlovic"],
            correct: 2
        },
        {
            question: "Vilken organisation skapade det första computeriserade hawkeye-systemet?",
            answers: ["Paul Hawkins", "Roke Manor Research", "IBM", "Infosys"],
            correct: 1
        },
        {
            question: "Vem var den första spillearen att vinna över 1000 ATP-poäng i en enda turnering?",
            answers: ["Ilie Năstase", "Jimmy Connors", "Björn Borg", "John McEnroe"],
            correct: 0
        },
        {
            question: "Vilken exakt höjd hade det första tennis-nätet 1870 vid posterna?",
            answers: ["1,37 meter", "1,52 meter", "1,67 meter", "1,83 meter"],
            correct: 1
        },
        {
            question: "Vem var den första spillearen att använda natural gut strings med polyester hybrid?",
            answers: ["Carlos Moyá", "Gustavo Kuerten", "Patrick Rafter", "Lleyton Hewitt"],
            correct: 0
        },
        {
            question: "Vilken organisation finansierade det första Grand Prix-systemet 1970?",
            answers: ["Pepsi-Cola", "Commercial Union Assurance", "Marlboro", "Grand Prix Motors"],
            correct: 1
        },
        {
            question: "Vem var den första spillearen att vinna Davis Cup för fem olika länder som kapten?",
            answers: ["Neale Fraser", "Harry Hopman", "Niki Pilić", "Ilie Năstase"],
            correct: 1
        },
        {
            question: "Vilken exakt längd har en tennis racket grip enligt ITF maximumregler?",
            answers: ["32 cm", "35 cm", "37 cm", "40 cm"],
            correct: 2
        },
        {
            question: "Vem var den första spillearen att använda pre-stretching på natural gut strings?",
            answers: ["René Lacoste", "Henri Cochet", "Jean Borotra", "Jacques Brugnon"],
            correct: 0
        },
        {
            question: "Vilken organisation etablerade det första officiella disciplinära systemet för tennis 1975?",
            answers: ["Code of Conduct Committee", "Men's International Tennis Council", "Professional Tennis Integrity", "ATP Disciplinary"],
            correct: 1
        },
        {
            question: "Vem var den första spillearen att vinna over 200 ATP-matcher på fem olika underlag?",
            answers: ["Andre Agassi", "Roger Federer", "David Ferrer", "Tommy Haas"],
            correct: 1
        },
        {
            question: "Vilken exakt spänning hade standard gut strings på 1920-talet?",
            answers: ["45-50 pounds", "50-55 pounds", "55-60 pounds", "60-65 pounds"],
            correct: 2
        },
        {
            question: "Vem var den första spillearen att använda damping system på racket strings?",
            answers: ["René Lacoste", "Gottfried von Cramm", "Fred Perry", "Don Budge"],
            correct: 0
        },
        {
            question: "Vilken organisation skapade det första officiella ranking-systemet för juniorer 1977?",
            answers: ["ITF Junior Circuit", "Junior Tennis Foundation", "World Junior Tennis", "International Junior Rankings"],
            correct: 0
        },
        {
            question: "Vem var den första spillearen att vinna över 100 miljoner dollar enbart från prispengar?",
            answers: ["Novak Djokovic", "Roger Federer", "Rafael Nadal", "Andy Murray"],
            correct: 0
        },
        {
            question: "Vilken exakt yta täcker servicerutorna på en tennisbana tillsammans?",
            answers: ["195,04 m²", "185,04 m²", "175,04 m²", "165,04 m²"],
            correct: 0
        },
        {
            question: "Vem var den första spillearen att använda lead tape för racket-anpassning?",
            answers: ["Pancho Gonzales", "Ken Rosewall", "Lew Hoad", "Tony Trabert"],
            correct: 0
        },
        {
            question: "Vilken organisation introducerade det första Live Electronic Line Calling 2003?",
            answers: ["US Open", "Hawk-Eye Innovations", "USTA", "IBM"],
            correct: 1
        },
        {
            question: "Vem var den första spillearen att vinna över 300 weeks som världsetta i två olika epoker?",
            answers: ["Jimmy Connors", "Ivan Lendl", "Pete Sampras", "Roger Federer"],
            correct: 3
        },
        {
            question: "Vilken exakt tryckhöjd testas tennisbollar på enligt ITF-standard?",
            answers: ["1,219 meter", "1,524 meter", "1,829 meter", "2,134 meter"],
            correct: 1
        },
        {
            question: "Vem var den första spillearen att använda cross-court serve strategy systematiskt?",
            answers: ["Bill Tilden", "René Lacoste", "Henri Cochet", "Jean Borotra"],
            correct: 0
        },
        {
            question: "Vilken organisation skapade det första miljardollar-TV-kontraktet för tennis?",
            answers: ["ESPN", "NBC Sports", "CBS Sports", "ATP Media"],
            correct: 0
        },
        {
            question: "Vem var den första spillearen att vinna över 1000 tiebreaks i karriären?",
            answers: ["John McEnroe", "Jimmy Connors", "Ivan Lendl", "Roger Federer"],
            correct: 3
        },
        {
            question: "Vilken exakt densitet har en modern tennisboll enligt ITF-specifikationer?",
            answers: ["0,365-0,400 g/cm³", "0,355-0,390 g/cm³", "0,375-0,410 g/cm³", "0,385-0,420 g/cm³"],
            correct: 0
        },
        {
            question: "Vem var den första spillearen att designa sitt eget tennisracket från grunden?",
            answers: ["René Lacoste", "Bill Tilden", "Fred Perry", "Gottfried von Cramm"],
            correct: 0
        }
    ]
};

// Tiebreaker questions (guess year/number) - one random will be selected for each quiz
const tiebreakerQuestions = {
    easy: [
        {
            question: "Vilket år föddes Roger Federer?",
            answer: 1981,
            tolerance: 2,
            hint: "Tidigt 80-tal"
        },
        {
            question: "Hur många Grand Slam-titlar har Björn Borg vunnit totalt?",
            answer: 11,
            tolerance: 1,
            hint: "Mellan 10-12"
        },
        {
            question: "Vilket år vann Stefan Edberg sin första Wimbledon-titel?",
            answer: 1988,
            tolerance: 2,
            hint: "Sent 80-tal"
        },
        {
            question: "Hur många veckor var Pete Sampras nummer 1 i världen totalt?",
            answer: 286,
            tolerance: 10,
            hint: "Mellan 270-300"
        },
        {
            question: "Vilket år startade Davis Cup?",
            answer: 1900,
            tolerance: 5,
            hint: "Runt sekelskiftet 1900"
        },
        {
            question: "Hur många gånger har Sverige vunnit Davis Cup?",
            answer: 7,
            tolerance: 1,
            hint: "Mellan 5-8"
        },
        {
            question: "Vilket år föddes Serena Williams?",
            answer: 1981,
            tolerance: 2,
            hint: "Tidigt 80-tal"
        },
        {
            question: "Hur många matcher i rad vann Novak Djokovic 2011?",
            answer: 43,
            tolerance: 3,
            hint: "Mellan 40-45"
        },
        {
            question: "Vilket år infördes tie-break i tennis?",
            answer: 1970,
            tolerance: 3,
            hint: "Runt 1970"
        },
        {
            question: "Hur många ace slog John Isner i den längsta tennismatchen någonsin?",
            answer: 113,
            tolerance: 10,
            hint: "Mellan 100-125"
        }
    ],
    medium: [
        {
            question: "Vilket år vann Mats Wilander sitt första French Open?",
            answer: 1982,
            tolerance: 2,
            hint: "Tidigt 80-tal"
        },
        {
            question: "Hur många poäng får man för att vinna en Challenger-turnering?",
            answer: 125,
            tolerance: 10,
            hint: "Mellan 100-150"
        },
        {
            question: "Vilket år introducerades Hawk-Eye officiellt i tennis?",
            answer: 2006,
            tolerance: 2,
            hint: "Mitten av 2000-talet"
        },
        {
            question: "Hur många km/h var Andy Roddicks snabbaste serve?",
            answer: 249,
            tolerance: 5,
            hint: "Runt 250 km/h"
        },
        {
            question: "Vilket år vann Robin Söderling sin första ATP-titel?",
            answer: 2004,
            tolerance: 2,
            hint: "Tidigt 2000-tal"
        },
        {
            question: "Hur många ATP-titlar vann Thomas Johansson totalt?",
            answer: 9,
            tolerance: 1,
            hint: "Mellan 8-10"
        },
        {
            question: "Vilket år började Magnus Norman sin proffskarriär?",
            answer: 1991,
            tolerance: 2,
            hint: "Tidigt 90-tal"
        },
        {
            question: "Hur många veckor var Ivan Lendl nummer 1 i världen?",
            answer: 270,
            tolerance: 10,
            hint: "Mellan 260-280"
        },
        {
            question: "Vilket år vann Steffi Graf Golden Slam?",
            answer: 1988,
            tolerance: 1,
            hint: "Sent 80-tal"
        },
        {
            question: "Hur många ATP-titlar har Lleyton Hewitt vunnit?",
            answer: 30,
            tolerance: 2,
            hint: "Runt 30"
        }
    ],
    hard: [
        {
            question: "Vilket år vann Ken Rosewall sin sista Grand Slam-titel?",
            answer: 1972,
            tolerance: 2,
            hint: "Tidigt 70-tal"
        },
        {
            question: "Hur många dubbeltitlar vann Jonas Björkman totalt i Grand Slam?",
            answer: 9,
            tolerance: 1,
            hint: "Mellan 8-10"
        },
        {
            question: "Vilket år rankades Thomas Muster som nummer 1 första gången?",
            answer: 1996,
            tolerance: 1,
            hint: "Mitten av 90-talet"
        },
        {
            question: "Hur många game vann Vicki Nelson mot Jean Hepner i deras 6 timmar långa match 1984?",
            answer: 643,
            tolerance: 20,
            hint: "Mellan 620-660"
        },
        {
            question: "Vilket år vann Yannick Noah French Open?",
            answer: 1983,
            tolerance: 2,
            hint: "Tidigt 80-tal"
        },
        {
            question: "Hur många titlar vann Jimmy Connors totalt i sin karriär?",
            answer: 109,
            tolerance: 3,
            hint: "Mellan 105-112"
        },
        {
            question: "Vilket år spelade Arthur Ashe sin sista professionella match?",
            answer: 1980,
            tolerance: 2,
            hint: "Runt 1980"
        },
        {
            question: "Hur många procent av sina första serve-poäng vann Michael Chang i karriären?",
            answer: 75,
            tolerance: 3,
            hint: "Mellan 72-78%"
        },
        {
            question: "Vilket år vann Boris Becker Wimbledon som 17-åring?",
            answer: 1985,
            tolerance: 1,
            hint: "Mitten av 80-talet"
        },
        {
            question: "Hur många ATP-poäng hade Marcelo Ríos när han blev nummer 1?",
            answer: 5785,
            tolerance: 100,
            hint: "Mellan 5600-5900"
        }
    ],
    expert: [
        {
            question: "Vilket år vann René Lacoste sin första Wimbledon-titel?",
            answer: 1925,
            tolerance: 2,
            hint: "Mitten av 20-talet"
        },
        {
            question: "Hur många game spelades i den längsta setet någonsin (Isner-Mahut)?",
            answer: 138,
            tolerance: 5,
            hint: "Mellan 130-145"
        },
        {
            question: "Vilket år grundades International Tennis Federation (ITF)?",
            answer: 1913,
            tolerance: 3,
            hint: "Strax före första världskriget"
        },
        {
            question: "Hur många minuter varade den kortaste Grand Slam-finalen någonsin (Trabert-Rosewall)?",
            answer: 58,
            tolerance: 3,
            hint: "Under en timme"
        },
        {
            question: "Vilket år infördes Open Era i tennis?",
            answer: 1968,
            tolerance: 1,
            hint: "Sent 60-tal"
        },
        {
            question: "Hur många procent av alla poäng vann John McEnroe i sin karriär?",
            answer: 54.8,
            tolerance: 1,
            hint: "Mellan 53-56%"
        },
        {
            question: "Vilket år dog Arthur Ashe?",
            answer: 1993,
            tolerance: 1,
            hint: "Tidigt 90-tal"
        },
        {
            question: "Hur många rankingpoäng krävdes för att vara topp-100 1990?",
            answer: 372,
            tolerance: 20,
            hint: "Mellan 350-400"
        },
        {
            question: "Vilket år vann Rod Laver sin andra Grand Slam?",
            answer: 1969,
            tolerance: 1,
            hint: "Året efter Open Era började"
        },
        {
            question: "Hur många matcher spelade Guillermo Vilas under sin 46-matchers vinstsvit 1977?",
            answer: 46,
            tolerance: 0,
            hint: "Exakt antal i vinstsviten"
        }
    ]
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questionsDB, tiebreakerQuestions };
} 