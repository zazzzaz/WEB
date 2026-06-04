<?php

  echo "Текущий год (date): " . date('Y')."\n";

  $dateArr = getdate();
  echo "Текущий год (getdate): " . $dateArr['year']."\n";

  echo "Текущий год (mktime): " . date('Y', mktime(0, 0, 0, 1, 1));
