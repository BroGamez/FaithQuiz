app.ViewModelLeaderboard = function() {
  var vm = this;
  vm.leaderboardloaded = ko.observable(false);
  vm.leaderboarddata = ko.observableArray();

  var $leaderboardPopup = $('.popup-leaderboard')
  vm.start = function() {
    vm.leaderboardloaded(false);
    leaderboardService.find({
    query: {
        $sort: { score: -1 }
      }
    })
    .then(function(page) {
      vm.leaderboarddata([])
      for (var i = 0; i < page.data.length; i++) {
        var leaderboard = new app.leaderboard(page.data[i]);
        vm.leaderboarddata().push(leaderboard);
      }
      vm.leaderboardloaded(true);
    });
  };
  vm.start();


  vm.openLeaderboard = function() {
    $leaderboardPopup.fadeIn()
    vm.start();
  }
  console.log("leaderboard viewmodel loaded")
};
