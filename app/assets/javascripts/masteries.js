$(document).ready(function (){

	var offensivePointTotal = 0;
	var defensivePointTotal = 0;
	
	var offensiveTier1Total = 0;
	var offensiveTier2Total = 0;
	var offensiveTier3Total = 0;
	var offensiveTier4Total = 0;
	var offensiveTier5Total = 0;
	var offensiveTier6Total = 0;

	$( '.masteryAncor' )
	.bind('contextmenu', function(){
		return false;
	})
	.mousedown(function(event) {

		event.preventDefault();
		var tree = $(this).closest('.row').prevAll('.treeTitle');
		var masteryRequiresPoints = $(this).closest('.row').data('requires-points');
		var masteryMaxPoints = $(this).closest('.mastery').data('max-points');

		if(masteryMaxPoints == undefined){
			var masteryMaxPoints = $(this).closest('.masteryAvailable').data('max-points');
		}

		var masteryCurrentPoints = +$(this).find('.currentPoints').text();

		if(tree.attr('id') == "offense"){
			if(event.which == 1 && masteryCurrentPoints < masteryMaxPoints && masteryRequiresPoints <= offensivePointTotal){
				$(this).find('.currentPoints').text(masteryCurrentPoints + 1);
				offensivePointTotal++;
				tree.find('span').text(offensivePointTotal);
			}else if(event.which == 3){
				if(masteryCurrentPoints > 0){
					$(this).find('.currentPoints').text(masteryCurrentPoints - 1);
					offensivePointTotal--;
					tree.find('span').text(offensivePointTotal);
				}
			}

			$(this).closest('.row').siblings('.row').each(function(){
				if($(this).data("requires-points") <= offensivePointTotal){
					$(this).children('.mastery').removeClass('mastery').addClass('masteryAvailable');
				}else if($(this).data("requires-points") > offensivePointTotal){
					$(this).children('.masteryAvailable').removeClass('masteryAvailable').addClass('mastery');
				}
			});
		}
	});

});