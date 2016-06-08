-- --------------------------------------------------------

--
-- Структура таблицы `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `content` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `ndate` date NOT NULL,
  `pagetype` enum('page','news','folder') COLLATE utf8_unicode_ci NOT NULL,
  `level` int(11) NOT NULL,
  `onoff` tinyint(1) NOT NULL,
  `background` text COLLATE utf8_unicode_ci NOT NULL,
  `shortnews` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pagetype` (`pagetype`),
  KEY `level` (`level`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=17 ;

-- --------------------------------------------------------

--
-- Структура таблицы `sections`
--

CREATE TABLE IF NOT EXISTS `sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `param0` text COLLATE utf8_unicode_ci NOT NULL,
  `param1` text COLLATE utf8_unicode_ci NOT NULL,
  `param2` text COLLATE utf8_unicode_ci NOT NULL,
  `param3` text COLLATE utf8_unicode_ci NOT NULL,
  `param4` text COLLATE utf8_unicode_ci NOT NULL,
  `param5` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `userfio` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `usertype` enum('admin','supervisor','expert','user') COLLATE utf8_unicode_ci NOT NULL,
  `puttime` datetime NOT NULL,
  `email` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `aball` float NOT NULL,
  `regnumber` tinytext COLLATE utf8_unicode_ci NOT NULL,
  `regdata` datetime NOT NULL,
  `job` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `passchanged` tinyint(4) NOT NULL,
  `info` text COLLATE utf8_unicode_ci NOT NULL,
  `photoname` tinytext COLLATE utf8_unicode_ci NOT NULL,
  `phone` tinytext COLLATE utf8_unicode_ci NOT NULL,
  `person` tinytext COLLATE utf8_unicode_ci NOT NULL,
  `token` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('online','offline') COLLATE utf8_unicode_ci NOT NULL,
  `pacount` tinyint(4) NOT NULL,
  `region` tinytext COLLATE utf8_unicode_ci NOT NULL,
  `city` tinytext COLLATE utf8_unicode_ci NOT NULL,
  `private_fio` tinyint(4) NOT NULL,
  `private_email` tinyint(4) NOT NULL,
  `private_region` tinyint(4) NOT NULL,
  `private_city` tinyint(4) NOT NULL,
  `private_job` tinyint(4) NOT NULL,
  `private_person` tinyint(4) NOT NULL,
  `private_photo` tinyint(4) NOT NULL,
  `social_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `social_page` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sex` enum('male','female') COLLATE utf8_unicode_ci NOT NULL,
  `birthday` date NOT NULL,
  `provider` enum('vk','odnoklassniki','mailru','yandex','google','facebook') COLLATE utf8_unicode_ci NOT NULL,
  `qcount` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userfio` (`userfio`),
  KEY `username` (`username`),
  KEY `password` (`password`),
  KEY `usertype` (`usertype`),
  KEY `puttime` (`puttime`),
  KEY `email` (`email`),
  KEY `job` (`job`),
  KEY `qcount` (`qcount`),
  KEY `provider` (`provider`),
  KEY `social_page` (`social_page`),
  KEY `social_id` (`social_id`),
  KEY `pacount` (`pacount`),
  KEY `token` (`token`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

INSERT INTO `users` (`id`, `username`, `password`, `userfio`, `usertype`, `puttime`, `email`, `aball`, `regnumber`, `regdata`, `job`, `passchanged`, `info`, `photoname`, `phone`, `person`, `token`, `status`, `pacount`, `region`, `city`, `private_fio`, `private_email`, `private_region`, `private_city`, `private_job`, `private_person`, `private_photo`, `social_id`, `social_page`, `sex`, `birthday`, `provider`, `qcount`) VALUES
(1, 'test', '098f6bcd4621d373cade4e832627b4f6', '', 'admin', '0000-00-00 00:00:00', '', 0, '', '0000-00-00 00:00:00', '', 0, '', '', '', '', 'ccebfb0729999a2fc3994743eb536881', 'online', 0, '', '', 0, 0, 0, 0, 0, 0, 0, '', '', 'male', '0000-00-00', 'vk', 0);