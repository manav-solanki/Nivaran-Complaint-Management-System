-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2026 at 06:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `addcomplaint`
--

CREATE TABLE `addcomplaint` (
  `user_id` int(11) NOT NULL,
  `complaint_id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL,
  `category` varchar(250) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `priority` int(11) NOT NULL DEFAULT 0,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `image` varchar(250) NOT NULL,
  `allocated_department` varchar(255) DEFAULT NULL,
  `allocated_staff` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addcomplaint`
--

INSERT INTO `addcomplaint` (`user_id`, `complaint_id`, `title`, `description`, `address`, `category`, `status`, `priority`, `created`, `image`, `allocated_department`, `allocated_staff`) VALUES
(3, 1, 'Water Leackage Issue', 'Irregular water supply is affecting daily household activities. Residents are facing low pressure and contamination problems. Immediate action is needed to ensure clean and consistent water availability.', 'Alankar society, Vadodara', 'Water', 2, 0, '2026-05-11 12:26:35', '1778482595172-water_leakage.mp4', '', ''),
(2, 3, 'Electricity Supply Issue', 'Frequent power cuts are disrupting normal life and work. Voltage fluctuations are damaging electrical appliances. A stable and reliable power supply is urgently required.', 'Bajwa, Karodiya', 'Electricity', 2, 0, '2026-05-12 10:42:25', '1778562745641-electricity.png', 'Electricity Department', 'het'),
(3, 4, 'Sanitation Issue', 'Garbage is not being collected regularly, leading to foul smell and unhygienic conditions. Immediate action is required to maintain cleanliness in the area.', 'Channi Jakat Naka, Vadodara', 'Sanitation', 2, 0, '2026-05-12 10:51:33', '1778563293273-sanitation.jpg', 'Sanitation Department', 'manav'),
(2, 6, 'Road Issue', 'Damaged and pothole-filled roads are causing inconvenience to commuters. Traffic congestion and accidents are increasing due to poor conditions. Proper repair and maintenance of roads is necessary for safe travel.', 'Ranoli', 'Road', 2, 0, '2026-05-14 10:41:27', '1778735487056-road_issue.mp4', '', NULL),
(4, 7, 'Sanitation Issue', 'Garbage is not being collected regularly, leading to foul smell and unhygienic conditions. Immediate action is required to maintain cleanliness in the area.', 'B-10, alankar society , Vadodara', 'Sanitation', 2, 0, '2026-05-14 11:15:43', '1778737543809-sanitation_video.mp4', 'Sanitation Department', 'baba'),
(4, 8, 'Road Issue', 'Irregular water supply is affecting daily household activities. Residents are facing low pressure and contamination problems. Immediate action is needed to ensure clean and consistent water availability.', 'Makarpura, vadodara', 'Road', 2, 0, '2026-05-15 10:15:19', '1778820319005-road_issue.mp4', 'Road Department', 'Golu'),
(5, 9, 'Water Leakage Issue', 'Irregular water supply is affecting daily household activities. Residents are facing low pressure and contamination problems. Immediate action is needed to ensure clean and consistent water availability.', 'Fategunj, Vadodara', 'Water', 2, 0, '2026-05-18 10:18:40', '1779079720126-water_leakage.mp4', 'Water Department', 'Jaymin'),
(5, 10, 'Sanitation Issuez', 'Garbage is not being collected regularly, leading to foul smell and unhygienic conditions. Immediate action is required to maintain cleanliness in the area.', 'Kamatipura, Fategunj, Vadodara', 'Sanitation', 2, 0, '2026-05-20 10:19:58', '1779252598513-sanitation_video.mp4', 'Sanitation Department', 'baba'),
(1, 11, 'Electricity Supply Issue', 'Frequent power cuts are disrupting normal life and work. Voltage fluctuations are damaging electrical appliances. A stable and reliable power supply is urgently required.', 'Shiv Shakti park, Karodiya, Vadodara', 'Electricity', 2, 0, '2026-05-20 10:22:32', '1779252752897-electricity.png', 'Electricity Department', 'kishan'),
(1, 13, 'Road Issue', 'Damaged and pothole-filled roads are causing inconvenience to commuters. Traffic congestion and accidents are increasing due to poor conditions. Proper repair and maintenance of roads is necessary for safe travel.', 'Khatriya society, Karodiya, Vadodara', 'Road', 2, 0, '2026-05-22 12:25:06', '1779778430264-road_issue.mp4', 'Water Department', 'sohan'),
(5, 14, 'Electricity Supply Issue', 'Frequent power cuts are disrupting normal life and work. Voltage fluctuations are damaging electrical appliances. A stable and reliable power supply is urgently required.', 'Fatepura, Vadodara', 'Electricity', 1, 1, '2026-05-25 10:45:06', '1779686106991-electricity.png', 'Electricity Department', 'kishan'),
(2, 15, 'Traffic Problem', 'Traffic congestion and signal issues causing delays, unsafe road conditions, and inconvenience to commuters.a', 'Jakat Naka Circle, Vadodara', 'Traffic', 1, 1, '2026-05-25 11:20:30', '1779688228814-traffic.mp4', 'Traffic Department', 'gulgule '),
(3, 16, 'Traffic Porblem', 'Traffic congestion and signal issues causing delays, unsafe road conditions, and inconvenience to commuters.', 'Bhadran, Vadodara', 'Traffic', 1, 1, '2026-05-26 10:25:33', '1779771331146-traffic.mp4', 'Traffic Department', 'swaraj'),
(1, 17, 'Water Leakage Issue', 'Irregular water supply is affecting daily household activities. Residents are facing low pressure and contamination problems. Immediate action is needed to ensure clean and consistent water availability.', 'Karodiya, shiv shakti park society, Vadodara-390010', 'Water', 0, 0, '2026-05-26 12:15:40', '1779777940885-water_leakage.mp4', NULL, NULL),
(4, 18, 'Traffic Problem', 'Traffic congestion and signal issues causing delays, unsafe road conditions, and inconvenience to commuters.', 'Atal Bridge, Vadodara', 'Traffic', 0, 0, '2026-05-27 12:08:49', '1779863928284-traffic.mp4', NULL, NULL),
(4, 19, 'Water Issue', 'Irregular water supply is affecting daily household activities. Residents are facing low pressure and contamination problems. Immediate action is needed to ensure clean and consistent water availability.', 'shivam Soceity , Vadodara', 'Water', 0, 0, '2026-06-01 10:16:02', '1780289162308-water_leakage.mp4', NULL, NULL),
(6, 20, 'Electricity Supply Issue', 'Frequent power cuts are disrupting normal life and work. Voltage fluctuations are damaging electrical appliances. A stable and reliable power supply is urgently required.', 'Subh Society, Vadodara', 'Electricity', 0, 0, '2026-06-01 10:18:33', '1780289313396-electricity.png', NULL, NULL),
(6, 21, 'Road Issue', 'Damaged and pothole-filled roads are causing inconvenience to commuters. Traffic congestion and accidents are increasing due to poor conditions. Proper repair and maintenance of roads is necessary for safe travel.', 'Maruti Dham Society, Vadodara', 'Road', 0, 0, '2026-06-01 10:24:38', '1780289678485-road_issue.mp4', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `admin_login`
--

CREATE TABLE `admin_login` (
  `admin_id` int(11) NOT NULL,
  `admin_email` varchar(50) NOT NULL,
  `admin_pass` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_login`
--

INSERT INTO `admin_login` (`admin_id`, `admin_email`, `admin_pass`) VALUES
(1, 'admin@gmail.com', 'admin123');

-- --------------------------------------------------------

--
-- Table structure for table `complaint_feedback`
--

CREATE TABLE `complaint_feedback` (
  `feedback_id` int(11) NOT NULL,
  `complaint_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `overall_rating` int(11) NOT NULL,
  `resolution_speed` varchar(50) DEFAULT NULL,
  `staff_behavior` varchar(50) DEFAULT NULL,
  `issue_resolved` varchar(20) DEFAULT NULL,
  `recommend_service` varchar(20) DEFAULT NULL,
  `additional_comment` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `admin_reply` text NOT NULL,
  `is_read` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `managedepartment`
--

CREATE TABLE `managedepartment` (
  `id` int(11) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `department_head` varchar(100) NOT NULL,
  `total_staff` int(11) DEFAULT 0,
  `total_complaints` int(11) DEFAULT 0,
  `status` tinyint(1) DEFAULT 1 COMMENT '0 = Inactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `managedepartment`
--

INSERT INTO `managedepartment` (`id`, `department_name`, `department_head`, `total_staff`, `total_complaints`, `status`, `created_at`) VALUES
(1, 'Water Department', 'Manav Solanki', 3, 0, 1, '2026-05-18 06:43:56'),
(2, 'Road Department', 'Kishan Solanki', 3, 0, 1, '2026-05-18 06:44:27'),
(3, 'Electricity Department', 'Sohan Solanki', 3, 0, 1, '2026-05-18 06:45:17'),
(6, 'Sanitation Department', 'Het Solanki', 3, 0, 1, '2026-05-18 07:11:49'),
(7, 'Traffic Department', 'Keyur Prajapati', 3, 0, 1, '2026-05-26 05:03:57');

-- --------------------------------------------------------

--
-- Table structure for table `managestaff`
--

CREATE TABLE `managestaff` (
  `id` int(11) NOT NULL,
  `staff_name` varchar(100) DEFAULT NULL,
  `staff_email` varchar(100) DEFAULT NULL,
  `staff_phone` varchar(20) DEFAULT NULL,
  `staff_dept` varchar(100) DEFAULT NULL,
  `staff_desig` varchar(100) DEFAULT NULL,
  `status` int(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `managestaff`
--

INSERT INTO `managestaff` (`id`, `staff_name`, `staff_email`, `staff_phone`, `staff_dept`, `staff_desig`, `status`, `created_at`) VALUES
(8, 'Golu', 'golu@gmail.com', '8888888888', 'Road Department', 'Road Inspector', 1, '2026-05-19 06:43:50'),
(9, 'Jaymin', 'jaymin@gmail.com', '8787878787', 'Water Department', 'Pump Operator', 1, '2026-05-20 06:05:28'),
(10, 'het', 'het@gmail.com', '5656565656', 'Electricity Department', 'Line Technician', 1, '2026-05-20 06:23:26'),
(11, 'manav', 'manav@gmail.com', '5353535353', 'Sanitation Department', 'Sanitation Supervisor', 1, '2026-05-22 04:47:16'),
(12, 'sohan', 'sohan@gmail.com', '5656767689', 'Water Department', 'Water Inspector', 1, '2026-05-22 04:56:07'),
(13, 'aditya', 'aditya@gmail.com', '8989767690', 'Water Department', 'Pipeline Supervisor', 1, '2026-05-22 04:56:34'),
(15, 'mayank', 'mayank@gmail.com', '7738836638', 'Road Department', 'Contract Supervisor', 1, '2026-05-22 04:57:58'),
(16, 'kishan', 'kishan@gmail.com', '9898755678', 'Electricity Department', 'Electrician', 1, '2026-05-22 04:58:25'),
(17, 'keyur ', 'keyur@gmail.com', '8368368936', 'Electricity Department', 'Junior Engineer', 1, '2026-05-22 04:59:18'),
(18, 'baba', 'baba@gmail.com', '7358735983', 'Sanitation Department', 'Cleaner', 1, '2026-05-22 05:00:26'),
(20, 'gulgule ', 'gulgule@gmail.com', '3475757575', 'Traffic Department', 'Traffic Police Officer', 1, '2026-05-26 05:08:37'),
(21, 'swaraj', 'swaraj@gmail.com', '3233332234', 'Traffic Department', 'Traffic Inspector', 1, '2026-05-26 05:09:21');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `user_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `image` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`user_id`, `email`, `name`, `phone`, `image`) VALUES
(1, 'manav.gurur01@gmail.com', 'Manav ', '8849221191', '1778565271160-_DSC5696.JPG'),
(2, 'sohan@gmail.com', 'Sohan', '9090909090', '1778481106922-_DSC5716.JPG'),
(3, 'het@gmail.com', 'Het Solanki', '7878787878', '1778564764902-1654276721603.jpg'),
(4, 'jaymin@gmail.com', 'jaymin lokhande', '8493758394', '1779779209146-_DSC5705.JPG'),
(5, 'aditya@gmail.com', 'Aditya Parmar ', '8989898989', '1779079616838-1654276722204.jpg'),
(6, 'golu@gmail.com', 'Golu', '7897896765', '1779779380770-_DSC5949.JPG'),
(7, 'golu@gmail.com', 'Golu Yadav', '7685345342', '1779779849901-_DSC5949.JPG'),
(8, 'golu@gmail.com', 'Golu Yadav', '7653463261', '1779780111885-_DSC5949.JPG');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `image` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `email`, `password`, `phone`, `status`, `image`) VALUES
(1, 'Manav ', 'manav.gurur01@gmail.com', '$2b$10$3hq1D4JY8FPUuWYd2iP0bewH0qTNHnfOWexMAy37eEI48yw/6cUki', '8849221191', 1, '1778565271160-_DSC5696.JPG'),
(2, 'Sohan', 'sohan@gmail.com', '$2b$10$qTcL8BE4nYAxQU8ZNbUiPu18p0EK/.jB3iFQMAu4W7m4q3AEgT/TG', '9090909090', 1, '1778481106922-_DSC5716.JPG'),
(3, 'Het Solanki', 'het@gmail.com', '$2b$10$kE0WcojYu2HAddqPk7X3SOBou0v8pf85jQ1R2Suuh0INdr3dMMVuK', '7878787878', 1, '1778564764902-1654276721603.jpg'),
(4, 'jaymin lokhande', 'jaymin@gmail.com', '$2b$10$0VXFsOELyqIaNxE7WFBMmOE1KbswDxhYvUIBFPzw0X3Z16NIfOlMW', '8493758394', 1, '1779779209146-_DSC5705.JPG'),
(5, 'Aditya Parmar ', 'aditya@gmail.com', '$2b$10$wTEGRIGdRCWs3ZuA.KDSPenCpODqOZK2PqciqGIKBgF/nu3GQSznC', '8989898989', 1, '1779079616838-1654276722204.jpg'),
(6, 'Golu Yadav', 'golu@gmail.com', '$2b$10$HImu0rTt9hrN5ul3sjoB4Ou1bWVZNmd9UpEeZWFgCnTeR/OswqMNm', '7653463261', 1, '1779780111885-_DSC5949.JPG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addcomplaint`
--
ALTER TABLE `addcomplaint`
  ADD PRIMARY KEY (`complaint_id`);

--
-- Indexes for table `admin_login`
--
ALTER TABLE `admin_login`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `complaint_feedback`
--
ALTER TABLE `complaint_feedback`
  ADD PRIMARY KEY (`feedback_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `managedepartment`
--
ALTER TABLE `managedepartment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `managestaff`
--
ALTER TABLE `managestaff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addcomplaint`
--
ALTER TABLE `addcomplaint`
  MODIFY `complaint_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `admin_login`
--
ALTER TABLE `admin_login`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `complaint_feedback`
--
ALTER TABLE `complaint_feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `managedepartment`
--
ALTER TABLE `managedepartment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `managestaff`
--
ALTER TABLE `managestaff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
