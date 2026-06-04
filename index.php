<?php
$page_title = "Первый PHP-сайт";
$heading    = "Добро пожаловать на сайт!";
$current_year = date("Y");

function format_time_ru() {
    $h = (int)date("G");
    $m = (int)date("i");
    
    if ($h % 10 === 1 && $h % 100 !== 11) {
        $hour_word = "час";
    } elseif (in_array($h % 10, [2, 3, 4]) && !in_array($h % 100, [12, 13, 14])) {
        $hour_word = "часа";
    } else {
        $hour_word = "часов";
    }
    
    if ($m % 10 === 1 && $m % 100 !== 11) {
        $min_word = "минута";
    } elseif (in_array($m % 10, [2, 3, 4]) && !in_array($m % 100, [12, 13, 14])) {
        $min_word = "минуты";
    } else {
        $min_word = "минут";
    }
    
    return "$h $hour_word $m $min_word";
}

$current_time = format_time_ru();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $page_title ?></title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: system-ui, -apple-system, sans-serif;
            background: #f0f2f5;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .card {
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.08);
            text-align: center;
            max-width: 480px;
            width: 90%;
        }
        h1 { font-size: 28px; color: #1a1a2e; margin-bottom: 16px; }
        p { color: #555; line-height: 1.6; margin-bottom: 12px; }
        .time { font-size: 20px; color: #e63946; font-weight: 600; }
        .year { margin-top: 20px; font-size: 14px; color: #999; }
    </style>
</head>
<body>
    <div class="card">
        <h1><?= $heading ?></h1>
        <p>Текущее время:</p>
        <p class="time"><?= $current_time ?></p>
        <p class="year">&copy; <?= $current_year ?></p>
    </div>
</body>
</html>
