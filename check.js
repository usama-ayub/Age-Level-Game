angular.module('app',[])
.controller('puzzle',function($scope,$timeout, $interval){

    (function() {

        var pieces = [
            { id: 1, src: '//placehold.it/100x100/ff0000?text=1' },
            { id: 2, src: '//placehold.it/100x100/000000?text=2' },
            { id: 3, src: '//placehold.it/100x100/999999?text=3' },
            { id: 4, src: '//placehold.it/100x100/333333?text=4' },
            { id: 5, src: '//placehold.it/100x100/00ff00?text=5' },
            { id: 6, src: '//placehold.it/100x100/0000ff?text=6' },
            { id: 7, src: '//placehold.it/100x100/ff3066?text=7' },
            { id: 8, src: '//placehold.it/100x100/3300ff?text=8' },
            false
        ];
var totalTime = 50,
    currentTime, gameOver, interval;
        $scope.progress = function() {
            return (currentTime * 100) / totalTime + '%';
        };

        $scope.tryAgain = function() {
            if (!gameOver) return;
            loading();
            init();
        };
        function initTime() {
            interval = $interval(function() {
                if (currentTime >= totalTime) {
                    $interval.cancel(interval);
                    loading('Game Over');
                    gameOver = true;
                }
                currentTime++
            }, 1000);
        }


        game = {

            container: {},
            pieces: {},
            btnStart: {},
            total: {},

            clicks: 0,

            _construct: function() {

                this.container = document.getElementsByClassName('puzzle')[0];
                this.pieces = this.container.getElementsByClassName('pieces')[0];
                this.btnStart = this.container.getElementsByClassName('btn-start')[0];
                this.total = this.container.getElementsByClassName('total')[0];

                this.create();

                this.btnStart.addEventListener('click', this.start);

            },

            start: function() {

                return game.create(true);

            },

            create: function(sort) {

                if (typeof sort !== 'undefined') {

                    pieces.sort(function(a, b) {
                        return (0.5 - Math.random());
                    });

                    this.clicks = 0;

                    this.btnStart.innerHTML = '<span class="glyphicon glyphicon-repeat"></span> Reiniciar';

                }

                this.refresh(sort);

            },

            refresh: function(event, end) {

                var p = 0, html = [], piece = [];
                for (; p < 9; p++) {

                    piece.push('<div class="piece', (!pieces[p] ? ' empty' : '' ), '">');

                    if (pieces[p])
                        piece.push('<img src="', pieces[p].src, '" />');

                    piece.push('</div>');
                    html.push(piece.join(''));
                    piece = [];

                }

                this.pieces.innerHTML = html.join('');

                if (typeof event !== 'undefined') {

                    var i = 0, total = pieces.length - 1,
                        end = true;

                    for (; i < total; i++) {

                        if (pieces[i].id != (i + 1)) {

                            end = false;
                            break;

                        }

                    }

                    setTimeout(function() {

                        if (end) {

                            alert(['Congratulations! ', game.clicks, ' clicks'].join(''));
                            game.btnStart.setAttribute('disabled', false);

                        } else {

                            var piece = game.pieces.getElementsByClassName('piece'), p;
                            for (p = piece.length; p--;) {

                                piece[p].addEventListener('click', game.click(p));

                            }

                        }

                    }, 1);

                }

                this.total.innerHTML = this.clicks;

            },

            click: function(p) {

                var total = pieces.length - 1;

                return function() {

                    var empty;
                    if (p > 0 && (p % 3 != 0) && !pieces[p - 1])
                        empty = p - 1;
                    else if (p < total && ((p + 1) % 3 != 0) && !pieces[p + 1])
                        empty = p + 1;
                    else
                    if (p + 3 <= total && !pieces[p + 3])
                        empty = p + 3;
                    else if (p - 3 >= 0 && !pieces[p - 3])
                        empty = p - 3;

                    if (typeof empty !== 'undefined') {

                        pieces[empty] = pieces[p];
                        pieces[p] = false;

                        game.clicks++;
                        game.refresh(true);

                    }

                }

            }

        };

        return game._construct();
        $scope.loading = {};

        function loading(text) {
            if (!text) return $scope.loading.isShow = false;
            $scope.loading.isShow = true;
            $scope.loading.text = text;
        }
    })();
        $scope.loading = {};

        function loading(text) {
            if (!text) return $scope.loading.isShow = false;
            $scope.loading.isShow = true;
            $scope.loading.text = text;
        }

});
