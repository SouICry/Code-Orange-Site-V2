<!DOCTYPE html>
<html lang="en">
<head>
	<?php include $_SERVER['DOCUMENT_ROOT'].'/head-include.php'; ?>
</head>
<body>

<div id="header">
    <div class="row">
        <div class="column">
            <div id="logo">
                <a href="#">Code Orange</a>
            </div>
            <div id="user">
                <a href="#">Login</a>
            </div>
            <div id="nav">
                <div class="scroll-hide">
                    <div class="scroll-fix">
                        <a href="#">About</a>
                        <a href="#">Robots</a>
                        <a href="#"><i>FIRST</i></a>
                        <a href="#">Tutorials</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="selection-bar" class="selection-content">
    <?php include 'content.php'; ?>
</div>

<div id="body">

</div>
<div id="footer"></div>

<?php include $_SERVER['DOCUMENT_ROOT'].'/js-include.php'; ?>

</body>
</html>