![GitHub Repo stars](https://img.shields.io/github/stars/pikachub2005/replapi-it?style=plastic) ![Github commits](https://shields.io/github/commit-activity/m/pikachub2005/replapi-it?style=plastic) ![Github issues](https://shields.io/github/issues/pikachub2005/replapi-it?style=plastic) ![npm](https://shields.io/npm/dw/replapi-it?label=npm%20downloads&style=plastic)

---
> This project is a **work in progress**. The API may change at any time.
---
From https://replit.com/site/terms, section 5 line 13: Launching any automated system that accesses the Service in a manner that sends more request messages to the Replit servers in a given period of time than a human can reasonably produce in the same period by using a conventional online web browser is prohibited.

## Install
```sh
npm install replapi-it
```
## Usage

### Main API
```js
const Client = require("replapi-it");
const client = new Client("token");

client.on("ready", async () => {
	
})
```

### Options
* token: A `connect.sid` cookie from Replit.

### Example
Gets the title of a user's most recent repl
```js
const Client = require("replapi-it");
const client = new Client("token");

client.on("ready", async () => {
	let user = await client.users.fetch("PikachuB2005");
	let repls = await user.repls.fetch();
	console.log(repls.first().title);
})
```

#### Client
* `<Client>.user`: returns the logged in user as a [`<ClientUser>`](#ClientUser) object
* `<Client>.repl`: returns a [`Repl`](#Repl) object of the current repl, if any
* `<Client>.repls`: returns a [`<ReplManager>`](#ReplManager) object
* `<Client>.users`: returns a [`<UserManager>`](#UserManager) object
* `<Client>.posts`: returns a [`<PostManager>`](#PostManager) object

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
* `<User>.<ReplManager>.fetch(count = 50)`: fetches `count` amount of repls from the user and returns the cache
* `<Client>.<ReplManager>.create(title, language)`: creates a new repl and returns the [`<Repl>`](#Repl) object

#### UserManager
* `<UserManager>.cache`: returns a [`<Collection>`](#Collection) of [`<User>`](#User) objects
* `<UserManager>.fetch(username, force = false)`: returns a [`<User>`](#User) object. `force` determines whether or not to check the cache

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
* `<User>.posts`: returns a [`<PostManager>`](#PostManager) object

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
* `<Repl>.updateInfo(title, description)`: updates repl info
* `<Repl>.fork()`: forks the repl. Returns a [`<Repl>`](#Repl) object
  
These require you to do `<Repl>.connect()` before usage
* `<Repl>.env`: an object containing the repl's environment variables
* `<Repl>.db`: A replit database object, if available

#### FileManager
Requires you to do `<Repl>.connect()`
* `<FileManger>.snapshot()`: if not persisting, updates the files
* `<FileManger>.read(path, encoding = "utf8)"`: reads a file
* `<FileManger>.write(path, content)`: writes to a file
* `<FileManger>.readdir(path)`: returns a list of files in a directory
* `<FileManger>.delete(path)`: deletes a file or directory
* `<FileManger>.mkdir(path)`: creates a directory
* `<FileManger>.move(oldPath, newPath)`: move a file or directory

#### PostManager
* `<PostManager>.cache`: returns a [`<Collection>`](#Collection) of [`<Post>`](#Post) objects
* `<PostManager>.fetch(id)`: returns a [`<Post>`](#Post) object

#### Post
* `<Post>.id`: the post's id;
* `<Post>.title`: the post's title
* `<Post>.body`: the post's body
* `<Post>.voteCount`: the post's vote count
* `<Post>.commentCount`: the post's comment count
* `<Post>.timeCreated`: when the post was created
* `<Post>.timeUpdated`: when the post was last updated
* `<Post>.url`: the post's url
* `<Post>.user`: returns a [`<User>`](#User) object of the user who made the post
* `<Post>.board`: returns a [`<Board>`](#Board) object
* `<Post>.repl`: returns a [`<Repl>`](#Repl) object
* `<Post>.voters`: returns a list of usernames of users who voted on the post
* `<Post>.isAnnouncement`: is the post an announcement
* `<Post>.isAuthor`: are you the author of the post
* `<Post>.canEdit`: can you edit the post
* `<Post>.canComment`: can you comment on the post
* `<Post>.canVote`: can you vote on the post
* `<Post>.canPin`: can you pin the post
* `<Post>.canSetType`: can you set the type of the post
* `<Post>.canChangeBoard`: can you change the board of the post
* `<Post>.canLock`: can you lock the post
* `<Post>.hasVoted`: did you vote on the post
* `<Post>.canReport`: can you report the post
* `<Post>.hasReported`: have you already reported the post
* `<Post>.isAnswered`: is the post answered
* `<Post>.isAnswerable`: can the post be answered
* `<Post>.answeredBy`: returns a [`<User>`](#User) object

#### Board
* `<Board>.id`: the board's id
* `<Board>.name`: the board's name
* `<Board>.description`: the board's description
* `<Board>.slug`: the board's slug
* `<Board>.cta`: the board's cta
* `<Board>.titleCta`: the board title's cta
* `<Board>.bodyCta`: the board body's cta
* `<Board>.template`: the board's template
* `<Board>.buttonCta`: the board button's cta
* `<Board>.color`: the board's hexadecimal color
* `<Board>.replRequired`: is a repl required to post on the board
* `<Board>.isLocked`: if the board is locked
* `<Board>.isAnswerable`: if the board is answerable
* `<Board>.isPrivate`: if the board is private
* `<Board>.timeCreated`: the time the board was created
* `<Board>.timeUpdated`: the time the board was last updated
* `<Board>.url`: the board's url
* `<Board>.canPost`: if you can post to the board 

#### CommentManager
* `<CommentManager>.cache`: returns a [`<Collection>`](#Collection) of [`<Comment>`](#Comment) objects
* `<CommentManager>.user`: returns a [`<User>`](#User) object

#### Comment
* `<Comment>.id`: the comment's id
* `<Comment>.body`: the comment's body
* `<Comment>.voteCount`: the comment's vote count
* `<Comment>.timeCreated`: the time the comment was created
* `<Comment>.timeUpdated`: the time the comment was updated
* `<Comment>.user`: returns a [`<User>`](#User) object
* `<Comment>.url`: the comment's url
* `<Comment>.post`: returns a [`<Post>`](#Post) object
* `<Comment>.parentComment`: returns a [`<Comment>`](#Comment) object
* `<Comment>.isAuthor`: if you're the author is the comment
* `<Comment>.canEdit`: if you can edit the comment
* `<Comment>.canVote`: if you can vote on the comment
* `<Comment>.canComment`: if you can comment on the comment
* `<Comment>.hasVoted`: if you have voted on the comment
* `<Comment>.canReport`: if you can report the comment
* `<Comment>.hasReported`: if you have reported the comment
* `<Comment>.isAnswer`: if the comment is an answer
* `<Comment>.canSelectAsAnswer`: if you can select the comment as the answer
* `<Comment>.canUnselectAsAnswer`: if you can unselect the comment as the answer

#### Console
Requires you to do `<Repl>.connect()`
* `<Console>.send(input)`: Sends string to console
* `<Console>.run()`: Runs the repl
* `<Console>.stop()`: Stops the repl
* `<Console>.on("input", fn)`: event handler for console input