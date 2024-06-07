import Datastore from 'nedb';

const dbMenu = new Datastore({ filename: './db/dbmenu.db', autoload: true });

// Funktion för att infoga menyer i databasen
export function insertMenu(callback) {
    dbMenu.insert(menu, callback);
}

/*
// Funktion för att lägga till ett nytt objekt till menyn
export function addToMenu(newMenuItem, callback) {
    dbMenu.insert(newMenuItem, callback);
}

// Funktion för att hämta alla objekt från menyn
export function getMenu(callback) {
    dbMenu.find({}, callback);
}

// Funktion för att uppdatera ett befintligt objekt i menyn
export function updateMenuItem(itemId, updatedFields, callback) {
    dbMenu.update({ _id: itemId }, { $set: updatedFields }, {}, callback);
}

// Funktion för att uppdatera ett befintligt objekt i menyn
export function deleteMenuItem(itemId, callback) {
    dbMenu.remove({ _id: itemId }, {}, callback);
}
*/

const menu = [
    {
        "id": 1,
        "title": "Bryggkaffe",
        "desc": "Bryggd på månadens bönor.",
        "price": 39,
        "about": "Välkommen till kafferosteri Power Nappers - en passionerad bryggning av tradition och innovation. Vi är en familjeägd verksamhet dedikerad till att erbjuda kaffe av högsta kvalitet, från böna till kopp. Genom noggrant utvalda kaffebönor från de bästa odlingarna runt om i världen och en expertis i rostning som sträcker sig över generationer, skapar vi unika smakupplevelser som tillfredsställer alla sinnen. Njut av vår bryggkaffe, en klassisk och smakrik dryck tillagad med omsorgsfullt utvalda kaffebönor och bryggad till perfektion för att locka fram dess naturliga smaker och aromer. En välbalanserad kopp kaffe som är redo att förgylla din dag."
    },
    {
        "id": 2,
        "title": "Caffè Doppio",
        "desc": "Bryggd på månadens bönor.",
        "price": 49,
        "about": "Välkommen till kafferosteri Power Nappers - en passionerad bryggning av tradition och innovation. Vi är en familjeägd verksamhet dedikerad till att erbjuda kaffe av högsta kvalitet, från böna till kopp. Genom noggrant utvalda kaffebönor från de bästa odlingarna runt om i världen och en expertis i rostning som sträcker sig över generationer, skapar vi unika smakupplevelser som tillfredsställer alla sinnen. Upplev intensiteten i vår doppio - en dubbel espresso som erbjuder en kraftfull och koncentrerad smakupplevelse. Perfekt för de som söker en extra kick av koffein eller vill njuta av den djupa komplexiteten i kaffets essens."
    },
    {
        "id": 3,
        "title": "Cappuccino",
        "desc": "Bryggd på månadens bönor.",
        "price": 49,
        "about": "Välkommen till kafferosteri Power Nappers - en passionerad bryggning av tradition och innovation. Vi är en familjeägd verksamhet dedikerad till att erbjuda kaffe av högsta kvalitet, från böna till kopp. Genom noggrant utvalda kaffebönor från de bästa odlingarna runt om i världen och en expertis i rostning som sträcker sig över generationer, skapar vi unika smakupplevelser som tillfredsställer alla sinnen. Upptäck harmonin mellan espresso och krämig ånga i vår cappuccino. Med sin perfekta balans mellan stark espresso, mjölk och krämigt skum erbjuder denna klassiska italienska dryck en lyxig och smakrik upplevelse som är oemotståndlig för alla sinnen."
    },
    {
        "id": 4,
        "title": "Latte Macchiato",
        "desc": "Bryggd på månadens bönor.",
        "price": 49,
        "about": "Välkommen till kafferosteri Power Nappers - en passionerad bryggning av tradition och innovation. Vi är en familjeägd verksamhet dedikerad till att erbjuda kaffe av högsta kvalitet, från böna till kopp. Genom noggrant utvalda kaffebönor från de bästa odlingarna runt om i världen och en expertis i rostning som sträcker sig över generationer, skapar vi unika smakupplevelser som tillfredsställer alla sinnen. Utforska elegansen i vår latte macchiato - en konstnärlig skapelse av varm mjölk och en välbalanserad espresso, vars lager av mjölk och kaffe skapar ett vackert konstverk i din kopp. Upplev en mild och krämig smak med en subtil touch av espresso, perfekt för att njuta av lugnet i en stund för dig själv."
    },
    {
        "id": 5,
        "title": "Kaffe Latte",
        "desc": "Bryggd på månadens bönor.",
        "price": 54,
        "about": "Välkommen till kafferosteri Power Nappers - en passionerad bryggning av tradition och innovation. Vi är en familjeägd verksamhet dedikerad till att erbjuda kaffe av högsta kvalitet, från böna till kopp. Genom noggrant utvalda kaffebönor från de bästa odlingarna runt om i världen och en expertis i rostning som sträcker sig över generationer, skapar vi unika smakupplevelser som tillfredsställer alla sinnen. Njut av en smidig och förförisk upplevelse med vår kaffe latte. En harmonisk kombination av krämig ånga mjölk och intensiv espresso, vars smak dansar perfekt balanserat på din tunga. Upplev kaffets elegans på sitt bästa sätt."
    },
    {
        "id": 6,
        "title": "Cortado",
        "desc": "Bryggd på månadens bönor.",
        "price": 39,
        "about": "Välkommen till kafferosteri Power Nappers - en passionerad bryggning av tradition och innovation. Vi är en familjeägd verksamhet dedikerad till att erbjuda kaffe av högsta kvalitet, från böna till kopp. Genom noggrant utvalda kaffebönor från de bästa odlingarna runt om i världen och en expertis i rostning som sträcker sig över generationer, skapar vi unika smakupplevelser som tillfredsställer alla sinnen. Upplev koncentrationen av kaffe i sin renaste form med vår cortado. En harmonisk kombination av espresso och ånga mjölk, vars delikata balans av styrka och lenhet ger en njutbar kaffepaus. För den som söker en elegant och kraftfull smakupplevelse."
    }
]

