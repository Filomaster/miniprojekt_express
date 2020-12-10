//#region Page template
let renderPage = (content, link_id) => {
  return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="styles/style.css">
        <title>Admin</title>
    </head>

    <body>
        <div id="navbar" class="navbar">
            <a href="/main">Main</a>
            <a class="active" href="/admin">Admin</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            <a href="/logout">Logout</a>
        </div>
        <div class="adminNav">
            <a ${link_id == 0 ? `class="active"` : ""}href="/show">show</a>
            <a ${link_id == 1 ? `class="active"` : ""}href="/gender">gender</a>
            <a ${link_id == 2 ? `class="active"` : ""}href="/sort">sort</a>
        </div>
        <div id="content">
            <div class="formContainer">${content}</div>
        </div>
    </body>

    </html>
`;
};

//#endregion
let users = [
  {
    login: "admin",
    password: "admin",
    age: 30,
    student: "no",
    gender: "m",
    id: 1,
  },
  {
    login: "AAA",
    password: "AAA",
    age: 11,
    student: "yes",
    gender: "k",
    id: 2,
  },
  { login: "BBB", password: "BBB", age: 14, student: "no", gender: "m", id: 3 },
  {
    login: "CCC",
    password: "CCC",
    age: 15,
    student: "yes",
    gender: "k",
    id: 4,
  },
  {
    login: "aaa",
    password: "aaa",
    age: 10,
    student: "yes",
    gender: "m",
    id: 5,
  },
];

let logged = false;
let isAsc = true;

module.exports.getAsc = () => {
  return isAsc;
};

module.exports.validateLogin = (login) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].login == login.login) {
      if (users[i].password == login.password) {
        logged = true;
        return true;
      }
    }
  }
  return false;
};

module.exports.getLogin = () => {
  return logged;
};
module.exports.setLogin = (isLogged) => {
  logged = isLogged;
};

module.exports.getNextId = () => {
  return users[users.length - 1].id + 1;
};

module.exports.getShow = () => {
  let content = "<table>";
  users.forEach((user) => {
    content += `<tr class="${user.id % 2 == 0 ? "even" : "odd"}">
                    <td style="width: 3em" >id:&Tab;${user.id} </td>
                    <td style="width: 10em">user:&Tab;${user.login}&Tab;-&Tab;${
      user.password
    }</td>
                    <td style="width: 3em"><label for="student">Uczeń: </label><input type="checkbox" ${
                      user.student == "yes" ? "checked" : ""
                    } onclick="return false;" id="student"/></td>
                    <td style="width: 4em">wiek:&Tab;${user.age}</td>
                    <td style="width: 4em">płeć:&Tab;${user.gender}</td>
                </tr>`;
  });
  return renderPage(content + "</table>", 0);
};

module.exports.getSort = () => {
  let content = `
  <form method="POST" onchange="this.submit()">
  <input type="radio" id="asc" name="asc" value="asc" > </input>
  <input type="radio" id="dsc" name="asc" value="dsc" > malejąco </input>
  </form>
  <table>`;
  users
    .sort((a, b) => {
      if (!this.getAsc()) return a.age - b.age;
      else return b.age - a.age;
    })
    .forEach((user) => {
      content += `<tr class="${user.id % 2 == 0 ? "even" : "odd"}">
                    <td style="width: 3em" >id:&Tab;${user.id} </td>
                    <td style="width: 10em">user:&Tab;${user.login}&Tab;-&Tab;${
        user.password
      }</td>
                    <td style="width: 4em">wiek:&Tab;${user.age}</td>
                </tr>`;
    });
  return renderPage(content + "</table>", 2);
};
module.exports.getGender = () => {
  let content = "<table>";
  let males = [];
  let females = [];

  users.forEach((user) => {
    if (user.gender == "m") males.push(user);
    else females.push(user);
  });

  females.forEach((user) => {
    content += `<tr class="${user.id % 2 == 0 ? "even" : "odd"}">
                    <td style="width: 3em" >id:&Tab;${
                      user.id
                    } </td>                    
                    <td style="width: 4em">płeć:&Tab;${user.gender}</td>
                </tr>`;
  });
  content += "</table><table>";
  males.forEach((user) => {
    content += `<tr class="${user.id % 2 == 0 ? "even" : "odd"}">
                    <td style="width: 3em" >id:&Tab;${
                      user.id
                    } </td>                    
                    <td style="width: 4em">płeć:&Tab;${user.gender}</td>
                </tr>`;
  });
  return renderPage(content + "</table>", 1);
};

module.exports.setAsc = (value) => {
  isAsc = value;
};

module.exports.users = users;
module.exports.isAsc = isAsc;
