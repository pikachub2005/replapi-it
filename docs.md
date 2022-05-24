## Anyway, here's some random stuff
* Client
	* user: ClientUser
  * users: UserManager
	  * client: Client
	  * cache: Collection {username => User}
		* fetch(username): User
  * repls: ReplManager
	  * client: Client
	  * cache: Collection {id => Repl}
		* fetch(id/url): cache
* User
  * repls: ReplManager
	  * client: Client
	  * cache: Collection {id => Repl}
		* fetch(limit): cache
	* Client
  * id
  * username
  * firstName
  * lastName
  * bio
  * isVerified
  * displayName
  * fullname
  * url
  * roles
  * isLoggedIn
  * timeCreated
  * karma *aka cycles*
  * isHacker
  * languages
  * image
* ClientUser
	* *also includes User attributes and methods*
  * email
  * state: {id, skillLevel, interestedIn}
  * device: {isMobile, isMac}
  * notificationCount
* Repl
	* Client
	* id
  * title
  * slug
  * description
  * isRenamed
  * user: User
  * language
  * url
  * timeCreated
  * timeUpdated
  * hostedUrl
  * files: ReplFileManager {Client, Repl}