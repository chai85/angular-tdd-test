var assert = chai.assert;
var expect = chai.expect;

describe("Address Book App", function () {

    describe("the contacts service", function () {

        beforeEach(function () {
            module('AddressBook');
            inject(function ($injector) {
                contactService = $injector.get('contactService');
                $httpBackend = $injector.get('$httpBackend');
            });
        })

        it("should have a contact property", function () {
            expect(contactService.contacts).to.be.an('array');
        })

        it("should call http get", function () {
            $httpBackend.expectGET("http://localhost:9001/contacts").respond(200, []);
            $httpBackend.flush();
        })
    })

    describe("the contacts controller", function () {

        beforeEach(function () {
            module('AddressBook');
            inject(function ($injector, $rootScope) {
                $scope = $rootScope.$new();
                contactService = $injector.get('contactService');
                $httpBackend = $injector.get('$httpBackend');
                $controller = $injector.get('$controller');
            });
        })

        it("should store a contacts array into scope", function () {
            $controller("ContactController", {
                $scope: $scope,
                contactService: contactService
            });
            assert.isArray($scope.contacts);
        })
    })

    describe("the proper filter", function () {

        beforeEach(function () {
            module("AddressBook");
            inject(function ($injector) {
                proper = $injector.get("$filter")("proper");
            })
        })

        it("turns string to a proper string", function () {
            expect(proper("tom jerry")).to.equal("Tom Jerry");
            expect(proper("tom perry")).to.equal("Tom Perry");
        })

        it("should take a number and return a string", function () {
            expect(proper(42)).to.equal("42");
        })

        it("should throw an error for incompatible input", function () {
            assert.throws(function () {
                proper(undefined);
            })
        })
    })

    describe("the avatar directive", function () {

        beforeEach(function () {
            module("AddressBook");

        })

        it("should display the first letter of the name", function () {
            inject(function ($rootScope, $compile) {
                $rootScope.contact = {
                    name: "john brother"
                }
                var element = $compile("<avatar name=contact.name/>")($rootScope);
                $rootScope.$digest();
                var dirText = element.text();
                expect(dirText).to.equal("J");
            })
        })
    })

})
