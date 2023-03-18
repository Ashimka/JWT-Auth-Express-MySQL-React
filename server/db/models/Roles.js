const { Model } = require("objection");
const User = require("./User");

class Roles extends Model {
  static get tableName() {
    return "roles";
  }
  static get relationMappings() {
    return {
      roles: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "users.id",
          to: "roles.userId",
        },
      },
    };
  }
}

module.exports = Roles;
