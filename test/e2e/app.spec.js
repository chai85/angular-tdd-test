describe('end to end address tests', function () {
    it("should have contacts", function (done) {
        browser.get("http://localhost:8080");
        element.all(by.repeater("contact in contacts"))
            .then(function (contacts) {
                expect(contacts[0].getText()).toEqual("Chaitu C");
                done();
            });
    })
})
