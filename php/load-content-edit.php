<?php
    if (!copy($_SERVER['DOCUMENT_ROOT'].'/'.$_GET['url'].'/content.htm',
         $_SERVER['DOCUMENT_ROOT'].'/'.$_GET['url'].'/content-edit.htm')){
        http_response_code(500);
    }