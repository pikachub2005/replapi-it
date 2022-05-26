![GitHub forks](https://img.shields.io/github/forks/pikachub2005/pika-replitclient?style=plastic) ![GitHub Repo stars](https://img.shields.io/github/stars/pikachub2005/pika-replitclient?style=plastic) ![GitHub watchers](https://img.shields.io/github/watchers/pikachub2005/pika-replitclient?style=plastic) ![Github commits](https://shields.io/github/commit-activity/m/pikachub2005/pika-replitclient?style=plastic) ![Github issues](https://shields.io/github/issues/pikachub2005/pika-replitclient?style=plastic) ![Github repo size](https://shields.io/github/repo-size/pikachub2005/pika-replitclient?style=plastic)

---
> This project is a **work in progress**. The API may change at any time.
---
From https://replit.com/site/terms, section 5 line 13: Launching any automated system that accesses the Service in a manner that sends more request messages to the Replit servers in a given period of time than a human can reasonably produce in the same period by using a conventional online web browser is prohibited.

## Install
```sh
npm install pika-replitcient
```
## Usage

### Main API
```js
const Client = require("pika-replitclient");
const client = new Client("token");

client.on("ready", async () => {
	
})
```

### Options
* token: A `connect.sid` cookie from Replit.

### Example
Gets the title of a user's most recent repl
```js
const Client = require("pika-replitclient");
const client = new Client("token");

client.on("ready", async () => {
	let user = await client.users.fetch("PikachuB2005");
	let repls = await user.repls.fetch();
	console.log(repls.first().title);
})
```

#### Client
* `<Client>.user`: returns the logged in user as a [`<ClientUser>`](#ClientUser) object
* `<Client>.repls`: returns a [`<ReplManager>`](#ReplManager)
* `<Client>.users`: returns a [`<UserManager>`](#UserManager)

#### ClientUser
Also includes properties and methods from [`<User>`](#User)
* `<ClientUser>.email`: your email
* `<ClientUser>.state`: an object containing your skill level and interests
* `<ClientUser>.device`: your device
* `<ClientUser>.notificationCount`: how many notifications you have
* `<ClientUser>.dashboard`: returns a [`<DashboardManager>`](#DashboardManager);

#### ReplManager
* `<ReplManager>.cache`: returns a [`<Collection>`](#Collection) of [`<Repl>`](#Repl) objects
* `<ReplManager>.user`: the [`<User>`](#User) object the manager belongs to, if any
* `<Client>.<ReplManager>.fetch(id)`: returns a [`<Repl>`](#Repl) object
* `<User>.<ReplManager>.fetch(count)`: fetches `count` amount of repls from the user and returns the cache
* `<Client>.<ReplManager>.create(title, language)`: creates a new repl and returns the [`<Repl>`](#Repl) object

#### UserManager
* `<UserManager>.cache`: returns a [`<Collection>`](#Collection) of [`<User>`](#User) objects
* `<UserManager>.fetch(username, force)`: returns a [`<User>`](#User) object. `force` determines whether or not to check the cache

#### User
* `<User>.repls`: returns a  [`<ReplManager>`](#ReplManager) object
* `<User>.id`: the user's id
* `<User>.username`: the user's username
* `<User>.firstName`: the user's first name
* `<User>.lastName`: the user's last name
* `<User>.bio`: the user's bio
* `<User>.isVerified`: whether or not the user is verified
* `<User>.displayname`: the user's display name
* `<User>.fullName`: the user's full name
* `<User>.url`: the user's url
* `<User>.roles`: a listof the user's roles
* `<User>.isLoggedIn`: whether or not the user is logged in
* `<User>.timeCreated`: when the user's account was created
* `<User>.karma`: how many cycles the user has
* `<User>.isHacker`: whether or no the user is a hacker (has hacker plan)
* `<User>.languages`: a list of languages the user has used
* `<User>.image`: the url to the user's profile picture

#### DashboardManager
(WIP)
* `<DashboardManager>.create(name)`: creates a new folder
* `<DashboardManager>.delete(id)`: deletes a folder

#### Collection
A Map object with extra methods. Meant to be like [discord.js's Collection](https://discord.js.org/#/docs/collection/main/class/Collection)

#### Repl
* `<Repl>.id`: the repl's id
* `<Repl>.title`: the repl's title
* `<Repl>.slug`: the repl's slug
* `<Repl>.description`: the repl's description
* `<Repl>.isRenamed`: whether or not the replis renamed
* `<Repl>.user`: returns a [`<User>`](#User) object of the owner of the repl
* `<Repl>.language`: the language the repl is in
* `<Repl>.url`: the url of the repl
* `<Repl>.timeCreated`: when the repl was created
* `<Repl>.timeUpdated`: when the repl was last updated
* `<Repl>.hostedUrl`: the url the replis hosted at
* `<Repl>.files`: returns a [`<FileManager>`](#FileManager) object
* `<Repl>.connect(persist = false)`: connects to the repl. Necessary to use `<Repl>.files`. Persist updates the files as they are changed

#### FileManager
Requires you to do `<Repl>.connect()`
* `<FileManger>.snapshot()`: if not persisting, updates the files
* `<FileManger>.read(path, encoding = "utf8)"`: reads a file
* `<FileManger>.write(path, content)`: writes to a file
* `<FileManger>.readdir(path)`: returns a list of files in a directory
* `<FileManger>.delete(path)`: deletes a file or directory
* `<FileManger>.mkdir(path)`: creates a directory
* `<FileManger>.move(oldPath, newPath)`: move a file or directory   