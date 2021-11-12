-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 13, 2021 at 09:32 AM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `JuMJWPpv2T`
--

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `ID` int(10) NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delete` tinyint(3) DEFAULT NULL,
  `createDate` datetime(6) DEFAULT NULL,
  `modifileDate` datetime(6) DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`ID`, `Name`, `delete`, `createDate`, `modifileDate`, `description`) VALUES
(1, 'Pop', 0, '2021-03-13 12:19:40.536000', '2021-03-13 12:19:40.536000', 'Pop is a genre of popular music'),
(2, 'Rock', 0, '2021-03-13 12:23:48.928000', '2021-03-13 12:23:48.928000', 'Rock music is originated as \"rock and roll\"'),
(3, 'Rap', 0, '2021-03-13 12:24:57.007000', '2021-03-13 12:50:05.049000', 'Rapping is a musical form of vocal delivery.'),
(4, 'R&B', 0, '2021-03-13 12:28:16.112000', '2021-03-13 12:50:16.839000', 'Rhythm and blues, often abbreviated as R&B.'),
(5, 'Ballad', 0, '2021-03-13 12:30:35.983000', '2021-03-13 12:50:36.691000', 'A ballad is a form of verse, often a narrative');

-- --------------------------------------------------------

--
-- Table structure for table `Songs`
--

CREATE TABLE `Songs` (
  `ID` int(10) NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Singer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `composer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author` int(10) NOT NULL,
  `views` int(10) DEFAULT NULL,
  `likes` int(10) DEFAULT NULL,
  `comments` int(11) NOT NULL DEFAULT '0',
  `category` int(10) NOT NULL,
  `status` int(10) NOT NULL DEFAULT '0',
  `createDate` datetime(6) DEFAULT NULL,
  `publishDate` datetime(6) DEFAULT NULL,
  `delete` tinyint(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Songs`
--

INSERT INTO `Songs` (`ID`, `Name`, `Singer`, `composer`, `author`, `views`, `likes`, `comments`, `category`, `status`, `createDate`, `publishDate`, `delete`) VALUES
(1, 'Better Now', 'Post Malone', 'Post Malone', 1, 2, 0, 0, 1, 1, '2021-03-13 12:21:42.899000', '2021-03-13 12:21:53.351000', NULL),
(2, 'Without Me', 'Halsey', 'Halsey', 1, 0, 0, 0, 1, 1, '2021-03-13 12:33:14.510000', '2021-03-13 12:33:20.820000', NULL),
(3, 'Bad At Love', 'Halsey', 'Whitney Jackson', 1, 4, 0, 0, 1, 1, '2021-03-13 12:36:41.635000', '2021-03-13 12:36:46.414000', NULL),
(4, 'Sorry', 'Halsey', 'Smile Shine', 1, 0, 0, 0, 1, 1, '2021-03-13 12:41:29.170000', '2021-03-13 13:05:23.542000', NULL),
(5, 'No Guidance', 'Drake, Chris Brown', 'Drake, Chris Brown', 1, 0, 0, 0, 4, 1, '2021-03-13 12:44:05.138000', '2021-03-13 13:06:00.307000', NULL),
(6, 'In My Feelings', 'Drake', 'Drake', 1, 0, 0, 0, 3, 1, '2021-03-13 12:45:06.451000', '2021-03-13 13:07:40.685000', NULL),
(7, 'Hotline Bling', 'Drake', 'Drake', 1, 0, 0, 0, 4, 1, '2021-03-13 13:05:52.242000', '2021-03-13 13:05:58.539000', NULL),
(8, 'We will rock you', 'Queen', 'Queen', 1, 0, 0, 0, 2, 1, '2021-03-13 13:12:34.008000', '2021-03-13 13:12:38.515000', NULL),
(9, 'Talk', 'Khalid', 'Khalid', 1, 0, 0, 0, 1, 1, '2021-03-13 13:15:50.772000', '2021-03-13 13:22:09.937000', NULL),
(10, 'Rock star', 'Post Malone', 'Post Malone', 1, 0, 0, 0, 1, 1, '2021-03-13 13:16:57.993000', '2021-03-13 13:22:11.883000', NULL),
(11, 'Congratulations', 'Post malone, Quavo', 'Post malone, Quavo', 1, 0, 0, 0, 1, 1, '2021-03-13 13:17:55.437000', '2021-03-13 13:22:26.602000', NULL),
(12, 'Humble', 'Kendrick Lamar', 'Kendirck lamar', 1, 0, 0, 0, 3, 1, '2021-03-13 13:18:44.017000', '2021-03-13 13:22:23.883000', NULL),
(13, 'Old Town Road', 'Lil Nasx', 'Lil Nasx', 1, 0, 0, 0, 1, 1, '2021-03-13 13:19:46.092000', '2021-03-13 13:22:20.898000', NULL),
(14, 'See You Again', 'Charlie Puth, Wiz Khalifa', 'Charlie Puth, Wiz Khalifa', 1, 0, 0, 0, 1, 1, '2021-03-13 13:20:37.792000', '2021-03-13 13:22:18.137000', NULL),
(15, 'I\'m The One', 'Justin Bieber, DJ Khaled, Lil Wayne ', 'Justin Bieber, DJ Khaled, Lil Wayne ', 1, 0, 0, 0, 1, 1, '2021-03-13 13:21:50.381000', '2021-03-13 13:22:15.313000', NULL),
(16, 'Love Your Self', 'Justin Bieber', 'Justin Bieber', 1, 1, 0, 0, 1, 1, '2021-03-13 13:28:03.680000', '2021-03-13 15:27:15.176000', NULL),
(17, 'Love The Way You Lie', 'Rihana, Eminem', 'Rihana, Eminem', 1, 0, 0, 0, 1, 1, '2021-03-13 13:30:58.896000', '2021-03-13 15:27:12.750000', NULL),
(18, 'New Divide', 'Linkin Park', 'Linkin Park', 1, 0, 0, 0, 2, 1, '2021-03-13 13:40:19.274000', '2021-03-13 15:27:07.945000', NULL),
(19, 'Thunder', 'Imagine Dragon', 'Imagine Dragon', 1, 0, 0, 0, 2, 1, '2021-03-13 13:42:08.514000', '2021-03-13 15:27:02.983000', NULL),
(20, 'Demons', 'Imagine Dragon', 'Imgine Dragon', 1, 0, 0, 0, 2, 1, '2021-03-13 13:44:15.087000', '2021-03-13 15:27:00.415000', NULL),
(21, 'My demon', 'Starset', 'Starset', 1, 0, 0, 0, 2, 1, '2021-03-13 13:45:06.406000', '2021-03-13 15:26:57.670000', NULL),
(22, 'Centuries', 'Fall out boys', 'Fall out boys', 1, 0, 0, 0, 2, 1, '2021-03-13 13:45:42.000000', '2021-03-13 15:26:55.084000', NULL),
(23, 'Radioactive', 'Imagine Dragon', 'Imagine Dragon', 1, 0, 0, 0, 2, 1, '2021-03-13 13:48:32.548000', '2021-03-13 15:26:52.102000', NULL),
(24, 'Believer', 'Imagine Dragon', 'Imagine Dragon', 1, 0, 0, 0, 2, 1, '2021-03-13 13:52:20.753000', '2021-03-13 15:26:49.133000', NULL),
(25, 'Immortals', 'Fall out boys', 'Fall out boys', 1, 0, 0, 0, 2, 1, '2021-03-13 14:28:18.621000', '2021-03-13 15:26:46.285000', NULL),
(26, 'The phoenix', 'Fall out boys', 'Fall out boys', 1, 0, 0, 0, 2, 1, '2021-03-13 14:30:22.283000', '2021-03-13 15:26:43.664000', NULL),
(27, 'Legend Never Die', 'Against The Current', 'Against The Current', 1, 0, 0, 0, 2, 1, '2021-03-13 14:32:29.892000', '2021-03-13 15:26:40.960000', NULL),
(28, 'Bad liar', 'Imagine Dragon', 'Imagine Dragon', 1, 0, 0, 0, 2, 1, '2021-03-13 14:34:14.095000', '2021-03-13 15:26:38.551000', NULL),
(29, 'Diamonds', 'Rihana', 'Rihana', 1, 0, 0, 0, 5, 1, '2021-03-13 14:36:30.031000', '2021-03-13 15:26:36.365000', NULL),
(30, 'The monster', 'Rihnana, Eminem', 'Rihana, Eminem', 1, 0, 0, 0, 4, 1, '2021-03-13 14:38:03.433000', '2021-03-13 15:26:33.768000', NULL),
(31, 'Not Afraid', 'Eminem', 'Eminem', 1, 0, 0, 0, 3, 1, '2021-03-13 14:38:46.714000', '2021-03-13 15:26:07.422000', NULL),
(32, 'Lose Yourself', 'Eminem', 'Eminem', 1, 0, 0, 0, 3, 1, '2021-03-13 14:39:33.673000', '2021-03-13 15:26:10.201000', NULL),
(33, 'I need a doctor', 'Eminem, Dr Dree', 'Dr Dree', 1, 0, 0, 0, 3, 1, '2021-03-13 14:41:08.282000', '2021-03-13 15:26:14.542000', NULL),
(34, 'Venom', 'Eminem', 'Eminem', 1, 0, 0, 0, 3, 1, '2021-03-13 14:42:00.000000', '2021-03-13 15:26:00.887000', NULL),
(35, 'Rap god', 'Eminem', 'Eminem', 1, 0, 0, 0, 3, 1, '2021-03-13 14:44:52.663000', '2021-03-13 15:26:04.255000', NULL),
(36, '7 Rings', 'Ariana Grande', 'Ariana Grande', 1, 0, 0, 0, 4, 1, '2021-03-13 14:45:54.600000', '2021-03-13 15:26:20.384000', NULL),
(37, 'Blank space', 'Taylor swift', 'Taylor swift', 1, 0, 0, 0, 4, 1, '2021-03-13 14:47:25.823000', '2021-03-13 15:26:24.006000', NULL),
(38, 'Wolves', 'Selena Gomez', 'Selena Gomez', 1, 0, 0, 0, 4, 1, '2021-03-13 14:48:14.881000', '2021-03-13 15:26:26.329000', NULL),
(39, 'There for you', 'Troy Sivan', 'Martin Garix', 1, 0, 0, 0, 4, 1, '2021-03-13 14:49:10.294000', '2021-03-13 15:26:28.822000', NULL),
(40, 'So far away ', 'Jamin Scott', 'Martin Garix', 1, 0, 0, 0, 4, 1, '2021-03-13 14:50:01.482000', '2021-03-13 15:26:31.150000', NULL),
(41, 'This is what you came for', 'Rihana, Eminem', 'Rihana, Eminem', 1, 0, 0, 0, 4, 1, '2021-03-13 14:51:01.248000', '2021-03-13 15:25:56.671000', NULL),
(42, 'How deep is your love', 'Calvin Harris, disciple', 'Calvin Harris', 1, 0, 0, 0, 4, 1, '2021-03-13 14:52:32.566000', '2021-03-13 15:25:53.815000', NULL),
(43, 'Summer', 'Calvin harris', 'Calvin Harris', 1, 0, 0, 0, 4, 1, '2021-03-13 14:53:27.988000', '2021-03-13 15:25:50.625000', NULL),
(44, 'Titanium', 'David Guetta, Sia', 'David Guetta', 1, 0, 0, 0, 4, 1, '2021-03-13 14:54:20.777000', '2021-03-13 15:25:47.752000', NULL),
(45, 'Thunder Clouds', 'L.S.D', 'L.S.D', 1, 0, 0, 0, 4, 1, '2021-03-13 14:55:17.962000', '2021-03-13 15:25:44.921000', NULL),
(46, 'Cheap Thrills', 'Sia', 'Sia', 1, 0, 0, 0, 5, 1, '2021-03-13 14:56:07.942000', '2021-03-13 15:25:42.031000', NULL),
(47, 'Just give me a reason', 'Pink, Nate Ruess', 'Pink, Nate Ruess', 1, 0, 0, 0, 5, 1, '2021-03-13 14:57:19.120000', '2021-03-13 15:25:39.358000', NULL),
(48, 'Bang Bang', 'Jessie J, Ariana Grande', 'Jessie J, Ariana Grande', 1, 0, 0, 0, 5, 1, '2021-03-13 14:58:03.890000', '2021-03-13 15:25:35.663000', NULL),
(49, 'Wrecking ball', 'Miley Cyrus', 'Miley Cyrus', 1, 0, 0, 0, 5, 1, '2021-03-13 14:58:52.896000', '2021-03-13 15:25:32.606000', NULL),
(50, 'Side to side', 'Ariana Grande', 'Ariana Grande', 1, 0, 0, 0, 5, 1, '2021-03-13 15:00:08.148000', '2021-03-13 15:25:29.616000', NULL),
(51, 'Timber', 'Pitbull', 'Pitbull', 1, 0, 0, 0, 3, 1, '2021-03-13 15:00:42.198000', '2021-03-13 15:25:06.249000', NULL),
(52, 'Lovely', 'Khalid, Billie Eilish', 'Khalid, Billie Eilish', 1, 0, 0, 0, 5, 0, '2021-03-13 15:04:08.885000', NULL, NULL),
(53, 'All of me', 'John legend', 'Johen legend', 1, 0, 0, 0, 5, 0, '2021-03-13 15:08:06.100000', NULL, NULL),
(54, 'Like I\'m gonna lose you', 'Johen legend, Meghan Tranor', 'Johen legend, Meghan Tranor', 1, 0, 0, 0, 5, 1, '2021-03-13 15:09:46.573000', '2021-03-13 15:25:09.630000', NULL),
(55, 'Love me like you do', 'Ellie Goulding', 'Ellie Goulding', 1, 0, 0, 0, 5, 1, '2021-03-13 15:11:09.635000', '2021-03-13 15:25:13.215000', NULL),
(56, 'Too good at good bye', 'Sam Smith', 'Sam Smith', 1, 0, 0, 0, 5, 1, '2021-03-13 15:12:57.770000', '2021-03-13 15:25:16.167000', NULL),
(57, 'Let her go', 'Passenger', 'Passenger', 1, 0, 0, 0, 5, 1, '2021-03-13 15:14:08.236000', '2021-03-13 15:25:18.736000', NULL),
(58, 'Taste ', 'Tyga, Offset', 'Tyga', 1, 0, 0, 0, 3, 1, '2021-03-13 15:15:58.908000', '2021-03-13 15:25:21.574000', NULL),
(59, 'Let me love you', 'Lil wayne, Ariana Grande', 'Lil wayne, Ariana Grande', 1, 0, 0, 0, 3, 1, '2021-03-13 15:19:09.248000', '2021-03-13 15:25:24.296000', NULL),
(60, 'Taki taki', 'Cardi B, Selena Gomez', 'Dj Snake', 1, 0, 0, 0, 3, 1, '2021-03-13 15:20:39.637000', '2021-03-13 15:25:26.600000', NULL),
(61, 'Woman like me', 'Little Mix, Nicky Minaj', 'Little Mix, Nicky Minaj', 1, 0, 0, 0, 3, 1, '2021-03-13 15:24:34.911000', '2021-03-13 15:25:00.826000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `ID` int(10) NOT NULL,
  `userName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `gender` tinyint(3) DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permision` int(10) NOT NULL,
  `delete` tinyint(3) DEFAULT NULL,
  `createDate` datetime(6) DEFAULT NULL,
  `modifileDate` datetime(6) DEFAULT NULL,
  `status` int(10) DEFAULT NULL,
  `activeToken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refreshToken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`ID`, `userName`, `password`, `email`, `DOB`, `gender`, `avatar`, `permision`, `delete`, `createDate`, `modifileDate`, `status`, `activeToken`, `refreshToken`) VALUES
(1, 'hieuttm', '$2b$08$T9Q664DzRpKOFv9Y1KkUv.tBcCenCfekCTDkFPvdZ2nXeKq3YC88q', 'ttmhieu08@gmail.com', '2000-12-15', NULL, NULL, 1, 0, '2021-03-13 12:14:14.000000', '2021-03-13 12:14:14.000000', 1, NULL, NULL),
(2, 'user', '$2b$08$LTRkDyfxxW7kcOaJq49AIOg45B/.eVi8a/P8FpUYi4oJ9N7uxe0Cm', 'user@gmail.com', '2021-03-13', 1, NULL, 0, 0, '2021-03-13 16:30:43.356000', '2021-03-13 16:30:43.356000', 1, NULL, NULL),
(3, 'admin', '$2b$08$yOHdK0my9V9XxyV9Hd/nI.dDexXEJBC2QeUS8ShWW3YRAHQtf40Oe', 'admin@gmail.com', '2021-03-13', 1, NULL, 1, 0, '2021-03-13 16:31:00.251000', '2021-03-13 16:31:00.251000', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Users_Comments`
--

CREATE TABLE `Users_Comments` (
  `ID` int(10) NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `User` int(10) NOT NULL,
  `Song` int(10) NOT NULL,
  `delete` tinyint(3) DEFAULT NULL,
  `createDate` datetime(6) DEFAULT NULL,
  `modifileDate` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users_Favorite_Songs`
--

CREATE TABLE `Users_Favorite_Songs` (
  `User` int(10) NOT NULL,
  `Song` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users_like_Songs`
--

CREATE TABLE `Users_like_Songs` (
  `User` int(10) NOT NULL,
  `Song` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Songs`
--
ALTER TABLE `Songs`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `author` (`author`);
ALTER TABLE `Songs` ADD FULLTEXT KEY `Name` (`Name`,`Singer`,`composer`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Users_Comments`
--
ALTER TABLE `Users_Comments`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKUsers_Comm215024` (`User`),
  ADD KEY `FKUsers_Comm193966` (`Song`);

--
-- Indexes for table `Users_Favorite_Songs`
--
ALTER TABLE `Users_Favorite_Songs`
  ADD PRIMARY KEY (`User`,`Song`),
  ADD KEY `FKUsers_Favo456767` (`User`),
  ADD KEY `FKUsers_Favo477825` (`Song`);

--
-- Indexes for table `Users_like_Songs`
--
ALTER TABLE `Users_like_Songs`
  ADD PRIMARY KEY (`User`,`Song`),
  ADD KEY `FKUsers_like408315` (`User`),
  ADD KEY `FKUsers_like387257` (`Song`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Songs`
--
ALTER TABLE `Songs`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Users_Comments`
--
ALTER TABLE `Users_Comments`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Songs`
--
ALTER TABLE `Songs`
  ADD CONSTRAINT `author` FOREIGN KEY (`author`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Users_Comments`
--
ALTER TABLE `Users_Comments`
  ADD CONSTRAINT `FKUsers_Comm193966` FOREIGN KEY (`Song`) REFERENCES `Songs` (`id`),
  ADD CONSTRAINT `FKUsers_Comm215024` FOREIGN KEY (`User`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Users_Favorite_Songs`
--
ALTER TABLE `Users_Favorite_Songs`
  ADD CONSTRAINT `FKUsers_Favo456767` FOREIGN KEY (`User`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `FKUsers_Favo477825` FOREIGN KEY (`Song`) REFERENCES `Songs` (`id`);

--
-- Constraints for table `Users_like_Songs`
--
ALTER TABLE `Users_like_Songs`
  ADD CONSTRAINT `FKUsers_like387257` FOREIGN KEY (`Song`) REFERENCES `Songs` (`id`),
  ADD CONSTRAINT `FKUsers_like408315` FOREIGN KEY (`User`) REFERENCES `Users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
