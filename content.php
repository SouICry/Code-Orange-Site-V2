<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="initial-scale=1.0">

    <link rel="stylesheet" type="text/css" href="css/normalize.css">
    <link rel="stylesheet" type="text/css" href="css/materialize.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
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
                    <div id="menu" class="scroll-fix">
                        <?php include $_SERVER['DOCUMENT_ROOT'].'/menu.php'; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="selection-bar" class="selection-nav">
    <div class="row">
        <div class="column">
            <div class="title">
                <h1>Robots</h1>
                <div class="sub-title">aaaa</div>

            </div>
        </div>
    </div>
    <div class="slider">
        <div class="scroll-hide">
            <div class="column">
                <div class="scroll-fix">

                    <a href="#">
                        <div class="slider-content">
                            About
                        </div>
                    </a>
                    <a href="#">
                        <div class="slider-content">About</div>
                    </a>
                    <a href="#">
                        <div class="slider-content"><i>FIRST</i></div>
                    </a>
                    <a href="#">
                        <div class="slider-content">About</div>
                    </a>

                </div>
            </div>

        </div>
    </div>
</div>
<div id="body">


    <div class="row">
        <div class="column">
            <div class="title">
                <h1>Hanalei</h1>

                <div class="sub-title"> - 2014: Aerial Assist</div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column">
            <div class="content-section">
                <div class="content-row">
                    <div class="sidebar-left">
                        <div class="sidebar-blocks">

                        </div>
                        <img src="content/img/hanalei.png"/>
                    </div>
                    <div class="content">
                        <iframe style="background-color: #000" height="500" frameborder="0" allowfullscreen></iframe>


                        <h3>Dimensions</h3>
                        <ul>
                            <li>- 119lbs</li>
                        </ul>

                        <h3>Base</h3>
                        <ul>
                            <li>- 6WD West Coast Drive</li>
                            <li>- 4" Performance Wheels</li>
                            <li>- 2 VEX Pro Ball Shifters for 6 and 22 feet/sec</li>
                            <li>- Fast Ground Intake</li>
                        </ul>

                        <h3>Catapult</h3>
                        <ul>
                            <li>- Score Anywhere 4' to 18' Away from Goal</li>
                            <li>- Fast Automatic Catapult Reset ~1 sec</li>
                            <li>- 2 Positioner Arms for Ball Passing and Shot Angling</li>
                            <li>- Vision Tracking for 2 Hot Goal Autonomous</li>
                        </ul>

                        <h3> Results </h3>
                        <h4> Curie Division </h4>
                        <ul>
                            <li>
                                - Excellence in Engineering
                            </li>
                        </ul>
                        <h4> San Diego Regional </h4>
                        <ul>
                            <li>
                                - Chairman's Award
                            </li>
                            <li>
                                - Semi-finalist
                            </li>
                            <li>
                                - 11-0 #2 Seed
                            </li>
                        </ul>
                        <h4> Las Vegas Regional </h4>
                        <ul>
                            <li>
                                - Regional Finalist
                            </li>
                            <li>
                                - 7-4 #10 Seed
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="sidebar-right">
                <div class="sidebar-blocks">
                    <div class="block">
                        <div class="block-content">

                        </div>
                    </div>
                    <div class="block">
                        <div class="block-content">

                        </div>
                    </div>
                </div>

                <div class="page-nav">
                    Page-nav
                </div>
            </div>
        </div>
    </div>
</div>
<div id="footer"></div>


<script src="js/jquery-2.1.4.js"></script>
<script src="js/slick-modified.js"></script>
<script>
    $(document).ready(function () {
        $('.carousel').slick({
            dots: false,
            autoplay: false,
            autoplaySpeed: 2000,
            speed: 800,
            touchThreshold: 100,
            adaptiveHeight: true
        });
    });
</script>
<script src="js/load.js"></script>
</body>
</html>