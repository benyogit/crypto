-- --------------------------------------------------------
-- מארח:                         127.0.0.1
-- Server version:               10.4.10-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL גירסא:               11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for crypto
CREATE DATABASE IF NOT EXISTS `crypto` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `crypto`;

-- Dumping structure for table crypto.crypto
CREATE TABLE IF NOT EXISTS `crypto` (
  `crypto_code` varchar(5) NOT NULL DEFAULT 'BTC',
  `crypto_english_name` varchar(20) NOT NULL DEFAULT 'BitCoin',
  `crypto_spanish_name` varchar(20) NOT NULL DEFAULT 'BitCoin',
  PRIMARY KEY (`crypto_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Dumping data for table crypto.crypto: 3 rows
/*!40000 ALTER TABLE `crypto` DISABLE KEYS */;
INSERT INTO `crypto` (`crypto_code`, `crypto_english_name`, `crypto_spanish_name`) VALUES
	('ETH', 'Etherium', 'Etherium'),
	('LTC', 'LightCoin', 'LightCoin'),
	('BTC', 'BitCoin', 'BitCoin');
/*!40000 ALTER TABLE `crypto` ENABLE KEYS */;

-- Dumping structure for table crypto.fiat
CREATE TABLE IF NOT EXISTS `fiat` (
  `fiat_code` varchar(5) NOT NULL DEFAULT '',
  `fiat_english_name` varchar(20) NOT NULL DEFAULT '',
  `fiat_spanish_name` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`fiat_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Dumping data for table crypto.fiat: 1 rows
/*!40000 ALTER TABLE `fiat` DISABLE KEYS */;
INSERT INTO `fiat` (`fiat_code`, `fiat_english_name`, `fiat_spanish_name`) VALUES
	('USD', 'American Dollar', '');
/*!40000 ALTER TABLE `fiat` ENABLE KEYS */;

-- Dumping structure for table crypto.rates
CREATE TABLE IF NOT EXISTS `rates` (
  `crypto_code` varchar(5) NOT NULL DEFAULT 'BTC',
  `fiat_code` varchar(5) NOT NULL DEFAULT 'USD',
  `rate_name` varchar(25) NOT NULL DEFAULT 'BitCoin To US Dollar',
  `rate` float DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Dumping data for table crypto.rates: 3 rows
/*!40000 ALTER TABLE `rates` DISABLE KEYS */;
INSERT INTO `rates` (`crypto_code`, `fiat_code`, `rate_name`, `rate`) VALUES
	('ETH', 'USD', 'Etherium To US Dollar', 3883.13),
	('BTC', 'USD', 'BitCoin To US Dollar', 64170.6),
	('LTC', 'USD', 'LightCoin To US Dollar', 188.078);
/*!40000 ALTER TABLE `rates` ENABLE KEYS */;

-- Dumping structure for table crypto.rates_history
CREATE TABLE IF NOT EXISTS `rates_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fiat_code` varchar(5) NOT NULL DEFAULT 'USD',
  `crypto_code` varchar(5) NOT NULL DEFAULT 'BTC',
  `rate` float NOT NULL,
  `time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
