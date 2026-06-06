<?php

$translitMap = [
    'а' => 'a',   'б' => 'b',   'в' => 'v',   'г' => 'g',
    'д' => 'd',   'е' => 'e',   'ё' => 'yo',  'ж' => 'zh',
    'з' => 'z',   'и' => 'i',   'й' => 'y',   'к' => 'k',
    'л' => 'l',   'м' => 'm',   'н' => 'n',   'о' => 'o',
    'п' => 'p',   'р' => 'r',   'с' => 's',   'т' => 't',
    'у' => 'u',   'ф' => 'f',   'х' => 'kh',  'ц' => 'ts',
    'ч' => 'ch',  'ш' => 'sh',  'щ' => 'shch','ъ' => '\'',
    'ы' => 'y',   'ь' => '\'',  'э' => 'e',   'ю' => 'yu',
    'я' => 'ya',
];

function transliterate(string $str, array $map): string
{
    $result = '';

    for ($i = 0; $i < mb_strlen($str); $i++) {
        $char = mb_substr($str, $i, 1);
        $lower = mb_strtolower($char);

        if (isset($map[$lower])) {
            $trans = $map[$lower];
            $result .= ($char === mb_strtoupper($char) && mb_strlen($char) > 1)
                ? mb_strtoupper(mb_substr($trans, 0, 1)) . mb_substr($trans, 1)
                : $trans;
        } else {
            $result .= $char;
        }
    }

    return $result;
}

echo transliterate('Привет, мир!', $translitMap) . "\n";
