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
-- Table structure for table `onboarding_properties`
--

DROP TABLE IF EXISTS `onboarding_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `onboarding_properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_id` int NOT NULL,
  `property_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `property_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rooms` int NOT NULL,
  `brand` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pms` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pms_other` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_person` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `manager_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `manager_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `manager_mobile` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `onboarding_properties`
--

LOCK TABLES `onboarding_properties` WRITE;
/*!40000 ALTER TABLE `onboarding_properties` DISABLE KEYS */;
INSERT INTO `onboarding_properties` VALUES (1,1,'Hampton Inn Denver Downtown','HAMP-DEN','123 Broadway, Denver CO 80202',145,'Hampton by Hilton','OnQ',NULL,'Robert Miller','Albert Johnson','albert.j@summitlodging.com','+1 (303) 555-1122'),(2,2,'Studio 6 Suites','7402','474 Western Blvd, Jacksonville, NC 28546',116,'Motel 6','Other','Hotel Key','gilmore_joshua@motel6.com','Robin','s67402bo@6franchise.com','(910) 347-6500'),(21,13,'Hilton Garden Inn Miami Airport West','MIAAI','3550 NW 74th Avenue, Miami, FL 33122',189,'Hilton','Other','PEP','Danel Lam','Maria Cancino','maria.cancino@hilton.com','7862613456'),(4,4,'Grand Downtown Austin','GD-ATX','100 Congress Ave, Austin, TX 78701',245,'Others','Opera','','David Vance','Marcus Brody','marcus.b@apexhospitality.com','512-555-0200'),(5,4,'Apex Suites Domain','AS-DOM','11400 Domain Dr, Austin, TX 78758',120,'Others','Other','Mews','Sarah Jenkins','Elena Rostova','elena.r@apexhospitality.com','512-555-0201'),(22,13,'Homewood Suites Miami Airport West','MIAWT','3590 NW 74th Avenue, Miami, FL 33122',124,'Hilton','Other','PEP','Danial Lam','Lucrecia Magana','lucrecia.magana@hilton.com','3059754439'),(23,13,'Amanda Graham','MIAFA','3570 NW 74th Avenue, Miami, FL 33122',124,'Marriott','Other','StayPMS','Daniel Lam','Amanda Graham','amanada.graham@marriott.com','3058040238');
/*!40000 ALTER TABLE `onboarding_properties` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-26 11:41:11
