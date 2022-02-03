-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2022 at 11:35 AM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `apartment`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `NAME` varchar(30) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `GENDER` varchar(11) DEFAULT NULL,
  `RELIGION` varchar(20) DEFAULT NULL,
  `NATIONALITY` varchar(30) DEFAULT NULL,
  `PASSWORD` varchar(30) DEFAULT NULL,
  `ID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `complaint`
--

CREATE TABLE IF NOT EXISTS `complaint` (
  `Name` varchar(20),
   `Number` int(10),
   `email` varchar(50),
  `MESSAGE` varchar(100) DEFAULT NULL,
  `DATE` date DEFAULT NULL,
  `BLOCK` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `NAME` varchar(30) DEFAULT NULL,
  `DATE` date DEFAULT NULL,
  `TIME` time DEFAULT NULL,
  `BLOCK` varchar(1) DEFAULT NULL,
  `SENDER_FLAT_NO` varchar(10) DEFAULT NULL,
  `RECEIVER_FLAT_NO` varchar(10) DEFAULT NULL,
  `VENUE` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `flat`
--

CREATE TABLE IF NOT EXISTS `flat` (
  `ROOM_NO` int(11) NOT NULL DEFAULT '0',
  `TENANT_ID` varchar(10) DEFAULT NULL,
  `BLOCK` varchar(1) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `gate`
--

CREATE TABLE IF NOT EXISTS `gate` (
  `GATE_NO` int(11) DEFAULT NULL,
  `GUARD_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `guard`
--

CREATE TABLE IF NOT EXISTS `guard` (
  `NAME` varchar(30) DEFAULT NULL,
  `PHONE_NO` int(11) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `GUARD_ID` int(11) NOT NULL,
  `GENDER` varchar(1) DEFAULT NULL,
  `SALARY` bigint(20) DEFAULT NULL,
  `ADHAAR` bigint(20) DEFAULT NULL,
  `ADDRESS` varchar(50) DEFAULT NULL,
  `NATIONALITY` varchar(30) DEFAULT NULL,
  `RELIGION` varchar(20) DEFAULT NULL,
  `GATE_NO` int(11) DEFAULT NULL,
  `PASSWORD` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tenant`
--

CREATE TABLE IF NOT EXISTS `tenant` (
  `NAME` varchar(20) DEFAULT NULL,
  `PHONE_NO` int(11) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `GENDER` varchar(1) DEFAULT NULL,
  `OCCUPATION` varchar(30) DEFAULT NULL,
  `NATIONALITY` varchar(30) DEFAULT NULL,
  `RELIGION` varchar(20) DEFAULT NULL,
  `ROOM_NO` int(11) DEFAULT NULL,
  `BLOCK` varchar(1) DEFAULT NULL,
  `PASSWORD` varchar(30) DEFAULT NULL,
  `ID` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `visitor`
--

CREATE TABLE IF NOT EXISTS `visitor` (
  `NAME` varchar(30) DEFAULT NULL,
  `PHONE_NO` int(11) DEFAULT NULL,
  `EMAIL` varchar(30) DEFAULT NULL,
  `TENANT_ID` varchar(10) DEFAULT NULL,
  `BLOCK` varchar(1) DEFAULT NULL,
  `DATE` date DEFAULT NULL,
  `PURPOSE` varchar(30) DEFAULT NULL,
  `ENTRY_TIME` time DEFAULT NULL,
  `EXIT_TIME` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `complaint`
--
ALTER TABLE `complaint`
 ADD KEY `FK8` (`BLOCK`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
 ADD KEY `FK5` (`BLOCK`), ADD KEY `FK6` (`SENDER_FLAT_NO`), ADD KEY `FK7` (`RECEIVER_FLAT_NO`);

--
-- Indexes for table `flat`
--
ALTER TABLE `flat`
 ADD PRIMARY KEY (`BLOCK`,`ROOM_NO`), ADD KEY `FK1` (`TENANT_ID`);

--
-- Indexes for table `gate`
--
ALTER TABLE `gate`
 ADD KEY `FK2` (`GUARD_ID`);

--
-- Indexes for table `guard`
--
ALTER TABLE `guard`
 ADD PRIMARY KEY (`GUARD_ID`);

--
-- Indexes for table `tenant`
--
ALTER TABLE `tenant`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `visitor`
--
ALTER TABLE `visitor`
 ADD KEY `FK3` (`BLOCK`), ADD KEY `FK4` (`TENANT_ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `complaint`
--
ALTER TABLE `complaint`
ADD CONSTRAINT `FK8` FOREIGN KEY (`BLOCK`) REFERENCES `flat` (`BLOCK`) ON DELETE CASCADE;

--
-- Constraints for table `event`
--
ALTER TABLE `event`
ADD CONSTRAINT `FK5` FOREIGN KEY (`BLOCK`) REFERENCES `flat` (`BLOCK`) ON DELETE CASCADE,
ADD CONSTRAINT `FK6` FOREIGN KEY (`SENDER_FLAT_NO`) REFERENCES `tenant` (`ID`) ON DELETE CASCADE,
ADD CONSTRAINT `FK7` FOREIGN KEY (`RECEIVER_FLAT_NO`) REFERENCES `tenant` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `flat`
--
ALTER TABLE `flat`
ADD CONSTRAINT `FK1` FOREIGN KEY (`TENANT_ID`) REFERENCES `tenant` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `gate`
--
ALTER TABLE `gate`
ADD CONSTRAINT `FK2` FOREIGN KEY (`GUARD_ID`) REFERENCES `guard` (`GUARD_ID`) ON DELETE CASCADE;

--
-- Constraints for table `visitor`
--
ALTER TABLE `visitor`
ADD CONSTRAINT `FK3` FOREIGN KEY (`BLOCK`) REFERENCES `flat` (`BLOCK`) ON DELETE CASCADE,
ADD CONSTRAINT `FK4` FOREIGN KEY (`TENANT_ID`) REFERENCES `tenant` (`ID`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
