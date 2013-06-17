// ==================
// The old way - this is discouraged as is leads to tangled, unmaintenable code
// ==================

// VERY BAD - pulutes the global namespace

var someName = 'alfa';

// VERY BAD - pulutes the global namespace

function someFunction(){

}

// ==================
// A better way
// ==================

// everything starts as this:
// anonymous function

(function(undefined){
	'use strict';
	// this will be our playground

}).call(window);
// the first parameter of call() is passed as the instance context in which the anonymous function will execute
// that means it will be the "this" inside the anonymous function


// ==================
// A better way - dependencies
// Remember OOP is about managing dependencies
// ==================

// all dependencies are expressed as parameters
// last parameter is undefined
//    - needed sice the undefined keyword is not available in older browsers
(function( $ , undefined){
    'use strict';
    var window = this,
        nonGlobal = 100; // since we are in an anonymous function we don't polute the global namespace

	function myFunction(){
	}

	// exposing functionality to the outside world - namespaces
	// "this" === window
    this.myApp = this.myApp || {};
    this.myApp.myFunction = myFunction;

}).call(window, window.jQuery);
// other dependencies are passed as parameters

// ==================
// A better way - Objects & Classes
// ==================

(function(undefined){
    'use strict';

    // the equivalent of "static" shared state
    // this is shared accross all instances of Person
    var sharedState = {
        allPersons : []
    };

    // "class" definition - this is the equivalent of the constructor
    function Person(name,age){
        // private member
        var isAlive = true,
        // reference to the current instance of the object
            self = this;

        // public member
        this.name = name;
        this.age = age;

        // private function
        function markAsDead(){
            isAlive = false;
        }

        // will be exposed as public below
        function die(){
            markAsDead();
            console.log(this);
        }

        // public function - defined on current indence
        this.kill = die;

        // the rest of the initialization needed in the constructor
        // can be extracted in a initialize() or construct() function
        if(!name){
            name = 'John Doe';
        }

        if(age < 0){
            age = 0;
        }

        console.log('Created person with name ' + name + ' and age ' + age);
    }

    // prototype functions - no access to private state, but can access "this"
    Person.prototype.changeName = function(newName){
        this.name = newName;
        console.log(this);
    };

    // at this level "this" === window
    this.model = this.model || {};
    this.model.Person = Person;

}).call(window);

(function(undefined){
    'use strict';

    // instanciate
    var person = new window.model.Person('john',30);

    console.log(person);

    // call public method
    person.kill();
    // call prototype method
    person.changeName('Jane');

}).call(window);

// a few things to remember:
// - always run JSHint on your JS code ( preferably at Save )
// - use a package manager ( bower )
// - use an automated build system ( yeoman, grunt )
// - use livereload
// - use existing libraries
//      - twitter bootstrap ( css framework - a must )
//      - lodash ( underscore.js clone )
//      - moment.js ( date time handling )
// - for rich apps use a client side framework
//      - angular.js ( recommanded )
//      - knockout.js
//      - jQuery ( recommanded only for trivial cases, otherwise minimise usage )
// - unit test your code
//      - qunit
// - usa a DVCS ( git )

// libraries references
//
// http://twitter.github.io/bootstrap/
// http://lodash.com/
// http://momentjs.com/
// http://angularjs.org/
// http://knockoutjs.com/
// http://qunitjs.com/
//
// tools reference
//
// http://yeoman.io/
// http://gruntjs.com/
// http://bower.io/
// http://livereload.com/
// http://www.sublimetext.com/

