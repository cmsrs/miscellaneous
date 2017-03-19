Zadanie 5:
Srodowiko: LAMP


1. 
utworzenie baz danych:
CREATE DATABASE `testrs`  CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE TABLE `fb` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL,
 `description` text NOT NULL,
 `start_time` varchar(128) DEFAULT NULL,
 `end_time` varchar(128) DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8

CREATE DATABASE `testrs_test`  CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE TABLE `fb` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL,
 `description` text NOT NULL,
 `start_time` varchar(128) DEFAULT NULL,
 `end_time` varchar(128) DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8


2.
zmiana plikow konfiguracyjnuych
config.php 
config_test.php - baza testowa to: testrs_test


3. 
popranie: {app-access-token} i {event-id} 

   - http://developers.facebook.com/apps - po zalogowaniu nalezy utworzyc aplikacje

   - zapisac: app_id|app_secret do plikow koniguracyjnych

   - zapisac event-id do plikow konfiguracyjnych z https://www.facebook.com/events/{event-id}. simple right?

   - informacyjnie: json dostajemy z: https://graph.facebook.com/{event-id}?access_token={app-access-token} 



4. 
uruchomienie programu:
http://test.loc/task3/
lub 
$cd task3/
$php index.php



5. 
uruchomienie testow:
$cd ./tests/
$phpunit ./MainTests.php

