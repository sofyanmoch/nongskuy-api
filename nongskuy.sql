-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: 12 Okt 2020 pada 07.39
-- Versi Server: 5.7.31-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nongskuy`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cashier`
--

CREATE TABLE `cashier` (
  `id` int(11) NOT NULL,
  `cashier_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `cashier`
--

INSERT INTO `cashier` (`id`, `cashier_name`) VALUES
(1, 'Farhan'),
(2, 'Baon Cikadap'),
(3, 'Misellia Ikhwan');

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `category_name`) VALUES
(1, 'Food'),
(2, 'Beverage'),
(12, 'Dessert');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `invoice` int(11) NOT NULL,
  `cashier_id` int(11) NOT NULL,
  `orders` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`invoice`, `cashier_id`, `orders`, `date`, `amount`) VALUES
(11, 2, 'Ayam goyeng\n', '2020-09-07 12:12:10', 13000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `produk`
--

CREATE TABLE `produk` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `produk`
--

INSERT INTO `produk` (`id`, `name`, `price`, `image`, `category_id`) VALUES
(109, 'Ayam goreng', 11000, 'image-1600893827027.png', 2),
(110, 'Ayam goreng', 11000, 'image-1600893838102.png', 2),
(116, 'Ayam Bakar', 24000, 'image-1600326842982.png', 1),
(118, 'Edit Geprek Gan', 100000, 'image-1600327091744.png', 2),
(119, 'Ikan Bakar', 11000, 'image-1600327185964.png', 2),
(124, 'insert 111', 22000, 'image-1600894771654.png', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int(11) NOT NULL,
  `invoice` int(11) NOT NULL,
  `cashier` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id`, `invoice`, `cashier`, `created_at`) VALUES
(13, 321, 'slamet', '2020-09-17 03:26:53'),
(14, 321, 'slamet', '2020-09-17 07:34:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi_detail`
--

CREATE TABLE `transaksi_detail` (
  `id` int(11) NOT NULL,
  `id_transaksi` int(11) NOT NULL,
  `product` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `qty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transaksi_detail`
--

INSERT INTO `transaksi_detail` (`id`, `id_transaksi`, `product`, `price`, `qty`) VALUES
(9, 14, 'ikan mati', 14000, 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refreshToken` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `refreshToken`) VALUES
(1, 'alii@gmail.com', '$2b$10$/1LnLexmLBKVNxStocaoO.ylZW9j25tRr2qfsdXj/RKNzg6jiq4vu', ''),
(11, 'saya@sofyan.com', '$2b$10$iaFxVjDh9h2VxVLqmEX5DeHIyj6oSaXtcq1mDw4yfDrfm2zjzVLfe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTYwMDgyODI5Nn0.9sEi2T-anFXKQG6Y_EYz-kPHo14BlPMLQOfoKrJIeMU'),
(16, 'sfyn@gmail.com', '$2b$10$voOYiUVYJvIujzMyftIRfuHAnd5bR0RSwiMMKRPlwf9M9rIRFhfkC', NULL),
(17, 'sofyan@gmail.com', '$2b$10$UygqBQyt7Fv5NuWhLtA8ne.4ixvrxNcnkXs7mU2QSURj4DpjamJMC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTYwMDgzMDEzMH0.OTq1HqDsPhRfOOqZXPSIFUB3ryKEd1BAXKBvO4NVbSU'),
(18, 'user1@gmail.com', '$2b$10$r.zlDXJ/zmlJ7yRdNORw9.5OcdgVwjyHZU4LyDTYGCZO4npBHpvyC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTYwMDgzMDM0M30.JfDELJ8Th-52AXgdHnrvZBYIqi2OuoGfvZX3Zop1R7M'),
(19, 'test@user.com', '$2b$10$Bj20VPDMXrzLL1OELD1h9uKq4RscJzmn7s7RCvYh3994skAXnCXrq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTYwMDg5NDc2MH0.ChFcZQ6-k5GC3nx-UwkFsEmOVlJqvG8TGZnLF8vPaOg'),
(20, 'user@test.com', '$2b$10$CBg1Uckd6FED2gy3ptKEXu8Ivb1zf51RXr1LvHk5DHK8AiZRmaEhO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTYwMDg5MTAwOX0.C2kD_74vCq53cNAiTAqMfC7sTb_4Uz2CyTeKp9h5cpc'),
(21, 'test@email.com', '$2b$10$ftB9ZCLybJ0cyswqLSiyHeP5Qb/CYpOUuL.oU7D.2GU8vfr.8ObSO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTYwMDg5MTA1MH0.WOyp73GpofyXLG1aMWCtZDqwyyQaenbdP8225jLkkqU');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cashier`
--
ALTER TABLE `cashier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`invoice`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaksi_detail`
--
ALTER TABLE `transaksi_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cashier`
--
ALTER TABLE `cashier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `invoice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;
--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `transaksi_detail`
--
ALTER TABLE `transaksi_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
