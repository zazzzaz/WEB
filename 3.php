<?php

function add($arg1, $arg2) {
    return $arg1 + $arg2;
}

function subtract($arg1, $arg2) {
    return $arg1 - $arg2;
}

function multiply($arg1, $arg2) {
    return $arg1 * $arg2;
}

function divide($arg1, $arg2) {
    if ($arg2 == 0) {
        return "Ошибка: деление на ноль!";
    }
    return $arg1 / $arg2;
}

$x = 10;
$y = 3;


echo "Сложение: " . add($x, $y) . "\n";
echo "Вычитание: " . subtract($x, $y) . "\n";
echo "Умножение: " . multiply($x, $y) . "\n";
echo "Деление: " . divide($x, $y) . "\n";
