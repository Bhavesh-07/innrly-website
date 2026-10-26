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
-- Table structure for table `integrations`
--

DROP TABLE IF EXISTS `integrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `integrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `initials` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pms',
  `hue` int NOT NULL DEFAULT '200',
  `domain` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` text COLLATE utf8mb4_unicode_ci,
  `badge` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `to_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `integrations`
--

LOCK TABLES `integrations` WRITE;
/*!40000 ALTER TABLE `integrations` DISABLE KEYS */;
INSERT INTO `integrations` VALUES (1,'Opera (Oracle)','OP','pms',25,'oracle.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(2,'Choice Advantage','CA','pms',15,'choicehotels.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(3,'Marriott FOSSE','MF','pms',0,'marriott.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(4,'Hilton OnQ','HQ','pms',230,'hilton.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(5,'Hilton PEP','PE','pms',230,'hilton.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(6,'Best Western WHG','BW','pms',220,'bestwestern.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(7,'Wyndham Wynguest','WY','pms',350,'wyndhamhotels.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(8,'IHG (HotelKey / HMS)','IH','pms',200,'ihg.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(9,'StayNTouch','SN','pms',280,'stayntouch.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(10,'Cloudbeds','CB','pms',195,'cloudbeds.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(11,'Mews','MW','pms',250,'mews.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(12,'RoomKeyPMS','RK','pms',165,'roomkeypms.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(13,'Visual Matrix','VM','pms',145,'visualmatrix.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(14,'Maestro','MA','pms',35,'maestropms.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(15,'innRoad','IR','pms',205,'innroad.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(16,'HotelKey','HK','pms',215,'hotelkeyapp.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(17,'Jonas Chorum','JC','pms',25,'jonaschorum.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(18,'Stay PMS','ST','pms',195,'staypms.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(19,'Booking.com','BK','ota',215,'booking.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(20,'Expedia','EX','ota',45,'expedia.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(21,'Priceline','PR','ota',195,'priceline.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(22,'CLC Lodging','CL','ota',5,'clclodging.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(23,'M3','M3','accounting',215,'m3as.com',NULL,'partner','/integrations/m3','2026-06-29 05:59:08','2026-06-29 05:59:08'),(24,'QuickBooks','QB','accounting',145,'quickbooks.intuit.com',NULL,NULL,'/integrations/quickbooks','2026-06-29 05:59:08','2026-06-29 05:59:08'),(25,'Sage Intacct','SI','accounting',155,'sage.com',NULL,NULL,'/integrations/sage-intacct','2026-06-29 05:59:08','2026-06-29 05:59:08'),(26,'Xero','XE','accounting',195,'xero.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(27,'NetSuite','NS','accounting',5,'netsuite.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(28,'ADP','AD','payroll',5,'adp.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(29,'Paychex','PX','payroll',215,'paychex.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(30,'Gusto','GU','payroll',15,'gusto.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(31,'Paycom','PC','payroll',220,'paycom.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(32,'Paylocity','PL','payroll',145,'paylocity.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(33,'Heartland','HL','payroll',0,'heartland.us',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(34,'Hotel Effectiveness','HE','payroll',215,'hoteleffectiveness.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(35,'Medallia','ME','guest',350,'medallia.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(36,'Revinate','RV','guest',25,'revinate.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(37,'GuestRevu','GR','guest',195,'guestrevu.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(38,'ReviewPro','RP','guest',215,'reviewpro.shijigroup.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(39,'Kipsu','KP','guest',280,'kipsu.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(40,'Plaid','PD','banking',5,'plaid.com',NULL,'partner',NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(41,'Chase','CH','banking',215,'chase.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(42,'Bank of America','BA','banking',0,'bankofamerica.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(43,'Wells Fargo','WF','banking',25,'wellsfargo.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(44,'Truist','TR','banking',280,'truist.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(45,'U.S. Bank','US','banking',220,'usbank.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(46,'PNC','PN','banking',25,'pnc.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(47,'Capital One','C1','banking',5,'capitalone.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(48,'Innrly Pay','IP','payments',195,NULL,NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(49,'Virtual Cards','VC','payments',215,NULL,NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(50,'ACH','AC','payments',145,NULL,NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(51,'Repay','RP','payments',195,'repay.com',NULL,'partner',NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(52,'Stripe','ST','payments',250,'stripe.com',NULL,NULL,NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(53,'Shield Screening','SS','workforce',215,'shieldscreening.com',NULL,'partner',NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(54,'isolved','IS','workforce',25,'isolvedhcm.com',NULL,'partner',NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08'),(55,'TransUnion','TU','workforce',5,'transunion.com',NULL,'partner',NULL,'2026-06-29 05:59:08','2026-06-29 05:59:08');
/*!40000 ALTER TABLE `integrations` ENABLE KEYS */;
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
