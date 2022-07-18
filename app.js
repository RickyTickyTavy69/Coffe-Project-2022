let express = require('express');
let exphbs = require('express-handlebars');
const config = require('config');           // модуль позволяет сохранять разные нужные переменные в папке config в json файле.
let mongoose = require('mongoose');
let path = require('path');

//============================================================//
let session = require('express-session');
let MongoStore = require('connect-mongodb-session')(session);
//============================================================//

const User = require('./models/userModel');
const Menu = require('./models/menuModel');

//===============================================================//
let signUpRoutes = require('./routes/signUp');
let signedRoutes = require('./routes/signed').router;
let codeRoutes = require('./routes/code');
let loginRoutes = require('./routes/login');
let varMiddleware = require('./middleware/variables');
let logoutRoutes = require('./routes/logout');
//=================================================================//

//===========================================================//
let homeRoutes = require('./routes/home');
let ordersRoutes = require('./routes/orders');
//============================================================//

let cardRoutes = require('./routes/card');
let showCardRoutes = require('./routes/showCard');

//=============================================//

let app = express();

const PORT = config.get('port');

let port = process.env.PORT || PORT || 3000;

let mongoURL = 'mongodb://Artem:hailtotheking666@cluster0-shard-00-00.cqwfy.mongodb.net:27017,cluster0-shard-00-01.cqwfy.mongodb.net:27017,cluster0-shard-00-02.cqwfy.mongodb.net:27017/COFFEEWEBSITE?ssl=true&replicaSet=atlas-ojmnnw-shard-0&authSource=admin&retryWrites=true&w=majority';

const store = new MongoStore({
    collection: 'sessions',                               // название коллекции, которая будет добавляться в MongoDB.
    uri: mongoURL
})

//===================================================// подключение к базе данных


async function start() {
  try{
    await mongoose.connect(mongoURL, 
      {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        
      });
      let findMenu = await Menu.findOne();                            // создаёт меню на основе menuModel.js
      if(!findMenu){
        let menu = new Menu;
        menu.addAllItems();
      }

      
      

    app.listen(port, () => console.log(`the server is working on port ${port}`));                     // сервер запускается только после подключения к бд.
  } catch (e) {                                                                                 ////не уверен, нужент ли здесь await Но владилен так показал
      console.log('Server Error', e.message);
      process.exit(1);                                                                          // не знаю точно, что это
  }
}

start();



const hbs = exphbs.create({
    deafultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,                                  // без этого возникала ошибка при обработке объекта из базы данных.
      allowProtoMethodsByDefault: true
    }
})

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
                                                                        
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

//настройка сессии.   Теперь сессия всегда будет находится в req, так как эта функция её туда добавляет.

app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store                             // вообще store: store, но так как значение и свойство одинаковые, можно избавиться от значения.
}));

app.use(varMiddleware);



//==============================================================================================================================//

app.use('/', homeRoutes);

app.use('/signUp', signUpRoutes);

app.use('/signed', signedRoutes);

app.use('/code', codeRoutes);

app.use('/login', loginRoutes);

app.use('/myCard', cardRoutes);

app.use('/orders', ordersRoutes);

app.use('/showCard', showCardRoutes);

app.use('/logout', logoutRoutes);


//=============================================//


