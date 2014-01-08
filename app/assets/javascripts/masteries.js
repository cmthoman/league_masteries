$(document).ready(function (){

	rowLockCheck('offense', 0);
	rowLockCheck('defense', 0);
	rowLockCheck('utility', 0);

	$( '.container' )
	.bind('contextmenu', function(){
		return false;
	});

	$( '.masteryAncor' )
	.mousedown(function(event) {
		event.stopPropagation();
		event.preventDefault();
		var tree = $(this).closest('.tree').attr('id');
		var rowTier = $(this).closest('.row').data('tier');
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
		if (masteryMaxPoints == null){
			masteryMaxPoints = mastery.data('max-points');
		}
		switch (event.which) {
        case 1:
            addPoint(mastery, tree, rowTier, thisRowPointsTotal, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints);
            break;
        case 3:
    	}
	});


	
	function addPoint(mastery, tree, rowTier, thisRowPointsTotal, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints){
		if(masteryCurrentPoints < masteryMaxPoints && treeTotalPoints >= masteryRequiresPoints){
			mastery.find('.currentPoints').text(masteryCurrentPoints + 1);
			treeTotalPoints = getTreeTotalPoints(tree);
			rowLockCheck(tree, treeTotalPoints);
		}
	}

	function rowLockCheck(tree, treeTotalPoints){
		switch (treeTotalPoints) {
		case 0:
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

		case 4:
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

		case 8:
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

		case 12:
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

		case 16:
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