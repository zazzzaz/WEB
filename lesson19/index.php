<?php

require_once __DIR__ . '/functions.php';

logRequest(__DIR__);

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['photo'])) {
    [$ok, $error] = uploadImage($_FILES['photo'], __DIR__);
    if ($ok) {
        header('Location: ' . $_SERVER['PHP_SELF']);
        exit;
    }
}

?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Фотогалерея</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Фотогалерея</h1>

        <section>
            <h2>Загрузить изображение</h2>
            <?php if ($error): ?>
                <p class="error"><?= htmlspecialchars($error) ?></p>
            <?php endif; ?>
            <form method="post" enctype="multipart/form-data">
                <input type="file" name="photo" accept="image/jpeg,image/png,image/gif,image/webp" required>
                <button type="submit">Загрузить</button>
            </form>
            <p class="hint">JPEG, PNG, GIF, WebP. Не более 5 МБ.</p>
        </section>

        <section>
            <h2>Все фотографии</h2>
            <?= buildGallery('images', __DIR__) ?>
        </section>
    </div>
</body>
</html>
