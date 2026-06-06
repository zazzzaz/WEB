<?php

const MAX_UPLOAD = 5 * 1024 * 1024;
const MIME_EXT = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/gif' => 'gif', 'image/webp' => 'webp'];
const EXTS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

function buildGallery(string $folder, string $root, string $thumbs = 'thumbs', int $width = 200): string
{
    $path = "$root/$folder";
    if (!is_dir($path)) {
        return '<p class="error">Папка с изображениями не найдена.</p>';
    }

    $html = '<div class="gallery">';
    foreach (scandir($path) as $file) {
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (!in_array($ext, EXTS, true)) {
            continue;
        }

        $full = "$folder/$file";
        $src = is_file("$root/$thumbs/$file") ? "$thumbs/$file" : $full;
        $html .= '<a href="' . htmlspecialchars($full) . '" target="_blank">';
        $html .= '<img src="' . htmlspecialchars($src) . '" width="' . $width . '" alt="' . htmlspecialchars($file) . '">';
        $html .= '</a>';
    }

    return $html . '</div>';
}

function uploadImage(array $file, string $root, string $images = 'images', string $thumbs = 'thumbs'): array
{
    if (($file['error'] ?? 1) !== UPLOAD_ERR_OK) {
        return [false, 'Ошибка при загрузке файла.'];
    }
    if ($file['size'] > MAX_UPLOAD) {
        return [false, 'Размер файла превышает 5 МБ.'];
    }

    $mime = mime_content_type($file['tmp_name']);
    if (!isset(MIME_EXT[$mime])) {
        return [false, 'Допустимы только JPEG, PNG, GIF, WebP.'];
    }

    foreach ([$images, $thumbs] as $dir) {
        $path = "$root/$dir";
        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }
    }

    $img = match ($mime) {
        'image/jpeg' => imagecreatefromjpeg($file['tmp_name']),
        'image/png' => imagecreatefrompng($file['tmp_name']),
        'image/gif' => imagecreatefromgif($file['tmp_name']),
        'image/webp' => imagecreatefromwebp($file['tmp_name']),
    };
    if (!$img) {
        return [false, 'Не удалось обработать изображение.'];
    }

    $name = uniqid('img_', true) . '.' . MIME_EXT[$mime];
    if (!saveResized($img, "$root/$images/$name", $mime, 1920)) {
        return [false, 'Не удалось сохранить изображение.'];
    }
    if (!saveResized($img, "$root/$thumbs/$name", $mime, 200)) {
        return [false, 'Не удалось сохранить миниатюру.'];
    }

    return [true, ''];
}

function saveResized($img, string $path, string $mime, int $maxW): bool
{
    $w = imagesx($img);
    $h = imagesy($img);
    if ($w > $maxW) {
        $nh = (int) round($h * $maxW / $w);
        $tmp = imagecreatetruecolor($maxW, $nh);
        imagecopyresampled($tmp, $img, 0, 0, 0, 0, $maxW, $nh, $w, $h);
        $img = $tmp;
    }

    return match ($mime) {
        'image/jpeg' => imagejpeg($img, $path, 85),
        'image/png' => imagepng($img, $path, 6),
        'image/gif' => imagegif($img, $path),
        'image/webp' => imagewebp($img, $path, 85),
    };
}

function logRequest(string $dir): void
{
    $log = "$dir/log.txt";
    if (is_file($log) && count(file($log, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES)) >= 10) {
        $n = 0;
        while (is_file("$dir/log$n.txt")) {
            $n++;
        }
        rename($log, "$dir/log$n.txt");
    }
    file_put_contents($log, date('Y-m-d H:i:s') . PHP_EOL, FILE_APPEND | LOCK_EX);
}
