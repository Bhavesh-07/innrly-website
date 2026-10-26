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
-- Table structure for table `site_scripts`
--

DROP TABLE IF EXISTS `site_scripts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_scripts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key_name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'global',
  `ga4_id` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT 'G-TJZT02L07P',
  `gtm_id` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `header_tags` text COLLATE utf8mb4_unicode_ci,
  `footer_tags` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key_name` (`key_name`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_scripts`
--

LOCK TABLES `site_scripts` WRITE;
/*!40000 ALTER TABLE `site_scripts` DISABLE KEYS */;
INSERT INTO `site_scripts` VALUES (1,'global','G-TJZT02L07P','GTM-NF2VZN8','<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"website\" />\n<meta property=\"og:title\" content=\"Hospitality Accounting Solutions | Hotel Management Software | INNRLY\" />\n<meta property=\"og:description\"\ncontent=\"Hoteliers have created a flexible, cloud-based hotel management platform for users\' ease. INNRLY allows to combine multiple data sources into one single dashboard.\" />\n<meta property=\"og:url\" content=\"Hospitality Accounting Solutions | Hotel Management Software | INNRLY\" />\n<meta property=\"og:site_name\" content=\"innrly\" />\n<meta property=\"article:publisher\" content=\"https://www.facebook.com/innrly/\" />\n<meta property=\"article:modified_time\" content=\"2026-01-27T06:18:12+00:00\" />\n<meta property=\"og:image\" content=\"https://www.innrly.com/uploads/innrly-logo.png\" />\n<meta property=\"og:image:width\" content=\"1200\" />\n<meta property=\"og:image:height\" content=\"628\" />\n<meta property=\"og:image:type\" content=\"image/png\" />',NULL,1,'2026-08-26 09:36:37','2026-09-28 07:05:31');
/*!40000 ALTER TABLE `site_scripts` ENABLE KEYS */;
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
