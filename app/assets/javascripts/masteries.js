$(document).ready(function (){

	var offensivePointTotal = 0;
	var defensivePointTotal = 0;
	
	var offensiveTier1Total = 0;
	var offensiveTier2Total = 0;
	var offensiveTier3Total = 0;
	var offensiveTier4Total = 0;
	var offensiveTier5Total = 0;
	var offensiveTier6Total = 0;

	var points;
	var rowRequiresPoints;
	var activeRow;

	$( '.masteryAncor' )
	.bind('contextmenu', function(){
		return false;
	})
	.mousedown(function(event) {

		event.preventDefault();
		var tree = $(this).closest('.row').prevAll('.treeTitle');
		var masteryRequiresPoints = $(this).closest('.row').data('requires-points');
		var masteryMaxPoints = $(this).closest('.mastery').data('max-points');
		var currentRow = +$(this).closest('.row').data('tier');

		if(masteryMaxPoints == undefined){
			var masteryMaxPoints = $(this).closest('.masteryAvailable').data('max-points');
		}

		var masteryCurrentPoints = +$(this).find('.currentPoints').text();

		if(tree.attr('id') == "offense"){
			if(event.which == 1 && masteryCurrentPoints < masteryMaxPoints && masteryRequiresPoints <= offensivePointTotal){
				offensivePointTotal++;
				addPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
			}else if(event.which == 3){
				if(currentRow == 1 && activeRow == 1 && masteryCurrentPoints > 0){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 1 && activeRow == 2 && masteryCurrentPoints > 0 && offensiveTier1Total > 4){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 1 && activeRow == 3 && masteryCurrentPoints > 0 && offensiveTier1Total + offensiveTier2Total > 8){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 1 && activeRow == 4 && masteryCurrentPoints > 0 && offensiveTier1Total + offensiveTier2Total + offensiveTier3Total > 12){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 1 && activeRow == 5 && masteryCurrentPoints > 0 && offensiveTier1Total + offensiveTier2Total + offensiveTier3Total + offensiveTier4Total > 16){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 1 && activeRow == 6 && masteryCurrentPoints > 0 && offensiveTier1Total + offensiveTier2Total + offensiveTier3Total + offensiveTier4Total +offensiveTier5Total > 20){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 2 && activeRow == 2 && masteryCurrentPoints > 0){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 2 && activeRow == 3 && masteryCurrentPoints > 0 && offensiveTier1Total + offensiveTier2Total > 8){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 2 && activeRow == 4 && masteryCurrentPoints > 0 && offensiveTier1Total + offensiveTier2Total + offensiveTier3Total > 12){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 2 && activeRow == 5 && masteryCurrentPoints > 0 && offensiveTier1Total + offensiveTier2Total + offensiveTier3Total + offensiveTier4Total > 16){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 2 && activeRow == 6 && masteryCurrentPoints > 0 && offensiveTier1Total + offensiveTier2Total + offensiveTier3Total + offensiveTier4Total +offensiveTier5Total > 20){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 3 && activeRow == 3 && masteryCurrentPoints > 0){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 3 && activeRow == 4 && masteryCurrentPoints > 0 && offensiveTier1Total + offensiveTier2Total +offensiveTier3Total > 12){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 3 && activeRow == 5 && masteryCurrentPoints > 0 && offensiveTier1Total + offensiveTier2Total + offensiveTier3Total + offensiveTier4Total > 16){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 3 && activeRow == 6 && masteryCurrentPoints > 0 && offensiveTier1Total + offensiveTier2Total + offensiveTier3Total + offensiveTier4Total + offensiveTier5Total > 20){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 4 && activeRow == 4 && masteryCurrentPoints > 0){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 4 && activeRow == 5 && masteryCurrentPoints > 0 && offensiveTier1Total + offensiveTier2Total + offensiveTier3Total + offensiveTier4Total > 16){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 4 && activeRow == 6 && masteryCurrentPoints > 0 && offensiveTier1Total + offensiveTier2Total + offensiveTier3Total + offensiveTier4Total + offensiveTier5Total > 20){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 5 && activeRow == 5 && masteryCurrentPoints > 0){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 5 && activeRow == 6 && masteryCurrentPoints > 0 && offensiveTier1Total + offensiveTier2Total + offensiveTier3Total + offensiveTier4Total + offensiveTier5Total > 20){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}else if(currentRow == 6 && activeRow == 6 && masteryCurrentPoints > 0){
					offensivePointTotal--;
					returnPoint( $(this), masteryCurrentPoints, offensivePointTotal, tree, currentRow );
				}
			}

			//Highlight Available Masteries
			$(this).closest('.row').siblings('.row').each(function(){
				if($(this).data("requires-points") <= offensivePointTotal){
					$(this).children('.mastery').removeClass('mastery').addClass('masteryAvailable');
				}else if($(this).data("requires-points") > offensivePointTotal){
					$(this).children('.masteryAvailable').removeClass('masteryAvailable').addClass('mastery');
				}
			});
		}
	});

	function addPoint(that, masteryCurrentPoints, offensivePointTotal, tree, currentRow){
		$(that).find('.currentPoints').text(masteryCurrentPoints + 1);
		getActiveRow( $(that) );
		tree.find('span').text(offensivePointTotal);
		if(currentRow == 1){
			offensiveTier1Total++
		}else if(currentRow == 2){
			offensiveTier2Total++
		}
		if(currentRow == 3){
			offensiveTier3Total++
		}
		if(currentRow == 4){
			offensiveTier4Total++
		}
		if(currentRow == 5){
			offensiveTier5Total++
		}
		if(currentRow == 6){
			offensiveTier6Total++
		}
	}

	function returnPoint(that, masteryCurrentPoints, offensivePointTotal, tree, currentRow){
		$(that).find('.currentPoints').text(masteryCurrentPoints - 1);
		getActiveRow( $(that) );
		tree.find('span').text(offensivePointTotal);
		if(currentRow == 1){
			offensiveTier1Total--
		}else if(currentRow == 2){
			offensiveTier2Total--
		}
		if(currentRow == 3){
			offensiveTier3Total--
		}
		if(currentRow == 4){
			offensiveTier4Total--
		}
		if(currentRow == 5){
			offensiveTier5Total--
		}
		if(currentRow == 6){
			offensiveTier6Total--
		}
	}
	
	function getActiveRow(that){
		$(that).closest('.tree').find('.currentPoints').each(function(){
			points = +$(this).text();
			if(points > 0){
				rowRequiresPoints = $(this).closest('.row').data('requires-points');
				if(rowRequiresPoints == 0){
					activeRow = 1;
				}else if(rowRequiresPoints == 4){
					activeRow = 2;
				}else if(rowRequiresPoints == 8){
					activeRow = 3;
				}else if(rowRequiresPoints == 12){
					activeRow = 4;
				}else if(rowRequiresPoints == 16){
					activeRow = 5;
				}if(rowRequiresPoints == 20){
					activeRow = 6;
				}
			}
		});
		return activeRow;
	}
});