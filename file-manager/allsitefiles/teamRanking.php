<html>
<?php include("header.php")?>
<body>
	<?php include("navbar.php")?>

	<div class="container row-offcanvas row-offcanvas-left">
		<div class="well column  col-lg-12  col-sm-12 col-xs-12" id="content">
			<h2>Match Ranking</h2>
			<form action="" method="get">
			Match Number To Look Above: <input class="control-label"type="number" name="match"  id="match"  size="10" height="10" width="40"> 
			<button id="submit" class="btn btn-primary" onclick="">Display</button>
			</form>
			<table  class="sortable table table-hover" id="RawData" border="1">
				<tr>
					<th>Team Number</th>
					<th>OPR</th>
					<th>Avg. Auto Stack</th>
					<th>Avg. Stack Height</th>
					<th>Avg. Stack Number</th>
					<th>Avg. Stack Points</th>
					<th>Avg. Binned Stack</th>
				</tr>
			<?php
				include("databaseName.php");
				$con= mysql_connect($address, $username, $password); 
			
				if (!$con){
					die('Could not connect: ' . mysql_error());
				}
					
				mysql_select_db($database, $con);
				include('team.php');
				
				$TeamInfo = new Team();
				$teams = $TeamInfo->teams;
				
				//$TeamDat = array();
				
				foreach($teams as $TeamNumber){
					$MatchScoutQ = mysql_query("select * from ".$matchScoutDatabase." WHERE TeamNumber='".$TeamNumber."'");
	
					if (!$MatchScoutQ ){
						die('Query failed: ' . mysql_error());
					}
					
					
					$i = 0;
					$avgAutoStack = 0; 
					$avgStackHeight = 0; 
					$avgStackNumber = 0; 
					$avgBinnedStacks = 0; 
					
					
					while ($row = mysql_fetch_array($MatchScoutQ )){
						if($_GET["match"] < $row["MatchNumber"]){
							
					
						if($row["StackHeight"] == 0){
							$row["StackNumber"]= 0; 
						}
						$avgAutoStack += $row["AutoStack"];
						$avgStackHeight += $row["StackHeight"];
						$avgStackNumber += $row["StackNumber"];
						$avgBinnedStacks += $row["BinnedStacks"];
						$i++;
						}
					}
					
					$avgAutoStack /= $i; 
					$avgStackHeight /= $i; 
					$avgStackNumber /= $i; 
					$avgBinnedStacks /= $i;
					
					//$TeamDat[$TeamNumber] = array($avgAutoStack,$avgStackHeight,$avgStackNumber,$avgBinnedStacks);
					echo("<tr>
							<td><a href='teamData.php?team=".$TeamNumber."'>".$TeamNumber."</a></td>
							<td>".$TeamInfo->OPR[$TeamNumber]."</td>
							<td>".$avgAutoStack."</td>
							<td>".$avgStackHeight."</td>
							<td>".$avgStackNumber."</td>
							<td>".($avgStackHeight * $avgStackNumber * 2)."</td>
							<td>".$avgBinnedStacks."</td>
					</tr>");
					
				}
				
			?>
			</table>
		</div>
	</div

    <?php include("footer.php") ?>
</body>