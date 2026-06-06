<?php
function printNumbers() {
    $i = 0;
    do {
        if ($i == 0) {
            echo "$i – это ноль.\n";
        } elseif ($i % 2 == 0) {
            echo "$i – чётное число.\n";
        } else {
            echo "$i – нечётное число.\n";
        }
        $i++;
    } while ($i <= 10);
}

printNumbers();
