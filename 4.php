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

function mathOperation($arg1, $arg2, $operation) {
    switch ($operation) {
        case "add":
            return add($arg1, $arg2);
        case "subtract":
            return subtract($arg1, $arg2);
        case "multiply":
            return multiply($arg1, $arg2);
        case "divide":
            return divide($arg1, $arg2);
        default:
            return "Ошибка: неизвестная операция '$operation'";
    }
}

$x = 15;
$y = 4;



echo "add:        " . mathOperation($x, $y, "add") . "\n";
echo "subtract:   " . mathOperation($x, $y, "subtract") . "\n";
echo "multiply:   " . mathOperation($x, $y, "multiply") . "\n";
echo "divide:     " . mathOperation($x, $y, "divide") . "\n";

