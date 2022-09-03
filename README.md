> ___
> Replit's API is constantly changing, which means this will as well. I will try to keep it easy to use but be aware that your project may stop working at any point.
> ___

## Install
```sh
npm install replapi-it
```
## Usage
### Main API
```js
const Client = require('replapi-it');
//A Replit connect.sid cookie
const client = new Client('SID');

client.on('ready', () => {
	
})
```
If you don't know how to find your connect.sid cookie, look [here](https://replit.com/talk/learn/How-to-Get-Your-SID-Cookie/145979)

### Example
Logs the number of followers a user has
```js
const Client = require('replapi-it');
const client = new Client('SID');

client.on('ready', async () => {
	let user = await client.users.fetch('PikachuB2005');
	console.log(user.followerCount);
})
```
#### Client
* `<Client>.user`: a [`CurrentUser`](#CurrentUser) object of the logged in user
* `<Client>.repl`: a [`Repl`](#Repl) object of the current repl, if any
* `<Client>.users`: a [`UserManager`](#UserManager) object
* `<Client>.repls`: a [`ReplManager`](#ReplManager) object
* `<Client>.posts`: a [`PostManager`](#PostManager) object
* `<Client>.comments`: a [`CommentManager`](#CommentManager) object
* `<Client>.on('notification', callback)`: notifications event listener
		* `callback`: a callback function

#### User
* `<User>.repls`: a [`ReplManager`](#ReplManager) object
* `<User>.followers`: a [`FollowerManager`](#FollowerManager) object
* `<User>.follows`: a [`FollowingManager`](#FollowingManager) object
* `<User>.posts`: a [`PostManager`](#PostManager) object
* `<User>.id`: the user's id
* `<User>.username`: the user's username
* `<User>.firstName`: the user's first name
* `<User>.lastName`: the user's last name
* `<User>.locale`: the user's language
* `<User>.isVerified`: if the user is verified or not
* `<User>.displayName`: the user's display name
* `<User>.fullName`: the user's full name
* `<User>.url`: the url to the user's profile
* `<User>.bio`: the user's bio
* `<User>.socials`: the user's social media urls
* `<User>.roles`: the user's roles
* `<User>.isFollowedByCurrentUser`: if you are following the user
* `<User>.isFollowingCurrentUser`: if you're following the user
* `<User>.isBlockedByCurrentUser`: if you've blocked the user
* `<User>.isBlockingCurrentUser`: if the user blocked you
* `<User>.isLoggedIn`: if the user is logged in (`<User>.isOnline` is recommended)
* `<User>.isSubscribed`: no clue
* `<User>.followerCount`: how many followers the user has
* `<User>.followCount`: how many people the user is following
* `<User>.isHacker`: if the user has Hacker plan
* `<User>.image`: the url to the user's profile picture
* `<User>.coverImage`: the url and offset to the user's profile banner image
* `<User>.timeCreated`: when the user's account was created
* `<User>.lastSeen`: when the user was last online
* `<User>.isOnline`: if the user is online
* `<User>.setFollowing(boolean)`: follow or unfollow the user
* `<User>.setBlocking(boolean)`: block or unblock the user

#### CurrentUser
Also contains *most* [`User`](#User) properties and methods, excluding follow / block values

* `<CurrentUser>.notifications`: a [`NotificationManager`](#NotificationManager) object
* `<CurrentUser>.email`: the user's email
* `<CurrentUser>.emailNotifications`: if the user should be emailed notifications
* `<CurrentUser>.hasRepl`: if the user has any repls
* `<CurrentUser>.hasPrivacyRole`: no clue
* `<CurrentUser>.warnings`: any warnings the user has recieved
* `<CurrentUser>.isBannedFromBoards`: if the user is banned from boards
* `<CurrentUser>.canUpdateEmail`: if the user can change their email
* `<CurrentUser>.canUpdateUsername`: if the user can change their username
* `<CurrentUser>.device`: if the user is using a mobile or mac device
* `<CurrentUser>.sidebarClosed`: if the user's sidebar is closed
* `<CurrentUser>.hasProfileImage`: if the user has a profile image
* `<CurrentUser>.socialSignup`: no clue
* `<CurrentUser>.githubInfo`: the user's github info
* `<CurrentUser>.usernameRepl`: the user's repl whose title matches their username
* `<CurrentUser>.daysSinceSignup`: how many days since the user signed up
* `<CurrentUser>.storage`: the user's storage limit and usage
* `<CurrentUser>.editorPreferences`: the user's editor preferences
* `<CurrentUser>.countryCode`: the user's country code
* `<CurrentUser>.auth`: google / github / facebook auth
* `<CurrentUser>.change(options)`: updates the current user's settings
	* `options`: 
	  * `image`: a path to an image file to set your profile picture
	  * `firstName`: changes your first name
	  * `lastName`: changes your last name
	  * `bio`: changes your bio
	  * `emailNotifications`: if you should recieve email notifications 

#### Repl
* `<Repl>.threads`: a list of [`Thread`](#Thread) objects
* `<Repl>.multiplayers`: a [`MultiplayerManager`](#MultiplayManager) object
* `<Repl>.comments`: a [`CommentManager`](#CommentManager) object
* `<Repl>.id`: the repl's id
* `<Repl>.isProject`: no clue
* `<Repl>.isPrivate`: if the repl is private
* `<Repl>.isStarred`: if the repl is starred
* `<Repl>.title`: the repl's title
* `<Repl>.slug`: the repl's title slug
* `<Repl>.imageUrl`: the url to the repl's image
* `<Repl>.folderId`: the folder the repl is in
* `<Repl>.isRenamed`: if the repl is renamed
* `<Repl>.commentCount`: how many comments the user has
* `<Repl>.likeCount`: how many likes the repl has
* `<Repl>.currentUserDidLike`: if you liked the repl
* `<Repl>.templateCategory`: the category of the template used to create the repl
* `<Repl>.wasPosted`: if the repl was posted
* `<Repl>.wasPublished`: if the repl was published
* `<Repl>.language`: the id of the repl's language (you're probably looking for `<Repl>.templateInfo.label`)
* `<Repl>.lang`: the repls language (you're probably looking for `<Repl>.templateInfo.label`)
* `<Repl>.iconUrl`: the url of the repl's icon
* `<Repl>.templateLabel`: label of the repl's template repl
* `<Repl>.url`: the repl's url
* `<Repl>.inviteUrl`: the url to invite users to the repl
* `<Repl>.multiplayerInvites`: invites to the repl
* `<Repl>.historyUrl`: the repl's history url
* `<Repl>.analyticsUrl`: the repl's analytics url
* `<Repl>.rootOriginReplUrl`: the url to the repl's origin repl
* `<Repl>.isOwner`: if you are the owner of the repl
* `<Repl>.config`: the repl's config data
* `<Repl>.pinnedToProfile`: if the repl is pinned to your profile
* `<Repl>.size`: the repl's size, in bytes.
* `<Repl>.hostedUrl`: the repl's hosted url, used for iframes
* `<Repl>.terminalUrl`: the repl's terminal url
* `<Repl>.database`: data about the repl's database
* `<Repl>.template`: the repl's template
* `<Repl>.isProjectFork`: if the repl is a fork
* `<Repl>.publicForkCount`: how many public forks the repl has
* `<Repl>.runCount`: how many times the repl has been run
* `<Repl>.isAlwaysOn`: if the repl is always on
* `<Repl>.isBoosted`: if the repl is boosted
* `<Repl>.tags`: the repl's tags
* `<Repl>.lastPublishedAt`: when the repl was last published
* `<Repl>.multiplayers`: a [`<Collection>`](#Collection) of [`User`](#User) objects of people invited to the repl
* `<Repl>.nixedLanguage`: if the repl was nixed
* `<Repl>.publishedAs`: no clue
* `<Repl>.attachments`: no clue
* `<Repl>.description`: the repl's description
* `<Repl>.markdownDescription`: the repl's description, with markdown
* `<Repl>.hasExplainCode`: if the repl has explain code
* `<Repl>.hasGenerateCode`: if the repl has generate code
* `<Repl>.templateInfo`: info about the repl's template
* `<Repl>.domains`: no clue
* `<Repl>.apexProxy`: the ip of the repl's apex proxy
* `<Repl>.replViewSettings`: the repl's view settings
* `<Repl>.powerUpCosts`: the repl's power up costs
* `<Repl>.isTutorial`:if the repl is a tutorial
* `<Repl>.owner`: a [`User`](#User) object of the repl's owner
* `<Repl>.timeCreated`: when the repl was created
* `<Repl>.timeUpdated`: when the repl was updated
* `<Repl>.currentUserPermissions`: your permissions for the repl
* `<Repl>.fetchThreads(options)`: returns the repls'd threads
* `<Repl>.database`: A [`Repl Database`](https://docs.replit.com/hosting/database-faq) object
* `<Repl>.fork(options)`: forks the repl
	* `options`:
	  * `cache`: cache the result(s). default: true
	  * `title`: the repl's title
	  * `description`: the repl's description
	  * `isPrivate`: if the repl should be private
* `<Repl>.delete()`: deletes the repl
* `<Repl>.change(options)`: updates the repl
	* `options`:
	  * `title`: the repl's title
	  * `description`: the repl's description
	  * `isPrivate`: if the repl should be private
* `<Repl>.comment(body)`: comments on the repl
* `<Repl>.connect()`: Connect to the repl
The following require you to be connected to the repl:
* `<Repl>.env`: the repl's environmental variables (secrets)
* `<Repl>.files`: a [`FileManager`](#FileManager) object
* `<Repl>.console`: a [`Console`](#Console) object
* `<Repl>.disconnect()`: disconnects from the repl

#### UserManager
* `<Usermanager>.cache`: a [`Collection`](#Collection) of [`User`](#User) objects
* `<Usermanager>.fetch(userResolvable, options)`: a Promise of a [`User`](#User) object
	* `userResolvable`: A username, id, or [`User`](#User)
  * `options`:
	  * `force`: doesn't check the cache. default: false
    * `cache`: cache the result(s). default: true
* `<Usermanager>.search(query, options)`: a [`Collection`](#Collection) of [`User`](#User) objects
	* `query`: what to search
	* `options`:
	  * `cache`: cache the result(s). default: true
    * `limit`: the maximum number of results. default: 10

#### ReplManager
* `<Replmanager>.cache`: a [`Collection`](#Collection) of [`Repl`](#Repl) objects
* `<Client>.<Replmanager>.fetch(replResolvable, options)`: a [`User`](#User) object
	* `replResolvable`: A url, id, or [`Repl`](#Repl)
  * `options`:
	  * `force`: doesn't check the cache. default: false
    * `cache`: cache the result(s). default: true
* `<Replmanager>.generateTitle()`: a randomly generated repl title
* `<Client>.<ReplManager>.create(options)`: creates a new repl
	* `options`:
	  * `title`: the repl's title
    * `description`: the repl's description
    * `language`: the repl's language
		* `isPrivate`: if the repl is private

#### Collection
A Map object with extra methods. Meant to be like [discord.js's Collection](https://discord.js.org/#/docs/collection/main/class/Collection)

#### PostManager
* `<PostManager>.cache` a [`Collection`](#Collection)
* `<PostManager>.trending(options)`: a [`Collection`](#Collection) of trending posts
	* `options`:
	  * `force`: doesn't check the cache. default: false
	  * `cache`: cache the result(s). default: true
	  * `limit`: the maximum number of results
	  * `tags`: tags included in the results

#### CommentManager
* `<Client>.<CommentManager>.fetch(commentResolvable, options)`: returns a [`Comment`](#Comment) object
	* `commentResolvable`: a comment id
  * `options`:
	  * `cache`: cache the result(s). default: true
* `<Repl>.<CommentManager>.fetch(options)`: returns a [`Collection`](#Collection) of [`Comment`](#Comment) objects
  * `options`:
	  * `cache`: cache the result(s). default: true
	  * `limit`: the maximum number of results
* `<User>.<CommentManager>.fetch(options)`: returns a [`Collection`](#Collection) of [`Comment`](#Comment) objects
  * `options`:
	  * `cache`: cache the result(s). default: true
	  * `limit`: the maximum number of results

#### Post
* `<Post>.id`: the post's id
* `<Post>.title`: the post's title
* `<Post>.commentCount`: how many replies the post has
* `<Post>.body`: the body of the post
* `<Post>.user`: a [`User`](#User) object
* `<Post>.repl`: a [`Repl`](#Repl) object
* `<Post>.comment`: a [`Comment`](#Comment) object
* `<Post>.timeCreated`: when the post was created
* `<Post>.timeUpdated`: when the post was last updated

#### Comment
* `<Comment>.comments`: an array of [`Comment`](#Comment) objects
* `<Comment>.id`: the comment's id
* `<Comment>.body`: the comment's body
* `<Comment>.bodyNoMarkdown`: the comment's body without markdown
* `<Comment>.curretUserPermissions`: your current permissions for the comment
* `<Comment>.timeCreated`: when the comment was created
* `<Comment>.timeUpdated`: when the comment was last updated
* `<Comment>.user`: a [`User`](#User) object
* `<Comment>.repl`: a [`Repl`](#Repl) object
* `<Comment>.reply(body)`: reply to the comment

#### FollowerManager
* `<FollowerManager>.fetch(options)`: a [`Collection`](#Collection) of [`User`](#User) objects
	* `options`:
	  * `cache`: cache the result(s). default: true
	  * `limit`: the maximum number of results

#### FollowingManager
* `<FollowingManager>.fetch(options)`: a [`Collection`](#Collection) of [`User`](#User) objects
	* `options`:
	  * `cache`: cache the result(s). default: true
	  * `limit`: the maximum number of results
* `<FollowingManager>.events`: a [`UserEventManager`](#UserEventManager)

#### MultiplayerManager
* `<MultiplayerManager>.cache`: a [`Collection`](#Collection) of [`User`](#User) objects
* `<MultiplayerManager>.invite(userResolvable)`: invite a user to the repl
* `<MultiplayerManager>.remove(userResolvable)`: remove a user from the repl

#### FileManager
* `<FileManager>.persisting`: if the manager is currently persisting
* `<FileManager>.read(path)`: returns the contents of a file
* `<FileManager>.write(path, content)`: writes to a file
* `<FileManager>.mkdir(path)`: makes a directory
* `<FileManager>.remove(path)`: removes a file / directory
* `<FileManager>.move(oldPath, newPath)`: moves a file/directory
* `<FileManager>.readdir(path)`: get an array of files in a directory
* `<FileManager>.recursedir(path)`: get an array of recursed files in a directory
* `<FileManager>.presist()`: makes the files update when edited
* `<FileManager>.snapshot()`: updates the files to what they are currently


#### Console
* `<Console>.send(input)`: sends something to the console
* `<Console>.run()`: runs the repl
* `<Console>.stop()`: stops the repl


#### UserEventManager
* `<UserEventManager>.cache`: a [`Collection`](#Collection) of [`UserEvent`](#UserEvent) objects
* `<UserEventManager>.fetch(options)`: a [`Collection`](#Collection) of [`UserEvent`](#UserEvent) objects
  * `options`:
	  * `cache`: cache the result(s). default: true
	  * `limit`: the maximum number of results

#### UserEvent
* `<UserEvent>.id`: the id of the event
* `<UserEvent>.eventType`: the type of the event
* `<UserEvent>.post`: a [`Post`](#Post) object
* `<UserEvent>.timeUpdated`: when the event was last updated
* `<UserEvent>.user`: a [`User`](#User) object
* `<UserEvent>.repl`: a [`Repl`](#Repl) object
* `<UserEvent>.comment`: a [`Comment`](#Comment) object

#### NotificationManager
* `<NotificationManager>.cache`: a [`Collection`](#Collection) of [`Notification`](#Notification) objects
* `<NotificationManager>.fetch(options)`: a [`Collection`](#Collection) of [`Notification`](#Notification) objects
	* `options`:
	  * `cache`: cache the result(s). default: true
	  * `limit`: the maximum number of results
	  * `seen`: if the notifications have been seen or not. default: false
* `<NotificationManager>.markAsRead()`: marks your notifications as read
* `<NotificationManager>.startEvents()`: starts sending notification events for new notifications
* `<NotificationManager>.stopEvents()`: stops the sending of notification events