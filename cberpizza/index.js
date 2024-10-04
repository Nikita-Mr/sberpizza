let express = require(`express`);
let app = express();
let port = 3000;

app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});

let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.static(`public`));
app.use(express.json());

let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pizza');

let pizzaSchema = new mongoose.Schema({
  title: String,
  price: Number,
  descr: String,
  rating: Number
});
let Pizza = new mongoose.model(`pizza`, pizzaSchema);

let usersSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  money: Number,
  img: String,
  pizza: Array,
});
let historySchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: `user`,
  },
  historys: [
    {
      history: Array,
      price: Number,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
let History = new mongoose.model(`history`, historySchema);
let User = new mongoose.model(`user`, usersSchema);

let curent_user = '6494900a526c8e217d83f622';

function curentUs(){
  app.get(`/registerTrue`, function(reg, res){
    res.send(curent_user)
  })
}

app.get(`/exit`, async function(req,res){
  let isExit = req.query.isExit
  if(isExit){
    curent_user = ``
    await curentUs()
  }
})

app.post(`/register`, async function (req, res) {
  let { name, phone } = req.body;
  let user = new User({
    name: name,
    phone: phone,
    money: Math.floor(Math.random() * 10000),
    img: 'notPhoto',
    pizza: [],
  });


  try {
    await curentUs()
    curent_user = user._id;
    history = new History({
      user: curent_user,
      historys: [],
    });
    await history.save();
    await user.save();
  } catch (err) {
    res.send(err);
  }
});

app.get(`/pizza`, async function (req, res) {
  let pizza = await Pizza.find().sort({rating: -1});
  res.send(pizza);
});

app.get(`/profile`, async function (req, res) {
  let user = await User.findOne({ _id: curent_user });

  if (!user) {
    res.send(`Зарегистрируйтесь`);
  }
  res.send(user);
});

app.get(`/in-basket`, async function (req, res) {
  let { id } = req.query;
  let user = await User.findOne({ _id: curent_user });
  if (!user) {
    res.send(`Зарегистрируйтесь`);
  }
  user.pizza.push(id);

  try {
    await user.save();
    res.sendStatus(200);
    console.log(user);
  } catch (err) {
    res.sendStatus(412);
  }
});

app.get(`/basket`, async function (req, res) {
  let user = await User.findOne({ _id: curent_user });
  if (!user) {
    res.send(`Зарегистрируйтесь`);
  }
  let pizzaArray = [];
  for (let i = 0; i < user.pizza.length; i++) {
    const pizzaId = user.pizza[i];
    let pizza = await Pizza.findOne({ _id: pizzaId });
    pizzaArray.push(pizza);
  }
  try {
    res.send(pizzaArray);
  } catch (err) {
    res.send(err);
  }
});

app.get(`/remove`, async function (req, res) {
  let { id } = req.query;
  //let pizza = await Pizza.findOne({ _id: id });
  let user = await User.findOne({ _id: curent_user });
  if (!user) {
    res.send(`Зарегистрируйтесь`);
  }
  user.pizza.splice(id, 1);
  res.send(user.pizza);
  await user.save();

  //console.log(user.pizza);
});

app.get(`/buy`, async function (req, res) {
  let {isBuy, price} = req.query;
  let user = await User.findOne({ _id: curent_user });
  let history = await History.findOne({ user: curent_user });
  let pizzaArray = [];
  for (let i = 0; i < user.pizza.length; i++) {
    const pizzaId = user.pizza[i];
    let pizza = await Pizza.findOne({ _id: pizzaId });
    pizza.rating++
    await pizza.save()
    pizzaArray.push(pizza);
  }
  if (isBuy) {
    history.historys.unshift({
      history: pizzaArray,
      price: price,
      createdAt: new Date(),
    });
  }
  try {
    user.pizza = []
    user.money -= price
    await user.save()
    await history.save();
    res.send(history.historys);
  } catch (err) {
    res.send(err);
  }
});

app.get(`/history`, async function (req, res) {
  let history = await History.findOne({ user: curent_user });
  try {
    res.send(history);
  } catch (err) {
    res.send(err);
  }
});
