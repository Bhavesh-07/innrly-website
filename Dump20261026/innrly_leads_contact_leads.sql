-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: innrly_leads
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contact_leads`
--

DROP TABLE IF EXISTS `contact_leads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_leads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'N/A',
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'N/A',
  `properties` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `submitted_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_leads`
--

LOCK TABLES `contact_leads` WRITE;
/*!40000 ALTER TABLE `contact_leads` DISABLE KEYS */;
INSERT INTO `contact_leads` VALUES (1,'John Doe','john.doe@hilton-group.com','Hilton Management Partners','+1 (555) 123-4567','12','Interested in booking a live demo for our Midwest select-service portfolio.','2026-06-29 05:59:09','2026-06-29 05:59:08'),(2,'Karol Bocanegra','karol.bocanegra@hilton.com','Homewood Suites','7208334138','1','time keep and str report','2026-08-28 16:12:10','2026-08-28 16:12:10'),(3,'Will','will.watson@artemisig.com','Artemis Hotel Group','4048598909','2','Reconciliation cash management dashboard etc etc','2026-08-29 00:15:54','2026-08-29 00:15:55'),(4,'will','will.watson@artemisig.com','Artemis','4048598909','1','Everything','2026-08-31 17:23:00','2026-08-31 17:23:00'),(13,'Sarah Connor','sarah.connor@hilton.com','Hilton Worldwide','+1 555-0144','','','2026-10-06 12:25:45','2026-10-06 12:25:44'),(14,'Live Tester','live.test@example.com','Test Org','555-123-4567','5','','2026-10-08 06:57:25','2026-10-08 06:57:24'),(15,'Live Tester','rate.test1@example.com','Test Org','555-123-4567','5','','2026-10-08 06:57:26','2026-10-08 06:57:26'),(16,'Live Tester','rate.test2@example.com','Test Org','555-123-4567','5','','2026-10-08 06:57:28','2026-10-08 06:57:28'),(17,'Live Tester','rate.test3@example.com','Test Org','555-123-4567','5','','2026-10-08 06:57:30','2026-10-08 06:57:30'),(18,'Live Tester','rate.test4@example.com','Test Org','555-123-4567','5','','2026-10-08 06:57:32','2026-10-08 06:57:31'),(19,'Live Tester','rate.test5@example.com','Test Org','555-123-4567','5','','2026-10-08 06:57:34','2026-10-08 06:57:33'),(20,'Live Tester','rate.test6@example.com','Test Org','555-123-4567','5','','2026-10-08 06:57:35','2026-10-08 06:57:35'),(21,'Live Tester','rate.test7@example.com','Test Org','555-123-4567','5','','2026-10-08 06:57:37','2026-10-08 06:57:37');
/*!40000 ALTER TABLE `contact_leads` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-26 11:41:12
