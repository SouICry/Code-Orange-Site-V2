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
                    <div class="scroll-fix">
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
                <h1>About</h1>

                <div class="sub-title"></div>
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
                <h1>Awards</h1>
                <div class="sub-title"></div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column">
            <div class="content-section">
                <div class="content-row">
                    <div class="sidebar-left">
                        <div class="sidebar-blocks">
                            <div class="block">
                                <a href="#" class="block-content">
                                    <div class="type">2014 Game</div>
                                    <!--div class="content">
                                        <h2>Aerial Assist</h2>
                                    </div-->
                                    <div class="content">
                                        <img src="FIRST/Games/img/14-logo.png">
                                    </div>
                                    <div class="view">View</div>
                                </a>
                            </div>
                        </div>

                    </div>
                    <div class="content">

                        <img src="pages/awards/img/14.jpg"/>
                        <h3>2014</h3>

                        <h4>Championship</h4>
                        <ul>
                            <li>- Curie: Excellence in Engineering</li>
                        </ul>

                        <h4>San Diego Regional</h4>
                        <ul>
                            <li>- Chairman's Award</li>
                            <li>- Imagery Award</li>
                        </ul>
                        <h4>Las Vegas Regional</h4>
                        <ul>
                            <li>- Regional Finalists</li>
                        </ul>

                    </div>
                </div>
                <div class="content-row">
                    <div class="sidebar-left">
                        <div class="sidebar-blocks">
                            <div class="block">
                                <a href="#" class="block-content">
                                    <div class="type">2013 Game</div>
                                    <div class="content">
                                        <img src="pages/games/img/13-logo.png">
                                    </div>
                                    <div class="view">View</div>
                                </a>
                            </div>
                        </div>

                    </div>
                    <div class="content">

                        <img src="pages/awards/img/13.jpg"/>
                        <h3>2013</h3>

                        <h4>Championship</h4>
                        <ul>
                            <li>- Newton Division Champions</li>
                        </ul>

                        <h4>San Diego Regional</h4>
                        <ul>
                            <li>- Industrial Design Award</li>
                            <li>- Semi-finalists</li>
                        </ul>
                        <h4>Inland Empire Regional</h4>
                        <ul>
                            <li>- Innovation in Control Award</li>
                            <li>- Regional Finalists</li>
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