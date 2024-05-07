require("../../test-env-bootstrap");
const { expect } = require("chai");
const db = require("../../../src/models");
const { generateUsers } = require("../../../src/factories/userFactory");
const { generateProfileForUser } = require("../../../src/factories/profileFactory");
const profileService = require("../../../src/services/profileService");


describe("Integration / Services / profileService", () => {

  describe("profileService.readProfile", () => {

    it("should read profile for a given username", async () => {

      // Mock 3 users, and their profile.
      const mockUsers = await generateUsers(3);
      for (const u of mockUsers) {
        const mockProfile = await generateProfileForUser(u);
      }
      const mockUser1 = mockUsers[0];


      // Call the service
      const profile1 = await profileService.readProfile(mockUser1.username);

      // Query profiles
      const allProfiles = await db.Profile.findAll();


      // Expect
      expect(allProfiles.length).to.equal(3);
      expect(mockUser1.id).to.equal(profile1.userId);

    });


  });


});