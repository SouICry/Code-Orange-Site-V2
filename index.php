<?php //Auto-generated content. Changes made may be lost at any time.  ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'].'/php/head-include.php'; ?>
</head>
<body>
<div id="title-overlay" style="position: fixed;width: 100vw; height: 100vh;
background-color: orange; z-index: 999; transition: all 1s"></div>
<script>
    $('#title-overlay').click(function(){
        $('#title-overlay').css('opacity', '0');
        setTimeout(function() {
            $('.title').css('z-index', '100');
            $('#title-overlay').css('display', 'none');
        }, 1000);
    })
</script>
<div id="header">
    <div id="nav">
        <div class="row">
            <div class="column">
                <div id="logo">
                    <?php include $_SERVER['DOCUMENT_ROOT'].'/php/logo.php'; ?>
                </div>
                <div id="user">
                    <?php include $_SERVER['DOCUMENT_ROOT'].'/php/user.php'; ?>
                </div>
                <div id="nav-menu">
                    <div class="scroll-hide">
                        <div class="scroll-fix">
                            <?php include $_SERVER['DOCUMENT_ROOT'].'/php/menu.php'; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="selection-bar" class="selection-nav">

    </div>
</div>
<div id="header-filler">
    <div id="nav-filler">
        <div class="row">
            <div class="column">
                <div id="logo">
                                    <?php include $_SERVER['DOCUMENT_ROOT'].'/php/logo.php'; ?>
                                </div>
                                <div id="user">
                                    <?php include $_SERVER['DOCUMENT_ROOT'].'/php/user.php'; ?>
                                </div>
                <div id="nav-menu-filler">
                    <div class="scroll-hide">
                        <div class="scroll-fix">
                            <?php include $_SERVER['DOCUMENT_ROOT'].'/php/menu.php'; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="selection-bar-filler" class="selection-nav">

    </div>
</div>
<div id="body">
    <?php include 'content.htm'; ?>
</div>
<div id="footer">
    <?php include $_SERVER['DOCUMENT_ROOT'].'/php/footer.php'; ?>
</div>
<?php include $_SERVER['DOCUMENT_ROOT'].'/php/js-include.php'; ?>
</body>
</html>