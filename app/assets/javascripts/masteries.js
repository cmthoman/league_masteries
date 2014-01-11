$(document).ready(function (){

	//Global Presets
	rowLockCheck('offense', 0);
	rowLockCheck('defense', 0);
	rowLockCheck('utility', 0);
	var remainingPoints = 30;
	updateRemainingPoints(remainingPoints);

	//Mouse Position
	var currentMousePos = { x: 0, y: 0 };
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });

	$( '.container' )
	.bind('contextmenu', function(){
		return false;
	});

	//On Click Listener
	$( '.masteryAncor' )
	.mouseenter(function(){
		updateToolTip($(this));
		$(this).mousedown(function(){
			updateToolTip($(this));
		});
		$(this).mousemove(function(){
			$('.toolTip').css({'left' : currentMousePos.x + 10 , 'top' : currentMousePos.y + 10});
		});
	})
	.mouseleave(function(){
		$('.toolTip').hide();
	})
	.mousedown(function(event) {
		//Stop browser propagation and prevent default actions when clicking these links
		event.stopPropagation();
		event.preventDefault();

		//Find and set all of the attributes relative to the mastery that was clicked
		var clickType = event.which;
		var tree = $(this).closest('.tree').attr('id'); //Get the tree we are in
		var row = $(this).closest('.row'); //Get the row we are in
		var rowTier = row.data('tier'); //Get the tier of the row we are in
		var thisRowPointsTotal = getRowPointTotal(tree, rowTier); //Get the row's total points
		var lastActiveRow = getLastActiveRow(tree); //Get the last row with points in it
		var treeTotalPoints = getTreeTotalPoints(tree); //Get this tree's total points
		var mastery = $(this).closest('.mastery'); //Get the mastery we are clicking the ancor for
		if (mastery.attr('id') == undefined){ //If the master doesn't have the mastery class it has the masteryAvailable class instead, find it
			mastery = $(this).closest('.masteryAvailable');
		}
		var masteryRequiresPoints = getMasteryRequiredPoints(rowTier); //Get the minimum points required to active masteries in this tier
		var masteryCurrentPoints = +mastery.find('.currentPoints').text(); //Get the current points spent on this mastery
		var masteryMaxPoints = mastery.data('max-points'); //Get the maximum points allowed to be spent on this mastery
		remainingPoints = +$('.remainingPoints').text(); //Set the remaining points variable again within this scope to pass onto add and remove point functions

		//Determine if the click was a left click or right click and do something
		switch (event.which) {
        case 1: //This is a left click
            addPoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, remainingPoints, clickType);
            break;
        case 3: //This is a right click
        	removePointRuleCheck(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints, clickType);
    	}
	});

	$( '.resetPointsButton' )
	.mousedown(function(){
		$('.tree').find('.currentPoints').each(function(){
			$(this).text(0);
		});
		$('.tree').find('.masteryAvailable').each(function(){
			var tree = $(this).closest('.tree').attr('id');
			var mastery = $(this);
			updateMasteryRequirePaths(mastery, tree, 0);
		});
		rowLockCheck('offense', 0);
		rowLockCheck('defense', 0);
		rowLockCheck('utility', 0);
		updateRemainingPoints(30);
	});

	//Where the magic happens

	function updateToolTip(that){
		var mastery = $(that).closest('.mastery');
		if(mastery.attr('id') == undefined){
			mastery = $(that).closest('.masteryAvailable');
		}
		var masteryName = mastery.attr('id');
		var title = $('.title#'+masteryName).html();
		var reqs = $('.reqs#'+masteryName).html();
		var currentRank = +mastery.find('.currentPoints').text();
		var maxRank = mastery.data('max-points');
		var desc;
		if(currentRank == 0){
			desc = $("[class='desc'][id='"+masteryName+"'][data-rank='0']").html();
		}else if(currentRank == 1){
			desc = $("[class='desc'][id='"+masteryName+"'][data-rank='1']").html();
		}else if(currentRank == 2){
			desc = $("[class='desc'][id='"+masteryName+"'][data-rank='2']").html();
		}else if(currentRank == 3){
			desc = $("[class='desc'][id='"+masteryName+"'][data-rank='3']").html();
		}else if(currentRank == 4){
			desc = $("[class='desc'][id='"+masteryName+"'][data-rank='4']").html();
		}
		$('.toolTipTitle').text(title);
		$('.toolTipDesc').html(desc);
		$('.toolTipReqs').html(reqs);
		$('.toolTip').find('.maxRank').text(maxRank);
		$('.toolTip').find('.currentRank').text(currentRank);
		$('.toolTip').show();
	}

	function testRequiredMastery(mastery){
		var requiresMastery = mastery.data('requires-mastery');
		if(requiresMastery != undefined){
			var requiredMastery = mastery.closest('.tree').find('#'+requiresMastery);
			var spentPoints = +requiredMastery.find('.currentPoints').text();
			var maxPoints = +requiredMastery.data('max-points');
			if(spentPoints == maxPoints){
				return true;
			}else{
				return false;
			}		
		}else{
			return true;
		}	
	}

	function checkRequiredMastery(mastery, rowTier, clickType){
		if(clickType == 1){
			var requiresMastery = mastery.data('requires-mastery');
			if(requiresMastery != undefined){
				var requiredMastery = mastery.closest('.tree').find('#'+requiresMastery);
				var spentPoints = +requiredMastery.find('.currentPoints').text();
				var maxPoints = +requiredMastery.data('max-points');
				if(spentPoints == maxPoints){
					return true;
				}else{
					return false;
				}
			}else{
				return true;
			}
		}else if(clickType == 3){
			var nextRowTier = rowTier + 1;
			var nextRow = mastery.closest('.row').siblings("[data-tier='"+nextRowTier+"']");
			var dependency = nextRow.children("[data-requires-mastery='"+mastery.attr('id')+"']");
			if(dependency != undefined){
				currentPoints = +dependency.find('.currentPoints').text();
				if(currentPoints > 0){
					return false;
				}else{
					return true;
				}
			}else{
				return true;
			}
		}
	}

	function updateMasteryRequirePaths(mastery, tree, treeTotalPoints){
		$('.tree#'+tree).find('.mastery').each(function(){
			if($(this).data('requires-mastery')){
				var mastery = $(this);
				var rowTier = $(this).closest('.row').data('tier');
				var hasRequiredMastery = testRequiredMastery(mastery);
				var requiredPoints = getMasteryRequiredPoints(rowTier);
				if(treeTotalPoints >= requiredPoints && hasRequiredMastery == true){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}else{
					$(this).removeClass('masteryAvailable').addClass('mastery');
				}
			}
		});

		var masteryID = mastery.attr('id');
		var maxPoints = +mastery.data('max-points');
		var spentPoints = +mastery.find('.currentPoints').text();
		var path = $('.tree#'+tree).find("[data-mastery='" + masteryID + "']");
		if(spentPoints == maxPoints){
			path.css('background', 'green');
		}else{
			path.css('background', 'gray');
		}
	}

	function removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints){
		mastery.find('.currentPoints').text(masteryCurrentPoints - 1); //Reduce the current points spent on this mastery by 1
		treeTotalPoints = getTreeTotalPoints(tree); //Get the total points again for this tree (after the subtraction)
		remainingPoints++; //Add a point to the remaining points
		updateRemainingPoints(remainingPoints); //Update the remaining points
		rowLockCheck(tree, treeTotalPoints); //Update the row styling for this tree based on the remaining points in the tree
		updateMasteryRequirePaths(mastery, tree, treeTotalPoints);
		lastActiveRow = getLastActiveRow(tree); //Set the last active for this tree after all changes have been made
	}

	function removePointRuleCheck(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints, clickType){
		/******************************************************************************************************************************************************************
		This function checks the rules before calling the remove point function. Basically, each tier requires x amount of points spent in the tree to be active. However,
		Tier 1 must always have 4 points and the tiers before the last active tier must have a combined total point value greater than the minimum points needed to active
		the last tier. To me this looks ugly, I'm not sure of a better way to approach the problem at this stage.
		********************************************************************************************************************************************************************/
		var masteryCheck = checkRequiredMastery(mastery,rowTier, clickType);
		//alert(masteryCheck);
		switch (lastActiveRow){
		/*Each case represents the last tier with a point spent on it. The if statements represent trying to remove a point from a previous tier and the arguments verify
		that doing so is within the rules described above */
		case 1:
			if(rowTier == 1 && masteryCurrentPoints > 0 && masteryCheck == true){ 
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}
			break;
		
		case 2:
			masteryRequiresPoints = getMasteryRequiredPoints(2);
			if(rowTier == 1 && masteryCurrentPoints > 0 && thisRowPointsTotal > masteryRequiresPoints && masteryCheck == true){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}else if(rowTier == 2 && masteryCurrentPoints > 0 && masteryCheck == true){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}
			break;
		
		case 3:
			previousRowTotal = getRowPointTotal(tree, 1) + getRowPointTotal(tree, 2);
			masteryRequiresPoints = getMasteryRequiredPoints(3);
			if(rowTier == 1 && masteryCurrentPoints > 0 && previousRowTotal > masteryRequiresPoints && thisRowPointsTotal > 4 && masteryCheck == true){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}else if(rowTier == 2 && masteryCurrentPoints > 0 && previousRowTotal > masteryRequiresPoints && masteryCheck == true){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}else if(rowTier == 3 && masteryCurrentPoints > 0 && masteryCheck == true){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}
			break;
		case 4:
			previousRowTotal = getRowPointTotal(tree, 1) + getRowPointTotal(tree, 2) + getRowPointTotal(tree, 3);
			masteryRequiresPoints = getMasteryRequiredPoints(4);
			if(rowTier == 1 && masteryCurrentPoints > 0 && previousRowTotal > masteryRequiresPoints && thisRowPointsTotal > 4 && masteryCheck == true){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}else if(rowTier >= 2 && rowTier <= 3 && masteryCurrentPoints > 0 && previousRowTotal > masteryRequiresPoints && masteryCheck == true){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}else if(rowTier == 4 && masteryCurrentPoints > 0 && masteryCheck == true){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}
			break;
		case 5:
			previousRowTotal = getRowPointTotal(tree, 1) + getRowPointTotal(tree, 2) + getRowPointTotal(tree, 3) + getRowPointTotal(tree, 4);
			masteryRequiresPoints = getMasteryRequiredPoints(5);
			if(rowTier == 1 && masteryCurrentPoints > 0 && previousRowTotal > masteryRequiresPoints && thisRowPointsTotal > 4 && masteryCheck == true){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}else if(rowTier >= 2 && rowTier <= 4 && masteryCurrentPoints > 0 && previousRowTotal > masteryRequiresPoints && masteryCheck == true){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}else if(rowTier == 5 && masteryCurrentPoints > 0 && masteryCheck == true){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}
			break;
		case 6:
			previousRowTotal = getRowPointTotal(tree, 1) + getRowPointTotal(tree, 2) + getRowPointTotal(tree, 3) + getRowPointTotal(tree, 4) + getRowPointTotal(tree, 5);
			masteryRequiresPoints = getMasteryRequiredPoints(6);
			if(rowTier == 1 && masteryCurrentPoints > 0 && previousRowTotal > masteryRequiresPoints && thisRowPointsTotal > 4 && masteryCheck == true){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}else if(rowTier >= 2 && rowTier <= 5 && masteryCurrentPoints > 0 && previousRowTotal > masteryRequiresPoints && masteryCheck == true){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}else if(rowTier == 6 && masteryCurrentPoints > 0 && masteryCheck == true){
				removePoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, lastActiveRow, thisRowPointsTotal, rowTier, remainingPoints);
			}
			break;
		}
	}

	function addPoint(mastery, tree, masteryMaxPoints, masteryCurrentPoints, treeTotalPoints, masteryRequiresPoints, remainingPoints, clickType){
		var masteryCheck = checkRequiredMastery(mastery, null, clickType);
		if(masteryCurrentPoints < masteryMaxPoints && treeTotalPoints >= masteryRequiresPoints && remainingPoints > 0 && masteryCheck == true){ //Simple check to make sure adding a point makes sense
			mastery.find('.currentPoints').text(masteryCurrentPoints + 1); //Find the current spent points and increase it by 1.
			treeTotalPoints = getTreeTotalPoints(tree); //Calculate the new tree total points spent (after the addition)
			remainingPoints--; //Remove a point from the total remaining points
			updateRemainingPoints(remainingPoints); //Update the remaining points
			rowLockCheck(tree, treeTotalPoints); //Update the row styling for this tree based on the remaining points in the tree
			updateMasteryRequirePaths(mastery, tree, treeTotalPoints);
			lastActiveRow = getLastActiveRow(tree); //Set the last active for this tree after all changes have been made
		}
	}

	function updateRemainingPoints(remainingPoints){
		$('.remainingPoints').text(remainingPoints);
	}

	function rowLockCheck(tree, treeTotalPoints){
		//Simple rule set for styling the rows based on points spent in the tree, one thing to note was I had to first reset the trees to the mastery class before this would work on each call
		$('.tree#'+tree).children('.row').find('.masteryAvailable').removeClass('masteryAvailable').addClass('mastery');
		switch (true) {
		case (treeTotalPoints >= 0 && treeTotalPoints < 4):
			$('.tree#'+tree).children("[data-tier='1']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			break;

		case (treeTotalPoints >= 4 && treeTotalPoints < 8):
			$('.tree#'+tree).children("[data-tier='1']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			$('.tree#'+tree).children("[data-tier='2']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			break;

		case (treeTotalPoints >= 8 && treeTotalPoints < 12):
			$('.tree#'+tree).children("[data-tier='1']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			$('.tree#'+tree).children("[data-tier='2']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			$('.tree#'+tree).children("[data-tier='3']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			break;

		case (treeTotalPoints >= 12 && treeTotalPoints < 16):
			$('.tree#'+tree).children("[data-tier='1']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			$('.tree#'+tree).children("[data-tier='2']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			$('.tree#'+tree).children("[data-tier='3']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			$('.tree#'+tree).children("[data-tier='4']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			break;

		case (treeTotalPoints >= 16 && treeTotalPoints < 20):
			$('.tree#'+tree).children("[data-tier='1']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			$('.tree#'+tree).children("[data-tier='2']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			$('.tree#'+tree).children("[data-tier='3']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			$('.tree#'+tree).children("[data-tier='4']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			$('.tree#'+tree).children("[data-tier='5']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			break;

		case (treeTotalPoints >= 20):
			$('.tree#'+tree).children("[data-tier='1']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			$('.tree#'+tree).children("[data-tier='2']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			$('.tree#'+tree).children("[data-tier='3']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			$('.tree#'+tree).children("[data-tier='4']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			$('.tree#'+tree).children("[data-tier='5']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
			$('.tree#'+tree).children("[data-tier='6']").find('.mastery').each(function(){
				if($(this).data('requires-mastery') == undefined){
					$(this).removeClass('mastery').addClass('masteryAvailable');
				}
			});
		}
	}

	function getMasteryRequiredPoints(rowTier){
		//Rules for how many points are required to be spent in a tree to activate each tier within the tree
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
		//Function that counts the total points spent on each mastery then returns their sum for each tree
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
		//Functions that checks each mastery for points spent and updates the lastActiveRow variable to reflect which tier the deepest points were spent on
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
		//Function that counts a given row's total points spent, needed to verify the points removal rules
		var pointTotal = 0;
		$('.tree#'+tree).children("[data-tier='" + rowTier + "']").find('.currentPoints').each(function(){
			var points = +$(this).text();
			pointTotal = pointTotal + points;
		});
		return pointTotal;
	}
});