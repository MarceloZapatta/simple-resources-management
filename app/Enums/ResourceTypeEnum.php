<?php

namespace App\Enums;

enum ResourceTypeEnum: int {
    case PDF = 1;
    case HTMLSnippet = 2;
    case Link = 3;
}
