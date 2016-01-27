<?php
//Auto-generated content. Changes made may be lost at any time.
if (!include $_SERVER['DOCUMENT_ROOT'] . '/php/verify-user.php') {
    echo('<script>window.history.back();</script>');
    return;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/php/head-include.php'; ?>

</head>
<body>
<div id="header">
    <div id="nav">
        <div class="row">
            <div class="column">
                <div id="logo">
                    <?php
                        include $_SERVER['DOCUMENT_ROOT'] . '/php/logo.php';
                    ?>
                </div>
                <div id="user">
                    <?php
                        include $_SERVER['DOCUMENT_ROOT'] . '/php/user.php';
                    ?>
                </div>
                <div id="nav-menu" class="nav-nav">
                    <div class="slider-left"><span></span></div>
                    <div class="scroll-hide">
                        <div class="scroll-fix">
                            <?php
                                include $_SERVER['DOCUMENT_ROOT'] . '/php/menu.php';
                            ?>
                        </div>
                    </div>
                    <div class="slider-right"><span></span></div>
                </div>
            </div>
        </div>
    </div>
    <div id="selection-bar" class="selection-nav">
        <div class="slider-left"><span></span></div>

        <div class="slider-right"><span></span></div>
    </div>
</div>
<div id="header-filler">
    <div id="nav-filler">
        <div class="row">
            <div class="column">
                <div id="logo-filler">
                    <?php
                        include $_SERVER['DOCUMENT_ROOT'] . '/php/logo.php';
                    ?>
                </div>
                <div id="user-filler">
                    <?php
                        include $_SERVER['DOCUMENT_ROOT'] . '/php/user.php';
                    ?>
                </div>
                <div id="nav-menu-filler" class="nav-nav">
                    <div class="slider-left"><span></span></div>
                    <div class="scroll-hide">
                        <div class="scroll-fix">
                            <?php
                                include $_SERVER['DOCUMENT_ROOT'] . '/php/menu.php';
                            ?>
                        </div>
                        <div class="slider-right"><span></span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="selection-bar-filler" class="selection-nav">
        <div class="slider-left"><span></span></div>
        <div class="slider-right"><span></span></div>
    </div>
</div>
<?php include $_SERVER['DOCUMENT_ROOT'] . '/php/body-prepend.php'; ?>
<div id="body">
    <?php include 'content-edit.htm'; ?>
</div>
<div id="footer">
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/php/footer.php'; ?>
</div>
<?php include $_SERVER['DOCUMENT_ROOT'] . '/php/js-include.php'; ?>

<?php
if (isset($_GET['edit']) && $_GET['edit'] == 'true') {
    include $_SERVER['DOCUMENT_ROOT'] . '/php/js-edit-include.php';
}
?>
</body>
</html>