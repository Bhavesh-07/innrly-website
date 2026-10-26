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
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'homepage',
  `quote` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `avatar` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `rating` int DEFAULT '5',
  `is_homepage` tinyint(1) DEFAULT '1',
  `display_order` int DEFAULT '0',
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (1,'homepage','Innrly replaced four spreadsheets and saved my GM two days a week. Reconciliation that used to take a full morning now runs in minutes.','VP of Operations','VP of Operations','HMS Hospitality (12 hotels · select-service)','',5,1,1,'active','2026-09-04 04:23:19','2026-09-04 04:23:19'),(2,'homepage','OTA commission audits that used to slip through quarterly reviews now surface daily. The dashboard pays for itself before lunch.','Owner','Owner','Exceptional Hospitality (6 hotels · full-service)','',5,1,2,'active','2026-09-04 04:23:19','2026-09-04 04:23:19'),(3,'testimonials-global','Innrly replaced three spreadsheets and a part-time analyst. We close the month in two days instead of two weeks.','Mina Patel','VP of Finance','Q Hotels Management (14 hotels)','',5,1,3,'active','2026-09-04 04:23:19','2026-09-04 04:23:19'),(4,'testimonials-global-2','The labor dashboard paid for the platform within the first quarter alone. Now every GM checks it before finalizing the schedule.','Regional Manager','Regional Manager','Hotel Hilltone (Marriott Hotel Management Company)','',5,1,4,'active','2026-09-04 04:23:19','2026-09-04 04:23:19'),(5,'testimonials-global-3','Onboarding took just one week—not an entire quarter. Their team mapped our PMS, payroll, and accounting systems from start to finish, and we barely had to lift a finger.','Aviraj Patel','Owner','Taj Hospitality (7 hotels)','',5,1,5,'active','2026-09-04 04:23:19','2026-09-04 04:23:19'),(6,'reconciliation','We went from a fourteen-day close to a four-day close in our first quarter on Innrly. The OTA audit alone paid for the platform — we recovered hundreds of dollars in mis-billed commissions in month one.','Avtar Dhillon','Corporate Controller','HMS Hospitality (9-property portfolio)','',5,0,1,'active','2026-09-04 04:23:19','2026-09-04 04:23:19'),(7,'operations-automation','We lost two night auditors because the workload was overwhelming. After implementing Innrly, the job is genuinely a four-hour shift. People actually want the role now, and our AGM starts each morning with a queue instead of a crisis.','General Manager','General Manager - Operations','Four Points Hotel (6-property select-service group)','',5,0,1,'active','2026-09-04 04:23:19','2026-09-04 04:23:19'),(8,'innrly-shift','I used to spend Sunday nights building the schedule for the week ahead and Friday afternoons fixing payroll. With Innrly Shift, I got both back. Now, the Snapshot is the only labor screen I need to open all day.','Latonya','General Manager','Holiday Inn Express (110 rooms)','',5,0,1,'active','2026-09-04 04:23:19','2026-09-04 04:23:19'),(9,'innrly-pay','We eliminated hundreds of dollars in annual accounts payable automation costs by switching to Innrly Pay. The transition was seamless, and the platform integrates effortlessly with our back-office systems. It has streamlined our accounts payable process by eliminating envelopes, stamps, and manual mailing, saving both time and money. Innrly Pay has made our AP workflow more efficient, reliable, and cost-effective.','Mina Patel','CFO','QHotels Management (9-property select-service group)','',5,0,1,'active','2026-09-04 04:23:19','2026-09-04 04:23:19'),(10,'financial-control','We used to spend the first week of every month closing the books. Now my controller spends the saved time on actual analysis. Innrly didn\'t just speed up reconciliation—it eliminated it.','Heather Gothreaux','CPA','Gates and Gates Company (12-property hotel ownership group)','',5,0,1,'active','2026-09-04 04:23:19','2026-09-04 04:23:19'),(11,'expense-entries','We used to discover utility auto-debits weeks after they cleared. Now they\'re posted the same day, coded correctly, and reflected in the general ledger immediately. As a result, our month-end close dropped from 12 days to just 4.','Nan Vimal','Corporate Controller','5-property portfolio','',5,0,1,'inactive','2026-09-04 04:23:19','2026-09-04 04:23:19'),(12,'document-vault','Document Vault has saved me countless hours by eliminating the need for emails requesting reports and backup documentation. End-of-month reconciliation and sales tax preparation have become seamless with Innrly\'s Document Vault. Everything is stored in one place, organized by the correct date, making it easy to find exactly what I need when I need it.','Cindy','Accountant','Gates and Gates (6-property portfolio)','',5,0,1,'active','2026-09-04 04:23:19','2026-09-04 04:23:19'),(13,'case-studies-midwest-portfolio','We stopped hiring our way out of back-office work. Innrly paid for itself in the first quarter and we\'re running 12 hotels with the same corporate headcount we had at eight.','VP of Operations','VP of Operations','K&K West Coast (12 hotels)','',5,0,1,'inactive','2026-09-04 04:23:19','2026-09-04 04:23:19'),(14,'case-studies-urban-full-service','The OTA recovery alone paid for Innrly several times over. But what really got my attention was how much faster we were able to close.','Amita','Corporate Controller','Urban Full-Service Portfolio','',5,0,1,'inactive','2026-09-04 04:23:19','2026-09-04 04:23:19'),(15,'case-studies-hilton','Growing our management portfolio used to mean adding controllers. With Innrly, adding a property is just adding a tenant to the dashboard.','CFO','CFO','Economos Properties (Hilton Management)','',5,0,1,'inactive','2026-09-04 04:23:19','2026-09-04 04:23:19'),(16,'case-studies-extended-stay','Every other labor tool assumes a standard daily turnover. Innrly is the only platform that accurately models weekly-clean MPOR and multi-property housekeeping floating.','VP of Operations','VP of Operations','K&K Hotels (Extended-Stay Portfolio)','',5,0,1,'inactive','2026-09-04 04:23:19','2026-09-04 04:23:19'),(17,'case-studies-boutique-group','We thought our high-touch model couldn\'t be automated. Innrly proved us wrong without sacrificing an ounce of guest experience.','CFO','CFO','Independent Boutique Hotel Group','',5,0,1,'inactive','2026-09-04 04:23:19','2026-09-04 04:23:19'),(18,'select-service','I used to start every Monday on the phone with my controller. Now I open one tab, see all eight hotels, and I\'m done in five minutes. Innrly didn\'t replace a tool — it replaced a meeting.','Rachael','VP of Operations','8-property midwest portfolio','',5,0,1,'active','2026-09-04 04:23:19','2026-09-04 04:23:19'),(19,'business-intelligence','I used to spend Monday pulling numbers from three systems to build a weekly owner pack. With Business Intelligence, the pack generates at midnight Sunday. Monday morning is for strategy now.','VP of Operations','VP of Operations','8-property midwest portfolio','',5,0,1,'active','2026-09-04 04:23:19','2026-09-04 04:23:19'),(20,'pricing','Innrly replaced three spreadsheets and a part-time analyst. We close the month in two days instead of two weeks.','Mina Patel','VP of Finance','Q Hotels Management (14 hotels)','',5,0,1,'active','2026-09-04 04:23:19','2026-09-04 04:23:19');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
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
