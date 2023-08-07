USE [master]
GO
/****** Object:  Database [PhoneDirectory]    Script Date: 07/08/2023 08:53:04 ******/
CREATE DATABASE [PhoneDirectory]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'PhoneDirectory', FILENAME = N'D:\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\PhoneDirectory.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'PhoneDirectory_log', FILENAME = N'D:\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\PhoneDirectory_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [PhoneDirectory] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PhoneDirectory].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PhoneDirectory] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PhoneDirectory] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PhoneDirectory] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PhoneDirectory] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PhoneDirectory] SET ARITHABORT OFF 
GO
ALTER DATABASE [PhoneDirectory] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [PhoneDirectory] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PhoneDirectory] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PhoneDirectory] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PhoneDirectory] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PhoneDirectory] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PhoneDirectory] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PhoneDirectory] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PhoneDirectory] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PhoneDirectory] SET  DISABLE_BROKER 
GO
ALTER DATABASE [PhoneDirectory] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PhoneDirectory] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PhoneDirectory] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PhoneDirectory] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PhoneDirectory] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PhoneDirectory] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PhoneDirectory] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PhoneDirectory] SET RECOVERY FULL 
GO
ALTER DATABASE [PhoneDirectory] SET  MULTI_USER 
GO
ALTER DATABASE [PhoneDirectory] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PhoneDirectory] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PhoneDirectory] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PhoneDirectory] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [PhoneDirectory] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [PhoneDirectory] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'PhoneDirectory', N'ON'
GO
ALTER DATABASE [PhoneDirectory] SET QUERY_STORE = ON
GO
ALTER DATABASE [PhoneDirectory] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [PhoneDirectory]
GO
/****** Object:  Table [dbo].[ConferenceApprovals]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ConferenceApprovals](
	[requestId] [int] NOT NULL,
	[overseerId] [int] NOT NULL,
	[approved] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[requestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ConferenceParticipants]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ConferenceParticipants](
	[requestId] [int] NOT NULL,
	[participantId] [int] NOT NULL,
	[accepted] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[requestId] ASC,
	[participantId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ConferenceRequests]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ConferenceRequests](
	[requestId] [int] IDENTITY(1,1) NOT NULL,
	[conferenceId] [int] NOT NULL,
	[requesterId] [int] NOT NULL,
	[status] [varchar](20) NOT NULL,
	[isActive] [binary](1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[requestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Conferences]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Conferences](
	[conferenceId] [int] IDENTITY(1,1) NOT NULL,
	[roomId] [int] NOT NULL,
	[topic] [varchar](255) NOT NULL,
	[description] [varchar](255) NOT NULL,
	[notes] [varchar](255) NOT NULL,
	[startDate] [datetime] NOT NULL,
	[endDate] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[conferenceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contacts]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contacts](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[firstName] [varchar](100) NOT NULL,
	[lastName] [varchar](100) NOT NULL,
	[gsmNumber] [varchar](20) NOT NULL,
	[email] [varchar](255) NOT NULL,
	[address] [text] NULL,
	[username] [varchar](100) NULL,
	[activeState] [binary](1) NOT NULL,
 CONSTRAINT [PK_Contacts_ID] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_contacts_gsm] UNIQUE NONCLUSTERED 
(
	[gsmNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_contacts_username] UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Guests]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Guests](
	[firstName] [varchar](100) NOT NULL,
	[lastName] [varchar](100) NOT NULL,
	[acquisitionTime] [datetime] NOT NULL,
	[cardSubmitDate] [datetime] NULL,
	[cardId] [int] NOT NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NOT NULL,
	[username] [varchar](100) NOT NULL,
	[activeState] [binary](1) NOT NULL,
	[companyName] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MeetingRooms]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MeetingRooms](
	[roomId] [int] IDENTITY(1,1) NOT NULL,
	[overseerId] [int] NOT NULL,
	[capacity] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[roomId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Notifications]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notifications](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NOT NULL,
	[requestId] [int] NOT NULL,
	[topic] [varchar](255) NULL,
	[description] [varchar](1000) NULL,
	[status] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RandezvousIn]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RandezvousIn](
	[userId] [int] NOT NULL,
	[contactId] [int] NOT NULL,
	[startDate] [datetime] NOT NULL,
	[endDate] [datetime] NULL,
	[notes] [varchar](255) NULL,
	[activeState] [binary](1) NULL,
	[meetingId] [int] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[meetingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserContacts]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserContacts](
	[userId] [int] NOT NULL,
	[contactId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](255) NOT NULL,
	[password] [varchar](255) NOT NULL,
	[role] [varchar](50) NOT NULL,
	[firstName] [varchar](100) NOT NULL,
	[lastName] [varchar](100) NOT NULL,
	[username] [varchar](100) NULL,
	[address] [varchar](255) NULL,
	[gsmNumber] [varchar](20) NOT NULL,
	[activeState] [binary](1) NOT NULL,
 CONSTRAINT [PK_Users_ID] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_users_gsm] UNIQUE NONCLUSTERED 
(
	[gsmNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_users_username] UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ConferenceRequests] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[Contacts] ADD  DEFAULT ((1)) FOR [activeState]
GO
ALTER TABLE [dbo].[Guests] ADD  DEFAULT ((0)) FOR [cardId]
GO
ALTER TABLE [dbo].[Guests] ADD  DEFAULT ('') FOR [username]
GO
ALTER TABLE [dbo].[Guests] ADD  DEFAULT ((1)) FOR [activeState]
GO
ALTER TABLE [dbo].[Guests] ADD  DEFAULT ('NoCompanyName') FOR [companyName]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((1)) FOR [activeState]
GO
ALTER TABLE [dbo].[ConferenceApprovals]  WITH CHECK ADD FOREIGN KEY([overseerId])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[ConferenceApprovals]  WITH CHECK ADD FOREIGN KEY([requestId])
REFERENCES [dbo].[ConferenceRequests] ([requestId])
GO
ALTER TABLE [dbo].[ConferenceApprovals]  WITH CHECK ADD  CONSTRAINT [FK_ConferenceApprovals_ConferenceRequests] FOREIGN KEY([requestId])
REFERENCES [dbo].[ConferenceRequests] ([requestId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ConferenceApprovals] CHECK CONSTRAINT [FK_ConferenceApprovals_ConferenceRequests]
GO
ALTER TABLE [dbo].[ConferenceParticipants]  WITH CHECK ADD FOREIGN KEY([participantId])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[ConferenceParticipants]  WITH CHECK ADD FOREIGN KEY([requestId])
REFERENCES [dbo].[ConferenceRequests] ([requestId])
GO
ALTER TABLE [dbo].[ConferenceParticipants]  WITH CHECK ADD  CONSTRAINT [FK_ConferenceParticipants_ConferenceRequests] FOREIGN KEY([requestId])
REFERENCES [dbo].[ConferenceRequests] ([requestId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ConferenceParticipants] CHECK CONSTRAINT [FK_ConferenceParticipants_ConferenceRequests]
GO
ALTER TABLE [dbo].[ConferenceRequests]  WITH CHECK ADD FOREIGN KEY([conferenceId])
REFERENCES [dbo].[Conferences] ([conferenceId])
GO
ALTER TABLE [dbo].[ConferenceRequests]  WITH CHECK ADD FOREIGN KEY([requesterId])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Conferences]  WITH CHECK ADD FOREIGN KEY([roomId])
REFERENCES [dbo].[MeetingRooms] ([roomId])
GO
ALTER TABLE [dbo].[Guests]  WITH CHECK ADD  CONSTRAINT [PK_Guests_Users] FOREIGN KEY([userId])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Guests] CHECK CONSTRAINT [PK_Guests_Users]
GO
ALTER TABLE [dbo].[MeetingRooms]  WITH CHECK ADD FOREIGN KEY([overseerId])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Notifications]  WITH CHECK ADD FOREIGN KEY([requestId])
REFERENCES [dbo].[ConferenceRequests] ([requestId])
GO
ALTER TABLE [dbo].[Notifications]  WITH CHECK ADD FOREIGN KEY([userId])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[RandezvousIn]  WITH CHECK ADD  CONSTRAINT [Fk_RandesvousIn_Contact] FOREIGN KEY([contactId])
REFERENCES [dbo].[Contacts] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[RandezvousIn] CHECK CONSTRAINT [Fk_RandesvousIn_Contact]
GO
ALTER TABLE [dbo].[RandezvousIn]  WITH CHECK ADD  CONSTRAINT [Fk_RandesvousIn_User] FOREIGN KEY([userId])
REFERENCES [dbo].[Users] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[RandezvousIn] CHECK CONSTRAINT [Fk_RandesvousIn_User]
GO
ALTER TABLE [dbo].[UserContacts]  WITH CHECK ADD  CONSTRAINT [FK_UserContacts_Contacts] FOREIGN KEY([contactId])
REFERENCES [dbo].[Contacts] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserContacts] CHECK CONSTRAINT [FK_UserContacts_Contacts]
GO
ALTER TABLE [dbo].[UserContacts]  WITH CHECK ADD  CONSTRAINT [FK_UserContacts_Users] FOREIGN KEY([userId])
REFERENCES [dbo].[Users] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserContacts] CHECK CONSTRAINT [FK_UserContacts_Users]
GO
/****** Object:  StoredProcedure [dbo].[AddExistingContact]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddExistingContact]
	@gsmNumber VARCHAR(100),
	@username VARCHAR(100),
	@id int OUTPUT
AS
BEGIN
	INSERT INTO UserContacts(userId, contactId)
	VALUES((SELECT id FROM users
	WHERE username = @username),
	(SELECT id FROM contacts
	WHERE gsmNumber = @gsmNumber))

	SELECT @id = id FROM Contacts
	WHERE gsmNumber = @gsmNumber

	
END
GO
/****** Object:  StoredProcedure [dbo].[AddGuest]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddGuest]
	@firstName VARCHAR(100),
	@lastName VARCHAR(100),
	@cardId INT,
	@userId INT,
	@companyName VARCHAR(100),
	@id INT OUTPUT
AS
BEGIN
	
	IF NOT EXISTS (
	SELECT * FROM Guests
	WHERE cardId = @cardId AND cardSubmitDate IS NULL
	)
	BEGIN 
		INSERT INTO Guests(firstName, lastName, acquisitionTime, cardId, userId, companyName)
		VALUES (@firstName, @lastName, GETDATE(), @cardId, @userId, @companyName)
		SET @id = SCOPE_IDENTITY()
	END

	ELSE
		BEGIN
			PRINT 'Kart hala kullanımda'
		END
END
GO
/****** Object:  StoredProcedure [dbo].[AddMeeting]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddMeeting] 
	@userId INT,
	@contactId INT,
	@startDate DATETIME,
	@endDate DATETIME,
	@notes VARCHAR(255)
AS
BEGIN
	INSERT INTO RandezvousIn(userId, contactId, startDate, endDate, notes,activeState)
	VALUES(@userId, @contactId, @startDate, @endDate, @notes, 1)
END
GO
/****** Object:  StoredProcedure [dbo].[BringMeetingBack]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[BringMeetingBack]
	@meetingId INT
AS
BEGIN
 UPDATE RandezvousIn
 SET activeState = 1
 WHERE meetingId = @meetingId
END
GO
/****** Object:  StoredProcedure [dbo].[ChangePassword]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ChangePassword]
	@id VARCHAR(100),
	@password VARCHAR(255)
AS
BEGIN
	UPDATE Users
	SET Users.password = @password
	WHERE id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[CloseGuest]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CloseGuest]
	@id INT,
	@cardSubmitDate DATETIME
AS
BEGIN
	UPDATE Guests
	SET cardSubmitDate = @cardSubmitDate
	WHERE id = id
END
GO
/****** Object:  StoredProcedure [dbo].[ConferenceAcceptRequest]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ConferenceAcceptRequest]
	@requestId INT,
	@participantId INT

AS
BEGIN
	UPDATE ConferenceParticipants
	SET accepted = 1
	WHERE requestId = @requestId AND participantId = @participantId
END
GO
/****** Object:  StoredProcedure [dbo].[ConferenceAddParticipant]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ConferenceAddParticipant]
	@requestId INT,
	@participantId INT
AS
BEGIN
	INSERT INTO ConferenceParticipants(requestId, participantId, accepted)
	VALUES (@requestId, @participantId, 0)
END
GO
/****** Object:  StoredProcedure [dbo].[ConferenceCheckAllParticipantsAccepted]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ConferenceCheckAllParticipantsAccepted]
	@requestId INT
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM ConferenceParticipants WHERE requestId = @requestId AND accepted = 0)
		BEGIN 
			SELECT 1 AS AllAccepted
		END
		ELSE
		BEGIN 
			SELECT 0 AS AllAccepted
		END
END
GO
/****** Object:  StoredProcedure [dbo].[ConferenceCheckApproved]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ConferenceCheckApproved]
	@requestId INT
AS
BEGIN
	SELECT approved FROM ConferenceApprovals WHERE requestId = @requestId
END
GO
/****** Object:  StoredProcedure [dbo].[ConferenceCreate]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ConferenceCreate]
	@roomId INT,
	@topic VARCHAR(255),
	@description VARCHAR(255),
	@notes VARCHAR(255),
	@startDate DATETIME,
	@endDate DATETIME,
	@conferenceId INT OUTPUT

AS
BEGIN
	INSERT INTO Conferences(roomId, topic, description, notes, startDate, endDate)
	VALUES (@roomId, @topic, @description, @notes, @startDate, @endDate)
	SET @conferenceId = SCOPE_IDENTITY();
END
GO
/****** Object:  StoredProcedure [dbo].[ConferenceListMeetingRooms]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[ConferenceListMeetingRooms]
AS
BEGIN
    SELECT m.*,
           c.conferenceId,
           c.topic,
           c.description,
           c.startDate,
           c.endDate,
           ISNULL(c.roomStatus, 'Not In Use') as roomStatus
    FROM MeetingRooms m
    LEFT JOIN (
        SELECT conf.*,
               'In Use' as roomStatus
        FROM Conferences conf
        INNER JOIN ConferenceRequests req ON conf.conferenceId = req.conferenceId
        WHERE GETDATE() BETWEEN conf.startDate AND conf.endDate
          --AND req.status = 'accepted'
    ) c ON m.roomId = c.roomId;
END
GO
/****** Object:  StoredProcedure [dbo].[ConferenceListNotifications]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ConferenceListNotifications]

	@participantId INT

AS
BEGIN
	SELECT * FROM Notifications
	WHERE userId = @participantId
END

GO
/****** Object:  StoredProcedure [dbo].[ConferenceListPendingApprovals]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ConferenceListPendingApprovals]
    @overseerId INT
AS
BEGIN
    SELECT 
        r.requestId,
        c.conferenceId,
        c.topic,
        c.description,
        c.notes,
        c.startDate,
        c.endDate,
        u.firstName AS requesterFirstName,
        u.lastName AS requesterLastName,
        u.email AS requesterEmail
--        p.participantId
    FROM 
        ConferenceRequests r
    INNER JOIN 
        Conferences c ON r.conferenceId = c.conferenceId
    INNER JOIN 
        Users u ON r.requesterId = u.id
--    INNER JOIN 
--        ConferenceParticipants p ON r.requestId = p.requestId
    WHERE 
        c.roomId IN (SELECT roomId FROM MeetingRooms WHERE overseerId = @overseerId)
    AND 
        r.requestId NOT IN (SELECT requestId FROM ConferenceApprovals)
    AND 
        NOT EXISTS (SELECT 1 FROM ConferenceParticipants WHERE requestId = r.requestId AND accepted = 0)
	AND
		isActive = 1
END
GO
/****** Object:  StoredProcedure [dbo].[ConferenceListPendingParticipants]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ConferenceListPendingParticipants]

	@participantId INT
AS
BEGIN

	SELECT 
        r.requestId,
        c.conferenceId,
        c.topic,
        c.description,
        c.notes,
        c.startDate,
        c.endDate,
        u.firstName AS requesterFirstName,
        u.lastName AS requesterLastName,
        u.email AS requesterEmail,
		u.id AS requesterId,
        p.participantId,
		c.roomId
    FROM 
        ConferenceRequests r
    INNER JOIN 
        Conferences c ON r.conferenceId = c.conferenceId
    INNER JOIN 
        Users u ON r.requesterId = u.id
    INNER JOIN 
        ConferenceParticipants p ON r.requestId = p.requestId
    WHERE 
        p.participantId = @participantId
    AND
        p.accepted = 0

END
GO
/****** Object:  StoredProcedure [dbo].[ConferenceNewMeetingRoom]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ConferenceNewMeetingRoom]
	@overseerId INT,
	@capacity INT,
	@roomId INT OUTPUT
AS
BEGIN
	INSERT INTO MeetingRooms(overseerId, capacity)
	VALUES (@overseerId, @capacity)
	SET @roomId = SCOPE_IDENTITY()
END
GO
/****** Object:  StoredProcedure [dbo].[ConferenceNewRequest]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ConferenceNewRequest]
	@conferenceId INT,
	@requesterId INT,
	@requestId INT OUTPUT
AS
BEGIN
	INSERT INTO ConferenceRequests (conferenceId, requesterId, status)
	VALUES (@conferenceId, @requesterId, 'Pending')
	SET @requestId = SCOPE_IDENTITY()
END
GO
/****** Object:  StoredProcedure [dbo].[ConferenceOverseerApprove]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ConferenceOverseerApprove]
	@requestId INT,
	@overseerId INT

AS
BEGIN
UPDATE ConferenceRequests
	SET status = 'accepted'
	WHERE requestId = @requestId
		AND EXISTS (
			SELECT 1
			FROM MeetingRooms
			WHERE overseerId = @overseerId
				AND roomId = (SELECT roomId FROM Conferences WHERE conferenceId = (SELECT conferenceId FROM ConferenceRequests WHERE requestId = @requestId))
		);
		
	IF @@ROWCOUNT > 0
	BEGIN
		INSERT INTO ConferenceApprovals (requestId, overseerId, approved)
		VALUES (@requestId, @overseerId, 1);
	END
END
GO
/****** Object:  StoredProcedure [dbo].[ConferenceParticipantRejectRequest]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ConferenceParticipantRejectRequest]
	@requestId INT,
	@participantId INT --this is blank, need for a more efficient backend.
AS
BEGIN
	DELETE FROM ConferenceRequests WHERE requestId = @requestId
END

GO
/****** Object:  StoredProcedure [dbo].[ConferenceRejectRequest]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ConferenceRejectRequest]
	@requestId INT,
	@overseerId INT
AS
BEGIN
	
	UPDATE ConferenceRequests
	SET status = 'rejected'
	WHERE requestId = @requestId
		AND EXISTS (
			SELECT 1
			FROM MeetingRooms
			WHERE overseerId = @overseerId
				AND roomId = (SELECT roomId FROM Conferences WHERE conferenceId = (SELECT conferenceId FROM ConferenceRequests WHERE requestId = @requestId))
		);
		
	IF @@ROWCOUNT > 0
	BEGIN
	UPDATE ConferenceRequests
	SET isActive = 0
	WHERE requestId = @requestId
	END
END
GO
/****** Object:  StoredProcedure [dbo].[ConferenceUpdateData]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ConferenceUpdateData]
	@conferenceId INT,
	@topic VARCHAR(255),
	@description VARCHAR(255),
	@notes VARCHAR(255),
	@startDate DATETIME,
	@endDate DATETIME
AS
BEGIN
	UPDATE Conferences
	SET topic = @topic, 
	description = @description,
	notes = @notes,
	startDate = @startDate,
	endDate = @endDate
	WHERE conferenceId = @conferenceId
END
GO
/****** Object:  StoredProcedure [dbo].[CreateContact]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateContact]
	@name VARCHAR(100),
	@surname VARCHAR(100),
	@gsmNum VARCHAR(100),
	@email VARCHAR(100),
	@address VARCHAR(100),
	@userId INT,
	@id INT OUTPUT
AS
BEGIN
	IF EXISTS (SELECT 1 FROM contacts WHERE gsmNumber = @gsmNum)
	BEGIN
			INSERT INTO UserContacts(userId, contactId)
			VALUES(@userId,
			(SELECT id FROM contacts
			WHERE gsmNumber = @gsmNum))

			SELECT @id = id FROM Contacts
			WHERE gsmNumber = @gsmNum
	END

	ELSE
	BEGIN
		INSERT INTO contacts (firstName, lastName, gsmNumber, email, address)
		VALUES (@name, @surname, @gsmNum, @email, @address)
		SET  @id = SCOPE_IDENTITY()

		INSERT INTO UserContacts(userId, contactId)
		values(@userId, @id)
		
	END
END
GO
/****** Object:  StoredProcedure [dbo].[CreateMeetingRoom]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateMeetingRoom]
    @roomCapacity INT,
    @overseerId INT
AS
BEGIN
    INSERT INTO MeetingRoom (roomCapacity, overseerId)
    VALUES (@roomCapacity, @overseerId)
END
GO
/****** Object:  StoredProcedure [dbo].[CreateParticipantRequest]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[CreateParticipantRequest]
	@userId INT,
	@conferenceId INT
AS
BEGIN
	INSERT INTO Participants(userId, conferenceId)
	VALUES (@userId, @conferenceId)
END
GO
/****** Object:  StoredProcedure [dbo].[CreateUser]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateUser]
	@username VARCHAR(100),
	@name VARCHAR(100),
	@surname VARCHAR(100),
	@gsmNum VARCHAR(100),
	@email VARCHAR(100),
	@role VARCHAR(100),
	@address VARCHAR(100),
	@password VARCHAR(100),
	@id INT OUTPUT
AS
BEGIN
	INSERT INTO users(firstName, lastName, username, email, role, address, gsmNumber, password)
	VALUES(@name, @surname, @username, @email, @role, @address, @gsmNum, @password)
	SET @id = SCOPE_IDENTITY()
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteGuest]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DeleteGuest]
	@id INT
AS
BEGIN
	DELETE FROM Guests
	WHERE id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteMeeting]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteMeeting]
	@meetingId INT
AS
BEGIN
	IF(SELECT 1 FROM RandezvousIn WHERE meetingId = @meetingId AND activeState = 0) > 0
		BEGIN
		DELETE FROM RandezvousIn
		WHERE meetingId = @meetingId AND activeState = 0
		END

	ELSE
		BEGIN
		Update RandezvousIn
		SET activeState = 0
		WHERE meetingId = @meetingId
		END
	

END
GO
/****** Object:  StoredProcedure [dbo].[GuestList]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GuestList]
	@userId INT,
	@startDate DATETIME,
	@endDate DATETIME
AS
BEGIN
	SELECT * FROM Guests
	WHERE userId = @userId

END
GO
/****** Object:  StoredProcedure [dbo].[ObtainCard]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ObtainCard]
	@cardId INT,
	@id INT
AS
BEGIN

	UPDATE Guests
	SET cardSubmitDate = GETDATE()
	WHERE cardId = @cardId AND id = @id

END
GO
/****** Object:  StoredProcedure [dbo].[RemoveConferenceRoom]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[RemoveConferenceRoom]
	@roomId INT
AS
BEGIN

	DELETE FROM MeetingRooms
	WHERE roomId = @roomId

END
GO
/****** Object:  StoredProcedure [dbo].[RemoveContact]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RemoveContact]
	@id INT
AS
BEGIN
	DELETE FROM contacts
	WHERE id = @id

END
GO
/****** Object:  StoredProcedure [dbo].[RemoveUser]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RemoveUser]
	@id INT
AS
BEGIN

	DELETE FROM users
	WHERE id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[RetrieveData]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RetrieveData]
	@id INT,
	@contactSearch VARCHAR(100),
	@activeState BINARY
AS
BEGIN
	SELECT c.*
	FROM contacts c
	JOIN UserContacts uc ON c.id = uc.contactId
	JOIN users u ON uc.userId = u.id
	WHERE u.id = @id AND c.username LIKE '%' + @contactSearch + '%' AND c.activeState = @activeState
END
GO
/****** Object:  StoredProcedure [dbo].[RetrieveDeletedContact]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RetrieveDeletedContact]
	@id INT
AS
BEGIN

	UPDATE Contacts
	SET activeState = 1
	WHERE id = @id

END
GO
/****** Object:  StoredProcedure [dbo].[RetrieveDeletedUser]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[RetrieveDeletedUser]
	@id INT
AS
BEGIN
	UPDATE Users 
	Set activeState = 1
	WHERE id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[RetrieveGuests]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RetrieveGuests]
	@username VARCHAR(100),
	@startDate DATETIME,
	@endDate DATETIME,
	@companyName VARCHAR(100)

AS
BEGIN
	SELECT u.firstName userFirstname, u.lastName userLastname, u.username userUsername, u.email, u.address, u.email, u.gsmNumber, u.role, g.*  FROM Guests g
	JOIN Users u ON g.userId = u.id
	WHERE g.username LIKE '%' + @username + '%' AND cardSubmitDate IS NOT NULL
	AND  acquisitionTime >= @startDate AND acquisitionTime <= @endDate
	AND LOWER(companyName) LIKE '%' + LOWER(@companyName) + '%'
END
GO
/****** Object:  StoredProcedure [dbo].[RetrieveGuestsInside]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RetrieveGuestsInside]
	@username VARCHAR(100),
	@startDate DATETIME,
	@endDate DATETIME,
	@companyName VARCHAR(100)
AS
BEGIN
	SELECT u.firstName userFirstname, u.lastName userLastname, u.username userUsername, u.email, u.address, u.email, u.gsmNumber, u.role, g.*  FROM Guests g
	JOIN Users u ON g.userId = u.id
	WHERE g.username LIKE '%' + @username + '%' AND cardSubmitDate IS NULL
	AND  acquisitionTime >= @startDate AND acquisitionTime <= @endDate
	AND LOWER(companyName) LIKE '%' + LOWER(@companyName) + '%'
END

GO
/****** Object:  StoredProcedure [dbo].[RetrieveMeetings]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RetrieveMeetings]
	@userId INT,
	@activeState BINARY,
	@startInterval DATETIME,
	@endInterval DATETIME,
	@usernameSearch VARCHAR(100)
AS
BEGIN
	SELECT r.*, c.* FROM RandezvousIn r
	JOIN Users u ON r.userId = u.id
	JOIN Contacts c ON r.contactId = c.id
	WHERE userId  = @userId AND r.activeState = @activeState AND c.activeState = 1 and r.endDate > GETDATE()
	AND r.startDate >= @startInterval AND startDate <= @endInterval
	AND c.username LIKE '%' + @usernameSearch + '%'

END
GO
/****** Object:  StoredProcedure [dbo].[RetrievePreviousMeetings]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RetrievePreviousMeetings]
	@userId INT,
	@activeState BINARY,
	@startInterval DATETIME,
	@endInterval DATETIME,
	@usernameSearch VARCHAR(100)
AS
BEGIN

SELECT r.*, c.* FROM RandezvousIn r
	JOIN Users u ON r.userId = u.id
	JOIN Contacts c ON r.contactId = c.id
	WHERE userId  = @userId AND r.activeState = @activeState AND c.activeState = 1 and r.endDate <= GETDATE() 
	AND r.startDate >= @startInterval AND startDate <= @endInterval
	AND c.username LIKE '%' + @usernameSearch + '%'

END
GO
/****** Object:  StoredProcedure [dbo].[RetrieveUserContacts]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RetrieveUserContacts]
	@username VARCHAR(255)
AS
BEGIN
	
	SELECT c.*
	FROM users u
	JOIN UserContacts uc ON u.id = uc.userId
	JOIN contacts c ON uc.contactId = c.id
	WHERE u.email = @username

END
GO
/****** Object:  StoredProcedure [dbo].[RetrieveUsers]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[RetrieveUsers]
	@userSearch VARCHAR(100),
	@activeState BINARY
AS
BEGIN
	SELECT * FROM users
	WHERE username LIKE '%' + @userSearch + '%' AND activeState = @activeState

END
GO
/****** Object:  StoredProcedure [dbo].[SevereUserContact]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SevereUserContact]
	@userId INT,
	@contactId INT
AS
BEGIN
	DELETE FROM UserContacts 
	WHERE userId = @userId
	AND contactId = @contactId

END
GO
/****** Object:  StoredProcedure [dbo].[SoftDeleteFromContacts]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SoftDeleteFromContacts]

	@id INT
AS
BEGIN

UPDATE Contacts
SET activeState = 0
WHERE id = @id

END
GO
/****** Object:  StoredProcedure [dbo].[SoftDeleteFromUsers]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SoftDeleteFromUsers]
	
	@id INT

AS
BEGIN

UPDATE Users
SET activeState = 0
WHERE id = @id

END
GO
/****** Object:  StoredProcedure [dbo].[SoftDeleteMeeting]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SoftDeleteMeeting]
	@userId INT,
	@contactId INT,
	@startDate DATETIME
AS
BEGIN

	Update RandezvousIn
	SET activeState = 0
	WHERE userId = @userId AND contactId = @contactId AND startDate = @startDate

END
GO
/****** Object:  StoredProcedure [dbo].[UpdateContact]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateContact]
	@name VARCHAR(100),
	@surname VARCHAR(100),
	@gsmNum VARCHAR(100),
	@email VARCHAR(100),
	@address VARCHAR(100),
	@id INT
AS
BEGIN
	UPDATE contacts
	SET firstName = @name,
		lastName = @surname,
		gsmNumber= @gsmNum,
		email = @email,
		address = @address
		WHERE id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateMeeting]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateMeeting]
	@userId INT,
	@contactId INT,
	@newStartDate DATETIME,
	@endDate DATETIME,
	@notes VARCHAR(255),
	@meetingId INT
AS
BEGIN
	UPDATE RandezvousIn
	SET startDate = @newStartDate,
	endDate = @endDate,
	notes = @notes
	WHERE meetingId = @meetingId
END

GO
/****** Object:  StoredProcedure [dbo].[UpdateUser]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateUser]
	@username VARCHAR(100),
	@name VARCHAR(100),
	@surname VARCHAR(100),
	@gsmNum VARCHAR(100),
	@email VARCHAR(100),
	@address VARCHAR(100),
	@password VARCHAR(100),
	@role VARCHAR(100),
	@id INT
AS
BEGIN
	UPDATE users
	SET firstName = @name,
		lastName = @surname,
		gsmNumber = @gsmNum,
		email = @email,
		username = @username, 
		address = @address,
		password = @password,
		role = @role
		WHERE id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[VerifyUnamePwd]    Script Date: 07/08/2023 08:53:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[VerifyUnamePwd]
	@email VARCHAR(255),
	@password VARCHAR(255)

AS
BEGIN
	SELECT * FROM users WHERE email = @email AND @password = password AND activeState != 0;
END;
GO
USE [master]
GO
ALTER DATABASE [PhoneDirectory] SET  READ_WRITE 
GO
