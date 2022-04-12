import salesforce from "../../salesforce_rest_api.app.mjs";
import account from "../../common/sobjects/account.mjs";
import lodash from "lodash";

export default {
  key: "salesforce_rest_api-salesforce-update-account",
  name: "Update Account",
  description: "Updates a Salesforce account, representing an individual account, which is an organization or person involved with your business (such as customers, competitors, and partners). See [Account SObject](https://developer.salesforce.com/docs/atlas.en-us.228.0.object_reference.meta/object_reference/sforce_api_objects_account.htm) and [Update Record](https://developer.salesforce.com/docs/atlas.en-us.228.0.api_rest.meta/api_rest/dome_update_fields.htm)",
  version: "0.2.2",
  type: "action",
  props: {
    salesforce,
    AccountId: {
      type: "string",
      label: "AccountId",
      description: "ID of the Account to modify.",
    },
    Name: {
      type: "string",
      label: "Name",
      description: "Name of the account. Maximum size is 255 characters. If the account has a record type of Person Account:\nThis value is the concatenation of the FirstName, MiddleName, LastName, and Suffix of the associated person contact.",
      optional: true,
    },
    selector: {
      propDefinition: [
        salesforce,
        "fieldSelector",
      ],
      description: `${salesforce.propDefinitions.fieldSelector.description} Account`,
      options: () => Object.keys(account),
      reloadProps: true,
    },
  },
  async additionalProps() {
    return this.salesforce.additionalProps(this.selector, account);
  },
  async run({ $ }) {
    const data = lodash.pickBy(lodash.pick(this, [
      "AccountId",
      "Name",
      ...this.selector,
    ]));
    const response = await this.salesforce.updateAccount({
      $,
      id: this.AccountId,
      data,
    });
    $.export("$summary", `Updated account ${this.AccountId}`);
    return response;
  },
};
