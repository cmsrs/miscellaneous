CREATE TABLE `passengers` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`plane_id` int(11) NOT NULL,
	`age` int(11) NOT NULL,
	`sex` enum('m','f') NOT NULL,
	PRIMARY KEY (`id`),
	KEY `plane_id` (`plane_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `passengers` (`id`, `plane_id`, `age`, `sex`) VALUES
(1, 4, 26, 'm'),
(2, 5, 19, 'f'),
(3, 5, 54, 'f'),
(4, 5, 36, 'm'),
(5, 6, 56, 'm'),
(6, 2, 58, 'm'),
(7, 3, 15, 'f'),
(8, 4, 25, 'm'),
(9, 4, 23, 'm'),
(10, 7, 29, 'f'),
(11, 7, 12, 'm'),
(12, 2, 18, 'f'),
(13, 3, 19, 'm'),
(14, 7, 17, 'f'),
(15, 2, 54, 'm'),
(16, 2, 52, 'f');
CREATE TABLE `planes` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(56) NOT NULL,
	`flight_date` date NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `planes` (`id`, `name`, `flight_date`) VALUES
(1, 'Bell P-39', '2012-01-03'),
(2, 'Brewster F2A', '2011-05-18'),
(3, 'Curtiss C-46', '2011-07-05'),
(4, 'Vought F4U', '2011-09-30'),
(5, 'Boeing B-17', '2011-12-06'),
(6, 'Stinson L-5', '2011-12-28'),
(7, 'McDonnell F-4', '2011-11-16');
ALTER TABLE `passengers`
ADD CONSTRAINT `passengers_ibfk_1` FOREIGN KEY (`plane_id`) REFERENCES
`planes`
(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
