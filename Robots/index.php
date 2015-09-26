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
                        <?php include $_SERVER['DOCUMENT_ROOT'].'/menu.php'; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="selection-bar" class="selection-content">
    <div class="row">
        <div class="column">
            <div class="title">
                <h1>Robots</h1>
                <div class="sub-title"></div>
                <p>Team Code Orange #3476 is a high-school robotics team from Irvine, California.
                    We compete in a robotics league under an organization called FIRST.</p>
                <div class=""></div>
            </div>
        </div>
    </div>
    <div class="slider">
        <div class="scroll-hide">
            <div class="column">
                <div class="scroll-fix">
                    <a href="#">
                        <div class="slider-content">
                            <div class="content">
                                <img src="pages/robots/img/cloud-9.png"/>
                            </div>
                            <div class="name">Cloud 9</div>
                        </div>
                    </a>
                    <a href="#">
                        <div class="slider-content">
                            <div class="content">
                                <img src="pages/robots/img/hanalei.png"/>
                            </div>
                            <div class="name">Hanalei</div>
                        </div>
                    </a>
                    <a href="#">
                        <div class="slider-content">
                            <div class="content">
                                <img src="pages/robots/img/mavericks.png"/>
                            </div>
                            <div class="name">Mavericks</div>
                        </div>
                    </a>
                    <a href="#">
                        <div class="slider-content">
                            <div class="content">
                                <img src="pages/robots/img/pipeline.png"/>
                            </div>
                            <div class="name">Pipeline</div>
                        </div>
                    </a>
                    <a href="#">
                        <div class="slider-content">
                            <div class="content">
                                <img src="pages/robots/img/tic-tac.png"/>
                            </div>
                            <div class="name">Tic-Tac</div>
                        </div>
                    </a>

                </div>
            </div>

        </div>
    </div>
</div>

<div id="body">

</div>
<div id="footer"></div>

<?php include $_SERVER['DOCUMENT_ROOT'].'/js-include.php'; ?>

</body>
</html>