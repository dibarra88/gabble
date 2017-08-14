CREATE DATABASE  IF NOT EXISTS `Gabble` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;
USE `Gabble`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: Gabble
-- ------------------------------------------------------
-- Server version	5.5.5-10.2.7-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `post_likes`
--

DROP TABLE IF EXISTS `post_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_likes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `postId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `post_liked_FK_idx` (`postId`),
  KEY `user_like_FK_idx` (`userId`),
  CONSTRAINT `post_liked_FK` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_like_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_likes`
--

LOCK TABLES `post_likes` WRITE;
/*!40000 ALTER TABLE `post_likes` DISABLE KEYS */;
INSERT INTO `post_likes` VALUES (1,1,3),(2,3,1),(3,1,1),(4,6,3),(5,6,4),(6,1,4);
/*!40000 ALTER TABLE `post_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post` varchar(140) COLLATE utf8mb4_bin DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `userid` int(10) unsigned DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_FK_idx` (`userid`),
  CONSTRAINT `user_FK` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'First!!!!! ?','2017-08-13 17:36:26',1,1),(2,'??','2017-08-13 17:38:55',2,1),(3,'?? Pretty neato','2017-08-13 17:40:37',3,1),(4,'check out these sweet words im writing. Im going to take up all the characters that i can to write this message. Like all of them every one','2017-08-13 17:42:39',1,1),(5,'??','2017-08-13 17:44:04',1,1),(6,'Who wants to go for tacos? ???????????','2017-08-13 17:45:02',1,1),(7,'@mcgabble I love me some ?????????????? and a ?','2017-08-13 17:46:21',3,1),(8,'checking it all out','2017-08-13 17:49:50',4,1),(9,'to be deleted','2017-08-13 17:50:13',4,0);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` binary(60) DEFAULT NULL,
  `image_link` varchar(255) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mcgabble','gabbler@fake123.com','$2a$08$KQmHOhbi/VyNQubH639.M.FCcPG4dMEc3f2NVTN9XfSIf45LxCzCG','https://mi-od-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/lbm%20characters/primary/70900_1to1_batman_360_480.png?l.r2=1668006940',1),(2,'gabbert','gabbert@fake.com','$2a$08$W44pIodGtEfGIg4TW/yD7uI..GjDY4SaTfNGmgNgdAmKMCp2vLEci','https://mi-od-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/lbm%20characters/primary/70900_1to1_thejoker_360_480.png?l.r2=-1511473300',1),(3,'gabbly','gabbly@superfaker.com','$2a$08$Kv1//lVcVPruLh/rQ4t2n.QaXVXDxu5uT6Mwlz6AnwL3vgBuyLDtK','https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/dimensions/2017/mugshot/headshots_robin.png?l.r2=-700536845',1),(4,'gabbagle','gabbale@qwedfgh.com','$2a$08$sCDAMOhovXFgYyeR6cRW4ePlNcbaCgaBAdAnHeww0fJrIi5VF2vfu','https://m.popkey.co/ec9de8/EojOY.gif',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-08-13 17:55:30
