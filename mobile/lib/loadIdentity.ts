// loadIdentity.js
import { DelegationChain, Ed25519KeyIdentity } from "@dfinity/identity";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function loadIdentity() {
  try {
    const identityJson = await AsyncStorage.getItem("identity-key");
    const delegationJson = await AsyncStorage.getItem("delegation");

    if (!identityJson || !delegationJson) {
      return { pubKey: null, delegation: null };
    }

    const identityObj = Ed25519KeyIdentity.fromJSON(identityJson);
    const delegationObj = DelegationChain.fromJSON(JSON.parse(delegationJson));
    return {
      pubKey: identityObj,
      delegation: delegationObj,
    };
  } catch (error) {
    console.error("Error loading identity:", error);
    return { pubKey: null, delegation: null };
  }

}
