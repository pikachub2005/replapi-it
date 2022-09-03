//variables are not important to the object, it just lets me know what's needed =P

const queries = {
	currentUser: {
		query: `query {country appEnv {key value} currentUser {
			id
			email
			username
			firstName
			lastName
			locale
			emailNotifications
			isVerified
			displayName
			fullName
			url
			bio
			socials {
				id
		 		url
				type
			}
			hasRepl
			hasPrivacyRole
			roles {
				id
		 		key
				name
		 		tagline
			}
			isLoggedIn
			isSubscribed
			timeCreated
			warnings {
				id
		 		reason
				moderator {
		 			username
				}
		 		timeCreated
			}
			followerCount
			followCount
			isBannedFromBoards
			isHacker
			cannySSOToken
			canUpdateEmail: canUpdate(column: EMAIL)
			canUpdateUsername: canUpdate(column: USERNAME)
			state {
				id
		 		skillLevel
				interestedIn
		 		languagesInterestedIn {
					id
					displayName
					icon
					tagline
				}
			}
			device {
				isMobile
		 		isMac
			}
			sidebarClosed
			hasProfileImage
			image
			coverImage {
				url
		 		offsetY
			}
			socialSignup
			googleAuth: auth(provider: GOOGLE) {
				accessToken
			}
			githubAuth: auth(provider: GITHUB) {
				accessToken
			}
			facebookAuth: auth(provider: FACEBOOK) {
				accessToken
			}
			gitHubInfo {
		 		installations {
					id
					type
					avatarUrl
					name
				}
		 		userInfo {
					name
					email
					avatarUrl
				}
			}
			usernameRepl {
				id
		 		title
				url
			}
			daysSinceSignup
			storage {
				limit
		 		used
			}
			clui
			editorPreferences {
				isLayoutStacked
		 		theme
				fontSize
		 		indentIsSpaces
				indentSize
		 		keyboardHandler
				wrapping
		 		codeIntelligence
				codeSuggestion
		 		codeSuggestionEngine
				accessibleTerminal
		 		extraDelight
			}
		}}`,
		variables: []
	},
	userByUsername: {
		query: `query UserByUsername($username: String!) {userByUsername(username: $username) {
	 		id
			username
			firstName
			lastName
			locale
			isVerified
			displayName
			fullName
			url
			bio
			socials {
				id
		 		url
				type
			}
			roles {
				id
		 		key
				name
		 		tagline
			}
			isFollowedByCurrentUser
			isFollowingCurrentUser
			isBlockedByCurrentUser
			isBlockingCurrentUser
			isLoggedIn
			isSubscribed
			timeCreated
			followerCount
			followCount
			isHacker
			image
			coverImage {
				url
		 		offsetY
			}
			presenceStatus {
				lastSeen
		 		isOnline
			}
		}}`,
		variables: ['username']
	},
	user: {
		query: `query User($id: Int!) {user(id: $id) {
	 		id
			username
			firstName
			lastName
			locale
			isVerified
			displayName
			fullName
			url
			bio
			socials {
				id
		 		url
				type
			}
			roles {
				id
		 		key
				name
		 		tagline
			}
			isFollowedByCurrentUser
			isFollowingCurrentUser
			isBlockedByCurrentUser
			isBlockingCurrentUser
			isLoggedIn
			isSubscribed
			timeCreated
			followerCount
			followCount
			isHacker
			image
			coverImage {
				url
		 		offsetY
			}
			presenceStatus {
				lastSeen
		 		isOnline
			}
		}}`,
		variables: ['id']
	},
	repl: {
		query: `query Repl($id: String, $url: String) {repl(id: $id, url: $url) {...on Repl {
			id
		 	isProject
		 	isPrivate
		 	isStarred
		 	title
		 	slug
		 	imageUrl
		 	folderId
		 	isRenamed
		 	commentCount
		 	likeCount
		 	currentUserDidLike
		 	templateCategory
		 	wasPosted
		 	wasPublished
		 	layoutState
		 	language
		 	owner: user {
		 		id
				username
				firstName
				lastName
				locale
				isVerified
				displayName
				fullName
				url
				bio
				socials {
					id
			 		url
					type
				}
				roles {
					id
			 		key
					name
			 		tagline
				}
				isFollowedByCurrentUser
				isFollowingCurrentUser
				isBlockedByCurrentUser
				isBlockingCurrentUser
				isLoggedIn
				isSubscribed
				timeCreated
				followerCount
				followCount
				isHacker
				image
				coverImage {
					url
			 		offsetY
				}
				presenceStatus {
					lastSeen
			 		isOnline
				}
			}
			origin {
				id
		 		title
			}
			lang {
				id
		 		displayName
		 		canUseShellRunner
			}
			iconUrl
			templateLabel
			url
			inviteUrl
			multiplayerInvites {
				email
		 		replId
				type
			}
			historyUrl
			analyticsUrl
			rootOriginReplUrl
			timeCreated
			timeUpdated
			isOwner
			config {
				isServer
		 		gitRemoteUrl
				domain
		 		isVnc
		 		doClone
			}
			pinnedToProfile
			size
			hostedUrl
			hostedUrlDotty: hostedUrl(dotty: true)
			hostedUrlDev: hostedUrl(dev: true)
			hostedUrlNoCustom: hostedUrl(noCustomDomain: true)
			terminalUrl
			currentUserPermissions {
				changeTitle
		 		changeDescription
				changeImageUrl
		 		changeIconUrl
				changeTemplateLabel
		 		changeLanguage
				changeConfig
		 		changePrivacy
				star
		 		pin
				move
		 		delete
				leaveMultiplayer
		 		editMultiplayers
				viewHistory	
		 		containerAttach
				containerWrite
		 		changeAlwaysOn
				linkDomain
		 		writeTests
				changeCommentSettings
		 		inviteGuests
				publish
		 		fork
			}
			database {
				id
		 		keysCount
				sizeMB
				jwt
			}
			template {
				id
			}
			isProjectFork
			isModelSolution
			isModelSolutionFork
			workspaceCta
			submission {
				id
		 		timeSubmitted
				timeLastReviewed
		 		isGroupSubmission
				author {
		 			username
				}
		 		submissionGroup {
					users {
						username
					}
				}
			}
			commentSettings {
				id
		 		enabled
			}
			publicForkCount
			runCount
			isAlwaysOn
			isBoosted
			tags {
				id
		 		isOfficial
			}
			lastPublishedAt
			multiplayers {
				username
			}
			nixedLanguage
			publishedAs
			attachments {
				id
		 		fileName
				mimeType
		 		timeCreated
				timeUpdated
		 		contents
			}
			description(plainText: true)
			markdownDescription: description(plainText: false)
			hasExplainCode
			hasGenerateCode
			templateInfo {
				label
		 		iconUrl
			}
			domains {
				domain
		 		state
			}
			apexProxy
			replViewSettings {
				id
		 		defaultView
				replFile
		 		replImage
			}
			powerUpCosts {
				...on UnauthorizedError {
		 			message
				}
		 		...on NotFoundError {
					message
				}
		 		...on PowerUpCostsType {
					boost {
						cycles
			 			explanation
					}
					alwaysOn {
						cycles
			 			explanation
					}
				}
			}
			isTutorial
		}}}`,
		variables: ['id', 'url']
	},
	replThreads: {
		query: `query Repl($id: String) {repl(id: $id) {...on Repl {
			annotationAnchors {
				id
		 		path
				otVersion
		 		indexStart
				indexEnd
		 		timeCreated
				timeUpdated
		 		isResolved
				messages {
		 			id
			 		timeCreated
			 		timeUpdated
			 		content {
			 			...on TextMessageContentType {
							text
						}
			 			...on StatusMessageContentType {
							status
						}
			 			...on PreviewMessageContentType {
							preview
						}
					}
			 		user {
			 			username
					}
					seen
					currentUserIsAuthor
				}
		 		participants {
					username
				}
		 		messageCount
				unreadCount
		 		currentUserIsAuthor
				isGeneral
			}
		}}}`,
		variables: ['id']
	},
	userSearch: {
		query: `query UsernameSearch($query: String!, $limit: Int) {usernameSearch(query: $query, limit: $limit) {
			id
			username
			firstName
			lastName
			locale
			isVerified
			displayName
			fullName
			url
			bio
			socials {
				id
		 		url
				type
			}
			roles {
				id
		 		key
				name
		 		tagline
			}
			isFollowedByCurrentUser
			isFollowingCurrentUser
			isBlockedByCurrentUser
			isBlockingCurrentUser
			isLoggedIn
			isSubscribed
			timeCreated
			followerCount
			followCount
			isHacker
			image
			coverImage {
				url
		 		offsetY
			}
			presenceStatus {
				lastSeen
		 		isOnline
			}
		}}`
	},
	replTitle: {
		query: `query ReplTitle($title: String, $teamId: Int) {replTitle(title: $title, teamId: $teamId)}`
	},
	siteBanner: {
		query: `query {siteBanner {id, message}}`
	},
	profileRepls: {
		query: `query ProfilePublicRepls($username: String!, $after: String, $search: String, $count: Int) {user: userByUsername(username: $username) {profileRepls: profileRepls(after: $after, search: $search, count: $count) {
			items {
	 			id
			 	isProject
			 	isPrivate
			 	isStarred
			 	title
			 	slug
			 	imageUrl
			 	folderId
			 	isRenamed
			 	commentCount
			 	likeCount
			 	currentUserDidLike
			 	templateCategory
			 	wasPosted
			 	wasPublished
			 	layoutState
			 	language
			 	owner: user {
			 		id
					username
					firstName
					lastName
					locale
					isVerified
					displayName
					fullName
					url
					bio
					socials {
						id
				 		url
						type
					}
					roles {
						id
				 		key
						name
				 		tagline
					}
					isFollowedByCurrentUser
					isFollowingCurrentUser
					isBlockedByCurrentUser
					isBlockingCurrentUser
					isLoggedIn
					isSubscribed
					timeCreated
					followerCount
					followCount
					isHacker
					image
					coverImage {
						url
				 		offsetY
					}
					presenceStatus {
						lastSeen
				 		isOnline
					}
				}
				origin {
					id
			 		title
				}
				lang {
					id
			 		displayName
					canUseShellRunner
				}
				iconUrl
				templateLabel
				url
				inviteUrl
				multiplayerInvites {
					email
			 		replId
					type
				}
				historyUrl
				analyticsUrl
				rootOriginReplUrl
				timeCreated
				timeUpdated
				isOwner
				config {
					isServer
			 		gitRemoteUrl
					domain
			 		isVnc
			 		doClone
				}
				pinnedToProfile
				size
				hostedUrl
				hostedUrlDotty: hostedUrl(dotty: true)
				hostedUrlDev: hostedUrl(dev: true)
				hostedUrlNoCustom: hostedUrl(noCustomDomain: true)
				terminalUrl
				currentUserPermissions {
					changeTitle
			 		changeDescription
					changeImageUrl
			 		changeIconUrl
					changeTemplateLabel
			 		changeLanguage
					changeConfig
			 		changePrivacy
					star
			 		pin
					move
			 		delete
					leaveMultiplayer
			 		editMultiplayers
					viewHistory	
			 		containerAttach
					containerWrite
			 		changeAlwaysOn
					linkDomain
			 		writeTests
					changeCommentSettings
			 		inviteGuests
					publish
			 		fork
				}
				database {
					id
			 		keysCount
					sizeMB
		 			jwt
				}
				template {
					id
				}
				isProjectFork
				isModelSolution
				isModelSolutionFork
				workspaceCta
				submission {
					id
			 		timeSubmitted
					timeLastReviewed
			 		isGroupSubmission
					author {
			 			username
					}
			 		submissionGroup {
						users {
							username
						}
					}
				}
				commentSettings {
					id
			 		enabled
				}
				publicForkCount
				runCount
				isAlwaysOn
				isBoosted
				tags {
					id
			 		isOfficial
				}
				lastPublishedAt
				multiplayers {
					username
				}
				nixedLanguage
				publishedAs
				attachments {
					id
			 		fileName
					mimeType
			 		timeCreated
					timeUpdated
			 		contents
				}
				description(plainText: true)
				markdownDescription: description(plainText: false)
				hasExplainCode
				hasGenerateCode
				templateInfo {
					label
			 		iconUrl
				}
				domains {
					domain
			 		state
				}
				apexProxy
				replViewSettings {
					id
			 		defaultView
					replFile
			 		replImage
				}
				powerUpCosts {
					...on UnauthorizedError {
			 			message
					}
			 		...on NotFoundError {
						message
					}
			 		...on PowerUpCostsType {
						boost {
							cycles
				 			explanation
						}
						alwaysOn {
							cycles
				 			explanation
						}
					}
				}
				isTutorial
			},
	 		pageInfo {
				hasNextPage
				nextCursor
			}
		}}}`,
		variables: ['username', 'after', 'search', 'count']
	},
	followers: {
		query: `query FollowModalFollowers($username: String!, $after: String, $count: Int) {userByUsername(username: $username) {followers(after: $after, count: $count) {
			items {
	 			id
				username
				firstName
				lastName
				locale
				isVerified
				displayName
				fullName
				url
				bio
				socials {
					id
			 		url
					type
				}
				roles {
					id
			 		key
					name
			 		tagline
				}
				isFollowedByCurrentUser
				isFollowingCurrentUser
				isBlockedByCurrentUser
				isBlockingCurrentUser
				isLoggedIn
				isSubscribed
				timeCreated
				followerCount
				followCount
				isHacker
				image
				coverImage {
					url
			 		offsetY
				}
				presenceStatus {
					lastSeen
			 		isOnline
				}
			}
	 		pageInfo {
		 		hasNextPage
		 		nextCursor
			}
		}}}`,
		variables: ['username', 'count']
	},
	follows: {
		query: `query FollowModalFollows($username: String!, $after: String, $count: Int) {userByUsername(username: $username) {follows(after: $after, count: $count) {
			items {
	 			id
				username
				firstName
				lastName
				locale
				isVerified
				displayName
				fullName
				url
				bio
				socials {
					id
			 		url
					type
				}
				roles {
					id
			 		key
					name
			 		tagline
				}
				isFollowedByCurrentUser
				isFollowingCurrentUser
				isBlockedByCurrentUser
				isBlockingCurrentUser
				isLoggedIn
				isSubscribed
				timeCreated
				followerCount
				followCount
				isHacker
				image
				coverImage {
					url
			 		offsetY
				}
				presenceStatus {
					lastSeen
			 		isOnline
				}
			}
	 		pageInfo {
		 		hasNextPage
		 		nextCursor
			}
		}}}`,
		variables: ['username', 'count']
	},
	follow: {
		query: `mutation SetFollowing($input: setFollowingInput!) {setFollowing(input: $input) {... on FollowResult {targetUser {
			isFollowedByCurrentUser, followerCount
	 	}}, ... on NotFoundError {message}, ... on UnauthorizedError {message}, ... on UserError {message}}}`,
		variables: [['targetUserId', 'shouldFollow']]
	},
	block: {
		query: `mutation SetBlocking($input: SetBlockingInput!) {setBlocking(input: $input) {... on User {
			isBlockedByCurrentUser
	 	}, ... on NotFoundError {message}, ... on UnauthorizedError {message}}}`,
		variables: [['targetUserId', 'shouldBlock']]
	},
	replComments: {
		query: `query Repl($id: String!, $after: String, $count: Int) {repl(id: $id) {... on Repl {comments(after: $after, count: $count) {items {
			id
			timeCreated
	 		timeUpdated
			body
			bodyNoMarkdown: body(removeMarkdown: true)
			user {
	 			username
			}
	 		isHidden
			repl {
				id
			}
	 		parentComment {
				id
			}
	 		post {
				id
			}
			currentUserPermissions {
	 			edit
		 		delete
		 		banAuthor
		 		canHideComment
		 		report
			}
		}}}}}`,
		variables: ['id', 'after', 'count']
	},
	comment: {
		query: `query Comment($id: Int!) {comment(id: $id) {
			id
	 		body
			timeCreated
	 		timeUpdated
			user {
	 			username
			}
	 		url
			post {
	 			id
			}
	 		repl {
				id
			}
	 		parentComment {
				id
		 		body
				timeCreated
		 		timeUpdated
				user {
		 			username
				}
		 		url
				post {
		 			id
				}
		 		repl {
					id
				}
		 		comments {
					id
				}
		 		isAuthor
				canEdit
		 		canComment
				canReport
			}
	 		comments {
				id
		 		body
				timeCreated
		 		timeUpdated
				user {
		 			username
				}
		 		url
				post {
		 			id
				}
		 		repl {
					id
				}
		 		parentComment {
					id
				}
		 		isAuthor
				canEdit
		 		canComment
				canReport
			}
	 		isAuthor
			canEdit
	 		canComment
			canReport
		}}`,
		variables: ['id']
	},
	replComment: {
		query: `query ReplComment($id: Int!) {replComment(id: $id) {...on ReplComment {
			id
			body
			timeCreated
	 		timeUpdated
			user {
	 			username
			}
	 		isHidden
			post {
	 			id
			}
	 		repl {
				id
			}
	 		parentComment {
				id
		 		body
				timeCreated
		 		timeUpdated
				user {
		 			username
				}
				post {
		 			id
				}
		 		repl {
					id
				}
		 		comments: replies {
					id
				}
		 		canComment
			}
	 		comments: replies {
				id
		 		body
				timeCreated
		 		timeUpdated
				user {
		 			username
				}
		 		repl {
					id
				}
		 		parentComment {
					id
				}
		 		canComment
			}
	 		canComment
		} ...on UserError {message}}}`,
		variables: ['id']
	},
	createRepl: {
		query: `mutation CreateRepl($input: CreateReplInput!) {createRepl(input: $input) {... on Repl {
			id
		 	isProject
		 	isPrivate
		 	isStarred
		 	title
		 	slug
		 	imageUrl
		 	folderId
		 	isRenamed
		 	commentCount
		 	likeCount
		 	currentUserDidLike
		 	templateCategory
		 	wasPosted
		 	wasPublished
		 	layoutState
		 	language
		 	owner: user {
		 		id
				username
				firstName
				lastName
				locale
				isVerified
				displayName
				fullName
				url
				bio
				socials {
					id
			 		url
					type
				}
				roles {
					id
			 		key
					name
			 		tagline
				}
				isFollowedByCurrentUser
				isFollowingCurrentUser
				isBlockedByCurrentUser
				isBlockingCurrentUser
				isLoggedIn
				isSubscribed
				timeCreated
				followerCount
				followCount
				isHacker
				image
				coverImage {
					url
			 		offsetY
				}
				presenceStatus {
					lastSeen
			 		isOnline
				}
			}
			origin {
				id
		 		title
			}
			lang {
				id
		 		displayName
		 		canUseShellRunner
			}
			iconUrl
			templateLabel
			url
			inviteUrl
			multiplayerInvites {
				email
		 		replId
				type
			}
			historyUrl
			analyticsUrl
			rootOriginReplUrl
			timeCreated
			timeUpdated
			isOwner
			config {
				isServer
		 		gitRemoteUrl
				domain
		 		isVnc
		 		doClone
			}
			pinnedToProfile
			size
			hostedUrl
			hostedUrlDotty: hostedUrl(dotty: true)
			hostedUrlDev: hostedUrl(dev: true)
			hostedUrlNoCustom: hostedUrl(noCustomDomain: true)
			terminalUrl
			currentUserPermissions {
				changeTitle
		 		changeDescription
				changeImageUrl
		 		changeIconUrl
				changeTemplateLabel
		 		changeLanguage
				changeConfig
		 		changePrivacy
				star
		 		pin
				move
		 		delete
				leaveMultiplayer
		 		editMultiplayers
				viewHistory	
		 		containerAttach
				containerWrite
		 		changeAlwaysOn
				linkDomain
		 		writeTests
				changeCommentSettings
		 		inviteGuests
				publish
		 		fork
			}
			database {
				id
		 		keysCount
				sizeMB
				jwt
			}
			template {
				id
			}
			isProjectFork
			isModelSolution
			isModelSolutionFork
			workspaceCta
			submission {
				id
		 		timeSubmitted
				timeLastReviewed
		 		isGroupSubmission
				author {
		 			username
				}
		 		submissionGroup {
					users {
						username
					}
				}
			}
			commentSettings {
				id
		 		enabled
			}
			publicForkCount
			runCount
			isAlwaysOn
			isBoosted
			tags {
				id
		 		isOfficial
			}
			lastPublishedAt
			multiplayers {
				username
			}
			nixedLanguage
			publishedAs
			attachments {
				id
		 		fileName
				mimeType
		 		timeCreated
				timeUpdated
		 		contents
			}
			description(plainText: true)
			markdownDescription: description(plainText: false)
			hasExplainCode
			hasGenerateCode
			templateInfo {
				label
		 		iconUrl
			}
			domains {
				domain
		 		state
			}
			apexProxy
			replViewSettings {
				id
		 		defaultView
				replFile
		 		replImage
			}
			powerUpCosts {
				...on UnauthorizedError {
		 			message
				}
		 		...on NotFoundError {
					message
				}
		 		...on PowerUpCostsType {
					boost {
						cycles
			 			explanation
					}
					alwaysOn {
						cycles
			 			explanation
					}
				}
			}
			isTutorial
		}}}`,
		variables: [['title', 'description', 'language', 'originId', 'isPrivate', 'files']]
	},
	deleteRepl: {
		query: `mutation DeleteRepl($id: String!) {deleteRepl(id: $id) {id}}`,
		variables: ['id']
	},
	addMultiplayer: {
		query: `mutation AddMultiplayerUser($username: String!, $replId: String!, $type: String!) {addMultiplayerUser(username: $username, replId: $replId, type: $type) {id}}`,
		variables: ['username', 'replId', 'type']
	},
	removeMultiplayer: {
		query: `mutation RemoveMultiplayerUser($username: String!, $replId: String!) {removeMultiplayerUser(username: $username, replId: $replId) {id}}`,
		variables: ['username', 'replId']
	},
	notifications: {
		query: `query notifications($after: String, $count: Int, $seen: Boolean) {notifications(after: $after, count: $count, seen: $seen) {items {...NotificationItems}}}, fragment NotificationItems on Notification {... on BasicNotification {id, ...BasicNotificationItemNotification}, ... on MentionedInPostNotification {id, ...NotificationItemMentionedInPostNotification}, ... on RepliedToPostNotification {id, ...NotificationItemRepliedToPostNotification}, ... on MentionedInCommentNotification {id, ...NotificationItemMentionedInCommentNotification}, ... on RepliedToCommentNotification {id, ...NotificationItemRepliedToCommentNotification}, ... on AnswerAcceptedNotification {id, ...NotificationItemAnswerAcceptedNotification}, ... on MultiplayerInvitedNotification {id, ...NotificationItemMultiplayerInvitedNotification}, ... on MultiplayerJoinedEmailNotification {id, ...NotificationItemMultiplayerJoinedEmailNotification}, ... on MultiplayerJoinedLinkNotification {id, ...NotificationItemMultiplayerJoinedLinkNotification}, ... on MultiplayerOverlimitNotification {id, ...NotificationItemMultiplayerOverlimitNotification}, ... on WarningNotification {id, ...NotificationItemWarningNotification}, ... on AnnotationNotification {id, ...NotificationItemAnnotationNotification}, ... on ThreadNotification {id, ...NotificationItemThreadNotification}, ... on TeamInviteNotification {id, ...NotificationItemTeamInviteNotification}, ... on TeamOrganizationInviteNotification {id, ...NotificationItemTeamOrganizationInviteNotification}, ... on TeamTemplateSubmittedNotification {id, ...NotificationTeamTemplateSubmittedNotification}, ... on TeamTemplateReviewedStatusNotification {id, ...NotificationTeamTemplateReviewedStatusNotification}, ... on EditRequestCreatedNotification {id, __typename}, ... on EditRequestAcceptedNotification {id, __typename}, ... on ReplCommentCreatedNotification {id, ...NotificationReplCommentCreatedNotification}, ... on ReplCommentReplyCreatedNotification {id, ...NotificationReplCommentReplyCreatedNotification}, ... on ReplCommentMentionNotification {id, ...NotificationReplCommentMentionNotification}, ... on NewFollowerNotification {id, ...NotificationItemNewFollower}}, fragment BasicNotificationItemNotification on BasicNotification {id, text, url, timeCreated, seen, context, __typename}, fragment NotificationItemMentionedInPostNotification on MentionedInPostNotification {id, text, url, timeCreated, seen, creator {id, ...NotificationItemCreator}, post {id, ...NotificationItemPost, board {id, ...NotificationItemBoard}}, __typename}, fragment NotificationItemCreator on User {username, image, __typename}, fragment NotificationItemPost on Post {id, title, url, __typename}, fragment NotificationItemBoard on Board {id, name, url, color, slug, __typename}, fragment NotificationItemRepliedToPostNotification on RepliedToPostNotification {id, text, url, timeCreated, seen, creator {id, ...NotificationItemCreator}, comment {id, post {id, ...NotificationItemPost, board {id, ...NotificationItemBoard}}}, __typename}, fragment NotificationItemMentionedInCommentNotification on MentionedInCommentNotification {id, text, url, timeCreated, seen, creator {id, ...NotificationItemCreator}, comment {id, post {id, ...NotificationItemPost, board {id, ...NotificationItemBoard}}}, __typename}, fragment NotificationItemRepliedToCommentNotification on RepliedToCommentNotification {id, text, url, timeCreated, seen, creator {id, ...NotificationItemCreator}, comment {id, body, post {id, ...NotificationItemPost, board {id, ...NotificationItemBoard}}}, __typename}, fragment NotificationItemAnswerAcceptedNotification on AnswerAcceptedNotification {id, text, url, timeCreated, seen, creator {id, ...NotificationItemCreator}, post {id, ...NotificationItemPost, board {id, ...NotificationItemBoard}}, __typename}, fragment NotificationItemMultiplayerInvitedNotification on MultiplayerInvitedNotification {id, text, url, timeCreated, seen, creator {id, ...NotificationItemCreator}, __typename}, fragment NotificationItemMultiplayerJoinedEmailNotification on MultiplayerJoinedEmailNotification {id, text, url, timeCreated, seen, creator {id, ...NotificationItemCreator}, __typename}, fragment NotificationItemMultiplayerJoinedLinkNotification on MultiplayerJoinedLinkNotification {id, text, url, timeCreated, seen, creator {id, ...NotificationItemCreator}, __typename}, fragment NotificationItemMultiplayerOverlimitNotification on MultiplayerOverlimitNotification {id, text, url, timeCreated, seen, creator {id, ...NotificationItemCreator}, __typename}, fragment NotificationItemWarningNotification on WarningNotification {id, text, url, timeCreated, seen, __typename}, fragment NotificationItemAnnotationNotification on AnnotationNotification {id, text, url, timeCreated, seen, creator {id, ...NotificationItemCreator}, __typename}, fragment NotificationItemThreadNotification on ThreadNotification {id, text, url, timeCreated, seen, creator {id, ...NotificationItemCreator}, participants {id, ...NotificationItemCreator}, thread {id, repl {id, url, slug, nextPagePathname, user {id, username}}}, __typename}, fragment NotificationItemTeamInviteNotification on TeamInviteNotification {id, text, url, timeCreated, seen, invite {id, ...NotificationItemTeamInvite}, __typename}, fragment NotificationItemTeamInvite on TeamInvite {id, team {id, displayName, username}, __typename}, fragment NotificationItemTeamOrganizationInviteNotification on TeamOrganizationInviteNotification {id, text, url, timeCreated, seen, invite {id, ...NotificationItemTeamOrganizationInvite}, __typename}, fragment NotificationItemTeamOrganizationInvite on TeamOrganizationInvite {id, organization {id, name}, __typename}, fragment NotificationTeamTemplateSubmittedNotification on TeamTemplateSubmittedNotification {id, text, url, timeCreated, seen, repl {id, url}, __typename}, fragment NotificationTeamTemplateReviewedStatusNotification on TeamTemplateReviewedStatusNotification {id, text, url, timeCreated, seen, repl {id, url}, __typename}, fragment NotificationReplCommentCreatedNotification on ReplCommentCreatedNotification {id, url, timeCreated, seen, replComment {id, ...NotificationReplCommentNotificationReplComment}, creator {id, ...NotificationItemCreator}, __typename}, fragment NotificationReplCommentNotificationReplComment on ReplComment {id, repl {title, url}, body, __typename}, fragment NotificationReplCommentReplyCreatedNotification on ReplCommentReplyCreatedNotification {id, timeCreated, seen, creator {id, ...NotificationItemCreator}, replComment {id, ...NotificationReplCommentNotificationReplComment}, __typename}, fragment NotificationReplCommentMentionNotification on ReplCommentMentionNotification {id, timeCreated, seen, creator {id, ...NotificationItemCreator}, replComment {id, parentComment {id, body, user {username, image}}, ...NotificationReplCommentNotificationReplComment}, __typename}, fragment NotificationItemNewFollower on NewFollowerNotification {id, timeCreated, seen, creator {...NotificationItemCreator}, __typename}`,
		variables: ['after', 'count', 'seen']
	},
	markAsRead: {
		query: 'mutation MarkAllNotificationsAsSeen {markAllNotificationsAsSeen {id}}'
	},
	userEvents: {
		query: `query getUserEventsFeed($count: Int!, $after: String!) {events: getUserEventsFeed(count: $count, after: $after) {... on UserEventConnection {items {id, ...UserEventsFeedEvent}}}}, fragment UserEventsFeedEvent on UserEvent {
			id
	 		eventType
			timeUpdated
	 		user {
				username
			}
	 		following {
				username
			}
	 		comment {
				id
			}
	 		post {
				id
			}
	 		repl {
				id
			}
	 		reaction {
				id
				reactionType
			}
		}`,
		variables: ['count', 'after']
	},
	deleteComment: {
		query: `mutation DeleteComment($id: Int!) {deleteComment(id: $id) {id}}`,
		variables: ['id']
	},
	userPosts: {
		query: `query ProfilePosts($username: String!, $after: String, $order: String, $count: Int) {userByUsername(username: $username) {posts(after: $after, order: $order, count: $count) {items {
			id
	 		title
			showHosted
	 		commentCount
			isPinned
	 		isHidden
			isLocked
	 		timeCreated
			timeUpdated
	 		body
			url
	 		user {
				username
			}
	 		board {
				id
			}
	 		repl {
				id
			}
	 		replComment {
				id
			}
		}}}}`,
		variables: ['username', 'after', 'order', 'count']
	},
	updateRepl: {
		query: `mutation ReplsDashboardUpdateRepl($input: UpdateReplInput!) {updateRepl(input: $input) {repl {
			title
	 		description
			imageUrl
	 		iconUrl
			isPrivate
	 		isStarred
			language
	 		slug
		}}}`,
		variables: ['id', 'title', 'description', 'imageUrl', 'iconUrl', 'isPrivate', 'isStarred', 'language', 'templateLabel', 'isServer', 'isVnc', 'domain', 'removeDomain', 'doClone']
	},
	updateUser: {
		query: `mutation UpdateCurrentUser($input: UpdateCurrentUserInput!) {updateCurrentUser(input: $input) {
			firstName
	 		lastName
			bio
			emailNotifications
	 		image
		}}`,
			variables: ['firstName', 'lastName', 'bio', 'emailNotifications']
	},
	search: {
		query: `query Search($options: SearchQueryOptions!) {search(options: $options) {...on UserError {message} ...on UnauthorizedError {message} ...on SearchQueryResults {
			replResults {
	 			results {
		 			items {
						id
					}
				}
			}
	 		templateResults {
				results {
					items {
						id
					}
				}
			}
	 		fileResults {
				results {
					items {
		 				repl {
			 				id
						}
					}
				}
			}
	 		userResults {
				results {
					items {
						username
					}
				}
			}
	 		postResults {
				results {
					items {
						id
					}
				}
			}
	 		docResults {
				results {
					items {
		 				path
					}
				}
			}
	 		tagResults {
				results {
					items {
		 				tag {
			 				id
							isOfficial
						}
						timeLastUsed
						replsCount: numReplsTotal
					}
				}
			}
		}}}`,
		variables: []
	},
	post: {
		query: `query Post($id: Int!) {post(id: $id) {
			id
	 		title
			showHosted
	 		commentCount
			isPinned
	 		isHidden
			isLocked
	 		timeCreated
			timeUpdated
	 		body
	 		user {
				username
			}
	 		repl {
				id
			}
	 		replComment {
				id
				body
				timeCreated
		 		timeUpdated
				user {
		 			username
				}
		 		isHidden
		 		repl {
					id
				}
		 		parentComment {
					id
			 		body
					timeCreated
			 		timeUpdated
					user {
			 			username
					}
					post {
			 			id
					}
			 		repl {
						id
					}
			 		comments: replies {
						id
					}
			 		canComment
				}
		 		comments: replies {
					id
			 		body
					timeCreated
			 		timeUpdated
					user {
			 			username
					}
			 		repl {
						id
					}
			 		parentComment {
						id
					}
			 		canComment
				}
		 		canComment
			}
		}}`,
		variables: ['id']
	},
	trending: {
		query: `query ReplPosts($options: ReplPostsQueryOptions) {replPosts(options: $options) {
			items {
	 			id
		 		title
				showHosted
		 		commentCount
				isPinned
		 		isHidden
				isLocked
		 		timeCreated
				timeUpdated
		 		body
				url
		 		user {
					username
				}
		 		board {
					id
				}
		 		repl {
					id
				}
		 		replComment {
					id
		 			user {
						id
					}
				}
			}
		}}`,
		variables: ['searchQuery', 'count', 'order', 'tags']
	},
	dashboardRepls: {
		query: `query ReplsDashboardReplFolderList($path: String!, $starred: Boolean, $after: String, $count: Int) {currentUser {replFolderByPath(path: $path) {
			id
	 		userId
			pathnames
	 		canEdit
			canCreateSubFolders
	 		parent {id}
			folders {
		 		id
		 		name
		 		canEdit
		 		pathnames
		 		image
		 		timeCreated
		 	}
			repls(starred: $starred, after: $after, count: $count) {items {
				id
			 	isProject
			 	isPrivate
			 	isStarred
			 	title
			 	slug
			 	imageUrl
			 	folderId
			 	isRenamed
			 	commentCount
			 	likeCount
			 	currentUserDidLike
			 	templateCategory
			 	wasPosted
			 	wasPublished
			 	layoutState
			 	language
			 	owner: user {
			 		id
					username
					firstName
					lastName
					locale
					isVerified
					displayName
					fullName
					url
					bio
					socials {
						id
				 		url
						type
					}
					roles {
						id
				 		key
						name
				 		tagline
					}
					isFollowedByCurrentUser
					isFollowingCurrentUser
					isBlockedByCurrentUser
					isBlockingCurrentUser
					isLoggedIn
					isSubscribed
					timeCreated
					followerCount
					followCount
					isHacker
					image
					coverImage {
						url
				 		offsetY
					}
					presenceStatus {
						lastSeen
				 		isOnline
					}
				}
				origin {
					id
			 		title
				}
				lang {
					id
			 		displayName
					canUseShellRunner
				}
				iconUrl
				templateLabel
				url
				inviteUrl
				multiplayerInvites {
					email
			 		replId
					type
				}
				historyUrl
				analyticsUrl
				rootOriginReplUrl
				timeCreated
				timeUpdated
				isOwner
				config {
					isServer
			 		gitRemoteUrl
					domain
			 		isVnc
			 		doClone
				}
				pinnedToProfile
				size
				hostedUrl
				hostedUrlDotty: hostedUrl(dotty: true)
				hostedUrlDev: hostedUrl(dev: true)
				hostedUrlNoCustom: hostedUrl(noCustomDomain: true)
				terminalUrl
				currentUserPermissions {
					changeTitle
			 		changeDescription
					changeImageUrl
			 		changeIconUrl
					changeTemplateLabel
			 		changeLanguage
					changeConfig
			 		changePrivacy
					star
			 		pin
					move
			 		delete
					leaveMultiplayer
			 		editMultiplayers
					viewHistory	
			 		containerAttach
					containerWrite
			 		changeAlwaysOn
					linkDomain
			 		writeTests
					changeCommentSettings
			 		inviteGuests
					publish
			 		fork
				}
				database {
					id
			 		keysCount
					sizeMB
		 			jwt
				}
				template {
					id
				}
				isProjectFork
				isModelSolution
				isModelSolutionFork
				workspaceCta
				submission {
					id
			 		timeSubmitted
					timeLastReviewed
			 		isGroupSubmission
					author {
			 			username
					}
			 		submissionGroup {
						users {
							username
						}
					}
				}
				commentSettings {
					id
			 		enabled
				}
				publicForkCount
				runCount
				isAlwaysOn
				isBoosted
				tags {
					id
			 		isOfficial
				}
				lastPublishedAt
				multiplayers {
					username
				}
				nixedLanguage
				publishedAs
				attachments {
					id
			 		fileName
					mimeType
			 		timeCreated
					timeUpdated
			 		contents
				}
				description(plainText: true)
				markdownDescription: description(plainText: false)
				hasExplainCode
				hasGenerateCode
				templateInfo {
					label
			 		iconUrl
				}
				domains {
					domain
			 		state
				}
				apexProxy
				replViewSettings {
					id
			 		defaultView
					replFile
			 		replImage
				}
				powerUpCosts {
					...on UnauthorizedError {
			 			message
					}
			 		...on NotFoundError {
						message
					}
			 		...on PowerUpCostsType {
						boost {
							cycles
				 			explanation
						}
						alwaysOn {
							cycles
				 			explanation
						}
					}
				}
				isTutorial
			}
	 		pageInfo {nextCursor}
		}}}}`,
		variables: []
	},
	sendComment: {
		query: `mutation CreateComment($input: CreateCommentInput!) {createReplComment(input: $input) {comment {
			id
	 		body
			timeCreated
	 		timeUpdated
			user {
	 			username
			}
			post {
	 			id
			}
	 		repl {
				id
			}
	 		parentComment {
				id
		 		body
				timeCreated
		 		timeUpdated
				user {
		 			username
				}
		 		url
				post {
		 			id
				}
		 		repl {
					id
				}
		 		comments {
					id
				}
		 		isAuthor
				canEdit
		 		canComment
				canReport
			}
	 		isAuthor
			canEdit
			canReport
		}}}`,
		variables: []
	},
	sendReplComment: {
		query: `mutation CreateReplComment($input: CreateReplCommentInput!) {createReplComment(input: $input) {...on UserError {message} ...on ReplComment {
			id
	 		body
			timeCreated
	 		timeUpdated
			user {
	 			username
			}
			post {
	 			id
			}
	 		repl {
				id
			}
	 		canEdit
		}}}`
	},
	sendReplCommentReply: {
		query: `mutation CreateReplCommentReply($input: CreateReplCommentReplyInput!) {createReplCommentReply(input: $input) {...on UserError {message} ...on ReplComment {
			id
	 		body
			timeCreated
	 		timeUpdated
			user {
	 			username
			}
	 		repl {
				id
			}
	 		canEdit
		}}}`
	}
}

module.exports = queries;