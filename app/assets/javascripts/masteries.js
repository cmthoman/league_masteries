$(document).ready(function (){

	//Global Presets
	rowLockCheck('offense', 0);
	rowLockCheck('defense', 0);
	rowLockCheck('utility', 0);
	var remainingPoints = 30;
	updateRemainingPoints(remainingPoints);

	$( '.container' )
	.bind('contextmenu', function(){
		return false;
	});

	//On Click Listener
	$( '.masteryAncor' )
	.mousedown(function(event) {
		//Stop browser propagation and prevent default actions when clicking these links
		event.stopPropagation();
		event.preventDefault();

		//Find and set all of the attributes relative to the mastery that was clicked
		var tree = $(this).closest('.tree').attr('id');
		var row = $(this).closest('.row');
		var rowTier = row.data('tier');
		var thisRowPointsTotal = getRowPointTotal(tree, rowTier);
		var lastActiveRow = getLastActiveRow(tree);
		var treeTotalPoints = getTreeTotalPoints(tree);
		var mastery = $(this).closest('.mastery');
		if (mastery.attr('id') == undefined){
			mastery = $(this).closest('.masteryAvailable');
		}
		var masteryRequiresPoints = getMasteryRequiredPoints(rowTier);
		var masteryCurrentPoints = +mastery.find('.currentPoints').text();
		var masteryMaxPoints = mastery.data('max-points');
		remainingPoints = +$('.remainingPoints').text();

		//Determine if the click was a left click or right click and do something
		switch (event.which) {
        case 1: //This is a left click
            addPoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, remainingPoints);
            break;
        case 3: //This is a right click
        	removePointRuleCheck(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
    	}
	});

	//Where the magic happens

	function removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints){
		mastery.find('.currentPoints').text(masteryCurrentPoints - 1);
		treeTotalPoints = getTreeTotalPoints(tree);
		remainingPoints++;
		updateRemainingPoints(remainingPoints);
		rowLockCheck(tree, treeTotalPoints);
		lastActiveRow = getLastActiveRow;
	}

	function removePointRuleCheck(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints){
		switch (lastActiveRow){
		case 1:
			if(rowTier == 1 && masteryCurrentPoints > 0){ 
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}
		case 2:
			if(rowTier == 1 && masteryCurrentPoints > 0 && thisRowPointsTotal > 4){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}else if(rowTier == 2 && masteryCurrentPoints > 0){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}
		}
	}

	function addPoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, remainingPoints){
		if(masteryCurrentPoints < masteryMaxPoints && treeTotalPoints >= masteryRequiresPoints && remainingPoints > 0){
			mastery.find('.currentPoints').text(masteryCurrentPoints + 1);
			treeTotalPoints = getTreeTotalPoints(tree);
			remainingPoints--;
			updateRemainingPoints(remainingPoints);
			rowLockCheck(tree, treeTotalPoints);
			lastActiveRow = getLastActiveRow(tree);
		}
	}

	function updateRemainingPoints(remainingPoints){
		$('.remainingPoints').text(remainingPoints);
	}

	function rowLockCheck(tree, treeTotalPoints){
		$('.tree#'+tree).children('.row').find('.masteryAvailable').removeClass('masteryAvailable').addClass('mastery');
		switch (true) {
		case (treeTotalPoints >= 0 && treeTotalPoints < 4):
			$('.tree#'+tree).children("[data-tier='1']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='2']").find('.mastery').each(function(){
				$(this).removeClass('masteryAvailable').addClass('mastery');
			});
			$('.tree#'+tree).children("[data-tier='3']").find('.mastery').each(function(){
				$(this).removeClass('masteryAvailable').addClass('mastery');
			});
			$('.tree#'+tree).children("[data-tier='4']").find('.mastery').each(function(){
				$(this).removeClass('masteryAvailable').addClass('mastery');
			});
			$('.tree#'+tree).children("[data-tier='5']").find('.mastery').each(function(){
				$(this).removeClass('masteryAvailable').addClass('mastery');
			});
			$('.tree#'+tree).children("[data-tier='6']").find('.mastery').each(function(){
				$(this).removeClass('masteryAvailable').addClass('mastery');
			});
			break;

		case (treeTotalPoints >= 4 && treeTotalPoints < 8):
			$('.tree#'+tree).children("[data-tier='1']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='2']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='3']").find('.mastery').each(function(){
				$(this).removeClass('masteryAvailable').addClass('mastery');
			});
			$('.tree#'+tree).children("[data-tier='4']").find('.mastery').each(function(){
				$(this).removeClass('masteryAvailable').addClass('mastery');
			});
			$('.tree#'+tree).children("[data-tier='5']").find('.mastery').each(function(){
				$(this).removeClass('masteryAvailable').addClass('mastery');
			});
			$('.tree#'+tree).children("[data-tier='6']").find('.mastery').each(function(){
				$(this).removeClass('masteryAvailable').addClass('mastery');
			});
			break;

		case (treeTotalPoints >= 8 && treeTotalPoints < 12):
			$('.tree#'+tree).children("[data-tier='1']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='2']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='3']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='4']").find('.mastery').each(function(){
				$(this).removeClass('masteryAvailable').addClass('mastery');
			});
			$('.tree#'+tree).children("[data-tier='5']").find('.mastery').each(function(){
				$(this).removeClass('masteryAvailable').addClass('mastery');
			});
			$('.tree#'+tree).children("[data-tier='6']").find('.mastery').each(function(){
				$(this).removeClass('masteryAvailable').addClass('mastery');
			});
			break;

		case (treeTotalPoints >= 12 && treeTotalPoints < 16):
			$('.tree#'+tree).children("[data-tier='1']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='2']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='3']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='4']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='5']").find('.mastery').each(function(){
				$(this).removeClass('masteryAvailable').addClass('mastery');
			});
			$('.tree#'+tree).children("[data-tier='6']").find('.mastery').each(function(){
				$(this).removeClass('masteryAvailable').addClass('mastery');
			});
			break;

		case (treeTotalPoints >= 16 && treeTotalPoints < 20):
			$('.tree#'+tree).children("[data-tier='1']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='2']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='3']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='4']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='5']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='6']").find('.mastery').each(function(){
				$(this).removeClass('masteryAvailable').addClass('mastery');
			});
			break;

		case 20:
			$('.tree#'+tree).children("[data-tier='1']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='2']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='3']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='4']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='5']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			$('.tree#'+tree).children("[data-tier='6']").find('.mastery').each(function(){
				$(this).removeClass('mastery').addClass('masteryAvailable');
			});
			
		}
	}

	function getMasteryRequiredPoints(rowTier){
		var masteryRequiresPoints = 0;
		if(rowTier == 1){
			masteryRequiresPoints = 0;
		}else if(rowTier == 2){
			masteryRequiresPoints = 4;
		}else if(rowTier == 3){
			masteryRequiresPoints = 8;
		}else if(rowTier == 4){
			masteryRequiresPoints = 12;
		}else if(rowTier == 5){
			masteryRequiresPoints = 16;
		}else if(rowTier == 6){
			masteryRequiresPoints = 20;
		}
		return masteryRequiresPoints;
	}

	function getTreeTotalPoints(tree){
		var treeTotalPoints = 0;
		$('.tree#'+tree).children('.row').each(function(){
			rowTier = $(this).data('tier');
			var rowPoints = getRowPointTotal(tree, rowTier);
			treeTotalPoints = treeTotalPoints + rowPoints;
		});
		var currentPoints = +$('.tree#'+tree).children('.treeTitle').find('.currentPoints').text(treeTotalPoints);

		return treeTotalPoints;
	}

	function getLastActiveRow(tree){
		var lastActiveRow;
		$('.tree#'+tree).children('.row').find('.currentPoints').each(function(){
			var points = +$(this).text();
			if(points > 0){
				lastActiveRow = $(this).closest('.row').data('tier');
			}
		});
		return lastActiveRow;
	}

	function getRowPointTotal(tree, rowTier){
		var pointTotal = 0;
		$('.tree#'+tree).children("[data-tier='" + rowTier + "']").find('.currentPoints').each(function(){
			var points = +$(this).text();
			pointTotal = pointTotal + points;
		});
		return pointTotal;
	}
});