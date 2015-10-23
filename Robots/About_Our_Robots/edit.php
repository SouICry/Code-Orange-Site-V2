<?php
    //Auto-generated content. Changes made may be lost at any time.
    if (!include $_SERVER['DOCUMENT_ROOT'].'/php/verify-user.php'){
        echo('<script>window.history.back();</script>');
        return;
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'].'/php/head-include.php'; ?>

</head>
<body>
<div id="header">
    <div id="nav">
        <div class="row">
            <div class="column">
                <div id="logo">
                    <?php
                    if (file_exists($_SERVER['DOCUMENT_ROOT'].'/php/logo-edit.php')){
                        include $_SERVER['DOCUMENT_ROOT'].'/php/logo-edit.php';
                    }
                    else{
                        include $_SERVER['DOCUMENT_ROOT'].'/php/logo.php';
                    }
                    ?>
                </div>
                <div id="user">
                    <?php
                    if (file_exists($_SERVER['DOCUMENT_ROOT'].'/php/user-edit.php')){
                        include $_SERVER['DOCUMENT_ROOT'].'/php/user-edit.php';
                    }
                    else{
                        include $_SERVER['DOCUMENT_ROOT'].'/php/user.php';
                    }
                    ?>
                </div>
                <div id="nav-menu">
                    <div class="scroll-hide">
                        <div class="scroll-fix">
                            <?php
                            if (file_exists($_SERVER['DOCUMENT_ROOT'].'/php/menu-edit.php')){
                                include $_SERVER['DOCUMENT_ROOT'].'/php/menu-edit.php';
                            }
                            else{
                                include $_SERVER['DOCUMENT_ROOT'].'/php/menu.php';
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="selection-bar" class="selection-nav">
        <?php
        if (file_exists('../content-edit.htm')){
            include '../content-edit.htm';
        }
        else{
            include '../content.htm';
        }
        ?>
    </div>
</div>
<div id="header-filler">
    <div id="nav-filler">
        <div class="row">
            <div class="column">
                <div id="logo-filler">
                    <?php
                    if (file_exists($_SERVER['DOCUMENT_ROOT'].'/php/logo-edit.php')){
                        include $_SERVER['DOCUMENT_ROOT'].'/php/logo-edit.php';
                    }
                    else{
                        include $_SERVER['DOCUMENT_ROOT'].'/php/logo.php';
                    }
                    ?>
                </div>
                <div id="user-filler">
                    <?php
                    if (file_exists($_SERVER['DOCUMENT_ROOT'].'/php/user-edit.php')){
                        include $_SERVER['DOCUMENT_ROOT'].'/php/user-edit.php';
                    }
                    else{
                        include $_SERVER['DOCUMENT_ROOT'].'/php/user.php';
                    }
                    ?>
                </div>
                <div id="nav-menu-filler">
                    <div class="scroll-hide">
                        <div class="scroll-fix">
                            <?php
                            if (file_exists($_SERVER['DOCUMENT_ROOT'].'/php/menu-edit.php')){
                                include $_SERVER['DOCUMENT_ROOT'].'/php/menu-edit.php';
                            }
                            else{
                                include $_SERVER['DOCUMENT_ROOT'].'/php/menu.php';
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="selection-bar-filler" class="selection-nav">
        <?php
        if (file_exists('../content-edit.htm')){
            include '../content-edit.htm';
        }
        else{
            include '../content.htm';
        }
        ?>
    </div>
</div>
<div id="body">
    <?php include 'content-edit.htm'; ?>
</div>
<div id="footer">
    <?php include $_SERVER['DOCUMENT_ROOT'].'/php/footer.php'; ?>
</div>
<?php include $_SERVER['DOCUMENT_ROOT'].'/php/js-include.php'; ?>
<?php include $_SERVER['DOCUMENT_ROOT'].'/php/js-edit-include.php'; ?>
</body>
</html>