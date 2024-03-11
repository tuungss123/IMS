-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2024 at 03:15 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ims`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add item', 1, 'add_item'),
(2, 'Can change item', 1, 'change_item'),
(3, 'Can delete item', 1, 'delete_item'),
(4, 'Can view item', 1, 'view_item'),
(5, 'Can add transaction', 2, 'add_transaction'),
(6, 'Can change transaction', 2, 'change_transaction'),
(7, 'Can delete transaction', 2, 'delete_transaction'),
(8, 'Can view transaction', 2, 'view_transaction'),
(9, 'Can add log entry', 3, 'add_logentry'),
(10, 'Can change log entry', 3, 'change_logentry'),
(11, 'Can delete log entry', 3, 'delete_logentry'),
(12, 'Can view log entry', 3, 'view_logentry'),
(13, 'Can add permission', 4, 'add_permission'),
(14, 'Can change permission', 4, 'change_permission'),
(15, 'Can delete permission', 4, 'delete_permission'),
(16, 'Can view permission', 4, 'view_permission'),
(17, 'Can add group', 5, 'add_group'),
(18, 'Can change group', 5, 'change_group'),
(19, 'Can delete group', 5, 'delete_group'),
(20, 'Can view group', 5, 'view_group'),
(21, 'Can add user', 6, 'add_user'),
(22, 'Can change user', 6, 'change_user'),
(23, 'Can delete user', 6, 'delete_user'),
(24, 'Can view user', 6, 'view_user'),
(25, 'Can add content type', 7, 'add_contenttype'),
(26, 'Can change content type', 7, 'change_contenttype'),
(27, 'Can delete content type', 7, 'delete_contenttype'),
(28, 'Can view content type', 7, 'view_contenttype'),
(29, 'Can add session', 8, 'add_session'),
(30, 'Can change session', 8, 'change_session'),
(31, 'Can delete session', 8, 'delete_session'),
(32, 'Can view session', 8, 'view_session'),
(33, 'Can add spoiled material report', 9, 'add_spoiledmaterialreport'),
(34, 'Can change spoiled material report', 9, 'change_spoiledmaterialreport'),
(35, 'Can delete spoiled material report', 9, 'delete_spoiledmaterialreport'),
(36, 'Can view spoiled material report', 9, 'view_spoiledmaterialreport'),
(37, 'Can add notification', 10, 'add_notification'),
(38, 'Can change notification', 10, 'change_notification'),
(39, 'Can delete notification', 10, 'delete_notification'),
(40, 'Can view notification', 10, 'view_notification');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$720000$GG0kFD485knoyiV2KPuLou$Mw/kSHt13/tzQ5aakQGk4Ovb44oA4lRqf0N+0iSqZb8=', '2024-02-25 09:48:31.196724', 1, 'admin', '', '', 'admin@example.com', 1, 1, '2024-02-02 14:04:15.334853'),
(2, 'pbkdf2_sha256$720000$cJropq40mWsdnyhHiW6tLs$+4nxxgErWlzj3BmyVVOlRICT0mi2/yYsbW0hVMI9oQg=', NULL, 0, 'Cafe', '', '', '', 0, 1, '2024-02-18 14:30:01.063377'),
(3, 'pbkdf2_sha256$390000$9H8i4EHixFwCa9Aw2mbUfN$ZudqiUV2q562U4EqNq154UkmJzOM+bxVQ+83W28lUYA=', NULL, 0, 'Intern', '', '', '', 0, 1, '2024-02-18 14:30:23.988263'),
(4, 'pbkdf2_sha256$720000$n33b511zkUOoElTJ4OlU3o$6STrhF01Yw2c7mXPSwcAO8dL5YGVZJ+yejLCCqyxtrg=', NULL, 0, 'Commissary', '', '', '', 0, 1, '2024-02-18 14:30:55.126602');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2024-02-02 14:04:32.475259', '1', 'Patatas', 1, '[{\"added\": {}}]', 1, 1),
(2, '2024-02-06 17:17:16.587203', '2', 'Sample Item 1', 1, '[{\"added\": {}}]', 1, 1),
(3, '2024-02-06 17:17:25.565319', '3', 'Sample Item 2', 1, '[{\"added\": {}}]', 1, 1),
(4, '2024-02-06 17:17:34.289672', '4', 'Sample Item 3', 1, '[{\"added\": {}}]', 1, 1),
(5, '2024-02-06 17:17:41.108130', '5', 'Sample Item 4', 1, '[{\"added\": {}}]', 1, 1),
(6, '2024-02-06 17:17:45.822851', '6', 'Sample Item 5', 1, '[{\"added\": {}}]', 1, 1),
(7, '2024-02-06 17:17:53.102823', '7', 'Sample Item 6', 1, '[{\"added\": {}}]', 1, 1),
(8, '2024-02-18 12:13:43.300848', '1', '2024-02-18 12:11:26.904363+00:00 - Coffee Beans x 1', 3, '', 2, 1),
(9, '2024-02-18 12:14:09.559252', '8', 'Coffee Beans', 2, '[{\"changed\": {\"fields\": [\"Commissary stock\", \"Cafe stock\"]}}]', 1, 1),
(10, '2024-02-18 14:30:01.299490', '2', 'Cafe', 1, '[{\"added\": {}}]', 6, 1),
(11, '2024-02-18 14:30:24.227995', '3', 'Intern', 1, '[{\"added\": {}}]', 6, 1),
(12, '2024-02-18 14:30:55.354063', '4', 'Commissary', 1, '[{\"added\": {}}]', 6, 1),
(13, '2024-02-18 17:50:14.445650', '4', 'Commissary', 2, '[{\"changed\": {\"fields\": [\"password\"]}}]', 6, 1),
(14, '2024-02-18 19:32:14.952907', '24', '2024-02-18 19:31:08.963968+00:00 - Coffee Beans x 5', 2, '[{\"changed\": {\"fields\": [\"Admin approval\"]}}]', 2, 1),
(15, '2024-02-18 19:33:35.596734', '23', '2024-02-18 19:00:03.613536+00:00 - Coffee Beans x 16', 2, '[{\"changed\": {\"fields\": [\"Admin approval\"]}}]', 2, 1),
(16, '2024-02-18 19:34:07.337375', '23', '2024-02-18 19:00:03.613536+00:00 - (Intern) Coffee Beans x 16', 2, '[]', 2, 1),
(17, '2024-02-18 19:35:42.745759', '24', '2024-02-18 19:31:08.963968+00:00 - (Intern) Coffee Beans x 5', 3, '', 2, 1),
(18, '2024-02-18 19:35:42.750404', '23', '2024-02-18 19:00:03.613536+00:00 - (Intern) Coffee Beans x 16', 3, '', 2, 1),
(19, '2024-02-18 19:35:42.751360', '22', '2024-02-18 18:26:43.818149+00:00 - (Intern) Coffee Beans x 15', 3, '', 2, 1),
(20, '2024-02-18 19:35:42.754391', '21', '2024-02-18 18:14:51.025898+00:00 - (Cafe) Coffee Beans x 16', 3, '', 2, 1),
(21, '2024-02-18 19:35:42.755895', '20', '2024-02-18 18:14:40.670358+00:00 - (Cafe) Coffee Beans x 5', 3, '', 2, 1),
(22, '2024-02-18 19:35:42.756900', '19', '2024-02-18 16:59:33.955902+00:00 - (Cafe) Coffee Beans x 6', 3, '', 2, 1),
(23, '2024-02-18 19:35:42.759116', '18', '2024-02-18 16:59:32.072671+00:00 - (Cafe) Coffee Beans x 5', 3, '', 2, 1),
(24, '2024-02-18 19:35:42.760207', '17', '2024-02-18 16:59:30.406574+00:00 - (Cafe) Coffee Beans x 3', 3, '', 2, 1),
(25, '2024-02-18 19:35:42.762231', '16', '2024-02-18 16:59:28.823172+00:00 - (Cafe) Coffee Beans x 1', 3, '', 2, 1),
(26, '2024-02-18 19:35:42.763216', '15', '2024-02-18 16:59:26.544575+00:00 - (Cafe) Coffee Beans x 1', 3, '', 2, 1),
(27, '2024-02-18 19:35:42.766224', '14', '2024-02-18 14:38:52.138543+00:00 - (Cafe) Coffee Beans x 5', 3, '', 2, 1),
(28, '2024-02-18 19:35:42.767751', '13', '2024-02-18 14:38:50.337077+00:00 - (Cafe) Coffee Beans x 5', 3, '', 2, 1),
(29, '2024-02-18 19:35:42.768764', '12', '2024-02-18 14:38:48.811701+00:00 - (Cafe) Coffee Beans x 5', 3, '', 2, 1),
(30, '2024-02-18 19:35:42.770762', '11', '2024-02-18 14:38:47.102026+00:00 - (Cafe) Coffee Beans x 5', 3, '', 2, 1),
(31, '2024-02-18 19:35:42.771756', '10', '2024-02-18 14:38:45.488189+00:00 - (Cafe) Coffee Beans x 5', 3, '', 2, 1),
(32, '2024-02-18 19:35:42.772791', '9', '2024-02-18 14:38:43.838171+00:00 - (Cafe) Coffee Beans x 5', 3, '', 2, 1),
(33, '2024-02-18 19:36:11.173012', '25', '2024-02-18 19:35:58.459624+00:00 - (Intern) Coffee Beans x 5', 2, '[{\"changed\": {\"fields\": [\"Admin approval\"]}}]', 2, 1),
(34, '2024-02-18 19:38:02.005756', '27', '2024-02-18 19:37:42.160413+00:00 - (Intern) Coffee Beans x 13', 2, '[{\"changed\": {\"fields\": [\"Admin approval\"]}}]', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(3, 'admin', 'logentry'),
(5, 'auth', 'group'),
(4, 'auth', 'permission'),
(6, 'auth', 'user'),
(7, 'contenttypes', 'contenttype'),
(1, 'ims', 'item'),
(10, 'ims', 'notification'),
(9, 'ims', 'spoiledmaterialreport'),
(2, 'ims', 'transaction'),
(8, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-02-02 14:02:52.537632'),
(2, 'auth', '0001_initial', '2024-02-02 14:02:52.957922'),
(3, 'admin', '0001_initial', '2024-02-02 14:02:53.050773'),
(4, 'admin', '0002_logentry_remove_auto_add', '2024-02-02 14:02:53.060007'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2024-02-02 14:02:53.068871'),
(6, 'contenttypes', '0002_remove_content_type_name', '2024-02-02 14:02:53.119829'),
(7, 'auth', '0002_alter_permission_name_max_length', '2024-02-02 14:02:53.160777'),
(8, 'auth', '0003_alter_user_email_max_length', '2024-02-02 14:02:53.182005'),
(9, 'auth', '0004_alter_user_username_opts', '2024-02-02 14:02:53.190874'),
(10, 'auth', '0005_alter_user_last_login_null', '2024-02-02 14:02:53.230541'),
(11, 'auth', '0006_require_contenttypes_0002', '2024-02-02 14:02:53.235558'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2024-02-02 14:02:53.243865'),
(13, 'auth', '0008_alter_user_username_max_length', '2024-02-02 14:02:53.258958'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2024-02-02 14:02:53.271016'),
(15, 'auth', '0010_alter_group_name_max_length', '2024-02-02 14:02:53.286735'),
(16, 'auth', '0011_update_proxy_permissions', '2024-02-02 14:02:53.294787'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2024-02-02 14:02:53.306842'),
(18, 'ims', '0001_initial', '2024-02-02 14:02:53.383258'),
(19, 'ims', '0002_remove_item_calories_remove_item_carbs_and_more', '2024-02-02 14:02:53.413520'),
(20, 'sessions', '0001_initial', '2024-02-02 14:02:53.447219'),
(21, 'ims', '0003_remove_item_price', '2024-02-02 14:06:19.679384'),
(22, 'ims', '0004_remove_item_stock_item_cafe_stock_and_more', '2024-02-15 19:02:37.808092'),
(23, 'ims', '0005_transaction_approval', '2024-02-18 09:36:21.402413'),
(24, 'ims', '0006_transaction_admin_approval', '2024-02-18 12:49:19.579257'),
(25, 'ims', '0007_spoiledmaterialreport', '2024-02-18 14:07:52.908639'),
(26, 'ims', '0008_alter_transaction_approval', '2024-02-18 18:09:56.320525'),
(27, 'ims', '0009_alter_item_cafe_stock', '2024-02-18 19:33:24.782493'),
(28, 'ims', '0010_alter_transaction_date_changed_and_more', '2024-02-26 20:53:23.054248'),
(29, 'ims', '0011_item_category_item_um_item_um_amount_notification', '2024-03-09 13:47:43.629606');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('a1czh6r24gc4iq4af177cp37ug884t13', '.eJxVjDsOwjAQBe_iGlnYXmObkp4zROv94ABKpHwqxN0hUgpo38y8l-lwXVq3zjJ1PZuzcebwu1Wkhwwb4DsOt9HSOCxTX-2m2J3O9jqyPC-7-3fQcG7f2nsQr-oVmYsjCapOYwLioJWyeMASIFalkHJN5XREYIhRg7rsCcz7Aw-6OJw:1rbona:_LDOLEDiwZ5ye4PuwlBwzqMCRrnltYfGKuFfol7neyg', '2024-03-03 21:34:10.756063'),
('j3k14nq5ams8qs0hibwiv62vr0t9h2f3', '.eJxVjDsOwjAQBe_iGlnYXmObkp4zROv94ABKpHwqxN0hUgpo38y8l-lwXVq3zjJ1PZuzcebwu1Wkhwwb4DsOt9HSOCxTX-2m2J3O9jqyPC-7-3fQcG7f2nsQr-oVmYsjCapOYwLioJWyeMASIFalkHJN5XREYIhRg7rsCcz7Aw-6OJw:1reB7X:fVGUfEm8HQMO4KXQGbRzHRY9Ty7hMAzBwpr-ASrY8JU', '2024-03-10 09:48:31.203385'),
('mjpfy9mlgyqjtjhahyoebzivfxnkj393', '.eJxVjDsOwyAQBe9CHSGw-aZM7zOghV2CkwgkY1dR7h4huUjaNzPvzQIcewlHpy2syK5MssvvFiE9qQ6AD6j3xlOr-7ZGPhR-0s6XhvS6ne7fQYFeRi0nFGSVU9lNQjjSPmaNTiHNFo0DIzy4TImspQzSapM8eZFnI3NShn2-5kY4Jw:1rVu9U:LxvWqUAsB1yEvrU8URnHz_p_Q5aZ0-k31YEBA424E_M', '2024-02-16 14:04:20.191321');

-- --------------------------------------------------------

--
-- Table structure for table `ims_item`
--

CREATE TABLE `ims_item` (
  `id` bigint(20) NOT NULL,
  `item_name` varchar(64) NOT NULL,
  `cafe_stock` int(11) NOT NULL,
  `commissary_stock` int(11) NOT NULL,
  `category` varchar(64) NOT NULL,
  `um` varchar(16) NOT NULL,
  `um_amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ims_item`
--

INSERT INTO `ims_item` (`id`, `item_name`, `cafe_stock`, `commissary_stock`, `category`, `um`, `um_amount`) VALUES
(8, 'Coffee Beans', 23, 95, 'Vegetable', 'KG', 1),
(9, 'Fresh Milk', 18, 67, 'Vegetable', 'KG', 1),
(10, 'Chocolate', 15, 85, 'Vegetable', 'KG', 1),
(11, 'Caramel', 0, 100, 'Vegetable', 'KG', 1),
(12, 'Vanilla', 0, 100, 'Vegetable', 'KG', 1),
(13, 'Sugar', 0, 100, 'Vegetable', 'KG', 1),
(14, 'Butter', 0, 100, 'Vegetable', 'KG', 1),
(15, 'Bread Flour', 0, 100, 'Vegetable', 'KG', 1),
(16, 'Yeast', 0, 100, 'Vegetable', 'KG', 1),
(17, 'Butter', 0, 100, 'Vegetable', 'KG', 1),
(18, 'Salt', 0, 100, 'Vegetable', 'KG', 1),
(19, 'Brown Sugar', 0, 100, 'Vegetable', 'KG', 1),
(20, 'Cinnamon', 0, 100, 'Vegetable', 'KG', 1),
(21, 'Brandy', 0, 100, 'Vegetable', 'KG', 1),
(22, 'Hotdog', 0, 100, 'Vegetable', 'KG', 1),
(23, 'Ham', 0, 100, 'Vegetable', 'KG', 1),
(24, 'Italian Seasoning', 0, 100, 'Vegetable', 'KG', 1),
(25, 'Olive Oil', 0, 100, 'Vegetable', 'KG', 1),
(26, 'Cream Cheese', 0, 100, 'Vegetable', 'KG', 1),
(27, 'Powdered Sugar', 0, 100, 'Vegetable', 'KG', 1),
(28, 'Vanilla Extract', 0, 100, 'Vegetable', 'KG', 1),
(29, 'Eden Cheese', 0, 100, 'Vegetable', 'KG', 1),
(30, 'Milk', 0, 100, 'Vegetable', 'KG', 1),
(31, 'Cream Dory', 0, 100, 'Vegetable', 'KG', 1),
(32, 'Potatoes', 0, 100, 'Vegetable', 'KG', 1),
(33, 'All Purpose Flour', 0, 100, 'Vegetable', 'KG', 1),
(34, 'Cornstarch', 0, 100, 'Vegetable', 'KG', 1),
(35, 'Beer', 0, 100, 'Vegetable', 'KG', 1),
(36, 'Salt', 0, 100, 'Vegetable', 'KG', 1),
(37, 'Pepper', 0, 100, 'Vegetable', 'KG', 1),
(38, 'Mayonnaise', 0, 100, 'Vegetable', 'KG', 1),
(39, 'Lemon', 0, 100, 'Vegetable', 'KG', 1),
(40, 'Pickled Relish', 0, 100, 'Vegetable', 'KG', 1),
(41, 'Garlic', 0, 100, 'Vegetable', 'KG', 1),
(42, 'Milk', 0, 100, 'Vegetable', 'KG', 1),
(43, 'Beef Strips', 0, 105, 'Vegetable', 'KG', 1),
(44, 'Mushroom', 0, 100, 'Vegetable', 'KG', 1),
(45, 'Worcestershire Sauce', 0, 100, 'Vegetable', 'KG', 1),
(46, 'Soy Sauce', 0, 100, 'Vegetable', 'KG', 1),
(47, 'Brown Sugar', 0, 100, 'Vegetable', 'KG', 1),
(48, 'French Beans', 0, 100, 'Vegetable', 'KG', 1),
(49, 'Chicken Leg', 0, 100, 'Vegetable', 'KG', 1),
(50, 'Star Anise', 0, 100, 'Vegetable', 'KG', 1),
(51, 'Ginger', 0, 100, 'Vegetable', 'KG', 1),
(52, 'Peppercorn', 0, 100, 'Vegetable', 'KG', 1),
(53, 'Toasted Peanut', 0, 100, 'Vegetable', 'KG', 1),
(54, 'Prawn Chips', 0, 100, 'Vegetable', 'KG', 1),
(55, 'Onion Leeks', 0, 100, 'Vegetable', 'KG', 1),
(56, 'Beef Cubes', 0, 100, 'Vegetable', 'KG', 1),
(57, 'Butter', 0, 100, 'Vegetable', 'KG', 1),
(58, 'Napa Cabbage', 0, 100, 'Vegetable', 'KG', 1),
(59, 'Carrots', 0, 100, 'Vegetable', 'KG', 1),
(60, 'Onions', 0, 100, 'Vegetable', 'KG', 1),
(61, 'Fish Sauce', 0, 100, 'Vegetable', 'KG', 1),
(62, 'Apple Juice', 0, 100, 'Vegetable', 'KG', 1),
(63, 'Rice Flour', 0, 100, 'Vegetable', 'KG', 1),
(64, 'Gochugaru', 0, 100, 'Vegetable', 'KG', 1),
(65, 'Sesame Oil', 0, 100, 'Vegetable', 'KG', 1),
(66, 'Eggs', 0, 100, 'Vegetable', 'KG', 1),
(67, 'Cooking Oil', 0, 100, 'Vegetable', 'KG', 1),
(68, 'Royal Soda', 0, 100, 'Vegetable', 'KG', 1),
(69, 'Sprite Soda', 0, 100, 'Vegetable', 'KG', 1),
(70, 'Zero Coke Soda', 0, 100, 'Vegetable', 'KG', 1),
(71, 'Coke Soda', 0, 100, 'Vegetable', 'KG', 1),
(72, 'Pineapple Juice', 0, 100, 'Vegetable', 'KG', 1),
(73, 'Mineral Water', 0, 100, 'Vegetable', 'KG', 1),
(74, 'Tomato Sauce', 0, 100, 'Vegetable', 'KG', 1),
(75, 'Parmesan Grated Cheese', 0, 100, 'Vegetable', 'KG', 1),
(76, 'Olive Oil Pomace', 0, 100, 'Vegetable', 'KG', 1),
(77, 'All-Purpose Cream', 0, 100, 'Vegetable', 'KG', 1),
(78, 'Basil', 0, 100, 'Vegetable', 'KG', 1),
(79, 'Chili Flakes', 0, 100, 'Vegetable', 'KG', 1),
(80, 'Spanish paprika ground', 0, 100, 'Vegetable', 'KG', 1),
(81, 'Spaghetti Pasta Italian', 0, 100, 'Vegetable', 'KG', 1),
(82, 'Red Wine', 0, 100, 'Vegetable', 'KG', 1),
(83, 'Italian Seasoning', 0, 100, 'Vegetable', 'KG', 1),
(84, 'Black Olives', 0, 100, 'Vegetable', 'KG', 1),
(85, 'Capers', 0, 100, 'Vegetable', 'KG', 1),
(86, 'Dried Basil', 0, 100, 'Vegetable', 'KG', 1),
(87, 'Button Mushroom', 7, 93, 'Vegetable', 'KG', 1),
(88, 'Cashew Nuts', 20, 80, 'Vegetable', 'KG', 1),
(89, 'Bread Crumbs', 0, 100, 'Vegetable', 'KG', 1),
(90, 'Shiitake Mushrooms', 0, 100, 'Vegetable', 'KG', 1),
(91, 'Cheese Block', 0, 100, 'Vegetable', 'KG', 1),
(92, 'Onion Powder', 0, 100, 'Vegetable', 'KG', 1),
(93, 'Garlic Powder', 0, 100, 'Vegetable', 'KG', 1),
(94, 'Spanish Paprika', 0, 100, 'Vegetable', 'KG', 1),
(95, 'Beef, Chicken, Pork, Shrimp', 0, 100, 'Vegetable', 'KG', 1),
(96, 'Cubes (Knorr)', 0, 100, 'Vegetable', 'KG', 1),
(97, 'Rosemary', 0, 100, 'Vegetable', 'KG', 1),
(98, 'Thyme', 0, 100, 'Vegetable', 'KG', 1),
(99, 'UFC Ketchup', 0, 100, 'Vegetable', 'KG', 1),
(100, 'Condensed Milk', 0, 100, 'Vegetable', 'KG', 1),
(101, 'White Sugar', 0, 100, 'Vegetable', 'KG', 1),
(102, 'Tarragon Leaf', 0, 100, 'Vegetable', 'KG', 1),
(103, 'Cumin', 0, 100, 'Vegetable', 'KG', 1),
(104, 'Aluminum Tray', 0, 100, 'Vegetable', 'KG', 1),
(105, 'Toothpick', 0, 100, 'Vegetable', 'KG', 1),
(106, 'Plastic Spoon', 0, 100, 'Vegetable', 'KG', 1),
(107, 'Plastic Fork', 0, 100, 'Vegetable', 'KG', 1),
(108, 'Plastic Cups with Lids', 0, 100, 'Vegetable', 'KG', 1),
(109, 'Portion Bag', 0, 100, 'Vegetable', 'KG', 1),
(110, 'Plastic Bag', 0, 100, 'Vegetable', 'KG', 1),
(111, 'Trash Bag', 0, 100, 'Vegetable', 'KG', 1),
(112, 'Take out Box', 0, 100, 'Vegetable', 'KG', 1),
(113, 'Small cups for sauces', 0, 100, 'Vegetable', 'KG', 1),
(114, 'Ice plastic', 0, 100, 'Vegetable', 'KG', 1),
(115, 'Stirrer', 0, 100, 'Vegetable', 'KG', 1),
(116, 'Straws', 0, 100, 'Vegetable', 'KG', 1),
(117, 'Cling Wrap', 0, 100, 'Vegetable', 'KG', 1),
(118, 'Aluminum Foil', 0, 100, 'Vegetable', 'KG', 1),
(119, 'Paper Brown Bags', 0, 100, 'Vegetable', 'KG', 1),
(120, 'Test', 0, 1, 'Vegetable', 'KG', 1),
(121, 'Test2', 0, 5, 'Vegetable', 'KG', 1),
(122, 'test3', 0, 7, 'Vegetable', 'KG', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ims_notification`
--

CREATE TABLE `ims_notification` (
  `id` bigint(20) NOT NULL,
  `text` varchar(128) NOT NULL,
  `date` datetime(6) NOT NULL,
  `is_read` tinyint(1) NOT NULL,
  `notif_owner_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ims_spoiledmaterialreport`
--

CREATE TABLE `ims_spoiledmaterialreport` (
  `id` bigint(20) NOT NULL,
  `spoil_amount` int(11) NOT NULL,
  `report_creator` varchar(64) NOT NULL,
  `date_created` datetime(6) NOT NULL,
  `item_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ims_spoiledmaterialreport`
--

INSERT INTO `ims_spoiledmaterialreport` (`id`, `spoil_amount`, `report_creator`, `date_created`, `item_id`) VALUES
(1, 123, 'Cafe', '2024-02-18 14:07:57.336590', 8),
(2, 1, 'Cafe', '2024-02-18 14:11:07.991560', 8),
(3, 4, 'Cafe', '2024-02-18 14:36:36.698545', 8),
(4, 1, 'Intern', '2024-02-18 19:18:42.546707', 8),
(5, 5, 'Intern', '2024-02-18 19:18:44.322401', 8),
(6, 6, 'Intern', '2024-02-18 19:18:46.072882', 8),
(7, 3, 'Intern', '2024-02-18 19:18:48.034983', 8),
(8, 15, 'Intern', '2024-02-18 19:18:50.286989', 8),
(9, 12, 'Intern', '2024-02-18 19:18:52.102156', 8),
(10, 1, 'Intern', '2024-02-18 19:18:53.689585', 8),
(11, 1, 'Intern', '2024-02-18 19:18:55.310336', 8),
(12, 4, 'Cafe', '2024-02-25 02:20:16.714248', 8),
(13, 5, 'Cafe', '2024-02-25 02:21:52.457505', 8),
(14, 5, 'Cafe', '2024-02-25 02:22:23.294207', 8),
(15, 5, 'Cafe', '2024-02-25 02:23:14.080551', 8),
(16, 3, 'Cafe', '2024-02-25 02:23:50.303466', 8),
(17, 3, 'Cafe', '2024-02-25 02:24:06.380075', 8),
(18, 3, 'Cafe', '2024-02-25 02:24:35.685020', 8),
(19, 4, 'Cafe', '2024-02-25 02:41:24.126514', 8),
(20, 15, 'Cafe', '2024-02-25 13:20:14.953720', 9),
(21, 14, 'Cafe', '2024-02-26 20:44:21.230465', 8);

-- --------------------------------------------------------

--
-- Table structure for table `ims_transaction`
--

CREATE TABLE `ims_transaction` (
  `id` bigint(20) NOT NULL,
  `transacted_amount` int(11) NOT NULL,
  `transactor` varchar(64) NOT NULL,
  `date_created` datetime(6) NOT NULL,
  `date_changed` datetime(6) NOT NULL,
  `transacted_item_id` bigint(20) NOT NULL,
  `approval` varchar(12) NOT NULL,
  `admin_approval` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ims_transaction`
--

INSERT INTO `ims_transaction` (`id`, `transacted_amount`, `transactor`, `date_created`, `date_changed`, `transacted_item_id`, `approval`, `admin_approval`) VALUES
(25, 5, 'Intern', '2024-02-18 19:35:58.459624', '2024-02-18 19:36:14.544695', 8, 'Approved', 1),
(27, 13, 'Intern', '2024-02-18 19:37:42.160413', '2024-02-18 19:38:05.137140', 8, 'Approved', 1),
(28, 5, 'Cafe', '2024-02-25 03:01:32.742695', '2024-02-25 03:01:46.952401', 8, 'Approved', 1),
(31, 3, 'Cafe', '2024-02-25 09:56:17.727930', '2024-02-25 10:07:34.665245', 9, 'Approved', 1),
(32, 5, 'Cafe', '2024-02-25 10:15:45.485529', '2024-02-25 13:35:10.916625', 8, 'Approved', 1),
(33, 500, 'Cafe', '2024-02-25 10:38:07.026077', '2024-02-25 13:35:07.125383', 8, 'Denied', 1),
(34, 15, 'Cafe', '2024-02-25 13:11:53.017941', '2024-02-25 13:27:32.447791', 9, 'Approved', 1),
(35, 15, 'Cafe', '2024-02-25 13:27:21.439953', '2024-02-25 13:27:30.297936', 9, 'Approved', 1),
(36, 15, 'Cafe', '2024-02-25 13:37:56.909539', '2024-02-26 20:48:22.834529', 10, 'Approved', 1),
(37, 15, 'Cafe', '2024-02-26 20:44:13.131923', '2024-02-26 20:50:33.367666', 8, 'Approved', 1),
(38, 15, 'Cafe', '2024-02-26 20:53:40.909372', '2024-02-26 20:53:47.922677', 88, 'Approved', 1),
(39, 5, 'Cafe', '2024-02-26 20:56:33.543190', '2024-02-26 20:56:38.566854', 88, 'Approved', 1),
(40, 3, 'Cafe', '2024-02-26 21:04:39.841081', '2024-02-26 21:04:45.988825', 87, 'Approved', 1),
(41, 4, 'Cafe', '2024-02-26 21:05:22.533975', '2024-02-26 21:05:26.667785', 87, 'Approved', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `ims_item`
--
ALTER TABLE `ims_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ims_notification`
--
ALTER TABLE `ims_notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ims_notification_notif_owner_id_b83c8260_fk_auth_user_id` (`notif_owner_id`);

--
-- Indexes for table `ims_spoiledmaterialreport`
--
ALTER TABLE `ims_spoiledmaterialreport`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ims_spoiledmaterialreport_item_id_67d733a6_fk_ims_item_id` (`item_id`);

--
-- Indexes for table `ims_transaction`
--
ALTER TABLE `ims_transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ims_transaction_transacted_item_id_c5022dd0_fk_ims_item_id` (`transacted_item_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `ims_item`
--
ALTER TABLE `ims_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `ims_notification`
--
ALTER TABLE `ims_notification`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ims_spoiledmaterialreport`
--
ALTER TABLE `ims_spoiledmaterialreport`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `ims_transaction`
--
ALTER TABLE `ims_transaction`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `ims_notification`
--
ALTER TABLE `ims_notification`
  ADD CONSTRAINT `ims_notification_notif_owner_id_b83c8260_fk_auth_user_id` FOREIGN KEY (`notif_owner_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `ims_spoiledmaterialreport`
--
ALTER TABLE `ims_spoiledmaterialreport`
  ADD CONSTRAINT `ims_spoiledmaterialreport_item_id_67d733a6_fk_ims_item_id` FOREIGN KEY (`item_id`) REFERENCES `ims_item` (`id`);

--
-- Constraints for table `ims_transaction`
--
ALTER TABLE `ims_transaction`
  ADD CONSTRAINT `ims_transaction_transacted_item_id_c5022dd0_fk_ims_item_id` FOREIGN KEY (`transacted_item_id`) REFERENCES `ims_item` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
