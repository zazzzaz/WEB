<?php

$a = 5;
$b = -3;

echo "Исходные значения: \$a = $a, \$b = $b\n";

if ($a >= 0 && $b >= 0) {
    $result = $a - $b;
    echo "Оба положительные, разность: $a - $b = $result\n";
} elseif ($a < 0 && $b < 0) {
    $result = $a * $b;
    echo "Оба отрицательные,  произведение: $a * $b = $result\n";
} else {
    $result = $a + $b;
    echo "Разных знаков, сумма: $a + $b = $result\n";
}
