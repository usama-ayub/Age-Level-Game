angular.module('myApp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'components/login.html',
            controller: 'loginCtrl'
            })
            .when('/register', {
                templateUrl : 'components/register.html',
                controller: 'loginCtrl'
            })
            .when('/agelevel', {
                templateUrl: 'components/agelevel.html',
                controller: 'agelevel'
            })
            .when('/ignoreColor', {
                templateUrl: 'components/IgnoreColor.html',
                controller: 'ignoreColor'
            })
            .when('/equation', {
                templateUrl: 'components/equation.html',
                controller: 'equation'
            })
            .when('/puzzle', {
                templateUrl: 'components/puzzle.html',
                controller: 'puzzle'
            })
    })
    .value('Students',[])
    .value('CurrentUser',{})
    .controller('loginCtrl', function ($scope, $location,Students,CurrentUser) {

        $scope.stuData={
            name:"Ishaq",
            pass:""
        };

        $scope.students=Students;
        $scope.addStudent= function () {
            Students.push($scope.stuData);
            $scope.stuData= {
                name: "",
                pass: "",
                score:""
            };
            $location.path('/agelevel');
        };
        $scope.studentLogin = function (user) {
            var userFound=false;
            for(var i=0;i<Students.length;i++){
                if(user.name == Students[i].name
                    &&
                    user.pass == Students[i].pass){
                    $location.url('/agelevel');
                    CurrentUser.info=Students[i];
                    userFound=true;
                    break;
                }
            }
            if(!userFound){
                alert('Wrong Email or Password')
            }
        }

    })
    .controller('agelevel',function($scope,$location){
        $scope.verification=function(number){

            if(number == 1 || number <= 5){

                $location.url('/ignoreColor');

            }
            else if(number ==6 || number <= 10) {
                $location.url('/equation');

            }
            else if(number == 11 || number <= 15) {
                $location.url('/puzzle');

            }
        }
    })
    .controller('ignoreColor', function($scope,Students,$timeout, $interval) {
        $scope.score = 0;
        var totalTime = 50,
            currentTime = 0,
            gameOver = false;
        $scope.progress = function() {
            return (currentTime * 100) / totalTime + '%';
        };
        var colors = ['red', 'green', 'yellow', 'magenta', 'cyan', 'white', 'blue', 'brown', 'blueviolet', 'gray', 'teal', 'purple'];

        function random(a, b) {
            var r = Math.floor(Math.random() * colors.length);
            if (a == r || b == r) return generate(a, b);
            return r
        }

        function generate() {
            var a = random();
            var b = random(a);
            var c = random(a, b);
            var any = Math.floor(Math.random() * 2);
            var arr = [];
            arr[any] = {
                val1: colors[a],
                val2: colors[a]
            };
            arr[any? '0' : '1'] = {
                val1: colors[b],
                val2: colors[c]
            };
            return arr
        }
        $scope.current = generate();
        $scope.submit = function(v1, v2) {
            if (v1 != v2) {
                loading('Correct!');
                $timeout(function() {
                    loading();
                    $scope.score++;
                    $scope.current = generate();
                }, 300);
            } else {
                loading('Incorrect!');
                $timeout(function() {
                    if ($scope.score > 0)
                        $scope.score--;
                    loading();
                    $scope.current = generate();
                }, 300);
            }
        };
        var interval = $interval(function() {
            if (currentTime >= totalTime) {
                $interval.cancel(interval);
                loading('Game Over');
                gameOver = true;
            }
            currentTime++
        }, 1000);
        $scope.tryAgain = function(){
            if(!gameOver) return;
            $scope.score = 0;
            currentTime = 0;
            gameOver = false;
            loading();
        };
        $scope.loading = {};
        function loading(text) {
            if (!text) return $scope.loading.isShow = false;
            $scope.loading.isShow = true;
            $scope.loading.text = text;
        }
    })


    .controller('equation', function($scope, $timeout, $interval) {
        var operators = ['+', '-', '*', '/'],
            totalTime = 50,
            currentTime, gameOver, interval;

        $scope.progress = function() {
            return (currentTime * 100) / totalTime + '%';
        };

        $scope.tryAgain = function() {
            if (!gameOver) return;
            loading();
            init();
        };

        $scope.submit = function(v) {
            /*!interval *//*&& initTime();*!/*/initTime();
            var c = $scope.current;
            if (eval('' + c.val1 + v + c.val2) == c.ans) {
                loading('Correct!');
                $timeout(function() {
                    loading();
                    $scope.score++;
                    $scope.current = generate();
                }, 300);
            } else {
                loading('Incorrect!');
                $timeout(function() {
                    loading();
                }, 300);
            }
        };

        init();

        function init() {
            $scope.score = 0;
            totalTime = 50;
            currentTime = 0;
            gameOver = false;
            interval = false;
            $scope.current = generate();
        }

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

        function generate() {
            var i = Math.floor(Math.random() * 4);
            var obj = {
                val1: Math.floor(Math.random() * 100),
                val2: Math.floor(Math.random() * 100)
            };
            obj.ans = eval('' + obj.val1 + operators[i] + obj.val2 || isNaN(obj.ans));
            if (String(obj.ans).indexOf('.') !=-1) return generate();
            return obj
        }

        $scope.loading = {};

        function loading(text) {
            if (!text) return $scope.loading.isShow = false;
            $scope.loading.isShow = true;
            $scope.loading.text = text;
        }
    })



.controller('puzzle',function($scope,$timeout, $interval){

        (function() {

            var pieces = [
                { id: 1, src: 'pic/1.png' },
                { id: 2, src: 'pic/2.png' },
                { id: 3, src: 'pic/3.png' },
                { id: 4, src: 'pic/4.png' },
                { id: 5, src: 'pic/5.png' },
                { id: 6, src: 'pic/6.png' },
                { id: 7, src: 'pic/7.png' },
                { id: 8, src: 'pic/8.png' },
                false
            ];

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

        })();

    });