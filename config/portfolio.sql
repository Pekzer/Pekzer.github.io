-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-09-2025 a las 04:27:01
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `portfolio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id_proyecto` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `enlace` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id_proyecto`, `nombre`, `enlace`) VALUES
(1, 'Metodos de PN', NULL),
(2, 'Envido', NULL),
(3, 'Calculadora', NULL),
(4, 'Nuevo proyecto', 'https://www.youtube.com/watch?v=3wHvEIvii_g');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnologias`
--

CREATE TABLE `tecnologias` (
  `id_tecnologia` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tecnologias`
--

INSERT INTO `tecnologias` (`id_tecnologia`, `nombre`) VALUES
(1, 'Python'),
(2, 'Java'),
(3, 'Laravel'),
(4, 'Css'),
(6, 'Javascript'),
(7, 'Nueva tecnologia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnologiasxproyectos`
--

CREATE TABLE `tecnologiasxproyectos` (
  `id_txp` int(11) NOT NULL,
  `id_proyecto` int(11) NOT NULL,
  `id_tecnologia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tecnologiasxproyectos`
--

INSERT INTO `tecnologiasxproyectos` (`id_txp`, `id_proyecto`, `id_tecnologia`) VALUES
(1, 2, 2),
(2, 1, 1),
(5, 3, 2),
(10, 2, 4),
(17, 4, 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id_proyecto`);

--
-- Indices de la tabla `tecnologias`
--
ALTER TABLE `tecnologias`
  ADD PRIMARY KEY (`id_tecnologia`);

--
-- Indices de la tabla `tecnologiasxproyectos`
--
ALTER TABLE `tecnologiasxproyectos`
  ADD PRIMARY KEY (`id_txp`),
  ADD KEY `id_proyecto` (`id_proyecto`),
  ADD KEY `id_tecnologia` (`id_tecnologia`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tecnologias`
--
ALTER TABLE `tecnologias`
  MODIFY `id_tecnologia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tecnologiasxproyectos`
--
ALTER TABLE `tecnologiasxproyectos`
  MODIFY `id_txp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tecnologiasxproyectos`
--
ALTER TABLE `tecnologiasxproyectos`
  ADD CONSTRAINT `tecnologiasxproyectos_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`) ON DELETE CASCADE,
  ADD CONSTRAINT `tecnologiasxproyectos_ibfk_2` FOREIGN KEY (`id_tecnologia`) REFERENCES `tecnologias` (`id_tecnologia`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
